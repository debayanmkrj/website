// Projects data for all sections
const projectsData = {
  llms: [
    { name: 'Prisma', title: 'PRISMA', description: 'Prisma is an interactive webcam installation that transforms viewers video feed in real time, displaying themselves across three distinct temporal perspective using machine learning and creative coding.', coverImage: 'content/Working LLMs/Prisma/cover.jpg', github: 'https://github.com/debayanmkrj/Prisma' },
    { name: 'Morodd', title: 'MORODD', description: 'Morodd is a machine learning based interactive project using neural networks to imagine the space within viewers in point cloud systems and sonic embeddings.', coverImage: 'content/Working LLMs/Morodd/cover.jpg', github: 'https://github.com/debayanmkrj/Morodd' },
    { name: 'Imagebot', title: 'IMAGEBOT', description: 'A natural language processing assistant for image editing and generative art. The playform offers a glimpse into how photoshop with co-pilot could feel like.', coverImage: 'content/Working LLMs/Imagebot/cover.jpg', github: 'https://github.com/debayanmkrj/Imagebot' },
    { name: 'Fashion_Trend', title: 'FASHION TREND PREDICTION', description: 'Using VJEPA Model to analyse video for fashion trend forecasting.', coverImage: 'content/Working LLMs/Fashion_Trend/cover.jpg', github: 'https://github.com/debayanmkrj/Fashion_trend_prediction_VJEPA' },
    { name: 'Echo_Halt', title: 'ECHO HALT', description: 'Imagining an AI powered social media platform that doesnt allow duplication of content.', coverImage: 'content/Working LLMs/Echo_Halt/cover.jpg', github: 'https://github.com/debayanmkrj/Echo-Halt' },
    { name: 'Diffusion_test', title: 'DIFFUSION TEST', description: 'Experimenting with architecture of diffusion models to improve output accuracy and Virtual try-on for garment experimentations.', coverImage: 'content/Working LLMs/Diffusion_test/cover.jpg' },
    { name: 'Alt_dj', title: 'ALT DJ', description: 'A Machine Learning project that predicts a DJ\'s interaction with the equipment and replicates it for style transfer video feed.', coverImage: 'content/Working LLMs/Alt_dj/cover.jpg', github: 'https://github.com/debayanmkrj/Alt-Dj' },
    { name: 'Ads', title: 'ADAPTIVE ADS', description: 'Dynamic advertisement generation using adaptive algorithms and SAM3 model.', coverImage: 'content/Working LLMs/Ads/cover.jpg', github: 'https://github.com/debayanmkrj/Adaptive_ads' }
  ],
  creative: [
    { name: 'Warrior_Duel', title: 'WARRIOR DUEL', description: 'Warrior Duel is a side-scrolling combat game developed in Swift using SpriteKit. Players select from three character classes (Fighter, Samurai, or Shinobi) and battle through increasingly difficult vampire enemies across three unique castle environments.', coverImage: 'content/Visual Experience/Warrior_Duel/cover.jpg', github: 'https://github.com/debayanmkrj/Warrior-Duel' },
    { name: 'Usdz', title: 'USDZ AR EXPERIENCES', description: '3D augmented reality content creation for mobile platforms.', coverImage: 'content/Visual Experience/Usdz/cover.jpg' },
    { name: 'SnipeZone', title: 'SNIPEZONE', description: 'Unity FPS Game that combines game play with intelligent Enemy AI and facetracking to control player.', coverImage: 'content/Visual Experience/SnipeZone/cover.jpg', github: 'https://github.com/debayanmkrj/Snipezone' },
    { name: 'Reverse_Mirror', title: 'REVERSE MIRROR', description: 'Interaction design based on user persona and generative art.', coverImage: 'content/Visual Experience/Reverse_Mirror/cover.jpg' },
    { name: 'Interactive_Media_2', title: 'INTERACTIVE MEDIA II', description: 'The Max/MSP patch processes real-time gyroscopic input (pitch, roll, and yaw data) from a smartphone, which users manipulate to control RGB color channels on a monochrome source image. The system employs sophisticated data smoothing algorithms using mathematical modules and ranger objects to filter noise and scale the gyroscopic movements to precise RGB multiplier values (0-8 range) within the MUTIL8R module. The color matching system utilizes Jit matrix objects to extract RGB channel mean values from both the user-controlled image and a randomly generated source image processed through the Kaleidr module. A threshold-based comparison algorithm evaluates color accuracy across all three channels, triggering audio feedback when successful matches occur. This gamified approach makes color vision testing engaging for children, as they use natural phone movements to recreate target colors while receiving immediate auditory confirmation of their progress. This innovative approach transforms traditional color blindness screening into an interactive experience that can identify color perception deficiencies in young patients who might struggle with conventional testing methods.', coverImage: 'content/Visual Experience/Interactive_Media_2/cover.jpg' },
    { name: 'Interactive_Media', title: 'INTERACTIVE MEDIA I', description: 'The Max/MSP patches demonstrates a hand tracking system that captures finger positions and gestures in real-time. The first patch shows the core hand detection module (jit.fill #0hand) processing skeletal data through matrix operations, converting raw hand coordinates into usable control parameters for the racing game. The project uses a pre-trained hand tracking model using Wekinator. The hand tracking gestures are illustrated in the images below. The intent of using both hands to control the car is to allow the user to use both hands to control the car was to provide an easy and intuitive way to control the car.', coverImage: 'content/Visual Experience/Interactive_Media/cover.jpg' },
    { name: 'Groove_it', title: 'GROOVE IT', description: 'An immersive music player iOS app developed with Swift, RealityKit, AR Kit that combines audio playback with real time 3D experience.', coverImage: 'content/Visual Experience/Groove_it/cover.jpg', github: 'https://github.com/debayanmkrj/GROO-V-IT' }
  ],
  visual: [
    { name: 'The_core_principle', title: 'THE CORE PRINCIPLE', description: 'Exploring fundamental design principles in digital experiences.', coverImage: 'content/Creative Design/The_core_principle/cover.jpg' },
    { name: 'Process_improvements', title: 'PROCESS IMPROVEMENTS', description: 'Workflow optimization through creative technology solutions.', coverImage: 'content/Creative Design/Process_improvements/cover.jpg' },
    { name: 'Gan', title: 'GAN EXPLORATIONS', description: 'Generative Adversarial Network experiments in visual style transfer and creation.', coverImage: 'content/Creative Design/Gan/cover.jpg' },
    { name: 'Designing_for_consumers', title: 'DESIGNING FOR CONSUMERS', description: 'User-centered design methodologies for consumer products.', coverImage: 'content/Creative Design/Designing_for_consumers/cover.jpg' },
    { name: 'Content_Repurpose', title: 'CONTENT REPURPOSE', description: 'Strategic content transformation across multiple platforms and formats.', coverImage: 'content/Creative Design/Content_Repurpose/cover.jpg' }
  ],
  photography: [] // Will be populated dynamically
};

