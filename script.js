const image = document.getElementById("draggableImage");
const imageWrapper = document.getElementById("imageWrapper");
const sliderThumb = document.getElementById("sliderThumb");

let isDragging = false;
let startX, startY;
let imgX = 0, imgY = 0;

// === Drag bebas gambar ===
imageWrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - imgX;
    startY = e.clientY - imgY;
    imageWrapper.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    imgX = e.clientX - startX;
    imgY = e.clientY - startY;
    image.style.transform = `translate(${imgX}px, ${imgY}px)`;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    imageWrapper.style.cursor = "grab";
});

// === Kontrol analog horizontal ===
let sliderDragging = false;
let sliderStartX;
let sliderPos = 0;

sliderThumb.addEventListener("mousedown", (e) => {
    sliderDragging = true;
    sliderStartX = e.clientX - sliderPos;
});

window.addEventListener("mousemove", (e) => {
    if (!sliderDragging) return;
    const sliderContainer = document.querySelector(".slider-container");
    const maxWidth = sliderContainer.offsetWidth - sliderThumb.offsetWidth;

    sliderPos = e.clientX - sliderStartX;

    // Batas thumb agar tidak keluar
    if (sliderPos < 0) sliderPos = 0;
    if (sliderPos > maxWidth) sliderPos = maxWidth;

    sliderThumb.style.left = `${sliderPos}px`;

    // Hubungkan slider ke posisi X gambar (hanya horizontal)
    const percentage = sliderPos / maxWidth;
    const maxMove = 200; // batas geser X dengan slider
    imgX = (percentage - 0.5) * maxMove * 2;

    image.style.transform = `translate(${imgX}px, ${imgY}px)`;
});

window.addEventListener("mouseup", () => {
    sliderDragging = false;
});
