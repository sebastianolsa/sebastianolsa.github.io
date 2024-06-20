const track = document.getElementById("track")

const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

window.onmousedown = e => {
    track.dataset.mouseDown = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mouseDown === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDown) - e.clientX;
    const maxDelta = window.innerWidth / 1.5;
    const percentage = (mouseDelta / maxDelta) * 100;

    track.style.transform = `translate(-${mapNumRange(percentage,0,100,5,95)}%, -50%)`;

    const item_count = track.childElementCount;

    for (let i = 0; i < track.childElementCount; i++) {
        const image = track.children[i];

        if (image.nodeName !== 'IMG') return;

        const id = parseInt(image.id[3]);
        image.style.objectPosition = `${mapNumRange(percentage,(id-1)*115/item_count,id*115/item_count,42,58)}% 50%`
    }
}

window.onmouseup = e => {
    track.dataset.mouseDown = "0";
}