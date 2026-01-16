let background_toggle = false;

// Changing the background and cycles
function changeBackground() {
    background_toggle = !background_toggle;
    document.body.style.backgroundImage = background_toggle
        ? 'url("https://www.bing.com/th/id/OGC.cd8aeca8aac766ce08d6a2ab7e9a8c39?o=7&cb=ucfimg2&pid=1.7&rm=3&rurl=https%3a%2f%2fmedia.tenor.com%2fimages%2fcd8aeca8aac766ce08d6a2ab7e9a8c39%2ftenor.gif&ehk=ppooKjAkoPjRYmZhvQt9tlgO4udy6ZI7Lb4zPHzNCG0%3d&ucfimg=1")'
        : 'url("https://media1.tenor.com/m/wCrZqAL1cWMAAAAd/spinning-fish.gif")';
}
