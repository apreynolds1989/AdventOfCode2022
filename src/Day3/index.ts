import { readFileSync } from 'fs';

const file = 'input.txt';

const readFile = (filename: string): string[] => {
    return readFileSync(filename, 'utf-8').split(/\r?\n/);
};

const test = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
];

const getCharCodeTotal = (arr: string[]) => {
    let sum = 0;
    arr.forEach((string) => {
        const firstHalf = string.substring(0, string.length / 2);
        const secondHalf = string.substring(string.length / 2, string.length);
        let commonLetter = '';
        [...firstHalf].forEach((letter) => {
            if (secondHalf.includes(letter)) commonLetter = letter;
        });
        sum +=
            commonLetter === commonLetter.toUpperCase()
                ? commonLetter.charCodeAt(0) - 38
                : commonLetter.charCodeAt(0) - 96;
    });
    return sum;
};

console.log(getCharCodeTotal(readFile(file)));