// Carousel state management
const carouselStates = {
  llms: { currentIndex: 0, projectContent: {} },
  creative: { currentIndex: 0, projectContent: {} },
  visual: { currentIndex: 0, projectContent: {} },
  photography: { currentIndex: 0, projectContent: {} }
};

// Utility function to check if a file exists
async function fileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Dynamically load all content from a project folder
async function loadProjectContent(section, project) {
  const basePaths = {
    llms: 'content/Working LLMs',
    creative: 'content/Visual Experience',
    visual: 'content/Creative Design',
    photography: 'content/Photography'
  };

  const content = {
    images: [],
    videos: [],
    pdfs: [],
    audio: []
  };

  // Special handling for photography section (no subfolders)
  if (section === 'photography') {
    const basePath = `${basePaths[section]}/`;
    // Load Portfolio_debayan.XXX.jpeg files
    for (let i = 1; i <= 50; i++) {
      const num = String(i).padStart(3, '0');
      const jpegUrl = `${basePath}Portfolio_debayan.${num}.jpeg`;
      if (await fileExists(jpegUrl)) {
        content.images.push(jpegUrl);
      } else {
        break;
      }
    }
    return content;
  }

  const basePath = `${basePaths[section]}/${project.name}/`;

  // Probe for numbered images (1.jpg, 2.jpg, etc.)
  for (let i = 1; i <= 30; i++) {
    const jpgUrl = `${basePath}${i}.jpg`;
    const jpegUrl = `${basePath}${i}.jpeg`;
    const pngUrl = `${basePath}${i}.png`;

    if (await fileExists(jpgUrl)) {
      content.images.push(jpgUrl);
    } else if (await fileExists(jpegUrl)) {
      content.images.push(jpegUrl);
    } else if (await fileExists(pngUrl)) {
      content.images.push(pngUrl);
    } else {
      break;
    }
  }

  // Probe for videos (media1.mp4, media2.mp4, etc. and video1.mp4, video2.mp4, etc.)
  for (let i = 1; i <= 10; i++) {
    const mediaUrl = `${basePath}media${i}.mp4`;
    const videoUrl = `${basePath}video${i}.mp4`;

    if (await fileExists(mediaUrl)) {
      content.videos.push(mediaUrl);
    }
    if (await fileExists(videoUrl)) {
      content.videos.push(videoUrl);
    }
  }

  // Check for PDFs
  const pdfPatterns = [
    `${project.name.toLowerCase()}.pdf`,
    'document.pdf',
    'paper.pdf',
    'presentation.pdf'
  ];

  for (const pdfName of pdfPatterns) {
    const pdfUrl = `${basePath}${pdfName}`;
    if (await fileExists(pdfUrl)) {
      content.pdfs.push(pdfUrl);
    }
  }

  // Check for audio files
  for (let i = 1; i <= 10; i++) {
    const mp3Url = `${basePath}audio${i}.mp3`;
    const wavUrl = `${basePath}sound${i}.wav`;

    if (await fileExists(mp3Url)) {
      content.audio.push(mp3Url);
    }
    if (await fileExists(wavUrl)) {
      content.audio.push(wavUrl);
    }
  }

  return content;
}

