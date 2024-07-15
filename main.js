var hello;
fetch('https://raw.githubusercontent.com/114bft68/hm10u1r3/main/useless/hello.json')
    .then(r => {
        return r.json();  
    })
    .then(d => {
        hello = d;
    })
    .catch(e => {
        alert(`${e}\nPlease reload the website`);  
    })

let i = ii = 0;
let d = false;
let h = document.getElementById("hello");
setInterval(() => {
    if (i === 66) {
        i++;
    }
    if (i > 101) {
        i = 0;
    }
    if (h.innerHTML.length !== hello[`hello${i}`].length && d == false) {
        h.innerHTML += hello[`hello${i}`].split('')[ii];
        ii++;
    } else if (h.innerHTML.length === hello[`hello${i}`].length && d == false) {
        d = true;
    } else if (h.innerHTML.length === 0) {
        d = false;
        i++;
        ii = 0;
    } else if (d == true) {
        h.innerHTML = h.innerHTML.substring(0, h.innerHTML.length - 1);
    }
}, 150);

setInterval(() => {
    document.getElementById("polyline").setAttribute("points", `1071,0 704,363 0,${window.innerHeight} ${window.innerWidth},${window.innerHeight} ${window.innerWidth},0`);
}, 1);

fetch('https://api.github.com/repos/114bft68/hm10u1r3')
    .then(r => {
        return r.json();
    })
    .then(d => {
        document.getElementById('id').innerHTML += ` | last updated: ${((new Date() - new Date(d.updated_at).getTime()) / 3600000).toFixed()} hours ago`;
    })
    .catch(error => {
        document.getElementById('id').innerHTML += ` | couldn't fetch data... ${error}`;
        console.log(error);
    })
