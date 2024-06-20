const track = document.getElementById("track")
let data = track.getAttribute("data-mousedown");

window.onmousedown = e => {
    data = e.clientX;
}

window.onmousemove = e => {
    if (data === "0") return;

    const mouseDelta = parseFloat(data) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * 100;

    track.style.transform = 'translate(${percentage}%, -50%)';
}

window.onmouseup = e => {
    data = "0";
}