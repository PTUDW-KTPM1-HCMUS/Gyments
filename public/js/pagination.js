let x = document.getElementById("getCurPage");
let currentPage = parseInt(x.getAttribute('name')) - 1;
let needColor = document.getElementsByClassName("need_color");
// add color to the current choice
needColor[currentPage].classList.add("cur_pos");