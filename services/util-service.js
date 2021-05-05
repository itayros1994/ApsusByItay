export const utilService = {
    makeId,
    makeLorem,
    getRandomColor,
    returnDateFromTs,
    getRandomInt
}

function makeId(length = 25) {
    let genId = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        genId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return genId;
}

function makeLorem(size = 100) {
    let genLorem = '';
    const possible = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];

    while (size > 0) {
        size--;
        genLorem += possible[Math.floor(Math.random() * possible.length)] + ' ';
    }

    return genLorem;
}

function getRandomColor() {
    let color = '#';
    const possible = '0123456789ABCDEF'
    let char = 6;

    while (char > 0) {
        char--;
        color += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return color;
}

function returnDateFromTs(ts) {
    const date = new Date(ts)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const dateForIntl = new Date(Date.UTC(year, month, day))

    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(dateForIntl)
}

// Define getRandomInt() - (max is exclusive, min is inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}