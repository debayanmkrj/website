import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { NavigationSystem } from './navigation.js';

/* ================= CONFIG ================= */
const GLB_PATH = 'source/scene.glb';
const ROWS = 7;
const COLS_FRONT = 13;
const STACK_MIN = 3, STACK_MAX = 8;
const COL_SPREAD = 1.35;
const ROW_Z_STEP = 2.00;
const START_Z = -1;
const GROUND_Y = -1.0;  // Adjusted for visibility in cinema strip
const SCALE_RANGE = [0.65, 2.45];  // Increased by 10%

const ROT_ALL_YAW = THREE.MathUtils.degToRad(18);
const ROT_ALL_PITCH = THREE.MathUtils.degToRad(8);
const ROT_HERO_YAW = THREE.MathUtils.degToRad(24);
const ROT_HERO_PITCH = THREE.MathUtils.degToRad(10);

const DOF_DEFAULT = { focus: 6.0, aperture: 0.0003, maxblur: 0.003 };  // Reduced blur for clarity
const qTmp = new THREE.Quaternion();
/* ========================================== */

const frame = document.getElementById('frame');
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('stage'),
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x081426, 0.06);

const camera = new THREE.PerspectiveCamera(36, frame.clientWidth / frame.clientHeight, 0.1, 200);
camera.position.set(0, 6.5, 10);  // Adjusted to view the scene properly

/* Post: DOF */
let composer, bokeh;
function createComposer() {
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bokeh = new BokehPass(scene, camera, {
    focus: DOF_DEFAULT.focus,
    aperture: DOF_DEFAULT.aperture,
    maxblur: DOF_DEFAULT.maxblur,
    width: frame.clientWidth,
    height: frame.clientHeight
  });
  composer.addPass(bokeh);
}

/* Lights */
const env = new RoomEnvironment();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(env, 0.03).texture;

const hemi = new THREE.HemisphereLight(0x9bd1ff, 0x071018, 0.42);
const key = new THREE.DirectionalLight(0x8ac2ff, 0.78);
key.position.set(3.2, 5.2, 5.0);
const rim = new THREE.DirectionalLight(0x66f0ff, 0.40);
rim.position.set(-4.6, 2.2, -3.6);
const under = new THREE.PointLight(0x3aa0ff, 0.25, 10);
under.position.set(0, -1.6, 1.0);
scene.add(hemi, key, rim, under);

/* Yard & Hero */
const yard = new THREE.Group();
scene.add(yard);
let baseModel = null, dims = { x: 2, y: 2, z: 2 };
let hero = null, screenPlane = null;
const backGlow = new THREE.PointLight(0x66e0ff, 0.0, 8.5);
scene.add(backGlow);

let navigationSystem = null;

/* Load GLB */
const gltfLoader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');
gltfLoader.setDRACOLoader(draco);
gltfLoader.load(GLB_PATH, (gltf) => {
  baseModel = gltf.scene;
  baseModel.traverse(m => {
    if (m.isMesh) {
      m.castShadow = false;
      m.receiveShadow = true;
      if (m.material && 'envMapIntensity' in m.material) m.material.envMapIntensity = 0.75;
    }
  });
  normalizeAndMeasure(baseModel, 1.9);

  buildYard();
  buildHero();

  // NEW: pass baseModel so the 5 link models are clones with fixed layout (no randomness)
  navigationSystem = new NavigationSystem(scene, yard, hero, dims, camera, baseModel);

  const focusDist = camera.position.distanceTo(hero.position);
  bokeh.uniforms['focus'].value = focusDist;
  bokeh.uniforms['aperture'].value = DOF_DEFAULT.aperture;
  bokeh.uniforms['maxblur'].value = DOF_DEFAULT.maxblur;

}, undefined, (err) => console.error('GLB load error:', err));

