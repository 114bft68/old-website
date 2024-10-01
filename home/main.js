setInterval(() => {
    document.getElementById("polyline").setAttribute("points", `1071,0 704,363 0,${window.innerHeight} ${window.innerWidth},${window.innerHeight} ${window.innerWidth},0`);
}, 1);

let hello;
fetch('../json/hello.json')
    .then((data) => {
        return data.json();
    })
    .then((h) => {
        hello = h;
    })
    .catch((error) => {
        alert(`{ ${error} }`);
    })

let i = ii = 0;
let shouldDelete = false;
let h = document.getElementById("hello");
setInterval(() => {
    if (i > 99) {
        i = 0;
    }
    if (h.innerHTML.length !== hello[`hello${i}`].length && !shouldDelete) {
        h.innerHTML += hello[`hello${i}`].split('')[ii];
        ii++;
    } else if (h.innerHTML.length === hello[`hello${i}`].length && !shouldDelete) {
        shouldDelete = true;
    } else if (h.innerHTML.length === 0) {
        shouldDelete = false;
        i++;
        ii = 0;
    } else if (shouldDelete == true) {
        h.innerHTML = h.innerHTML.substring(0, h.innerHTML.length - 1);
    }
}, 150);

async function fetchLastUpdated() {
    try {
        let response = await fetch('https://api.github.com/repos/114bft68/website');
        let r = await response.json();
        let ms = new Date() - new Date(r.updated_at).getTime();
        if (ms !== '') {
            let time = [ms, ms / 1000, ms / 60000, ms / 3600000, ms / 86400000, ms / 604800000, ms / 2628000000, ms / 31557600000];
            let units = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
            for (let i = time.length - 1; i > -1; i--) {
                if (time[i] >= 1) {
                    time = time[i];
                    units = units[i];
                    break;
                }
            }
            document.getElementById('id').innerHTML += ` | last updated: ${time.toFixed(1)} ${units}${time > 1 ? 's ' : ' '}ago`;
        }
    } catch(error) {
        document.getElementById('id').innerHTML += ` | couldn't fetch data... ${error}`;
    }
}
fetchLastUpdated();