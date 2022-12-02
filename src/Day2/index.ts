import { readFileSync } from 'fs';

const file = 'input.txt';

const readFile = (filename: string): string[][] => {
    const fileContents = readFileSync(filename, 'utf-8').split(/\r?\n/);

    return fileContents.map((string) => string.split(' '));
};

const testInput = [
    ['A', 'Y'],
    ['B', 'X'],
    ['C', 'Z'],
];

const decipherChoices = (arr: string[][]): (string | undefined)[][] => {
    return arr.map((innerArr) =>
        innerArr.map((element) => {
            switch (element) {
                case 'A':
                case 'X':
                    return 'Rock';
                case 'B':
                case 'Y':
                    return 'Paper';
                case 'C':
                case 'Z':
                    return 'Scissors';
                default:
                    break;
            }
        })
    );
};

const tallyPoints = (arr: (string | undefined)[][]) => {
    let sum = 0;
    arr.forEach((innerArr) => {
        switch (innerArr[1]) {
            case 'Rock':
                sum += 1;
                switch (innerArr[0]) {
                    case 'Rock':
                        sum += 3;
                        break;
                    case 'Paper':
                        break;
                    case 'Scissors':
                        sum += 6;
                        break;
                    default:
                        break;
                }
                break;
            case 'Paper':
                sum += 2;
                switch (innerArr[0]) {
                    case 'Rock':
                        sum += 6;
                        break;
                    case 'Paper':
                        sum += 3;
                        break;
                    case 'Scissors':
                        break;
                    default:
                        break;
                }
                break;
            case 'Scissors':
                sum += 3;
                switch (innerArr[0]) {
                    case 'Rock':
                        break;
                    case 'Paper':
                        sum += 6;
                        break;
                    case 'Scissors':
                        sum += 3;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });
    return sum;
};

const array = decipherChoices(readFile(file));
console.log('Total:', tallyPoints(array));
