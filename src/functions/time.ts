function h(hours: number) {
    return hours * 60 * 60 * 1000;
}

function m(minutes: number) {
    return minutes * 60 * 1000;
}

function s(seconds: number) {
    return seconds * 1000;
}

const months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export { h, m, s, months };