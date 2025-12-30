import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const NAV_PAGES = [
  { id: 'llms',        title: 'Machine Learning\nProjects',        position: 'left'   },
  { id: 'creative',    title: 'Digital Experience\nProjects',       position: 'left'  },
  { id: 'visual',      title: 'Design Projects',                   position: 'right'  },
  { id: 'photography', title: 'Photography',                         position: 'right'  }
];

const ROT_HERO_YAW   = THREE.MathUtils.degToRad(24);
const ROT_HERO_PITCH = THREE.MathUtils.degToRad(10);

export class NavigationSystem {
  constructor(scene, yard, hero, dims, camera, prototypeModel) {
    this.scene = scene;
    this.yard = yard;
    this.hero = hero;
    this.dims = dims;
    this.camera = camera;
    this.prototypeModel = prototypeModel;

    this.navLayer = new THREE.Group();
    this.navLayer.name = 'NavLayer';
    // sits well in front of the yard TVs to prevent overlaps
    this.navLayer.position.set(0, 0, 2.5);
    this.scene.add(this.navLayer);

    this.navModels = [];
    this.activePageIndex = -1;
    this.previousPageIndex = -1;

    this.buildLandingModelsDeterministic();
    this.setupClickHandler();
  }

  /* -- deterministic, camera-aware layout so all 5 are on-screen every time -- */
  buildLandingModelsDeterministic() {
    const yBase  = this.hero.position.y;

    // Tighter spacing to fit all TVs on screen
    const spacing = 3.85;  // Increased by 10% (3.5 * 1.1)
    const xSlots = [-spacing * 2, -spacing, spacing, spacing * 2];
    const ySlots = [yBase, yBase, yBase, yBase]; // All at same height as hero

    // Smaller scale to fit nicely around the hero
    const navScale = this.hero.scale.x * 0.55;  // Increased by 10% (0.55 * 1.1)

    for (let i = 0; i < 4; i++) {
      const tv = SkeletonUtils.clone(this.prototypeModel);
      tv.scale.setScalar(navScale);
      tv.position.set(xSlots[i], ySlots[i], 0);
      tv.rotation.set(0, 0, 0);  // Facing straight forward
      this.navLayer.add(tv);
      tv.userData.baseQuat = tv.quaternion.clone();

      const page = NAV_PAGES[i];
      const navModel = {
        tv, page, pageIndex: i,
        originalPosition: tv.position.clone(),
        originalRotation: tv.rotation.clone(),
        originalScale: tv.scale.clone(),
        plane: null, canvas: null, ctx: null
      };

      this.attachNavText(navModel);
      this.navModels.push(navModel);
    }
  }


  attachNavText(nm) {
    const tv = nm.tv;
    let screenMesh = null;
    tv.traverse(m => {
      if (m.isMesh && !screenMesh) {
        const name = (m.name || '') + ' ' + ((m.material && m.material.name) || '');
        if (/screen|glass|crt|display|tube/i.test(name)) screenMesh = m;
      }
    });
    if (!screenMesh) tv.traverse(m => { if (m.isMesh && !screenMesh) screenMesh = m; });
    if (!screenMesh) return;

    const canvas = document.createElement('canvas'); canvas.width = 1280; canvas.height = 720;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.drawNavText(ctx, nm.page.title, canvas.width, canvas.height);

    if (!screenMesh.geometry.boundingBox) screenMesh.geometry.computeBoundingBox();
    const bb = screenMesh.geometry.boundingBox.clone();
    const sz = bb.getSize(new THREE.Vector3());
    const center = bb.getCenter(new THREE.Vector3());

    const pad = 0.94;
    const w = Math.max(0.1, sz.x * pad), h = Math.max(0.1, sz.y * pad);
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace; tex.flipY = true;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: tex }, uInset: { value: new THREE.Vector2(0.02, 0.03) }, uRadius: { value: 0.22 },
        uPower: { value: 0.0 }, uFlicker: { value: 0.0 } // driven by hero
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
      transparent: true, depthWrite: false
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 1, 1), mat);
    screenMesh.add(plane);
    plane.position.copy(center);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(plane.quaternion);
    plane.position.addScaledVector(forward, Math.max(sz.z * 0.60, 0.006));

    nm.plane = plane; nm.canvas = canvas; nm.ctx = ctx;
  }

  drawNavText(ctx, text, W, H) {
    ctx.clearRect(0,0,W,H); ctx.save();
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.shadowColor='rgba(90,220,255,0.35)'; ctx.shadowBlur=30;
    const lines = text.split('\n'); const lh = H * 0.1; const startY = H*0.55 - ((lines.length-1)*lh*0.3);  // Moved down 2% (0.5 -> 0.52)
    const fontSize = Math.floor(H*0.07);  // Increased by 0.3rem equivalent (0.07 -> 0.10)
    ctx.font=`800 ${fontSize}px Montserrat, sans-serif`; ctx.fillStyle='#e8f8ff';
    ctx.letterSpacing = '0.1rem';  // Added character spacing
    lines.forEach((line,i)=>ctx.fillText(line, W/2, startY + i*lh)); ctx.restore();
  }


  /* mouse tilt - each TV looks at mouse when spotlight is near it */
  applyMouseParallax(mouseX, mouseY, hoveredNavModel) {
    this.navModels.forEach(nm => {
      // Ensure baseQuat is initialized
      if (!nm.tv.userData.baseQuat) {
        nm.tv.userData.baseQuat = nm.tv.quaternion.clone();
      }

      const tvWorldPos = new THREE.Vector3();
      nm.tv.getWorldPosition(tvWorldPos);

      // Check if THIS TV is the one being hovered
      const isHovered = (hoveredNavModel === nm);

      // Check if spotlight is near this TV
      const tvScreenPos = tvWorldPos.clone().project(this.camera);
      const dx = tvScreenPos.x - mouseX;
      const dy = tvScreenPos.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isNear = dist < 0.35;

      if (isHovered) {
        // When mouse is directly on this TV, face straight forward (camera direction)
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(this.camera.position, tvWorldPos, new THREE.Vector3(0, 1, 0));
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
        nm.tv.quaternion.slerp(targetQuat, 0.15);
      } else if (isNear) {
        // Spotlight is close but not hovering - make TV follow the mouse
        const mouse3D = new THREE.Vector3(mouseX, mouseY, 0.5);
        mouse3D.unproject(this.camera);

        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(mouse3D, tvWorldPos, new THREE.Vector3(0, 1, 0));
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
        nm.tv.quaternion.slerp(targetQuat, 0.15);
      } else {
        // Return to base rotation when mouse is far
        nm.tv.quaternion.slerp(nm.tv.userData.baseQuat, 0.1);
      }
    });
  }

  /* power/flicker uniforms mirrored from the hero */
  updateScreenPower(power, flicker) {
    this.navModels.forEach(nm => {
      const U = nm.plane?.material?.uniforms;
      if (U) { U.uPower.value = power; U.uFlicker.value = flicker; }
    });
  }

  /* click/scroll -> set active page */
  setupClickHandler() {
    const canvas = document.getElementById('stage');
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    canvas.addEventListener('click', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      for (let i=0;i<this.navModels.length;i++){
        if (raycaster.intersectObject(this.navModels[i].tv, true).length){
          this.navigateToPage(i);
          break;
        }
      }
    });
  }

  navigateToPage(index) {
    // Scroll to the corresponding section
    const sections = ['llms-section', 'creative-section', 'visual-section', 'photography-section'];
    if (index >= 0 && index < sections.length) {
      const section = document.getElementById(sections[index]);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  update(dt) {
    // No animation updates needed - static TVs only
  }
}
