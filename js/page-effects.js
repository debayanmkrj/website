// This file contains custom Three.js effects for each page
// Import this on pages where you want specific 3D effects

// Different variations for different pages
function initPageSpecificEffects(pageName) {
    // If no pointCloud or we're not on a specific page, return
    if (!pointCloud || !pageName) return;
    
    // Reset any previous page effects
    resetPointCloud();
    
    // Apply specific effects based on the page
    switch(pageName) {
        case 'creative-design':
            applyCreativeDesignEffects();
            break;
        case 'visual-experience':
            applyVisualExperienceEffects();
            break;
        case 'creative-tech':
            applyCreativeTechEffects();
            break;
        case 'photography':
            applyPhotographyEffects();
            break;
        case 'about':
            applyAboutEffects();
            break;
        default:
            // Default effect is already set by the main particles.js
            break;
    }
}

// Reset point cloud to original state
function resetPointCloud() {
    if (!pointCloud) return;
    
    // Reset rotation and animation
    pointCloud.rotation.set(0, 0, 0);
    
    // Reset any special attributes or properties added
    pointCloud.userData = {};
}

// Creative Design page effects
function applyCreativeDesignEffects() {
    // Example: Create a spiral effect
    const positions = pointCloud.geometry.attributes.position.array;
    
    for (let i = 0; i < originalPositions.length; i++) {
        const i3 = i * 3;
        const basePosition = originalPositions[i];
        
        // Adjust original positions for this page
        // Create a spiral shape based on the original positions
        const distance = Math.sqrt(basePosition.x * basePosition.x + basePosition.z * basePosition.z);
        const angle = Math.atan2(basePosition.z, basePosition.x);
        
        // Store new original position
        originalPositions[i] = {
            x: basePosition.x + Math.sin(distance * 0.02) * 30,
            y: basePosition.y + Math.cos(distance * 0.02) * 30,
            z: basePosition.z
        };
        
        // Update position in geometry
        positions[i3] = originalPositions[i].x;
        positions[i3 + 1] = originalPositions[i].y;
        positions[i3 + 2] = originalPositions[i].z;
    }
    
    // Update geometry
    pointCloud.geometry.attributes.position.needsUpdate = true;
    
    // Adjust animation behavior
    pointCloud.userData.rotationSpeed = 0.002;
    pointCloud.userData.waveEffect = true;
}

// Visual Experience page effects
function applyVisualExperienceEffects() {
    // Example: Create a wave pattern
    const positions = pointCloud.geometry.attributes.position.array;
    
    for (let i = 0; i < originalPositions.length; i++) {
        const i3 = i * 3;
        const basePosition = originalPositions[i];
        
        // Create undulating wave pattern
        originalPositions[i] = {
            x: basePosition.x,
            y: basePosition.y + Math.sin(basePosition.x * 0.02) * 50,
            z: basePosition.z + Math.cos(basePosition.z * 0.02) * 50
        };
        
        // Update position in geometry
        positions[i3] = originalPositions[i].x;
        positions[i3 + 1] = originalPositions[i].y;
        positions[i3 + 2] = originalPositions[i].z;
    }
    
    // Update geometry
    pointCloud.geometry.attributes.position.needsUpdate = true;
    
    // Special animation for Visual Experience page
    pointCloud.userData.pulseEffect = true;
}

// Creative Technology page effects
function applyCreativeTechEffects() {
    // Example: Create a geometric pattern
    const positions = pointCloud.geometry.attributes.position.array;
    
    for (let i = 0; i < originalPositions.length; i++) {
        const i3 = i * 3;
        const basePosition = originalPositions[i];
        
        // Create a cubic grid pattern
        const gridSize = 50;
        const x = Math.round(basePosition.x / gridSize) * gridSize;
        const y = Math.round(basePosition.y / gridSize) * gridSize;
        const z = Math.round(basePosition.z / gridSize) * gridSize;
        
        // Add some random offset for organic feel
        const offset = 20;
        
        originalPositions[i] = {
            x: x + (Math.random() - 0.5) * offset,
            y: y + (Math.random() - 0.5) * offset,
            z: z + (Math.random() - 0.5) * offset
        };
        
        // Update position in geometry
        positions[i3] = originalPositions[i].x;
        positions[i3 + 1] = originalPositions[i].y;
        positions[i3 + 2] = originalPositions[i].z;
    }
    
    // Update geometry
    pointCloud.geometry.attributes.position.needsUpdate = true;
    
    // Tech-specific animations
    pointCloud.userData.techEffect = true;
}

// Photography page effects
function applyPhotographyEffects() {
    // Example: Create a lens/aperture effect
    const positions = pointCloud.geometry.attributes.position.array;
    
    for (let i = 0; i < originalPositions.length; i++) {
        const i3 = i * 3;
        const basePosition = originalPositions[i];
        
        // Create a circular pattern like camera aperture
        const distance = Math.sqrt(basePosition.x * basePosition.x + basePosition.z * basePosition.z);
        const angle = Math.atan2(basePosition.z, basePosition.x);
        
        // Create rings with particles
        const newRadius = Math.round(distance / 30) * 30;
        
        originalPositions[i] = {
            x: Math.cos(angle) * newRadius,
            y: basePosition.y,
            z: Math.sin(angle) * newRadius
        };
        
        // Update position in geometry
        positions[i3] = originalPositions[i].x;
        positions[i3 + 1] = originalPositions[i].y;
        positions[i3 + 2] = originalPositions[i].z;
    }
    
    // Update geometry
    pointCloud.geometry.attributes.position.needsUpdate = true;
    
    // Photography-specific animations
    pointCloud.userData.apertureSpin = true;
}

