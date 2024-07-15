var f = b = o = x = next = false;
var turn, ended;
const bs = [document.getElementById('friend'), document.getElementById('bot')];
bs.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (!next) {
            e.target === bs[0] ? f = true : b = true;
            document.getElementsByTagName('h1')[0].innerHTML = 'Alright. Which side do you prefer?';
            bs[0].innerHTML = `<img src="ttto.svg" style="pointer-events: none;">`;
            bs[1].innerHTML = `<img src="tttx.svg" style="pointer-events: none;">`;
            next = true;
        } else {
            e.target === bs[0] ? o = true : x = true;
            user = o ? 'o' : 'x';
            nuser = x ? 'o' : 'x';
            document.getElementById('opponent').innerHTML = (f ? 'Friend' : 'Bot');
            turn = [true, false][((Math.random() * Math.random()).toString().slice(-1) / 2).toString().includes('.') ? 1 : 0];
            let i = setInterval(() => {
                if (f) {
                    clearInterval(i);
                    color(turn ? true : false);
                }
                if (!turn && b) {
                    clearInterval(i);
                    color(false);
                    think();
                } else if (turn && b) {
                    clearInterval(i);
                    color(true);
                }
            }, 1);
            document.querySelector('.overlay').remove();
        }
    });
});

const yot = [document.getElementById('you'), document.getElementById('opponent')];
yot.forEach((el) => {
    el.addEventListener('keydown', (e) => {
        if (e.key !== 'Backspace' && el.innerHTML.length > 9) {
            e.preventDefault();
        }
    });
});

let interval = setInterval(() => {
    if ((f || b) && (o || x)) {
        clearInterval(interval);
        if (f) {
            c.addEventListener('click', (e) => {
                friend(e);
            });
        } else if (b) {
            c.addEventListener('click', (e) => {
                bot(e);
            });
        }
    }
}, 1);

const c = document.getElementById('ttt');
const ctx = c.getContext('2d');
const wh = (c.width / 3) - 20;
var bx, by, user, nuser;

ctx.strokeStyle = 'white';
ctx.beginPath();
ctx.moveTo(c.width / 3, 0);
ctx.lineTo(c.width / 3, c.height);
ctx.moveTo((c.width / 3) * 2, 0);
ctx.lineTo((c.width / 3) * 2, c.height);
ctx.moveTo(0, c.height / 3);
ctx.lineTo(c.width, c.height / 3);
ctx.moveTo(0, (c.height / 3) * 2);
ctx.lineTo(c.width, (c.height / 3) * 2);
ctx.stroke();

var winPatterns = {
    "win1": [`10,10`, `${(c.width / 3) + 10},10`, `${((c.width / 3) * 2) + 10},10`],
    "win2": [`10,${(c.height / 3) + 10}`, `${(c.width / 3) + 10},${(c.height / 3) + 10}`, `${((c.width / 3) * 2) + 10},${(c.height / 3) + 10}`],
    "win3": [`10,${((c.height / 3) * 2) + 10}`, `${(c.width / 3) + 10},${((c.height / 3) * 2) + 10}`, `${((c.width / 3) * 2) + 10},${((c.height / 3) * 2) + 10}`],
    "win4": [`10,10`, `10,${(c.height / 3) + 10}`, `10,${((c.height / 3) * 2) + 10}`],
    "win5": [`${(c.width / 3) + 10},10`, `${(c.width / 3) + 10},${(c.height / 3) + 10}`, `${(c.width / 3) + 10},${((c.height / 3) * 2) + 10}`],
    "win6": [`${((c.width / 3) * 2) + 10},10`, `${((c.width / 3) * 2) + 10},${(c.height / 3) + 10}`, `${((c.width / 3) * 2) + 10},${((c.height / 3) * 2) + 10}`],
    "win7": [`10,10`, `${(c.width / 3) + 10},${(c.height / 3) + 10}`, `${((c.width / 3) * 2) + 10},${((c.height / 3) * 2) + 10}`],
    "win8": [`${((c.width / 3) * 2) + 10},10`, `${(c.width / 3) + 10},${(c.height / 3) + 10}`, `10,${((c.height / 3) * 2) + 10}`]
};

function friend(e) {
    if (!ended) {
        let ux = e.clientX - c.getBoundingClientRect().left;
        let uy = e.clientY - c.getBoundingClientRect().top;
        if (ifExist(`${getX(ux)},${getY(uy)}`)) {
            if (turn) {
                replace(`${getX(ux)},${getY(uy)}`, user);
                color(false);
            } else {
                replace(`${getX(ux)},${getY(uy)}`, nuser);
                color(true);
            }
        }
    }
}