function buildYard() {
  const dx = dims.x * 1.35;
  const dz = dims.z * 2.00;

  for (let r = 0; r < ROWS; r++) {
    const row = new THREE.Group();
    const cols = COLS_FRONT + r * 2;
    row.position.z = START_Z - r * dz;

    const rowScale = THREE.MathUtils.lerp(1.30, 0.75, r / (ROWS - 1));
    const yBase = GROUND_Y - r * 0.04;

    for (let c = 0; c < cols; c++) {
      const col = new THREE.Group();
      const x = (c - (cols - 1) / 2) * dx + THREE.MathUtils.randFloatSpread(dims.x * 0.25);
      col.position.x = x;

      const sStack = rowScale * THREE.MathUtils.randFloat(SCALE_RANGE[0], SCALE_RANGE[1]);
      const count = THREE.MathUtils.randInt(STACK_MIN, STACK_MAX);
      let yCursor = yBase;

      for (let i = 0; i < count; i++) {
        const tv = SkeletonUtils.clone(baseModel);
        tv.scale.setScalar(sStack);

        const h = dims.y * sStack;
        tv.position.set(
          THREE.MathUtils.randFloatSpread(dims.x * 0.04),
          yCursor + h * 0.5,
          THREE.MathUtils.randFloatSpread(dims.z * 0.04)
        );
        yCursor += h * 0.99;

        tv.rotation.set(
          THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(-3.8, 3.8)),
          THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(-12, 12)),
          THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(-2.5, 2.5))
        );
        col.add(tv);
        tv.userData.baseQuat = tv.quaternion.clone();
      }
      row.add(col);
    }
    yard.add(row);
  }
}

function buildHero() {
  hero = SkeletonUtils.clone(baseModel);
  hero.scale.setScalar(5.8);  // Increased by 10% (5.5 * 1.1)
  hero.position.set(0, GROUND_Y + dims.y * hero.scale.x * 0.5, 0.2);
  scene.add(hero);

  backGlow.position.copy(new THREE.Vector3(0, hero.position.y + 0.12, -0.55));

  const screenMesh = findFrontMostMesh(hero) || guessScreenMesh(hero) || hero;
  attachPaikPlane(screenMesh);
}

function findFrontMostMesh(root) {
  const raycaster = new THREE.Raycaster();
  const center = new THREE.Vector3();
  new THREE.Box3().setFromObject(root).getCenter(center);
  raycaster.set(camera.position, center.clone().sub(camera.position).normalize());
  const hits = raycaster.intersectObject(root, true);
  return hits.length ? hits[0].object : null;
}

function guessScreenMesh(root) {
  let best = null, bestScore = -Infinity;
  root.traverse(c => {
    if (!c.isMesh) return;
    const name = (c.name || '') + ' ' + ((c.material && c.material.name) || '');
    const nameBonus = /screen|glass|crt|display|tube/i.test(name) ? 20 : 0;
    if (!c.geometry.boundingBox) c.geometry.computeBoundingBox();
    const bb = c.geometry.boundingBox;
    const s = bb.getSize(new THREE.Vector3());
    const flat = -s.z / (Math.max(s.x, s.y) + 1e-6);
    const area = s.x * s.y;
    const score = nameBonus + area * 0.6 + flat * 30;
    if (score > bestScore) { bestScore = score; best = c; }
  });
  return best;
}

/* Paik canvas (hero) */
const paikCanvas = document.createElement('canvas');
paikCanvas.width = 1280;
paikCanvas.height = 720;
const pctx = paikCanvas.getContext('2d', { willReadFrequently: true });
await document.fonts.ready;

function drawPaikBase(intensity) {
  const W = paikCanvas.width, H = paikCanvas.height;
  pctx.clearRect(0, 0, W, H);
  pctx.save();
  pctx.textAlign = 'center';
  pctx.textBaseline = 'middle';
  pctx.shadowColor = 'rgba(90,220,255,0.35)';
  pctx.shadowBlur = 30 * (0.5 + 0.5 * intensity);
  pctx.font = `800 ${Math.floor(H * 0.07)}px Montserrat, sans-serif`;  // Adjusted to 0.09 to prevent cutoff
  pctx.fillStyle = '#e8f8ff';
  pctx.fillText('Debayan Mukherjee', W / 2, H * 0.52);  // Slightly higher to center better
  pctx.shadowBlur = 0;
  pctx.font = `600 ${Math.floor(H * 0.055)}px Montserrat, sans-serif`;  // Adjusted to 0.055
  pctx.fillStyle = 'rgba(170,220,255,0.96)';
  pctx.fillText('Switched On', W / 2, H * 0.65);  // Slightly higher
  pctx.restore();
}

