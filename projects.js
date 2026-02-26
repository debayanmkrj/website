// Projects data for all sections
const projectsData = {
  llms: [
    { name: 'Cinematic', title: 'CINEMATIC', description: 'Generative AI driven cinematic video content creation.', coverVideo: 'content/Gen-AI/Cinematic/media1.mp4', images: ['content/Gen-AI/Cinematic/Portfolio_debayan.01.jpeg', 'content/Gen-AI/Cinematic/Portfolio_debayan.02.jpeg'] },
    { name: 'Ecommerce', title: 'ECOMMERCE', description: 'AI powered ecommerce visual content generation.', coverVideo: 'content/Gen-AI/Ecommerce/media1.mp4', images: ['content/Gen-AI/Ecommerce/Portfolio_debayan.001.jpeg', 'content/Gen-AI/Ecommerce/Portfolio_debayan.002.jpeg'] },
    { name: 'Fashion_video', title: 'EDITORIAL', description: 'Generative AI fashion video production and styling.', coverVideo: 'content/Gen-AI/Fashion_video/media1.mp4', images: ['content/Gen-AI/Fashion_video/Portfolio_debayan.001.jpeg', 'content/Gen-AI/Fashion_video/Portfolio_debayan.002.jpeg'] },
    { name: 'Home', title: 'HOME', description: 'AI generated home and interior design visualizations.', coverVideo: 'content/Gen-AI/Home/media1.mp4', images: ['content/Gen-AI/Home/port_1.jpeg', 'content/Gen-AI/Home/port_2.jpeg'] },
    { name: 'Imaginative', title: 'IMAGINATIVE', description: 'Experimental generative AI art and creative explorations.', coverVideo: 'content/Gen-AI/Imaginative/media1.mp4', images: ['content/Gen-AI/Imaginative/Portfolio_debayan.01.jpeg', 'content/Gen-AI/Imaginative/Portfolio_debayan.02.jpeg'] }
  ],
  creative: [
    {
      name: 'Prisma', title: 'PRISMA', coverImage: 'content/Working LLMs/Prisma/cover.jpg', github: 'https://github.com/debayanmkrj/Prisma',
      newMedia: ['content/Working LLMs/Prisma/new_media/Media1.mp4']
    },
    {
      name: 'Morodd', title: 'MORODD', coverImage: 'content/Working LLMs/Morodd/cover.jpg', github: 'https://github.com/debayanmkrj/Morodd',
      newMedia: ['content/Working LLMs/Morodd/new_media/media1.mp4', 'content/Working LLMs/Morodd/new_media/media2.mp4']
    },
    {
      name: 'Imagebot', title: 'IMAGEBOT', coverImage: 'content/Working LLMs/Imagebot/cover.jpg', github: 'https://github.com/debayanmkrj/Imagebot',
      newMedia: ['content/Working LLMs/Imagebot/new_media/media1.mp4']
    },
    {
      name: 'Fashion_Trend', title: 'FASHION TREND PREDICTION', coverImage: 'content/Working LLMs/Fashion_Trend/cover.jpg', github: 'https://github.com/debayanmkrj/Fashion_trend_prediction_VJEPA',
      newMedia: ['content/Working LLMs/Fashion_Trend/new_media/28.jpg', 'content/Working LLMs/Fashion_Trend/new_media/29.jpg', 'content/Working LLMs/Fashion_Trend/new_media/30.jpg']
    },
    {
      name: 'Echo_Halt', title: 'ECHO HALT', coverImage: 'content/Working LLMs/Echo_Halt/cover.jpg', github: 'https://github.com/debayanmkrj/Echo-Halt',
      newMedia: ['content/Working LLMs/Echo_Halt/new_media/6.jpg']
    },
    {
      name: 'Diffusion_test', title: 'DIFFUSION TEST', coverImage: 'content/Working LLMs/Diffusion_test/cover.jpg',
      newMedia: ['content/Working LLMs/Diffusion_test/new_media/5.jpg', 'content/Working LLMs/Diffusion_test/new_media/7.jpg', 'content/Working LLMs/Diffusion_test/new_media/9.jpg', 'content/Working LLMs/Diffusion_test/new_media/16.jpg']
    },
    {
      name: 'Alt_dj', title: 'ALT DJ', coverImage: 'content/Working LLMs/Alt_dj/cover.jpg', github: 'https://github.com/debayanmkrj/Alt-Dj',
      newMedia: ['content/Working LLMs/Alt_dj/new_media/media1.mp4']
    },
    {
      name: 'Ads', title: 'ADAPTIVE ADS', coverImage: 'content/Working LLMs/Ads/cover.jpg', github: 'https://github.com/debayanmkrj/Adaptive_ads',
      newMedia: ['content/Working LLMs/Ads/new_media/media1.mp4']
    }
  ],
  visual: [
    { name: 'Warrior_Duel', title: 'WARRIOR DUEL', description: 'Warrior Duel is a side-scrolling combat game developed in Swift using SpriteKit. Players select from three character classes (Fighter, Samurai, or Shinobi) and battle through increasingly difficult vampire enemies across three unique castle environments.', coverImage: 'content/Visual Experience/Warrior_Duel/cover.jpg', github: 'https://github.com/debayanmkrj/Warrior-Duel', newMedia: ['content/Visual Experience/Warrior_Duel/new_media/Media1.mp4'] },
    { name: 'Usdz', title: 'USDZ AR EXPERIENCES', description: '3D augmented reality content creation for mobile platforms.', coverImage: 'content/Visual Experience/Usdz/cover.jpg', newMedia: ['content/Visual Experience/Usdz/new_media/3.jpg'] },
    { name: 'SnipeZone', title: 'SNIPEZONE', description: 'Unity FPS Game that combines game play with intelligent Enemy AI and facetracking to control player.', coverImage: 'content/Visual Experience/SnipeZone/cover.jpg', github: 'https://github.com/debayanmkrj/Snipezone', newMedia: ['content/Visual Experience/SnipeZone/new_media/media1.mp4', 'content/Visual Experience/SnipeZone/new_media/media2.mp4', 'content/Visual Experience/SnipeZone/new_media/media3.mp4', 'content/Visual Experience/SnipeZone/new_media/media4.mp4'] },
    { name: 'Reverse_Mirror', title: 'REVERSE MIRROR', description: 'Interaction design based on user persona and generative art.', coverImage: 'content/Visual Experience/Reverse_Mirror/cover.jpg', newMedia: ['content/Visual Experience/Reverse_Mirror/new_media/media1.mp4', 'content/Visual Experience/Reverse_Mirror/new_media/media2.mp4', 'content/Visual Experience/Reverse_Mirror/new_media/media3.mp4', 'content/Visual Experience/Reverse_Mirror/new_media/media4.mp4'] },
    { name: 'Interactive_Media_2', title: 'INTERACTIVE MEDIA II', description: 'The Max/MSP patch processes real-time gyroscopic input (pitch, roll, and yaw data) from a smartphone, which users manipulate to control RGB color channels on a monochrome source image. The system employs sophisticated data smoothing algorithms using mathematical modules and ranger objects to filter noise and scale the gyroscopic movements to precise RGB multiplier values (0-8 range) within the MUTIL8R module. The color matching system utilizes Jit matrix objects to extract RGB channel mean values from both the user-controlled image and a randomly generated source image processed through the Kaleidr module. A threshold-based comparison algorithm evaluates color accuracy across all three channels, triggering audio feedback when successful matches occur. This gamified approach makes color vision testing engaging for children, as they use natural phone movements to recreate target colors while receiving immediate auditory confirmation of their progress. This innovative approach transforms traditional color blindness screening into an interactive experience that can identify color perception deficiencies in young patients who might struggle with conventional testing methods.', coverImage: 'content/Visual Experience/Interactive_Media_2/cover.jpg', newMedia: ['content/Visual Experience/Interactive_Media_2/new_media/1.jpg', 'content/Visual Experience/Interactive_Media_2/new_media/2.jpg', 'content/Visual Experience/Interactive_Media_2/new_media/3.jpg', 'content/Visual Experience/Interactive_Media_2/new_media/4.jpg', 'content/Visual Experience/Interactive_Media_2/new_media/5.jpg'] },
    { name: 'Interactive_Media', title: 'INTERACTIVE MEDIA I', description: 'The Max/MSP patches demonstrates a hand tracking system that captures finger positions and gestures in real-time. The first patch shows the core hand detection module (jit.fill #0hand) processing skeletal data through matrix operations, converting raw hand coordinates into usable control parameters for the racing game. The project uses a pre-trained hand tracking model using Wekinator. The hand tracking gestures are illustrated in the images below. The intent of using both hands to control the car is to allow the user to use both hands to control the car was to provide an easy and intuitive way to control the car.', coverImage: 'content/Visual Experience/Interactive_Media/cover.jpg', newMedia: ['content/Visual Experience/Interactive_Media/new_media/media1.mp4'] },
    { name: 'Groove_it', title: 'GROOVE IT', description: 'An immersive music player iOS app developed with Swift, RealityKit, AR Kit that combines audio playback with real time 3D experience.', coverImage: 'content/Visual Experience/Groove_it/cover.jpg', github: 'https://github.com/debayanmkrj/GROO-V-IT', newMedia: ['content/Visual Experience/Groove_it/new_media/media1.mp4', 'content/Visual Experience/Groove_it/new_media/media2.mp4'] },
    { name: 'Gan', title: 'GAN EXPLORATIONS', description: 'Generative Adversarial Network experiments in visual style transfer and creation.', coverImage: 'content/Visual Experience/Gan/cover.jpg', newMedia: ['content/Visual Experience/Gan/new_media/2.jpg', 'content/Visual Experience/Gan/new_media/3.jpg'] },
    { name: 'Designing_for_consumers', title: 'DESIGNING FOR CONSUMERS', description: 'User-centered design methodologies for consumer products.', coverImage: 'content/Visual Experience/Designing_for_consumers/cover.jpg', newMedia: ['content/Visual Experience/Designing_for_consumers/new_media/6.jpg', 'content/Visual Experience/Designing_for_consumers/new_media/7.jpg'] }
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

// Load project content from manifest.json
async function loadProjectContent(section, project) {
  const basePaths = {
    llms: 'content/Gen-AI',
    creative: 'content/Working LLMs',
    visual: 'content/Visual Experience',
    photography: 'content/Photography'
  };

  const content = {
    images: [],
    videos: [],
    pdfs: [],
    audio: []
  };

  try {
    // Special handling for photography section (no subfolders)
    if (section === 'photography') {
      const manifestUrl = `${basePaths[section]}/manifest.json`;
      const response = await fetch(manifestUrl);

      if (!response.ok) {
        console.warn(`Manifest not found for photography section`);
        return content;
      }

      const manifest = await response.json();
      const basePath = `${basePaths[section]}/`;

      // Convert filenames to full URLs
      content.images = manifest.images.map(img => `${basePath}${img}`);
      content.videos = manifest.videos.map(vid => `${basePath}${vid}`);
      content.pdfs = manifest.pdfs.map(pdf => `${basePath}${pdf}`);
      content.audio = manifest.audio.map(aud => `${basePath}${aud}`);

      return content;
    }

    // Load manifest for project
    const basePath = `${basePaths[section]}/${project.name}/`;
    const manifestUrl = `${basePath}manifest.json`;

    const response = await fetch(manifestUrl);

    if (!response.ok) {
      console.warn(`Manifest not found for ${project.name}`);
      return content;
    }

    const manifest = await response.json();

    // Convert filenames to full URLs
    content.images = manifest.images.map(img => `${basePath}${img}`);
    content.videos = manifest.videos.map(vid => `${basePath}${vid}`);
    content.pdfs = manifest.pdfs.map(pdf => `${basePath}${pdf}`);
    content.audio = manifest.audio.map(aud => `${basePath}${aud}`);

    return content;
  } catch (error) {
    console.error(`Error loading manifest for ${project.name || 'photography'}:`, error);
    return content;
  }
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
  if (section === 'photography' && project.coverVideo) {
    item.innerHTML = `
      <div class="carousel-image-container">
      <video src="${project.coverVideo}" muted autoplay loop playsinline class="carousel-image" style="object-fit: cover; width:100%; height:100%;"></video>  
      <img src="${project.coverImage}" alt="Photography ${index + 1}" class="carousel-image" style="object-fit: contain;">
      </div>
    `;

    item.addEventListener('click', function () {
      if (position === 'center') {
        // Open fullscreen without navigation (single image only)
        openFullImage(project.coverImage, [project.coverImage], 0);
      } else {
        carouselStates[section].currentIndex = index;
        setupCarousel(section);
      }
    });
  } else if (section === 'llms' && project.coverVideo) {
    // Gen-AI projects use video as carousel hero
    item.innerHTML = `
      <div class="carousel-image-container">
        <video src="${project.coverVideo}" muted autoplay loop playsinline class="carousel-image" style="object-fit: cover; width:100%; height:100%;"></video>
        <div class="project-info">
          <div class="project-title">${project.title}</div>
          <div class="project-description">${project.description}</div>
        </div>
      </div>
    `;

    item.addEventListener('click', function () {
      if (position === 'center') {
        openGenAIOverlay(index);
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

    item.addEventListener('click', function () {
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
    overlay.addEventListener('click', function (e) {
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

// Open Gen-AI project overlay with video + labeled images
function openGenAIOverlay(index) {
  const project = projectsData.llms[index];

  let overlay = document.getElementById(`overlay-llms-${index}`);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = `overlay-llms-${index}`;
    overlay.className = 'project-overlay';

    const images = project.images || [];
    let imagesHTML = '';
    if (images.length >= 1) {
      imagesHTML += `<h3 class="gallery-section-title">Reference Image</h3>
        <div class="gallery-item" style="max-width:100%; aspect-ratio:auto;"><img src="${images[0]}" alt="Reference Image" style="width:100%; height:auto; object-fit:contain;"></div>`;
    }
    if (images.length >= 2) {
      imagesHTML += `<h3 class="gallery-section-title">Workflow</h3>
        <div class="gallery-item" style="max-width:100%; aspect-ratio:auto;"><img src="${images[1]}" alt="Workflow" style="width:100%; height:auto; object-fit:contain;"></div>`;
    }

    overlay.innerHTML = `
      <div class="project-detail">
        <div class="overlay-header">
          <h2>${project.title}</h2>
          <button class="close-btn" onclick="closeProjectOverlay('llms', ${index})">&times;</button>
        </div>
        <div class="overlay-content">
          <p>${project.description}</p>
          <div class="video-container" style="width:100%; margin-bottom:2rem;">
            <video controls autoplay style="width:100%; max-width:100%;">
              <source src="${project.coverVideo}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          ${imagesHTML}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeProjectOverlay('llms', index);
      }
    });
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

// Load photography images and videos dynamically from manifest
async function loadPhotographyImages() {
  const basePath = 'content/Photography/';
  const photographyArray = [];

  try {
    const manifestUrl = `${basePath}manifest.json`;
    const response = await fetch(manifestUrl);

    if (!response.ok) {
      console.warn('Photography manifest not found');
      return;
    }

    const manifest = await response.json();

    // Create project entries from manifest videos FIRST
    manifest.videos.forEach((filename, i) => {
      photographyArray.push({
        name: `video_${String(i + 1).padStart(3, '0')}`,
        title: `Video ${i + 1}`,
        description: '',
        coverVideo: `${basePath}${filename}`
      });
    });

    // Create project entries from manifest images SECOND
    manifest.images.forEach((filename, i) => {
      photographyArray.push({
        name: `photo_${String(i + 1).padStart(3, '0')}`,
        title: `Photo ${i + 1}`,
        description: '',
        coverImage: `${basePath}${filename}`
      });
    });

    projectsData.photography = photographyArray;

    // Update counter
    const counter = document.getElementById('counter-photography');
    if (counter && photographyArray.length > 0) {
      counter.textContent = `1 OF ${photographyArray.length}`;
    }
  } catch (error) {
    console.error('Error loading photography manifest:', error);
  }
}

// =====================================================
// SHARED MEDIA MOSAIC HELPER
// =====================================================

/**
 * Create a media mosaic that:
 *  - 1 item  → centered, full width
 *  - landscape items → full width, stacked vertically
 *  - portrait items  → two per row (half width each)
 */
function buildMediaMosaic(mediaList, itemClass, mosaicClass) {
  const mosaic = document.createElement('div');
  mosaic.className = mosaicClass;
  // Always 2 columns — landscape items will span both
  mosaic.style.gridTemplateColumns = mediaList.length === 1 ? '1fr' : 'repeat(2, 1fr)';
  mosaic.style.gap = '0.75rem';

  mediaList.forEach(({ src, type, alt }) => {
    const item = document.createElement('div');
    item.className = itemClass;

    if (mediaList.length === 1) {
      // Single item: centered with comfortable max-width
      item.style.gridColumn = '1 / -1';
      item.style.justifySelf = 'center';
      item.style.width = '100%';
      item.style.maxWidth = '720px';
    }

    if (type === 'video') {
      const vid = document.createElement('video');
      vid.src = src;
      vid.controls = true;
      vid.muted = true;
      vid.playsInline = true;

      vid.addEventListener('loadedmetadata', () => {
        if (mediaList.length > 1) {
          const isLandscape = vid.videoWidth >= vid.videoHeight;
          item.style.gridColumn = isLandscape ? '1 / -1' : 'span 1';
        }
      });
      item.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt || '';
      img.loading = 'lazy';

      img.addEventListener('load', () => {
        if (mediaList.length > 1) {
          const isLandscape = img.naturalWidth >= img.naturalHeight;
          item.style.gridColumn = isLandscape ? '1 / -1' : 'span 1';
        }
      });
      item.appendChild(img);
    }

    mosaic.appendChild(item);
  });

  return mosaic;
}

// =====================================================
// ML PROJECTS TILE GRID + OVERLAY
// =====================================================

/**
 * Build the tile grid for the ML (creative) section.
 * Renders one .ml-tile per project into #ml-tiles-grid.
 */
function buildMLTileGrid() {
  const grid = document.getElementById('ml-tiles-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projectsData.creative.forEach((project, index) => {
    const tile = document.createElement('div');
    tile.className = 'ml-tile';
    tile.innerHTML = `
      <img class="ml-tile-cover" src="${project.coverImage}" alt="${project.title}" loading="lazy">
      <div class="ml-tile-heading">${project.title}</div>
    `;
    tile.addEventListener('click', () => openMLProjectOverlay(index));
    grid.appendChild(tile);
  });
}

/**
 * Parse summary.txt content into { summary, techStack, algorithms } sections.
 * Also strips noise lines (single-word lines matching the project folder name).
 */
function parseSummaryText(rawText, projectName) {
  // Noise token: project name lowercased, underscores → spaces or raw
  const noiseToken = projectName.toLowerCase().replace(/_/g, '').replace(/\s/g, '');

  // Split into lines, remove noise lines
  const lines = rawText.split(/\r?\n/);
  const cleaned = lines.filter(line => {
    const t = line.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    return t !== noiseToken && t !== '';
  });

  const text = cleaned.join('\n');

  // Detect section split markers (case-insensitive)
  const techMatch = text.search(/tech stack/i);
  const algoMatch = text.search(/ml\/algorithms|algorithms used|ml models|algorithms\:/i);

  let summary = '';
  let techStack = '';
  let algorithms = '';

  if (techMatch === -1 && algoMatch === -1) {
    // No sections — entire text is the summary
    summary = text.trim();
  } else {
    const firstSplit = Math.min(
      techMatch !== -1 ? techMatch : Infinity,
      algoMatch !== -1 ? algoMatch : Infinity
    );
    summary = text.slice(0, firstSplit).trim();

    const rest = text.slice(firstSplit);

    // Extract tech stack block
    if (techMatch !== -1) {
      const techStart = rest.search(/tech stack/i);
      const techEnd = rest.search(/ml\/algorithms|algorithms used|ml models|algorithms\:/i);
      if (techStart !== -1) {
        const block = techEnd !== -1 && techEnd > techStart
          ? rest.slice(techStart, techEnd)
          : rest.slice(techStart);
        // Remove the heading line itself
        techStack = block.replace(/^.*tech stack.*$/im, '').trim();
      }
    }

    // Extract algorithms block
    const algoStart = rest.search(/ml\/algorithms|algorithms used|ml models|algorithms\:/i);
    if (algoStart !== -1) {
      algorithms = rest.slice(algoStart).replace(/^.*(?:ml\/algorithms|algorithms used|ml models|algorithms\:).*$/im, '').trim();
    }
  }

  return { summary, techStack, algorithms };
}

/**
 * Convert a block of prose text into a <ul> with <li> bullet points.
 * Splits on: newlines first, then on '. ' sentence boundaries for long blocks.
 */
function textToBullets(text) {
  const ul = document.createElement('ul');
  ul.className = 'ml-overlay-bullets';

  // Split by newlines first
  const rawLines = text.split(/\n+/);
  const bullets = [];

  rawLines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // If the line is a long sentence block, split further by '. '
    if (line.length > 200) {
      const sentences = line.match(/[^.!?]+[.!?]+/g) || [line];
      sentences.forEach(s => {
        const trimmed = s.trim();
        if (trimmed) bullets.push(trimmed);
      });
    } else {
      bullets.push(line);
    }
  });

  bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    ul.appendChild(li);
  });

  return ul;
}

/**
 * Open the ML project overlay for the given project index.
 * Fetches summary.txt, populates left panel with parsed sections,
 * and populates right panel with new_media assets.
 */
async function openMLProjectOverlay(index) {
  const project = projectsData.creative[index];
  const overlay = document.getElementById('ml-project-overlay');
  const leftPanel = document.getElementById('ml-overlay-left');
  const rightPanel = document.getElementById('ml-overlay-right');
  if (!overlay || !leftPanel || !rightPanel) return;

  // ---- Populate left panel ----
  leftPanel.innerHTML = '';

  // Title
  const titleEl = document.createElement('div');
  titleEl.className = 'ml-overlay-project-title';
  titleEl.textContent = project.title;
  leftPanel.appendChild(titleEl);

  // Fetch + parse summary.txt
  try {
    const summaryPath = `content/Working LLMs/${project.name}/summary.txt`;
    const resp = await fetch(summaryPath);
    if (resp.ok) {
      const raw = await resp.text();
      const { summary, techStack, algorithms } = parseSummaryText(raw, project.name);

      // PROJECT SUMMARY
      if (summary) {
        const h1 = document.createElement('div');
        h1.className = 'ml-overlay-section-title';
        h1.textContent = 'PROJECT SUMMARY';
        leftPanel.appendChild(h1);
        leftPanel.appendChild(textToBullets(summary));
      }

      // TECH STACK
      if (techStack) {
        const h2 = document.createElement('div');
        h2.className = 'ml-overlay-section-title';
        h2.textContent = 'TECH STACK';
        leftPanel.appendChild(h2);
        leftPanel.appendChild(textToBullets(techStack));
      }

      // ALGORITHMS / ML MODELS
      if (algorithms) {
        const h3 = document.createElement('div');
        h3.className = 'ml-overlay-section-title';
        h3.textContent = 'ALGORITHMS / ML MODELS';
        leftPanel.appendChild(h3);
        leftPanel.appendChild(textToBullets(algorithms));
      }
    }
  } catch (err) {
    console.warn('Could not load summary.txt for', project.name, err);
  }

  // GitHub link
  if (project.github) {
    const ghLink = document.createElement('a');
    ghLink.className = 'ml-overlay-github-link';
    ghLink.href = project.github;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener noreferrer';
    ghLink.textContent = '⌥ VIEW ON GITHUB';
    leftPanel.appendChild(ghLink);
  }

  // ---- Populate right panel (media mosaic) ----
  rightPanel.innerHTML = '';
  const media = (project.newMedia || []).map(src => ({
    src,
    type: /\.(mp4|webm|mov|ogg)$/i.test(src) ? 'video' : 'image',
    alt: project.title
  }));

  const mosaic = buildMediaMosaic(media, 'ml-media-item', 'ml-media-mosaic');
  rightPanel.appendChild(mosaic);

  // Show overlay + prevent body scroll
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Close on backdrop click (clicking the outer overlay itself)
  overlay._backdropHandler = function (e) {
    if (e.target === overlay) closeMLProjectOverlay();
  };
  overlay.addEventListener('click', overlay._backdropHandler);
}

/**
 * Close and clean up the ML project overlay.
 */
function closeMLProjectOverlay() {
  const overlay = document.getElementById('ml-project-overlay');
  const rightPanel = document.getElementById('ml-overlay-right');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';

  // Pause all videos to stop audio/network
  if (rightPanel) {
    rightPanel.querySelectorAll('video').forEach(v => { v.pause(); v.src = ''; });
  }

  // Remove backdrop listener
  if (overlay._backdropHandler) {
    overlay.removeEventListener('click', overlay._backdropHandler);
    overlay._backdropHandler = null;
  }
}

// =====================================================
// DIGITAL EXPERIENCE TILE GRID + OVERLAY
// =====================================================

function buildDETileGrid() {
  const grid = document.getElementById('de-tiles-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projectsData.visual.forEach((project, index) => {
    const tile = document.createElement('div');
    tile.className = 'de-tile';
    tile.innerHTML = `
      <img class="de-tile-cover" src="${project.coverImage}" alt="${project.title}" loading="lazy">
      <div class="de-tile-heading">${project.title}</div>
    `;
    tile.addEventListener('click', () => openDEProjectOverlay(index));
    grid.appendChild(tile);
  });
}

async function openDEProjectOverlay(index) {
  const project = projectsData.visual[index];
  const overlay = document.getElementById('de-project-overlay');
  const leftPanel = document.getElementById('de-overlay-left');
  const rightPanel = document.getElementById('de-overlay-right');
  if (!overlay || !leftPanel || !rightPanel) return;

  // ---- Populate left panel ----
  leftPanel.innerHTML = '';

  const titleEl = document.createElement('div');
  titleEl.className = 'de-overlay-project-title';
  titleEl.textContent = project.title;
  leftPanel.appendChild(titleEl);

  // Try summary.txt, fall back to description
  let usedSummary = false;
  try {
    const resp = await fetch(`content/Visual Experience/${project.name}/summary.txt`);
    if (resp.ok) {
      const raw = await resp.text();
      const { summary, techStack, algorithms } = parseSummaryText(raw, project.name);
      if (summary) {
        const h = document.createElement('div');
        h.className = 'de-overlay-section-title';
        h.textContent = 'PROJECT SUMMARY';
        leftPanel.appendChild(h);
        leftPanel.appendChild(textToBullets(summary));
        usedSummary = true;
      }
      if (techStack) {
        const h = document.createElement('div');
        h.className = 'de-overlay-section-title';
        h.textContent = 'TECH STACK';
        leftPanel.appendChild(h);
        leftPanel.appendChild(textToBullets(techStack));
      }
      if (algorithms) {
        const h = document.createElement('div');
        h.className = 'de-overlay-section-title';
        h.textContent = 'TOOLS / TECH';
        leftPanel.appendChild(h);
        leftPanel.appendChild(textToBullets(algorithms));
      }
    }
  } catch { /* ignore */ }

  if (!usedSummary && project.description) {
    const h = document.createElement('div');
    h.className = 'de-overlay-section-title';
    h.textContent = 'PROJECT OVERVIEW';
    leftPanel.appendChild(h);
    const descEl = document.createElement('div');
    descEl.className = 'de-overlay-body-text';
    descEl.textContent = project.description;
    leftPanel.appendChild(descEl);
  }

  if (project.github) {
    const ghLink = document.createElement('a');
    ghLink.className = 'de-overlay-github-link';
    ghLink.href = project.github;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener noreferrer';
    ghLink.textContent = '⌥ VIEW ON GITHUB';
    leftPanel.appendChild(ghLink);
  }

  // ---- Populate right panel (media mosaic) ----
  rightPanel.innerHTML = '';

  const allMedia = (project.newMedia || []).map(src => ({
    src,
    type: /\.(mp4|webm|mov|ogg)$/i.test(src) ? 'video' : 'image',
    alt: project.title
  }));

  const mosaic = buildMediaMosaic(allMedia, 'de-media-item', 'de-media-mosaic');
  rightPanel.appendChild(mosaic);

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  overlay._backdropHandler = function (e) {
    if (e.target === overlay) closeDEProjectOverlay();
  };
  overlay.addEventListener('click', overlay._backdropHandler);
}

function closeDEProjectOverlay() {
  const overlay = document.getElementById('de-project-overlay');
  const rightPanel = document.getElementById('de-overlay-right');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';

  if (rightPanel) {
    rightPanel.querySelectorAll('video').forEach(v => { v.pause(); v.src = ''; });
  }

  if (overlay._backdropHandler) {
    overlay.removeEventListener('click', overlay._backdropHandler);
    overlay._backdropHandler = null;
  }
}

// Initialize all carousels on page load
async function initializeProjects() {
  // Load photography images first
  await loadPhotographyImages();

  // Build tile grids (replace carousels)
  buildMLTileGrid();
  buildDETileGrid();

  // Setup remaining carousels (llms, photography — skip creative and visual)
  ['llms', 'photography'].forEach(section => {
    setupCarousel(section);
  });

  // Setup carousel navigation buttons
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const section = this.getAttribute('data-section');
      const action = this.getAttribute('data-action');
      navigateCarousel(section, action);
    });
  });

  // Setup fullsize overlay close on click
  const fullsizeOverlay = document.getElementById('fullsize-overlay');
  if (fullsizeOverlay) {
    fullsizeOverlay.addEventListener('click', function (e) {
      if (e.target === fullsizeOverlay) {
        closeFullImage();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const mlOverlay = document.getElementById('ml-project-overlay');
      if (mlOverlay && mlOverlay.classList.contains('active')) { closeMLProjectOverlay(); return; }
      const deOverlay = document.getElementById('de-project-overlay');
      if (deOverlay && deOverlay.classList.contains('active')) { closeDEProjectOverlay(); return; }
      const fsOverlay = document.getElementById('fullsize-overlay');
      if (fsOverlay && fsOverlay.classList.contains('active')) { closeFullImage(); }
    } else {
      const overlay = document.getElementById('fullsize-overlay');
      if (overlay && overlay.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navigateFullImage('prev');
        else if (e.key === 'ArrowRight') navigateFullImage('next');
      }
    }
  });
}

// Make functions globally accessible
window.closeProjectOverlay = closeProjectOverlay;
window.openGenAIOverlay = openGenAIOverlay;
window.openFullImage = openFullImage;
window.closeFullImage = closeFullImage;
window.navigateFullImage = navigateFullImage;
window.closeMLProjectOverlay = closeMLProjectOverlay;
window.closeDEProjectOverlay = closeDEProjectOverlay;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
  initializeProjects();
}
