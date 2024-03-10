document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Nav background change on scroll
   */
  const navbar = document.querySelector('#navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach((el) => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator?.classList.toggle('bi-chevron-up');
        dropDownIndicator?.classList.toggle('bi-chevron-down');
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener(
      'click',
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    );
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {
    let portfolioFilter = portfolionIsotope.getAttribute(
      'data-portfolio-filter'
    )
      ? portfolionIsotope.getAttribute('data-portfolio-filter')
      : '*';
    let portfolioLayout = portfolionIsotope.getAttribute(
      'data-portfolio-layout'
    )
      ? portfolionIsotope.getAttribute('data-portfolio-layout')
      : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort')
      ? portfolionIsotope.getAttribute('data-portfolio-sort')
      : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(
        document.querySelector('.portfolio-container'),
        {
          itemSelector: '.portfolio-item',
          layoutMode: portfolioLayout,
          filter: portfolioFilter,
          sortBy: portfolioSort,
        }
      );

      let menuFilters = document.querySelectorAll(
        '.portfolio-isotope .portfolio-flters li'
      );
      menuFilters.forEach(function (el) {
        el.addEventListener(
          'click',
          function () {
            document
              .querySelector(
                '.portfolio-isotope .portfolio-flters .filter-active'
              )
              .classList.remove('filter-active');
            this.classList.add('filter-active');
            portfolioIsotope.arrange({
              filter: this.getAttribute('data-filter'),
            });
            if (typeof aos_init === 'function') {
              aos_init();
            }
          },
          false
        );
      });
    });
  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });
});
const pdfUrl = '/assets/pdf/katalog_HU_2023_internet.pdf';
const viewPdfBtn = document.getElementById('viewPdfBtn');
// Function to trigger the download
function downloadPdf() {
  fetch(pdfUrl)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a blob URL for the PDF data
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = '2023-mas_Katalógus.pdf'; // Set the desired file name
      document.body.appendChild(a);

      // Trigger a click event on the link element to initiate the download
      a.click();

      // Clean up by revoking the blob URL and removing the link element
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error('Failed to download the PDF file: ', error);
    });
}

// Call the downloadPdf() function when needed, e.g., in response to a button click
let downloadBtn = document.getElementById('idealKatalogusDownloadBtn');
downloadBtn?.addEventListener('click', downloadPdf);
viewPdfBtn?.addEventListener('click', () => {
  window.open(pdfUrl, '_blank');
});

const fullscreenImage = document.getElementById('fullscreenImage');
let currentContainer = null;
const fullscreenBackdrop = document.getElementById('fullscreenBackdrop');
const overlayText = document.getElementById('overlayText');
const prevBtn = document.getElementById('prevButton');
const nextBtn = document.getElementById('nextButton');
let currentIndex = 0;

let touchStartX = 0;
let touchEndX = 0;

function showFullscreenImage(containerSelector, index) {
  const imageContainer = document.querySelector(containerSelector);
  const imageArray = Array.from(imageContainer.querySelectorAll('.zoomable'));
  // Check if the index is within bounds
  if (index >= 0 && index < imageArray.length) {
    [prevBtn, nextBtn].forEach((btn) => {
      btn.style.opacity = 1;
    });

    const overlayContent = imageArray[index].nextElementSibling
      ? imageArray[index].nextElementSibling.innerHTML
      : '';
    overlayText.innerHTML = overlayContent;
    fullscreenImage.src = imageArray[index].src;
    fullscreenImage.style.display = 'block';
    createFullscreenBackdrop();
    currentIndex = index;
  } else {
    console.error('Invalid index or empty image array');
  }
}

function closeFullscreen() {
  fullscreenImage.style.display = 'none';
  overlayText.style.display = 'none';
  fullscreenBackdrop.style.display = 'none';
  [prevBtn, nextBtn].forEach((btn) => {
    btn.style.opacity = 0;
  });
}

function navigate(direction, containerSelector) {
  const imageContainer = document.querySelector(containerSelector);
  const imageArray = imageContainer.querySelectorAll('.zoomable');

  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < imageArray.length) {
    showFullscreenImage(containerSelector, newIndex);
  } else if (newIndex < 0) {
    showFullscreenImage(containerSelector, imageArray.length - 1);
  } else {
    showFullscreenImage(containerSelector, 0);
  }
}

function createFullscreenBackdrop() {
  fullscreenBackdrop.style.display = 'block';
  if (overlayText.innerHTML !== '') {
    overlayText.style.display = 'block';
  }
}

document.querySelectorAll('.zoomable').forEach((image, index) => {
  image.addEventListener('click', () => {
    currentContainer = image.closest('.colorCubeContainer, .swiper-wrapper');
    if (currentContainer.classList.contains('colorCubeContainer')) {
      const containerImages = currentContainer.querySelectorAll('.zoomable');
      const selectedIndex = Array.from(containerImages).indexOf(image);
      if (selectedIndex !== -1) {
        showFullscreenImage('.colorCubeContainer', selectedIndex);
      } else {
        console.error('Invalid index or empty image array');
      }
    } else {
      showFullscreenImage('.swiper-wrapper', index);
    }
  });
});

fullscreenBackdrop?.addEventListener('click', closeFullscreen);
fullscreenImage?.addEventListener('click', closeFullscreen);

prevBtn?.addEventListener('click', () => {
  const containerSelector = currentContainer.classList.contains(
    'colorCubeContainer'
  )
    ? '.colorCubeContainer'
    : '.swiper-wrapper';
  navigate(-1, containerSelector);
});

nextBtn?.addEventListener('click', () => {
  const containerSelector = currentContainer.classList.contains(
    'colorCubeContainer'
  )
    ? '.colorCubeContainer'
    : '.swiper-wrapper';
  navigate(1, containerSelector);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeFullscreen();
  } else if (e.key === 'ArrowLeft') {
    const containerSelector = currentContainer.classList.contains(
      'colorCubeContainer'
    )
      ? '.colorCubeContainer'
      : '.swiper-wrapper';
    navigate(-1, containerSelector);
  } else if (e.key === 'ArrowRight') {
    const containerSelector = currentContainer.classList.contains(
      'colorCubeContainer'
    )
      ? '.colorCubeContainer'
      : '.swiper-wrapper';
    navigate(1, containerSelector);
  }
});
// Touch event listeners for swipe gesture
fullscreenImage?.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

fullscreenImage?.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
});

fullscreenImage?.addEventListener('touchend', () => {
  if (touchEndX < touchStartX) {
    // Swiped left
    const containerSelector = currentContainer.classList.contains(
      'colorCubeContainer'
    )
      ? '.colorCubeContainer'
      : '.swiper-wrapper';
    navigate(1, containerSelector);
  } else if (touchEndX > touchStartX) {
    // Swiped right
    const containerSelector = currentContainer.classList.contains(
      'colorCubeContainer'
    )
      ? '.colorCubeContainer'
      : '.swiper-wrapper';
    navigate(-1, containerSelector);
  }
});

const container = document.querySelector('.products-list');
// where "container" is the id of the container
container?.addEventListener('wheel', function (e) {
  if (e.deltaY > 0) {
    container.scrollLeft += 100;
    e.preventDefault();
    // prevenDefault() will help avoid worrisome
    // inclusion of vertical scroll
  } else {
    container.scrollLeft -= 100;
    e.preventDefault();
  }
});
