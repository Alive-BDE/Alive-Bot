function h(hours: number) {
    return hours * 60 * 60 * 1000;
}

function m(minutes: number) {
    return minutes * 60 * 1000;
}

function s(seconds: number) {
    return seconds * 1000;
}

export { h, m, s };