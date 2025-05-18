// This file contains the point cloud implementation specifically for subpages 
// with only metallic grey, black, and white colors (no red accent)

// Three.js setup
let scene, camera, renderer, pointCloud;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let disintegrationFactor = 0;
let rotationSpeed = 0.001;

// Set point count based on screen size (performance optimization)
const getPointCount = () => {
    if (window.innerWidth <= 768) return 30000;
    if (window.innerWidth <= 1024) return 50000;
    return 100000;
};

const pointCount = getPointCount();

// Arrays to store original and target positions for disintegration
let originalPositions = [];
let targetPositions = [];
let originalColors = [];

// Define our monochrome color palette (no red)
const colorPalette = {
    metalGray: { r: 0.19, g: 0.19, b: 0.19 }, // Metal gray #303030
    white: { r: 0.88, g: 0.88, b: 0.88 },     // White/light gray
    black: { r: 0.05, g: 0.05, b: 0.05 }      // Black
};

// Initialize Three.js scene
function initThree() {
    const container = document.getElementById('canvas-container');
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 600;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    createMonochromeParticles();
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create a particle texture
function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
    const context = canvas.getContext('2d');
    
    // Create radial gradient
    const gradient = context.createRadialGradient(
        16, 16, 0,    // inner circle
        16, 16, 16    // outer circle
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');   // Center: full white
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)'); // Mid: 80% white
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');    // Edge: transparent
    
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(16, 16, 16, 0, Math.PI * 2);
    context.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
}

// Create monochrome particles (no red)
function createMonochromeParticles() {
    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const sizes = new Float32Array(pointCount);
    
    // Use our monochrome palette
    const monochromeColors = [
        colorPalette.white,
        colorPalette.metalGray
        // No red in subpages
    ];
    
    // Function to create a cluster of particles
    function createCluster(centerX, centerY, centerZ, width, height, depth, count, color, startIndex) {
        for (let i = 0; i < count && startIndex + i < pointCount; i++) {
            const i3 = (startIndex + i) * 3;
            
            // Random position within defined area
            const x = centerX + (Math.random() - 0.5) * width;
            const y = centerY + (Math.random() - 0.5) * height;
            const z = centerZ + (Math.random() - 0.5) * depth;
            
            // Set position
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            
            // Store original position
            originalPositions.push({ x, y, z });
            
            // Create target position for disintegration
            const distance = 800 + Math.random() * 1000;
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            
            targetPositions.push({
                x: distance * Math.sin(theta) * Math.cos(phi),
                y: distance * Math.sin(theta) * Math.sin(phi),
                z: distance * Math.cos(theta)
            });
            
            // Set color
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Store original color
            originalColors.push({
                r: color.r,
                g: color.g,
                b: color.b
            });
            
            // Set size
            sizes[startIndex + i] = 2 + Math.random() * 2;
        }
        
        return startIndex + count;
    }
    
    let index = 0;
    
    // Create central form (white)
    index = createCluster(0, 0, 0, 300, 300, 100, pointCount * 0.25, monochromeColors[0], index);
    
    // Create secondary forms (metal gray)
    index = createCluster(-150, 100, 50, 150, 150, 50, pointCount * 0.1, monochromeColors[1], index);
    index = createCluster(150, -100, 50, 150, 150, 50, pointCount * 0.1, monochromeColors[1], index);
    
    // Create grid pattern (metallic)
    const gridSize = 500;
    const gridSpacing = 20;
    
    for (let x = -gridSize/2; x < gridSize/2; x += gridSpacing) {
        for (let z = -gridSize/2; z < gridSize/2; z += gridSpacing) {
            if (index < pointCount - 1) {
                const i3 = index * 3;
                
                // Position
                positions[i3] = x + (Math.random() - 0.5) * 5;
                positions[i3 + 1] = -200 + (Math.random() - 0.5) * 5;
                positions[i3 + 2] = z + (Math.random() - 0.5) * 5;
                
                // Store original position
                originalPositions.push({
                    x: positions[i3],
                    y: positions[i3 + 1],
                    z: positions[i3 + 2]
                });
                
                // Target position for disintegration
                const distance = 1000 + Math.random() * 1000;
                const phi = Math.random() * Math.PI * 2;
                const theta = Math.random() * Math.PI;
                
                targetPositions.push({
                    x: distance * Math.sin(theta) * Math.cos(phi),
                    y: distance * Math.sin(theta) * Math.sin(phi),
                    z: distance * Math.cos(theta)
                });
                
                // Random color from our monochrome palette
                const colorIndex = Math.floor(Math.random() * monochromeColors.length);
                const color = monochromeColors[colorIndex];
                
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
                
                // Store original color
                originalColors.push({
                    r: color.r,
                    g: color.g,
                    b: color.b
                });
                
                // Small size for grid points
                sizes[index] = 1 + Math.random();
                
                index++;
            }
        }
    }
    
    // Create a spiral (metallic)
    for (let i = 0; i < pointCount * 0.1 && index < pointCount; i++) {
        const i3 = index * 3;
        const t = i / (pointCount * 0.1);
        const angle = t * Math.PI * 10;
        
        // Spiral shape
        const r = 100 + 150 * t;
        const x = r * Math.cos(angle);
        const y = 50 + r * 0.2 * Math.sin(angle);
        const z = r * Math.sin(angle);
        
        // Set position
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
        
        // Store original position
        originalPositions.push({ x, y, z });
        
        // Target position for disintegration
        const distance = 1000 + Math.random() * 1000;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        
        targetPositions.push({
            x: distance * Math.sin(theta) * Math.cos(phi),
            y: distance * Math.sin(theta) * Math.sin(phi),
            z: distance * Math.cos(theta)
        });
        
        // Use metal gray color for spiral
        colors[i3] = colorPalette.metalGray.r;
        colors[i3 + 1] = colorPalette.metalGray.g;
        colors[i3 + 2] = colorPalette.metalGray.b;
        
        // Store original color
        originalColors.push({
            r: colorPalette.metalGray.r,
            g: colorPalette.metalGray.g,
            b: colorPalette.metalGray.b
        });
        
        // Size
        sizes[index] = 1.5 + Math.random();
        
        index++;
    }
    
    // Fill remaining with scattered particles
    while (index < pointCount) {
        const i3 = index * 3;
        
        // Random position in sphere
        const radius = 400 * Math.random();
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        // Set position
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
        
        // Store original position
        originalPositions.push({ x, y, z });
        
        // Target position for disintegration
        const distance = 1000 + Math.random() * 1000;
        const targetPhi = Math.random() * Math.PI * 2;
        const targetTheta = Math.random() * Math.PI;
        
        targetPositions.push({
            x: distance * Math.sin(targetTheta) * Math.cos(targetPhi),
            y: distance * Math.sin(targetTheta) * Math.sin(targetPhi),
            z: distance * Math.cos(targetTheta)
        });
        
        // Random color from our monochrome palette
        const colorIndex = Math.floor(Math.random() * monochromeColors.length);
        const color = monochromeColors[colorIndex];
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Store original color
        originalColors.push({
            r: color.r,
            g: color.g,
            b: color.b
        });
        
        // Small size
        sizes[index] = 1 + Math.random();
        
        index++;
    }
    
    // Set attributes to geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create material with texture
    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        map: createParticleTexture(),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });
    
    // Create point cloud and add to scene
    pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);
}

