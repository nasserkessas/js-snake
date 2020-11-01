const CANVAS = { x: 520, y: 520 }
const KEYDOWN = {}
const KEYMAP = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
};

let direction = "right"

let segments = [
    { x: CANVAS.x / 2, y: CANVAS.y / 2 },
    { x: CANVAS.x / 2 - 20, y: CANVAS.y / 2 },
    { x: CANVAS.x / 2 - 40, y: CANVAS.y / 2 }
]

const checkInput = () => {
    if (KEYDOWN['down']) { direction = "down" }
    if (KEYDOWN['right']) { direction = "right" }
    if (KEYDOWN['left']) { direction = "left" }
    if (KEYDOWN['up']) { direction = "up" }
    window.requestAnimationFrame(checkInput);
};

const resetInput = (key) => { /*keyup code here (if any) */ }

const dead = () => { if (segments[0].x + 20 > CANVAS.x || segments[0].x - 20 < 0 || segments[0].y + 20 > CANVAS.y || segments[0].y - 20 < 0) return true; else return false }

const redraw = () => {
    ctx.clearRect(0, 0, CANVAS.x, CANVAS.y);

    ctx.beginPath();
    ctx.rect(0, 0, CANVAS.x, CANVAS.y);
    ctx.fillStyle = "#eee";
    ctx.fill();
    //segment.x = segments[i - 1].x; segment.y = segments[i - 1].y
    if (!dead()) {
        segments.pop()
        switch (direction) {
            case "up": segments.unshift({ x: segments[0].x, y: segments[0].y + 20 }); break;
            case "down": segments.unshift({ x: segments[0].x, y: segments[0].y - 20 }); break;
            case "left": segments.unshift({ x: segments[0].x - 20, y: segments[0].y }); break;
            case "right": segments.unshift({ x: segments[0].x + 20, y: segments[0].y }); break;
        }

        for (segment of segments) {
             ctx.beginPath();
             ctx.rect(segment.x - 10, CANVAS.y - segment.y - 10, 20, 20);
             ctx.fillStyle = "#333";
             ctx.fill();
        }
    }
    setTimeout(redraw, 100);
}

document.addEventListener('keydown', (e) => KEYDOWN[KEYMAP[e.which]] = true);
document.addEventListener('keyup', (e) => {
    KEYDOWN[KEYMAP[e.which]] = false;
    resetInput(KEYMAP[e.which]);
});


const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d");
canvas.setAttribute("width", CANVAS.x)
canvas.setAttribute("height", CANVAS.y)
checkInput();
redraw();