// Setup carousel for a section
function setupCarousel(section) {
  const projects = projectsData[section];
  const carousel = document.getElementById(`carousel-${section}`);
  const counter = document.getElementById(`counter-${section}`);
  const state = carouselStates[section];

  if (!carousel || !counter) return;

  carousel.innerHTML = '';

  const leftIndex = (state.currentIndex - 1 + projects.length) % projects.length;
  const rightIndex = (state.currentIndex + 1) % projects.length;

  createCarouselItem(section, leftIndex, 'left');
  createCarouselItem(section, state.currentIndex, 'center');
  createCarouselItem(section, rightIndex, 'right');

  counter.textContent = `${state.currentIndex + 1} OF ${projects.length}`;
}

// Create a single carousel item
function createCarouselItem(section, index, position) {
  const projects = projectsData[section];
  const project = projects[index];
  const carousel = document.getElementById(`carousel-${section}`);

  const item = document.createElement('div');
  item.className = `carousel-item ${position}`;

  // Special handling for photography section - no title/description overlay
  if (section === 'photography') {
    item.innerHTML = `
      <div class="carousel-image-container">
        <img src="${project.coverImage}" alt="Photography ${index + 1}" class="carousel-image" style="object-fit: contain;">
      </div>
    `;

    item.addEventListener('click', function() {
      if (position === 'center') {
        // Open fullscreen without navigation (single image only)
        openFullImage(project.coverImage, [project.coverImage], 0);
      } else {
        carouselStates[section].currentIndex = index;
        setupCarousel(section);
      }
    });
  } else {
    item.innerHTML = `
      <div class="carousel-image-container">
        <img src="${project.coverImage}" alt="${project.title}" class="carousel-image">
        <div class="project-info">
          <div class="project-title">${project.title}</div>
          <div class="project-description">${project.description}</div>
        </div>
      </div>
    `;

    item.addEventListener('click', function() {
      if (position === 'center') {
        openProjectOverlay(section, index);
      } else {
        carouselStates[section].currentIndex = index;
        setupCarousel(section);
      }
    });
  }

  carousel.appendChild(item);
}

// Navigate carousel
function navigateCarousel(section, direction) {
  const projects = projectsData[section];
  const state = carouselStates[section];

  // Disable buttons temporarily
  const buttons = document.querySelectorAll(`[data-section="${section}"]`);
  buttons.forEach(btn => btn.disabled = true);

  if (direction === 'prev') {
    state.currentIndex = (state.currentIndex - 1 + projects.length) % projects.length;
  } else {
    state.currentIndex = (state.currentIndex + 1) % projects.length;
  }

  setupCarousel(section);

  setTimeout(() => {
    buttons.forEach(btn => btn.disabled = false);
  }, 600);
}