// Handle mouse movement
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
    
    // Calculate normalized position (0-1) for disintegration effect
    disintegrationFactor = Math.max(0, Math.min(1, event.clientX / window.innerWidth));
    
    // Update particles based on mouse position
    updateParticles();
}

// Update particles based on disintegration factor
function updateParticles() {
    if (!pointCloud) return;
    
    const positions = pointCloud.geometry.attributes.position.array;
    const colors = pointCloud.geometry.attributes.color.array;
    
    // Update each particle
    for (let i = 0; i < originalPositions.length; i++) {
        const i3 = i * 3;
        
        // Update position based on disintegration factor
        const orig = originalPositions[i];
        const target = targetPositions[i];
        
        positions[i3] = orig.x * (1 - disintegrationFactor) + target.x * disintegrationFactor;
        positions[i3 + 1] = orig.y * (1 - disintegrationFactor) + target.y * disintegrationFactor;
        positions[i3 + 2] = orig.z * (1 - disintegrationFactor) + target.z * disintegrationFactor;
        
        // Color transition from original colors to metal gray to black
        const origColor = originalColors[i];
        
        if (disintegrationFactor < 0.5) {
            // Original to metal gray (0-0.5)
            const t = Math.max(0, (disintegrationFactor - 0.2) / 0.3);
            
            colors[i3] = origColor.r * (1 - t) + colorPalette.metalGray.r * t;
            colors[i3 + 1] = origColor.g * (1 - t) + colorPalette.metalGray.g * t;
            colors[i3 + 2] = origColor.b * (1 - t) + colorPalette.metalGray.b * t;
        } else {
            // Metal gray to black (0.5-1.0)
            const t = (disintegrationFactor - 0.5) / 0.5;
            
            colors[i3] = colorPalette.metalGray.r * (1 - t) + colorPalette.black.r * t;
            colors[i3 + 1] = colorPalette.metalGray.g * (1 - t) + colorPalette.black.g * t;
            colors[i3 + 2] = colorPalette.metalGray.b * (1 - t) + colorPalette.black.b * t;
        }
    }
    
    // Mark attributes as needing update
    pointCloud.geometry.attributes.position.needsUpdate = true;
    pointCloud.geometry.attributes.color.needsUpdate = true;
}

// Handle window resize
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the point cloud
    if (pointCloud) {
        pointCloud.rotation.y += 0.001;
    }
    
    // Camera movement based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Initialize three.js scene when window is loaded
window.addEventListener('load', initThree);