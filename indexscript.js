const track = document.getElementById("track")

const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;


window.onload = e => {
    for (let i = 0; i < track.childElementCount; i++) {
        const image = track.children[i];

        if (image.nodeName === 'IMG') {
            const id = parseInt(image.id[3])
            let image_slide = mapNumRange(0, id * 100 / track.childElementCount, (id+1) * 100 / track.childElementCount, 42, 58);
            image.style.objectPosition = `${image_slide}% 50%`
        }
    }
}


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth;
    const percentage = (mouseDelta / maxDelta) * 100;

    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    let nextPercentageConst = Math.max(Math.min(nextPercentage, 100),0);
    track.dataset.percentage = nextPercentageConst;

    track.animate({
        transform: `translate(calc(-${nextPercentageConst}% + ${mapNumRange(nextPercentageConst,0,100,-15,15)}vh), -50%)`
    }, { duration: 1500, fill: "forwards" })

    const item_count = track.childElementCount;

    for (let i = 0; i < track.childElementCount; i++) {
        const image = track.children[i];

        if (image.nodeName === 'IMG') {
            const id = parseInt(image.id[3]);
            let image_slide = mapNumRange(nextPercentageConst, id * 100 / item_count, (id+1) * 100 / item_count, 42, 58);


            image.animate({
                objectPosition: `${image_slide}% 50%`
            }, { duration: 1500, fill: "forwards" } )
        }
    }
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}