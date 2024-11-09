const scrollMenu = document.getElementById('scroll-menu');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

// Set scroll amount equal to one item width (adjust if needed)
const scrollAmount = 300; 

scrollLeftBtn.addEventListener('click', () => {
  scrollMenu.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

scrollRightBtn.addEventListener('click', () => {
  scrollMenu.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});