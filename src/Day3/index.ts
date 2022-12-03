import { readFileSync } from 'fs';

const file = 'input.txt';

const readFile = (filename: string): string[] => {
    return readFileSync(filename, 'utf-8').split(/\r?\n/);
};

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

console.log('Sum of Common Item type Priorities:', getCharCodeTotal(readFile(file)));

/// Part 2 ///

const getBadgeCharCodeTotal = (arr: string[]) => {
    const seperatedArr: string[][] = [];
    let subArr: string[] = [];
    let sum = 0;

    arr.forEach((string, index) => {
        subArr.push(string);
        if ((index + 1) % 3 === 0) {
            seperatedArr.push(subArr);
            subArr = [];
        }
    });
    seperatedArr.forEach((subArr) => {
        let commonLetter = '';
        [...subArr[0]].forEach((letter) => {
            if (subArr[1].includes(letter) && subArr[2].includes(letter)) commonLetter = letter;
        });
        sum +=
            commonLetter === commonLetter.toUpperCase()
                ? commonLetter.charCodeAt(0) - 38
                : commonLetter.charCodeAt(0) - 96;
    });
    return sum;
};

console.log('Sum of Badge Prioroites:', getBadgeCharCodeTotal(readFile(file)));
