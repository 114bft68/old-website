let n = location.pathname.split('/').at(-1).split('.html')[0];
n = n.split('_').map((i) => i[0] = i[0].toUpperCase() + i.substring(1)).join(' ');
document.title = (n === 'Index' ? 'Home' : n);

let link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/png';
link.href = '../images/good.png';
document.head.appendChild(link);


const mg = document.querySelectorAll('.creations');
for (let i = 0; i < 2; i++) {
    mg[i].addEventListener('click', () => {
        location.replace((i === 0 ? '../tic tac toe/tic_tac_toe' : i === 1 ? '../cubes dodging/cubes_dodging' : void(0)) + '.html');
    }); // (switch... case) when there are more options
}

document.querySelectorAll('.select')[1].addEventListener('click', () => {
    location.replace('../about/about.html');
});

document.getElementById('return').addEventListener('click', () => {
    location.replace('../home/index.html');
});

mg[2].addEventListener('click', () => {
    window.open('https://114bft68.github.io/balls/');
});