function bot(e) {
    if (!ended) {
        let ux = e.clientX - c.getBoundingClientRect().left;
        let uy = e.clientY - c.getBoundingClientRect().top; 
        if (ifExist(`${getX(ux)},${getY(uy)}`) && turn) {
            replace(`${getX(ux)},${getY(uy)}`, user);
            think();
            color(false);
        }
    }
}

function getX(ux) {
    return ux < c.width / 3 ? 10 : ux < (c.width / 3) * 2 ? (c.width / 3) + 10 : ux < c.width ? ((c.width / 3) * 2) + 10 : void(0);
}

function getY(uy) {
    return uy < c.height / 3 ? 10 : uy < (c.height / 3) * 2 ? (c.height / 3) + 10 : uy < c.height ? ((c.height / 3) * 2) + 10 : void(0);
}

function ifExist(smth) {
    return Object.values(winPatterns).some(ar => ar.includes(smth));
}

function replace(smth, replacement) {
    if (!Object.values(winPatterns).every(ar => !ar.includes(smth))) {
        Object.values(winPatterns).forEach((ar) => {
            if (ar.includes(smth)) {
                ar.splice(ar.indexOf(smth), 1, replacement);
            }
        });
        let p = 0;
        function a() {
            function draw() {
                ctx.clearRect(smth.split(',')[0], smth.split(',')[1], wh, wh);
                ctx.drawImage(document.getElementById(replacement), smth.split(',')[0], smth.split(',')[1], wh * p, wh * p);
            }
            draw();
            p = +(p + 0.1).toFixed(1);
            let f = requestAnimationFrame(a);
            if (p >= 1) {
                draw();
                cancelAnimationFrame(f);
                if (Object.values(winPatterns).some((ar) => (ar.filter((item) => item === user)).length > 2) || Object.values(winPatterns).some((ar) => (ar.filter((item) => item === nuser)).length > 2) || Object.values(winPatterns).every((ar) => ar.every((a) => !a.includes(',')))) {
                    ended = true;
                    yot.map((e) => e.style.color = 'white');
                    if (Object.values(winPatterns).some((ar) => (ar.filter((item) => item === user)).length > 2)) {
                        ol(`<span style="color: red;">${yot[0].innerHTML}</span> won`);
                    } else if (Object.values(winPatterns).some((ar) => (ar.filter((item) => item === nuser)).length > 2)) {
                        ol(`<span style="color: red;">${yot[1].innerHTML}</span> won`);
                    } else if (Object.values(winPatterns).every((ar) => ar.every((a) => !a.includes(',')))) {
                        ol(`<span style="color: red;">TIE</span>`);
                    }
                } else {
                    turn = !turn;
                }
            }
        }
        requestAnimationFrame(a);
    }
}

function rm(i) {
    return Math.floor(Math.random() * i.length);
}

function logic(i, u) {
    return Object.values(winPatterns).some((ar) => (ar.filter((item) => item === u)).length > i && ar.filter((item) => item.includes(',')).length > 0);
}

function find(i, u) {
    return Object.values(winPatterns).filter((ar) => (ar.filter((item) => item === u)).length > i && ar.filter((item) => item.includes(',')).length > 0);
}

function t(i) {
    if (logic(i)) {
        let r = find(i)[rm(find(i))].filter((f) => f.includes(','));
        let rr = r[rm(find(r))];
        replace(rr, nuser);
    }
}

function commit(i, u) {
    if (!ended) {
        let r = find(i, u)[rm(find(i, u))].filter((f) => f.includes(','));
        let rr = r[rm(find(r, u))];
        replace(rr, nuser);
        color(true);
    }
}

function think() {
    setTimeout(() => {
        if (logic(1, nuser)) {
            commit(1, nuser);
        } else if (logic(1, user)) {
            commit(1, user);
        } else if (logic(0, nuser)) {
            commit(0, nuser);
        } else if (logic(0, user)) {
            commit(0, user);
        } else {
            commit(-1, user);
        }
    }, Math.floor(Math.random() * 800) + 400);
}

function color(t) {
    yot[t ? 0 : 1].style.color = 'green';
    yot[t ? 0 : 1].style.transition = 'all 1s';
    yot[t ? 1 : 0].style.color = 'white';
    yot[t ? 1 : 0].style.transition = 'all 1s';
}

function ol(t) {
    let c = document.createElement('div');
    c.className = 'overlay';
    let text = document.createElement('h1');
    text.innerHTML = `~ ${t} ~`;
    text.style.fontSize = '90px';
    c.appendChild(text);
    document.body.insertBefore(c, document.getElementsByTagName('div')[3]);
    setTimeout(() => {
        let b = document.createElement('button');
        b.innerHTML = 'Play again';
        b.style.fontSize = '40px';
        b.addEventListener('click', () => {
            location.reload();
        });
        b.addEventListener('mouseenter', () => {
            b.style.backgroundColor = 'transparent';
        });
        c.appendChild(b);
    }, 300);
}