function paikGlitch(intensity, time) {
  const W = paikCanvas.width, H = paikCanvas.height;
  const src = pctx.getImageData(0, 0, W, H);
  const s = src.data;
  const out = pctx.createImageData(W, H);
  const o = out.data;

  const baseShift = 6 * intensity, jitterAmp = 5 * intensity, speed = 0.6 + 1.0 * intensity;

  for (let y = 0; y < H; y++) {
    const phase = Math.sin((y / H) * 9 + time * speed) * (baseShift + 2 * Math.sin(time * 0.7 + y * 0.05));
    const jit = Math.floor(jitterAmp * (Math.random() - 0.5));
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const rX = Math.max(0, Math.min(W - 1, Math.round(x + phase + jit)));
      const gX = Math.max(0, Math.min(W - 1, Math.round(x + phase * 0.6 - jit)));
      const bX = Math.max(0, Math.min(W - 1, Math.round(x - phase - jit * 0.3)));
      const rI = (y * W + rX) * 4, gI = (y * W + gX) * 4, bI = (y * W + bX) * 4;

      const a = Math.max(s[rI + 3], s[gI + 3], s[bI + 3]);
      if (a < 8) { o[i] = o[i + 1] = o[i + 2] = 0; o[i + 3] = 0; continue; }

      o[i] = s[rI];
      o[i + 1] = s[gI + 1];
      o[i + 2] = s[bI + 2];
      o[i + 3] = a;
    }
  }
  pctx.putImageData(out, 0, 0);
  pctx.globalCompositeOperation = 'source-atop';
  pctx.fillStyle = `rgba(0,0,0,${0.14 * intensity})`;
  for (let yy = 0; yy < H; yy += 2) pctx.fillRect(0, yy, W, 1);
  pctx.globalCompositeOperation = 'source-over';
}

function attachPaikPlane(target) {
  if (!target.geometry.boundingBox) target.geometry.computeBoundingBox();
  const bb = target.geometry.boundingBox.clone();
  const sz = bb.getSize(new THREE.Vector3());
  const center = bb.getCenter(new THREE.Vector3());

  const pad = 0.94;
  const w = Math.max(0.1, sz.x * pad), h = Math.max(0.1, sz.y * pad);
  const tex = new THREE.CanvasTexture(paikCanvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = true;

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: tex },
      uInset: { value: new THREE.Vector2(0.02, 0.03) },
      uRadius: { value: 0.22 },
      uPower: { value: 0.0 },
      uFlicker: { value: 0.0 }
    },
    vertexShader: `precision highp float;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uTex; uniform vec2 uInset; uniform float uRadius;
      uniform float uPower; uniform float uFlicker; varying vec2 vUv;
      float sdRoundRect(vec2 p, vec2 b, float r){ vec2 q=abs(p)-b+vec2(r); return length(max(q,0.)) - r; }
      void main(){
        float p = clamp(uPower, 0.0, 1.0);
        vec2 uv=vUv; float halfH = mix(0.0,0.5,p);
        float gate = smoothstep(0.0, fwidth(vUv.y)*2.0, halfH - abs(uv.y-0.5));
        vec2 uv2=(uv-0.5)/(0.5-uInset); float d=sdRoundRect(uv2, vec2(0.5), uRadius);
        float aa=fwidth(d)*1.5; float mask=smoothstep(0.0, aa, -d);
        float alphaMask = mask * gate; if(alphaMask<=0.0) discard;
        vec4 col = texture2D(uTex, uv);
        float pop = smoothstep(0.0,0.1,uFlicker) * (1.2 - uFlicker);
        col.rgb *= (0.15 + 1.35 * p + 0.7 * pop);
        gl_FragColor = vec4(col.rgb, col.a * alphaMask);
      }`,
    transparent: true,
    depthWrite: false
  });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 1, 1), mat);
  target.add(plane);
  plane.position.copy(center);

  const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(plane.quaternion);
  plane.position.addScaledVector(forward, Math.max(sz.z * 0.60, 0.006));

  const worldPos = new THREE.Vector3();
  plane.getWorldPosition(worldPos);
  const toCam = camera.position.clone().sub(worldPos).normalize();
  const facing = forward.clone().normalize();
  if (facing.dot(toCam) < 0) plane.rotateY(Math.PI);

  screenPlane = plane;
}

