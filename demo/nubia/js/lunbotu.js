var arr_left = document.getElementById('arr_left');
var arr_right = document.getElementById('arr_right');
var banner = document.getElementsByClassName('banner')[0];
console.log(arr_left)
arr_left.onclick = function () {
    banner.style.background = 'url("./images/2.1.jpg")no-repeat center center';
    banner.style.backgroundSize = 'cover';
}
console.log(arr_right)
arr_right.onclick = function () {
    banner.style.background = 'url("./images/2.2.jpg")no-repeat center center';
    banner.style.backgroundSize = 'cover';
}