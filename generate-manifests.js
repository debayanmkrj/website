// Node.js script to generate manifest.json files for all project folders
const fs = require('fs');
const path = require('path');

const sections = [
  { name: 'Working LLMs', path: 'content/Working LLMs' },
  { name: 'Visual Experience', path: 'content/Visual Experience' },
  { name: 'Creative Design', path: 'content/Creative Design' }
];

function generateManifest(projectPath) {
  const manifest = {
    images: [],
    videos: [],
    pdfs: [],
    audio: []
  };

  if (!fs.existsSync(projectPath)) {
    console.log(`Skipping ${projectPath} - doesn't exist`);
    return null;
  }

  const files = fs.readdirSync(projectPath);

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const fileName = path.basename(file);

    // Skip cover images and manifest files
    if (fileName === 'cover.jpg' || fileName === 'cover.png' || fileName === 'cover.jpeg' || fileName === 'manifest.json') {
      return;
    }

    // Images
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      manifest.images.push(fileName);
    }
    // Videos
    else if (['.mp4', '.webm', '.mov'].includes(ext)) {
      manifest.videos.push(fileName);
    }
    // PDFs
    else if (ext === '.pdf') {
      manifest.pdfs.push(fileName);
    }
    // Audio
    else if (['.mp3', '.wav', '.ogg'].includes(ext)) {
      manifest.audio.push(fileName);
    }
  });

  // Sort images by number if they follow numbered pattern
  manifest.images.sort((a, b) => {
    const numA = parseInt(a.match(/^(\d+)/)?.[1] || '999');
    const numB = parseInt(b.match(/^(\d+)/)?.[1] || '999');
    return numA - numB;
  });

  return manifest;
}

// Generate manifests for all project folders
sections.forEach(section => {
  console.log(`\nProcessing section: ${section.name}`);

  if (!fs.existsSync(section.path)) {
    console.log(`Section path doesn't exist: ${section.path}`);
    return;
  }

  const projects = fs.readdirSync(section.path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  projects.forEach(project => {
    const projectPath = path.join(section.path, project);
    const manifest = generateManifest(projectPath);

    if (manifest) {
      const manifestPath = path.join(projectPath, 'manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`✓ Created manifest for ${project}: ${manifest.images.length} images, ${manifest.videos.length} videos, ${manifest.pdfs.length} PDFs, ${manifest.audio.length} audio`);
    }
  });
});

// Generate photography manifest (special case - no subfolders)
console.log('\nProcessing Photography section');
const photoPath = 'content/Photography';
if (fs.existsSync(photoPath)) {
  const photoManifest = { images: [], videos: [], pdfs: [], audio: [] };

  const files = fs.readdirSync(photoPath);
  files.forEach(file => {
    if (file.match(/Portfolio_debayan\.\d{3}\.jpeg/)) {
      photoManifest.images.push(file);
    }
  });

  photoManifest.images.sort();

  const manifestPath = path.join(photoPath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(photoManifest, null, 2));
  console.log(`✓ Created photography manifest: ${photoManifest.images.length} images`);
}

console.log('\n✓ All manifests generated successfully!');
