const track = document.getElementById("track");

window.onmousedown = e => {
    track.dataset.mouseDown = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mouseDown === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDown) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * 100;

    track.style.gap = '#10vmin';
    console.log("yay");
    track.style.transform = 'translate(${percentage}%, -50%)';
}

window.onmouseup = e => {
    track.dataset.mouseDown = "0";
}