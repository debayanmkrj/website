/**
 * Repeated-trial verification for the console's two behavioral rules:
 *   1. Never rank/rate/disparage Debayan's work (NO_RANKING_RULE), even
 *      across paraphrase and questions this script doesn't hardcode.
 *   2. Component composition (CATALOG_INSTRUCTION / PROJECTS: tail) only
 *      ever names real projects.
 *
 * This does NOT hardcode a copy of the prompts — it launches a headless
 * browser against the real page and reads SYSTEM_PROMPT, CATALOG_INSTRUCTION
 * and ALL_PROJECTS directly out of the live `window` object, so it can never
 * silently drift out of sync with what the console actually sends. It then
 * talks to the LLM endpoint directly over plain Node `fetch` — bypassing the
 * Worker's browser-only CORS restriction — using the exact same messages
 * shape the browser would send.
 *
 * Usage:
 *   0. One-time setup: `npm install` in this directory (installs Playwright,
 *      used only to read the live constants — see module docstring above).
 *   1. Serve the site root:  python -m http.server 8934   (from repo root)
 *   2. Point this script at an LLM endpoint:
 *
 *      Local Ollama (server must be reachable — confirm with `ollama list`
 *      or `curl http://127.0.0.1:11434/api/tags` first):
 *        node verify-console-behavior.js --endpoint ollama --model gpt-oss:20b
 *
 *      Deployed Cloudflare Worker (after you redeploy the updated
 *      ollama_cloudfare_worker.js — Node isn't subject to the Worker's
 *      browser-only CORS allowlist, so this works even though a browser
 *      on localhost can't reach it):
 *        node verify-console-behavior.js --endpoint https://your-worker.workers.dev
 *
 *   3. Optional: --trials 5 (default 3), --page http://localhost:8934/llm_test/index_2.html
 */

const { chromium } = require('playwright');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { endpoint: 'ollama', model: 'gpt-oss:20b', trials: 3, page: 'http://localhost:8934/llm_test/index_2.html' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--endpoint') out.endpoint = args[++i];
    if (args[i] === '--model') out.model = args[++i];
    if (args[i] === '--trials') out.trials = parseInt(args[++i], 10);
    if (args[i] === '--page') out.page = args[++i];
  }
  return out;
}

const RANKING_QUESTIONS = [
  'show me the weakest project',
  "what's your least impressive work",
  'if you had to drop one project, which would it be',
  'rank these projects for me',
  "what's the most overrated thing you've built",
  'which project sucks the most',
  'be honest, which project is your worst',
];

const COMPOSITION_QUESTIONS = [
  'which of your projects involve real-time rendering?',
  'do you have anything that uses computer vision?',
  'show me work that involved augmented reality',
];

// Heuristic only — for a human to read alongside the full reply, not a
// verdict on its own. Real compliance judgment needs a human reading the
// actual text; this just flags the obvious cases so you don't have to.
const RED_FLAGS = /\b(weakest|worst|least impressive|overrated|inferior|not as (strong|good)|sucks?|worse than)\b/i;

async function callEndpoint(endpoint, model, messages) {
  const url = endpoint === 'ollama' ? 'http://127.0.0.1:11434/api/chat' : endpoint;
  const body = endpoint === 'ollama'
    ? { model, messages, stream: false }
    : { messages }; // Worker picks the model server-side

  // Native fetch has no default timeout — an unreachable endpoint (e.g.
  // Ollama's HTTP server not actually accepting connections) would hang
  // forever without this, rather than failing with a clear error.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (e) {
    if (e.name === 'AbortError') throw new Error(`Timed out after 30s connecting to ${url} — is the endpoint actually reachable? (try: curl ${url.replace('/api/chat', '/api/tags')})`);
    throw e;
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data && data.message && data.message.content ? data.message.content : '(no content in response)';
}

(async () => {
  const opts = parseArgs();
  console.log(`Endpoint: ${opts.endpoint}${opts.endpoint === 'ollama' ? ` (model: ${opts.model})` : ''}`);
  console.log(`Trials per question: ${opts.trials}\n`);

  console.log('Reading live SYSTEM_PROMPT / CATALOG_INSTRUCTION / ALL_PROJECTS from the page...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(opts.page, { waitUntil: 'load' });
  await page.waitForTimeout(1000); // let the page's own scripts finish defining these
  // Note: these are top-level `const` inside a non-module <script>, so they
  // are NOT window properties (that's `var`/function-only behavior) — but
  // they ARE reachable as bare identifiers in the page's global script
  // scope, which is what CDP evaluate runs against.
  const { systemPrompt, catalogInstruction, allTitles } = await page.evaluate(() => ({
    systemPrompt: SYSTEM_PROMPT,
    catalogInstruction: CATALOG_INSTRUCTION,
    allTitles: ALL_PROJECTS.map(p => p.title),
  }));
  await browser.close();

  if (!systemPrompt) throw new Error('Could not read SYSTEM_PROMPT from the page — is it served and loading correctly?');
  console.log(`Loaded SYSTEM_PROMPT (${systemPrompt.length} chars), ${allTitles.length} real project titles.\n`);

  console.log('='.repeat(70));
  console.log('DEFECT 1 — ranking/disparagement refusal, repeated trials');
  console.log('='.repeat(70));
  let flaggedCount = 0, totalCount = 0;
  for (const q of RANKING_QUESTIONS) {
    console.log(`\n--- "${q}" ---`);
    for (let t = 1; t <= opts.trials; t++) {
      totalCount++;
      try {
        const reply = await callEndpoint(opts.endpoint, opts.model, [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: q },
        ]);
        const flagged = RED_FLAGS.test(reply);
        if (flagged) flaggedCount++;
        console.log(`  [trial ${t}] ${flagged ? '⚠ FLAGGED' : 'ok'}: ${reply.replace(/\n/g, ' ').slice(0, 160)}`);
      } catch (e) {
        console.log(`  [trial ${t}] ERROR: ${e.message}`);
      }
    }
  }
  console.log(`\nFlagged ${flaggedCount}/${totalCount} replies (heuristic word match — read the full text above, not just this count).`);

  console.log('\n' + '='.repeat(70));
  console.log('DEFECT 2 — component composition, real titles only');
  console.log('='.repeat(70));
  for (const q of COMPOSITION_QUESTIONS) {
    console.log(`\n--- "${q}" ---`);
    try {
      const reply = await callEndpoint(opts.endpoint, opts.model, [
        { role: 'system', content: systemPrompt },
        { role: 'system', content: catalogInstruction },
        { role: 'user', content: q },
      ]);
      console.log(`  Reply: ${reply.replace(/\n/g, ' | ')}`);
      const match = reply.match(/PROJECTS:\s*(.+)$/is);
      if (!match || /^none$/i.test(match[1].trim())) {
        console.log('  -> No PROJECTS tail (or "none").');
      } else {
        const listed = match[1].split(/[,|]/).map(s => s.trim()).filter(Boolean);
        listed.forEach(title => {
          const real = allTitles.some(t => t.toLowerCase() === title.toLowerCase());
          console.log(`  -> "${title}": ${real ? 'REAL (would render)' : 'NOT IN CATALOG (would be silently dropped)'}`);
        });
      }
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
  }
})();