function normalizeAndMeasure(model, targetMax) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const s = targetMax / Math.max(size.x, size.y, size.z);
  model.scale.setScalar(s);
  model.position.sub(center.multiplyScalar(s));
  const b2 = new THREE.Box3().setFromObject(model);
  const sz = b2.getSize(new THREE.Vector3());
  dims = { x: sz.x, y: sz.y, z: sz.z };
}

/* Interaction & spotlight (constant radius) */
let nx = 0, ny = 0, power = 0.0, powerTarget = 0.0, flicker = 0.0;
const maskEl = document.getElementById('mask');
const hintEl = document.getElementById('hint');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredTV = null;

// Helper function to update spotlight position
function updateSpotlight(x, y) {
  nx = x * 2 - 1;
  ny = y * 2 - 1;
  mouse.x = nx;
  mouse.y = -ny;

  maskEl.style.setProperty('--spot-x', `${x * 100}%`);
  maskEl.style.setProperty('--spot-y', `${y * 100}%`);

  const dist = Math.hypot(x - 0.5, y - 0.5);
  const on = dist < 0.22;
  powerTarget = on ? 1.0 : 0.0;
  if (on && power < 0.05) flicker = 1.0;

  // Show hint only when hovering over the frame
  if (hintEl) hintEl.classList.add('visible');
}

// Mouse events for desktop
frame.addEventListener('pointermove', (e) => {
  const r = frame.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  updateSpotlight(x, y);
});

frame.addEventListener('pointerleave', () => {
  nx = ny = 0;
  powerTarget = 0.0;
  maskEl.style.setProperty('--spot-x', '50%');
  maskEl.style.setProperty('--spot-y', '50%');
  // Hide hint when mouse leaves the frame
  if (hintEl) hintEl.classList.remove('visible');
});

// Touch events for mobile/tablet
frame.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent scrolling while touching the frame
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const r = frame.getBoundingClientRect();
    const x = (touch.clientX - r.left) / r.width;
    const y = (touch.clientY - r.top) / r.height;
    updateSpotlight(x, y);
  }
}, { passive: false });

frame.addEventListener('touchstart', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const r = frame.getBoundingClientRect();
    const x = (touch.clientX - r.left) / r.width;
    const y = (touch.clientY - r.top) / r.height;
    updateSpotlight(x, y);
  }
});

frame.addEventListener('touchend', () => {
  nx = ny = 0;
  powerTarget = 0.0;
  maskEl.style.setProperty('--spot-x', '50%');
  maskEl.style.setProperty('--spot-y', '50%');
  if (hintEl) hintEl.classList.remove('visible');
});

/* Click handler for hero TV to navigate to About page */
frame.addEventListener('click', (e) => {
  if (!hero) return;

  const r = frame.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width) * 2 - 1;
  const y = -((e.clientY - r.top) / r.height) * 2 + 1;

  raycaster.setFromCamera({ x, y }, camera);
  const intersects = raycaster.intersectObject(hero, true);

  if (intersects.length > 0) {
    // Clicked on hero TV - navigate to about page
    window.location.href = 'pages/about.html';
  }
});

/* No wheel handler → scroll controls the pages */

/* Resize */
function sizeToFrame() {
  const w = frame.clientWidth, h = frame.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (composer) composer.setSize(w, h);
}
window.addEventListener('resize', sizeToFrame);

/* Main loop */
let last = performance.now() / 1000, paikIntensity = 0.25;

