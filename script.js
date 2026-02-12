document.addEventListener("DOMContentLoaded", () => {
  let background_toggle = false;

  const drawing = document.getElementById("drawing");
  const drawBtn = document.getElementById("drawBtn");
  const backBtn = document.getElementById("backBtn");
  const header = document.querySelector(".header");
  const container = document.querySelector(".container");

  function changeBackground() {
    background_toggle = !background_toggle;
    document.body.style.backgroundImage = background_toggle
      ? 'url("https://www.bing.com/th/id/OGC.cd8aeca8aac766ce08d6a2ab7e9a8c39?...")'
      : 'url("https://media1.tenor.com/m/wCrZqAL1cWMAAAAd/spinning-fish.gif")';
  }

  drawBtn.addEventListener("click", () => {
    container.classList.add("hidden");
    header.classList.add("hidden");
    drawing.classList.remove("hidden");
  });

  backBtn.addEventListener("click", () => {
    drawing.classList.add("hidden");
    container.classList.remove("hidden");
    header.classList.remove("hidden");
  });

  // expose function for inline HTML onclick
  window.changeBackground = changeBackground;
});
