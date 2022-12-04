import { readFileSync } from 'fs';

const file = 'input.txt';

const readFile = (filename: string): number[][] => {
    const array = readFileSync(filename, 'utf-8').replaceAll('-', ',').split(/\r?\n/);
    return array.reduce((innerArr: number[][], string) => {
        const array = string.split(',').map(Number);
        innerArr.push(array);
        return innerArr;
    }, []);
};

const assignments = readFile(file);

const test = [
    [2, 4, 6, 8],
    [2, 3, 4, 5],
    [5, 7, 7, 9],
    [2, 8, 3, 7],
    [6, 6, 4, 6],
    [2, 6, 4, 8],
];

const containedAssignments = assignments.filter(
    (pairs) =>
        (pairs[0] >= pairs[2] && pairs[1] <= pairs[3]) ||
        (pairs[0] <= pairs[2] && pairs[1] >= pairs[3])
);
console.log(containedAssignments.length);