function animate(nowMs) {
  requestAnimationFrame(animate);
  const now = nowMs / 1000, dt = Math.min(0.05, now - last);
  last = now;

  // Raycast to find hovered TV (yard + navigation)
  raycaster.setFromCamera(mouse, camera);
  const allTVs = [];
  const navTVs = [];

  // Collect all yard TVs
  yard.children.forEach(row => {
    row.children.forEach(col => {
      col.children.forEach(tv => {
        allTVs.push(tv);
      });
    });
  });

  // Collect navigation TVs
  if (navigationSystem && navigationSystem.navModels) {
    navigationSystem.navModels.forEach(nm => {
      navTVs.push(nm.tv);
      allTVs.push(nm.tv);
    });
  }

  // Check for intersections
  const intersects = raycaster.intersectObjects(allTVs, true);
  let newHoveredTV = null;
  let hoveredNavModel = null;

  if (intersects.length > 0) {
    // Find which TV was hit
    for (let i = 0; i < intersects.length; i++) {
      let obj = intersects[i].object;
      // Walk up the parent chain to find the TV
      while (obj.parent && !allTVs.includes(obj)) {
        obj = obj.parent;
      }
      if (allTVs.includes(obj)) {
        newHoveredTV = obj;
        // Check if it's a nav TV
        if (navigationSystem && navigationSystem.navModels) {
          hoveredNavModel = navigationSystem.navModels.find(nm => nm.tv === obj);
        }
        break;
      }
    }
  }

  // Update hovered TV reference
  if (newHoveredTV !== hoveredTV) {
    hoveredTV = newHoveredTV;
  }

  // Yard parallax - individual TV rotation towards camera when hovered
  yard.children.forEach(row => {
    row.children.forEach(col => {
      col.children.forEach(tv => {
        if (!tv.userData.baseQuat) tv.userData.baseQuat = tv.quaternion.clone();

        // If this TV is hovered, make it face the camera directly
        if (hoveredTV === tv) {
          const tvWorldPos = new THREE.Vector3();
          tv.getWorldPosition(tvWorldPos);
          const targetQuat = new THREE.Quaternion().setFromRotationMatrix(
            new THREE.Matrix4().lookAt(tvWorldPos, camera.position, new THREE.Vector3(0, 1, 0))
          );
          tv.quaternion.slerp(targetQuat, 0.1);
        } else {
          // Apply normal parallax
          qTmp.setFromEuler(new THREE.Euler(ny * ROT_ALL_PITCH, nx * ROT_ALL_YAW, 0));
          tv.quaternion.slerp(tv.userData.baseQuat.clone().multiply(qTmp), 0.1);
        }
      });
    });
  });

  // Update navigation TV screens - show text only when hovered
  if (navigationSystem && navigationSystem.navModels) {
    navigationSystem.navModels.forEach(nm => {
      const U = nm.plane?.material?.uniforms;
      if (U) {
        const isHovered = (hoveredNavModel === nm);
        const targetPower = isHovered ? 1.0 : 0.0;

        // Smooth transition
        const currentPower = U.uPower.value;
        U.uPower.value += (targetPower - currentPower) * 0.14;

        // Flicker on first hover
        if (isHovered && currentPower < 0.05) {
          U.uFlicker.value = 1.0;
        }
        U.uFlicker.value += (0.0 - U.uFlicker.value) * 0.18;
      }
    });
  }

  // Hero parallax
  if (hero) {
    if (!hero.userData.baseQuat) hero.userData.baseQuat = hero.quaternion.clone();
    qTmp.setFromEuler(new THREE.Euler(ny * ROT_HERO_PITCH, nx * ROT_HERO_YAW, 0));
    hero.quaternion.copy(hero.userData.baseQuat).multiply(qTmp);
  }

  // Hero screen content
  const strong = powerTarget > 0;
  paikIntensity += ((strong ? 0.9 : 0.25) - paikIntensity) * 0.10;
  drawPaikBase(paikIntensity);
  paikGlitch(paikIntensity, now);

  // Page-models: mouse tilt with hover detection
  if (navigationSystem) {
    navigationSystem.applyMouseParallax(nx, ny, hoveredNavModel);
  }

  if (screenPlane?.material?.uniforms) {
    const U = screenPlane.material.uniforms;
    U.uTex.value.needsUpdate = true;
    power += (powerTarget - power) * 0.14;
    flicker += (0.0 - flicker) * 0.18;
    const f = Math.max(0.0, flicker);
    U.uPower.value = power;
    U.uFlicker.value = f;
    backGlow.intensity = 2.5 * power + 0.8 * f;
  }

  if (navigationSystem) navigationSystem.update(dt);

  if (composer) composer.render();
  else renderer.render(scene, camera);
}

createComposer();
sizeToFrame();
requestAnimationFrame(animate);
