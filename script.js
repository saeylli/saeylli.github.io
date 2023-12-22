window.addEventListener('wheel', function(e) {
    var delta = e.deltaY;
    var background = document.querySelector('.background');
    background.scrollLeft += delta;
});