// Open project overlay with all content
async function openProjectOverlay(section, index) {
  const projects = projectsData[section];
  const project = projects[index];
  const state = carouselStates[section];

  // Create overlay if it doesn't exist
  let overlay = document.getElementById(`overlay-${section}-${index}`);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = `overlay-${section}-${index}`;
    overlay.className = 'project-overlay';
    overlay.innerHTML = `
      <div class="project-detail">
        <div class="overlay-header">
          <h2>${project.title}</h2>
          <button class="close-btn" onclick="closeProjectOverlay('${section}', ${index})">&times;</button>
        </div>
        <div class="overlay-content">
          <p>${project.description}</p>
          <div class="gallery-container" id="gallery-${section}-${index}"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on click outside
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeProjectOverlay(section, index);
      }
    });
  }

  const gallery = document.getElementById(`gallery-${section}-${index}`);

  // Load content if not cached
  if (!state.projectContent[project.name]) {
    state.projectContent[project.name] = await loadProjectContent(section, project);
  }

  const content = state.projectContent[project.name];

  // Clear and populate gallery
  gallery.innerHTML = '';
  gallery.style.display = 'block'; // Ensure parent is block layout, not grid

  // Create images grid container - FIRST
  if (content.images.length > 0) {
    const imagesGrid = document.createElement('div');
    imagesGrid.style.display = 'grid';
    imagesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    imagesGrid.style.gap = '1.5rem';
    imagesGrid.style.marginBottom = '3rem';
    imagesGrid.style.width = '100%';

    content.images.forEach((imgUrl, i) => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'gallery-item';
      imgDiv.innerHTML = `<img src="${imgUrl}" alt="${project.title} ${i + 1}">`;
      imgDiv.onclick = () => openFullImage(imgUrl, content.images, i);
      imagesGrid.appendChild(imgDiv);
    });
    gallery.appendChild(imagesGrid);
  }

  // Add PDFs section - SEPARATE full-width section below images
  if (content.pdfs.length > 0) {
    const pdfSection = document.createElement('div');
    pdfSection.style.width = '100%';
    pdfSection.style.marginTop = '2rem';
    pdfSection.style.marginBottom = '3rem';

    const pdfTitle = document.createElement('h3');
    pdfTitle.className = 'gallery-section-title';
    pdfTitle.textContent = 'Documents';
    pdfSection.appendChild(pdfTitle);

    const pdfContainer = document.createElement('div');
    pdfContainer.style.display = 'flex';
    pdfContainer.style.flexDirection = 'column';
    pdfContainer.style.gap = '1rem';
    pdfContainer.style.width = '100%';

    content.pdfs.forEach((pdfUrl, i) => {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.className = 'pdf-link';
      link.textContent = `VIEW PDF ${i + 1}`;
      pdfContainer.appendChild(link);
    });
    pdfSection.appendChild(pdfContainer);
    gallery.appendChild(pdfSection);
  }

  // Add videos section - SEPARATE full-width section below documents
  if (content.videos.length > 0) {
    const videoSection = document.createElement('div');
    videoSection.style.width = '100%';
    videoSection.style.marginTop = '2rem';
    videoSection.style.marginBottom = '3rem';

    const videoTitle = document.createElement('h3');
    videoTitle.className = 'gallery-section-title';
    videoTitle.textContent = 'Videos';
    videoSection.appendChild(videoTitle);

    content.videos.forEach(videoUrl => {
      const videoDiv = document.createElement('div');
      videoDiv.className = 'video-container';
      videoDiv.style.width = '100%';
      videoDiv.style.marginBottom = '1.5rem';
      videoDiv.innerHTML = `
        <video controls style="width: 100%; max-width: 100%;">
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
      videoSection.appendChild(videoDiv);
    });
    gallery.appendChild(videoSection);
  }

  // Add audio section - SEPARATE full-width section below videos
  if (content.audio.length > 0) {
    const audioSection = document.createElement('div');
    audioSection.style.width = '100%';
    audioSection.style.marginTop = '2rem';
    audioSection.style.marginBottom = '2rem';

    const audioTitle = document.createElement('h3');
    audioTitle.className = 'gallery-section-title';
    audioTitle.textContent = 'Audio';
    audioSection.appendChild(audioTitle);

    content.audio.forEach(audioUrl => {
      const audioDiv = document.createElement('div');
      audioDiv.className = 'audio-container';
      audioDiv.style.width = '100%';
      audioDiv.style.marginBottom = '1rem';
      audioDiv.innerHTML = `
        <audio controls style="width: 100%; max-width: 600px;">
          <source src="${audioUrl}">
          Your browser does not support the audio element.
        </audio>
      `;
      audioSection.appendChild(audioDiv);
    });
    gallery.appendChild(audioSection);
  }

  // Add GitHub link section - if project has GitHub URL
  if (project.github) {
    const githubSection = document.createElement('div');
    githubSection.style.width = '100%';
    githubSection.style.marginTop = '2rem';
    githubSection.style.marginBottom = '2rem';

    const githubTitle = document.createElement('h3');
    githubTitle.className = 'gallery-section-title';
    githubTitle.textContent = 'GitHub Repository';
    githubSection.appendChild(githubTitle);

    const githubLink = document.createElement('a');
    githubLink.href = project.github;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'pdf-link';
    githubLink.textContent = 'VIEW ON GITHUB';
    githubLink.style.display = 'inline-block';
    githubSection.appendChild(githubLink);
    gallery.appendChild(githubSection);
  }

  overlay.classList.add('active');
}

