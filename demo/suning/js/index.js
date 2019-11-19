var arrLeft = document.getElementById('arr-left');
var arrRight = document.getElementById('arr-right');
var bannerPic = document.getElementById('banner-pic');
var banner = document.getElementById('banner');
var pageOne = document.getElementById('page-one');
var pageTwo = document.getElementById('page-two');

console.log(arrLeft)
arrLeft.onclick = function () {
    bannerPic.src = './images/banner.jpg';
    banner.style.background = 'rgb(25, 165, 198)';
    pageOne.style.background = '#f90';
    pageTwo.style.background = 'rgba(255, 255, 255, 0.8)';
}

console.log(arrRight)
arrRight.onclick = function () {
    bannerPic.src = './images/banner2.jpg';
    banner.style.background = 'rgb(148, 5, 255)';
    pageOne.style.background = 'rgba(255, 255, 255, 0.8)';
    pageTwo.style.background = '#f90';
}

console.log(pageOne)
pageOne.onclick = function() {
    bannerPic.src = './images/banner.jpg';
    banner.style.background = 'rgb(25, 165, 198)';
    pageOne.style.background = '#f90';
    pageTwo.style.background = 'rgba(255, 255, 255, 0.8)';
}

console.log(pageTwo)
pageTwo.onclick = function () {
    bannerPic.src = './images/banner2.jpg';
    banner.style.background = 'rgb(148, 5, 255)';
    pageOne.style.background = 'rgba(255, 255, 255, 0.8)';
    pageTwo.style.background = '#f90';
}