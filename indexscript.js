const track = document.getElementById("track")
console.log(typeof track.dataset.mousedown);

window.onmousedown = e => {
    track.dataset.mousedown = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mousedown === "0") return;

    const mouseDelta = parseFloat(track.dataset.mousedown) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * 100;

    track.style.transform = 'translate(${percentage}%, -50%)';
}

window.onmouseup = e => {
    track.dataset.mousedown = "0";
}