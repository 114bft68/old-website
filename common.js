let n = location.pathname.split('.html')[0].split('/');
let n1 = n[n.length - 1];
let n2 = n1.includes('_') ? n1.split('_') : n1;
let n3 = Array.isArray(n2) ? n2.map((str) => str.replace(str.split('')[0], str.split('')[0].toUpperCase())).toString() : n2.replace(n2.split('')[0], n2.split('')[0].toUpperCase()).toString();
document.title = n3.includes(',') ? n3.replaceAll(',', ' ') : n3;

const mg = document.querySelectorAll('.minigame');
for (let i = 0; i < 2; i++) {
    mg[i].addEventListener('click', () => {
        location.replace((i === 0 ? 'tic_tac_toe' : i === 1 ? 'dodge_cubes' : void(0)) + '.html');
    });
}

document.querySelectorAll('.select')[1].addEventListener('click', () => {
    location.replace('about.html');
});

document.getElementById('return').addEventListener('click', () => {
    location.replace('home.html');
});