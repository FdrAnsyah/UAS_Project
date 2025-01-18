const burgerMenu = document.querySelector('#burgerMenu');
const navbarMenu = document.querySelector('#navbarMenu');
const navbarLogin = document.querySelector('#navbarLogin');

burgerMenu.addEventListener('click', function () {
  burgerMenu.classList.toggle('burger-active');
  navbarMenu.classList.toggle('hidden');
  navbarLogin.classList.toggle('hidden');
});

const image = document.querySelector('.image');

let MulaiImage = false,
  ImagePageX,
  ImageScrollKiri;

image.addEventListener(
  'mousedown',
  (ImageDown = (evt) => {
    MulaiImage = true;
    ImagePageX = evt.pageX;
    ImageScrollKiri = image.scrollLeft;
  })
);

image.addEventListener(
  'mousemove',
  (imageMove = (evt) => {
    if (!MulaiImage) return;
    evt.preventDefault();
    let posisi = evt.pageX - ImagePageX;
    image.scrollLeft = ImageScrollKiri - posisi;
  })
);

image.addEventListener(
  'mouseup',
  (ImageUp = () => {
    MulaiImage = false;
  })
);
