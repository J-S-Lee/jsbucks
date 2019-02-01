const body = document.querySelector('body'),
  locationContainer = document.querySelector('.js-location span');

const IMG_NUMBER = 3;

const UNSPLASH_API_KEY =
  '02764925a6065c18219c092f83f4c4080029887835abeff381a1420cf9ce03fd';
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=coffee&orientation=portrait`;

function getBackground() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const image = json;
      console.log(image);
      if (image.urls && image.urls.small && image.user) {
        const fullUrl = image.urls.small;
        const username = `${image.user.first_name} ${image.user.last_name}`;
        saveBackground(fullUrl, username);
      } else {
        getBackground();
      }
      console.log('getBackground!');
    });
  return;
}

function saveBackground(imageUrl, username) {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 10);

  const imageObject = {
    url: imageUrl,
    expiresOn: expirationDate,
    username
  };

  localStorage.setItem('bg', JSON.stringify(imageObject));
  console.log('saveBackground!');
  loadBackground();
  return;
}

function loadBackground() {
  const savedImage = localStorage.getItem('bg');
  if (savedImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    const expirationDate = new Date(parsedImage.expiresOn);
    console.log(`today is ${today}`);
    console.log(`expirationDate is ${expirationDate}`);
    if (today > expirationDate) {
      localStorage.removeItem('bg');
      console.log('background changed!');
      getBackground();
    } else {
      paintImage(parsedImage);
      locationContainer.innerHTML = `Photo by ${parsedImage.username}`;
    }
  }
  return;
}

function paintImage(parsedImage) {
  const image = new Image();
  image.src = `${parsedImage.url}`;
  image.classList.add('bgImage');
  body.removeChild(body.childNodes[0]);
  body.prepend(image);
}

function init() {
  loadBackground();

  setInterval(loadBackground, 610000);
  return;
}

init();
