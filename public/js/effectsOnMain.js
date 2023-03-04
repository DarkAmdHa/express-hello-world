const checkdiv = document.getElementById('checkdiv');
const maintext = document.getElementById('maintexxt');
const about_banner = document.querySelector('.about_banner');
const itemChoose = document.querySelectorAll('.itemChoose');
const ourServices = document.querySelectorAll('.ourServicesItem');

const isInViewport = el => {
    const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= 
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () => {
    ourServices.forEach((item) => {
        if (isInViewport(item)) {
            item.classList.remove('makeInvisible')
            item.classList.add('makeVisible')
        }
    });
    itemChoose.forEach((item) => {
        if (isInViewport(item)) {
            item.classList.remove('hidee_left')
            item.classList.remove('hide_right')
            item.classList.add('shoow')
    }
    })
    if (isInViewport(checkdiv)) {
        maintext.classList.remove('hidee_left')
        maintext.classList.add('shoow');
        about_banner.classList.remove('hide_right')
        about_banner.classList.add('shoow');
    }

    
}


// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);