// Close project overlay
function closeProjectOverlay(section, index) {
  const overlay = document.getElementById(`overlay-${section}-${index}`);
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Full-size image viewer with navigation
let currentImageGallery = [];
let currentImageIndex = 0;

function openFullImage(imageUrl, imagesArray = [imageUrl], startIndex = 0) {
  currentImageGallery = imagesArray;
  currentImageIndex = startIndex;

  const fullsizeOverlay = document.getElementById('fullsize-overlay');
  const fullsizeImage = document.getElementById('fullsize-image');
  const prevBtn = document.getElementById('fullsize-prev');
  const nextBtn = document.getElementById('fullsize-next');

  fullsizeImage.src = currentImageGallery[currentImageIndex];
  fullsizeOverlay.classList.add('active');

  // Show/hide navigation buttons based on gallery size
  if (currentImageGallery.length > 1) {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    updateNavigationButtons();
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

function closeFullImage() {
  const fullsizeOverlay = document.getElementById('fullsize-overlay');
  const fullsizeImage = document.getElementById('fullsize-image');
  fullsizeOverlay.classList.remove('active');
  fullsizeImage.src = '';
  currentImageGallery = [];
  currentImageIndex = 0;
}

function navigateFullImage(direction) {
  if (direction === 'prev') {
    currentImageIndex = (currentImageIndex - 1 + currentImageGallery.length) % currentImageGallery.length;
  } else {
    currentImageIndex = (currentImageIndex + 1) % currentImageGallery.length;
  }

  const fullsizeImage = document.getElementById('fullsize-image');
  fullsizeImage.src = currentImageGallery[currentImageIndex];
  updateNavigationButtons();
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('fullsize-prev');
  const nextBtn = document.getElementById('fullsize-next');

  // Update button states (could disable at edges if you want linear navigation)
  // For now, we'll keep circular navigation
  prevBtn.disabled = false;
  nextBtn.disabled = false;
}

// Load photography images dynamically
async function loadPhotographyImages() {
  const basePath = 'content/Photography/';
  const photographyArray = [];

  for (let i = 1; i <= 50; i++) {
    const num = String(i).padStart(3, '0');
    const jpegUrl = `${basePath}Portfolio_debayan.${num}.jpeg`;
    if (await fileExists(jpegUrl)) {
      photographyArray.push({
        name: `photo_${num}`,
        title: `Photo ${i}`,
        description: '',
        coverImage: jpegUrl
      });
    } else {
      break;
    }
  }

  projectsData.photography = photographyArray;

  // Update counter
  const counter = document.getElementById('counter-photography');
  if (counter && photographyArray.length > 0) {
    counter.textContent = `1 OF ${photographyArray.length}`;
  }
}

// Initialize all carousels on page load
async function initializeProjects() {
  // Load photography images first
  await loadPhotographyImages();

  // Setup all carousels
  Object.keys(projectsData).forEach(section => {
    setupCarousel(section);
  });

  // Setup carousel navigation buttons
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      const action = this.getAttribute('data-action');
      navigateCarousel(section, action);
    });
  });

  // Setup fullsize overlay close on click
  const fullsizeOverlay = document.getElementById('fullsize-overlay');
  if (fullsizeOverlay) {
    fullsizeOverlay.addEventListener('click', function(e) {
      if (e.target === fullsizeOverlay) {
        closeFullImage();
      }
    });
  }

  // Add keyboard navigation for full-screen images
  document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('fullsize-overlay');
    if (overlay && overlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        navigateFullImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateFullImage('next');
      } else if (e.key === 'Escape') {
        closeFullImage();
      }
    }
  });
}

// Make functions globally accessible
window.closeProjectOverlay = closeProjectOverlay;
window.openFullImage = openFullImage;
window.closeFullImage = closeFullImage;
window.navigateFullImage = navigateFullImage;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
  initializeProjects();
}
