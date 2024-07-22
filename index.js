const track = document.getElementById("track")
const aboutBtn = document.getElementById("aboutBtn")

let mouseDownX;
let mouseDownY;
let inAbout = false;
let click = false;

const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const distTwoPoints = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));


//window setup / track controls

window.onload = e => {
    for (let i = 0; i < track.childElementCount; i++) {
        const image = track.children[i];

        if (image.nodeName === 'IMG') {
            const id = parseInt(image.id[3])
            let image_slide = mapNumRange(0, id * 100 / track.childElementCount, (id+1) * 100 / track.childElementCount, 46, 54);
            image.style.objectPosition = `${image_slide}% 50%`
        }
    }
}

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
}

window.onmousemove = e => {
    if (inAbout) return; //only animate track when not in the about page
    if (track.dataset.mouseDownAt === "0") return; //0 is a mouse placeholder meaning the mouse hasn't been pressed

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth * 1.5;
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
            let id;
            if (image.id.length === 5) {
                id = parseInt(image.id[3]+image.id[4]); //horrible solution for images with two digit id's, i know, im sorry
            } else {
                id = parseInt(image.id[3]);
            }
            const image_slide = mapNumRange(nextPercentageConst, id * 100 / item_count, (id+1) * 100 / item_count, 46, 54);

            image.animate({
                objectPosition: `${image_slide}% 50%`
            }, { duration: 1500, fill: "forwards", easing: "ease-in-out" } )
        }
    }
}

window.onmouseup = e => {
    if (distTwoPoints(mouseDownX, mouseDownY, e.clientX, e.clientY) < 10) {
        for (let i = 0; i < track.childElementCount; i++) {
            let center = (100/(track.childElementCount-1))*i
            if (Math.abs(track.dataset.percentage - center) < (44/(track.childElementCount-1))+0.23) {
                console.log(i) //the image over which the user is hovering
            }
        }
    }
    track.dataset.mouseDownAt = "0"; //set back to default meaning mouse hasnt been pressed
    track.dataset.prevPercentage = track.dataset.percentage; //update the scroll percentage

}

//about button controls

aboutBtn.onclick = e => {
    inAbout = !inAbout;

    //flip and move button
    aboutBtn.animate({
        transform: `scaleX(200%) scaleY(${50 * (inAbout ? 1 : -1)}%)`
    }, { duration: 1000, fill: "forwards", easing: "ease-in-out"  })

    document.getElementById('nav').animate({
        bottom: `${inAbout ? 85 : -0}%`
    }, { duration: 1000, fill: "forwards", easing: "ease-in-out" })

    //move track and selector up and off screen too
    track.animate({
        top: `${inAbout ? -35 : 50}%`
    }, { duration: 1000, fill: "forwards", easing: "ease-in-out"  })

    document.getElementById('selector').animate({
        top: `${inAbout ? -35 : 50}%`
    }, { duration: 1000, fill: "forwards", easing: "ease-in-out"  })
}