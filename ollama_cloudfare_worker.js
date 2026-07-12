/**
 * Cloudflare Worker — Ollama Cloud proxy for debsweb.in console.
 *
 * What this does:
 *  - Receives chat requests from the browser (from debsweb.in only)
 *  - Forwards them to Ollama Cloud, attaching the API key server-side
 *  - Tries PRIMARY_MODEL first; if it errors, times out, or fails, retries
 *    once against FALLBACK_MODEL (same Ollama Cloud account/key)
 *  - Adds CORS headers so the browser is allowed to read the response
 *  - The API key never appears in the browser or in any public HTML/JS
 *
 * Setup (Cloudflare dashboard, no CLI needed):
 *  1. workers.cloudflare.com -> sign up / log in (free tier is fine)
 *  2. "Create Worker" -> give it a name, e.g. "debsweb-ollama-proxy"
 *  3. Delete the default starter code, paste this whole file in, click "Deploy"
 *  4. Go to the Worker's Settings -> Variables and Secrets
 *     -> Add secret: name = OLLAMA_API_KEY, value = your Ollama key -> Save
 *     (rotate the key you tested with earlier before doing this, since it
 *     was briefly exposed in the site's client-side JS)
 *  5. Copy the Worker's URL (looks like https://debsweb-ollama-proxy.<your-subdomain>.workers.dev)
 *  6. Paste that URL into OLLAMA_ENDPOINT in the site's JS (see chat message
 *     for the exact change) and remove the OLLAMA_API_KEY constant from the
 *     site entirely — the key now lives only here, as a Worker secret.
 *
 * Simple built-in rate limiting: max REQUESTS_PER_WINDOW requests per IP
 * per WINDOW_SECONDS, using the Worker's Cache API as a lightweight counter.
 * This is best-effort (not perfectly accurate under high concurrency) but
 * is enough to stop casual abuse without needing a paid KV/D1 binding.
 */

const ALLOWED_ORIGIN = 'https://debsweb.in'; // change if your deployed domain differs
const PRIMARY_MODEL = 'gpt-oss:20b';
const FALLBACK_MODEL = 'gemma4:31b-cloud'; // used only if the primary model errors/times out
const REQUEST_TIMEOUT_MS = 15000;
const MAX_REPLY_TOKENS = 120; // keeps console replies short regardless of prompt compliance
const REQUESTS_PER_WINDOW = 10;
const WINDOW_SECONDS = 3600; // 1 hour

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function checkRateLimit(ip) {
  const cache = caches.default;
  const key = new Request(`https://rate-limit.internal/${ip}`);
  const cached = await cache.match(key);
  const count = cached ? parseInt(await cached.text(), 10) : 0;

  if (count >= REQUESTS_PER_WINDOW) return false;

  const res = new Response(String(count + 1), {
    headers: { 'Cache-Control': `max-age=${WINDOW_SECONDS}` },
  });
  await cache.put(key, res.clone());
  return true;
}

async function callOllama(model, messages, apiKey) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch('https://ollama.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: { num_predict: MAX_REPLY_TOKENS },
      }),
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders() });
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit reached. Try again later.' }),
        { status: 429, headers: { ...corsHeaders(), 'Content-Type': 'application/json' } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400, headers: corsHeaders() });
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];

    let ollamaRes;
    try {
      ollamaRes = await callOllama(PRIMARY_MODEL, messages, env.OLLAMA_API_KEY);
      if (!ollamaRes.ok) throw new Error(`primary model returned ${ollamaRes.status}`);
    } catch {
      try {
        ollamaRes = await callOllama(FALLBACK_MODEL, messages, env.OLLAMA_API_KEY);
      } catch {
        return new Response(
          JSON.stringify({ error: 'Both primary and fallback models failed to respond.' }),
          { status: 502, headers: { ...corsHeaders(), 'Content-Type': 'application/json' } }
        );
      }
    }

    const data = await ollamaRes.text();

    return new Response(data, {
      status: ollamaRes.status,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    });
  },
};
