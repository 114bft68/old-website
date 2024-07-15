const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
var rect, x, y, end;
setInterval(() => {
    c.width = window.innerWidth - 2;
    c.height = window.innerHeight * 0.875 - 2; // 2 -> red border, 0.875 -> height% in website
    rect = c.getBoundingClientRect();
}, 1);

var startTime, endTime;
let countdown = localStorage.getItem('played') === 'true' ? 3 : 10;
setTimeout(() => {
    document.getElementById('hr').style.opacity = '1';
    document.getElementById('p').style.opacity = '1';
    document.getElementById('p1').style.opacity = '1';
    let cd = document.getElementById('countdown');
    cd.style.opacity = '1';
    let interval = setInterval(() => {
        countdown -= 1;
        cd.innerHTML = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            document.querySelector('.overlay').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.overlay').style.display = 'none';
            }, 1000);
            x = c.width / 2 - 35 / 2;
            y = c.height / 2 - 35 / 2;
            obstacles.push(new o());
            startTime = Date.now();
            requestAnimationFrame(animation);
        }
    }, 1000);
}, 750);

class o {
    constructor() {
        this.size = 35;
        this.speed = Math.ceil(Math.random() * 5);
        let tx = Math.floor(Math.random() * (c.width - this.size));
        this.x = Math.abs(tx, x) > 35 ? tx : 9999; // at least you don't get sudden attacks from cubes
        let ty = Math.floor(Math.random() * (c.height - this.size));
        this.y = Math.abs(ty, y) > 35 ? ty : 9999;
        this.d0 = [true, false][Math.floor(Math.random() * 2)];
        this.d1 = [true, false][Math.floor(Math.random() * 2)];
    }

    move() {
        this.d0 === true ? this.x -= this.speed : this.x += this.speed;
        this.d1 === true ? this.y -= this.speed : this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    collision() {
        this.x + this.size >= c.width ? this.d0 = !this.d0 : void(0);
        this.x <= 0 ? this.d0 = !this.d0 : void(0);
        this.y + this.size >= c.height ? this.d1 = !this.d1 : void(0);
        this.y <= 0 ? this.d1 = !this.d1 : void(0);
    }

    wompWomp() {
        if (Math.abs(x - this.x) <= 35 && Math.abs(y - this.y) <= 35) {
            end = true;
        }
    }
}

var obstacles = [];
var w = a = s = d = border = false;

function animation() {
    obstacles.forEach((ob) => {
        ob.move();
        ob.draw();
        ob.collision();
        ob.wompWomp();
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 35, 35);

    let f = requestAnimationFrame(animation);
    if (end === true) {
        endTime = Date.now();
        cancelAnimationFrame(f);
        let cr = document.createElement('div');
        cr.className = 'overlay';
        let cre = document.createElement('h1');
        cre.style.fontSize = '50px';
        cre.innerHTML = `GG, you survived for <span style='color: red;'>${((endTime - startTime) / 1000).toFixed(2)}</span> seconds${border ? '<br><p style="font-size: 20px;">Ehehehe I forgot to tell you the borders are actually sharp knives</p>' : ''}`;
        cr.appendChild(cre);
        document.body.insertBefore(cr, c);
        localStorage.setItem('played', true);
        setTimeout(() => {
            let crea = document.createElement('p');
            crea.innerHTML = '<br><br>Click anywhere to play again';
            cr.appendChild(crea);
            document.addEventListener('click', () => {
                location.reload();
            });
        }, 100);
    }

    if ([true][Math.floor(Math.random() * 80)]) {
        obstacles.push(new o());
    }

    w ? y -= 5 : void(0);
    a ? x -= 5 : void(0);
    s ? y += 5 : void(0);
    d ? x += 5 : void(0);
    x <= 0 || x + 35 >= c.width || y <= 0 || y + 35 >= c.height ? (end = true, border = true) : void(0); 
}

function k(e, k, tf) {
    if (e.key === k || e.key === k.toUpperCase()) {
        window[k] = tf;
    }
}

document.addEventListener('keydown', (e) => { 
    k(e, 'w', true);
    k(e, 'a', true);
    k(e, 's', true);
    k(e, 'd', true);
});

document.addEventListener('keyup', (e) => {
    k(e, 'w', false);
    k(e, 'a', false);
    k(e, 's', false);
    k(e, 'd', false);
});