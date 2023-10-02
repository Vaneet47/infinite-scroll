const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const heading = document.getElementById('heading');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'z0o1skzmd2urRfc5KUWS0WiuCZ4Go2tCrlh27dmHrkU';

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded);
    item.appendChild(img);

    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    loader.hidden = true;
    heading.hidden = true
    const h2 = document.createElement('h2');
    h2.textContent = 'Error with loading Images. Please try again later!';
    imageContainer.appendChild(h2);
  }
}

// window.innerHeight -> Total height of browser window
// window.scrollY -> Distance from top of page user has scrolled
// document.body.offsetHeight -> Height of everything in the body, including what is not within the view

// Check to see if scrolling near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