// About page effects
function applyAboutEffects() {
    // Example: Create a more personal, organic shape
    const positions = pointCloud.geometry.attributes.position.array;
    
    for (let i = 0; i < originalPositions.length; i++) {
        const i3 = i * 3;
        const basePosition = originalPositions[i];
        
        // Create a heart-like shape by using a parametric equation
        const distance = Math.sqrt(basePosition.x * basePosition.x + basePosition.y * basePosition.y);
        
        if (distance < 200) {
            // For points close to center, create a more defined shape
            const t = Math.random() * Math.PI * 2;
            const r = 150 * (1 - Math.cos(t)) * Math.random();
            
            originalPositions[i] = {
                x: r * Math.cos(t),
                y: r * Math.sin(t) * 0.8,
                z: basePosition.z * 0.5
            };
        } else {
            // Keep outer points with small adjustments
            originalPositions[i] = {
                x: basePosition.x,
                y: basePosition.y,
                z: basePosition.z
            };
        }
        
        // Update position in geometry
        positions[i3] = originalPositions[i].x;
        positions[i3 + 1] = originalPositions[i].y;
        positions[i3 + 2] = originalPositions[i].z;
    }
    
    // Update geometry
    pointCloud.geometry.attributes.position.needsUpdate = true;
    
    // About page-specific animations
    pointCloud.userData.gentleMovement = true;
}

// Enhanced animate function with page-specific effects
function enhancedAnimate() {
    requestAnimationFrame(enhancedAnimate);
    
    // Standard rotation
    if (pointCloud) {
        // Base rotation
        pointCloud.rotation.y += pointCloud.userData.rotationSpeed || 0.001;
        
        // Page-specific animation effects
        if (pointCloud.userData.waveEffect) {
            // Wave effect for creative design page
            const positions = pointCloud.geometry.attributes.position.array;
            const time = Date.now() * 0.001;
            
            for (let i = 0; i < originalPositions.length; i++) {
                const i3 = i * 3;
                const basePosition = originalPositions[i];
                
                positions[i3 + 1] = basePosition.y + Math.sin(time + basePosition.x * 0.01) * 10;
            }
            
            pointCloud.geometry.attributes.position.needsUpdate = true;
        }
        
        if (pointCloud.userData.pulseEffect) {
            // Pulse effect for visual experience page
            const time = Date.now() * 0.001;
            pointCloud.material.size = 3 + Math.sin(time * 2) * 1;
        }
        
        if (pointCloud.userData.techEffect) {
            // Tech effect with grid movement
            const positions = pointCloud.geometry.attributes.position.array;
            const time = Date.now() * 0.0005;
            
            for (let i = 0; i < originalPositions.length; i++) {
                const i3 = i * 3;
                const basePosition = originalPositions[i];
                
                // Digital wave effect
                if (i % 3 === 0) {
                    positions[i3] = basePosition.x + Math.sin(time + i * 0.01) * 5;
                    positions[i3 + 2] = basePosition.z + Math.cos(time + i * 0.01) * 5;
                }
            }
            
            pointCloud.geometry.attributes.position.needsUpdate = true;
        }
        
        if (pointCloud.userData.apertureSpin) {
            // Aperture spin for photography page
            pointCloud.rotation.z += 0.0005;
            
            const time = Date.now() * 0.001;
            const scale = 0.9 + Math.sin(time) * 0.1;
            pointCloud.scale.set(scale, scale, 1);
        }
        
        if (pointCloud.userData.gentleMovement) {
            // Gentle floating movement for about page
            const positions = pointCloud.geometry.attributes.position.array;
            const time = Date.now() * 0.0005;
            
            for (let i = 0; i < originalPositions.length; i++) {
                const i3 = i * 3;
                const basePosition = originalPositions[i];
                
                // Gentle breathing motion
                if (i % 5 === 0) {
                    const factor = 1 + Math.sin(time + i * 0.01) * 0.05;
                    positions[i3] = basePosition.x * factor;
                    positions[i3 + 1] = basePosition.y * factor;
                }
            }
            
            pointCloud.geometry.attributes.position.needsUpdate = true;
        }
    }
    
    // Camera movement based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Detect which page we're on and apply the specific effect
document.addEventListener('DOMContentLoaded', function() {
    // Get page name from URL
    const path = window.location.pathname;
    let pageName = '';
    
    if (path.includes('creative-design')) {
        pageName = 'creative-design';
    } else if (path.includes('visual-experience')) {
        pageName = 'visual-experience';
    } else if (path.includes('creative-tech')) {
        pageName = 'creative-tech';
    } else if (path.includes('photography')) {
        pageName = 'photography';
    } else if (path.includes('about')) {
        pageName = 'about';
    }
    
    // Wait for Three.js to initialize
    const checkInterval = setInterval(function() {
        if (typeof pointCloud !== 'undefined' && pointCloud) {
            // Override the animation function
            window.animate = enhancedAnimate;
            
            // Apply page-specific effects
            initPageSpecificEffects(pageName);
            
            clearInterval(checkInterval);
        }
    }, 100);
});