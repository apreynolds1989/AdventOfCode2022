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

const containedAssignments = assignments.filter(
    (pairs) =>
        (pairs[0] >= pairs[2] && pairs[1] <= pairs[3]) ||
        (pairs[0] <= pairs[2] && pairs[1] >= pairs[3])
);
console.log(containedAssignments.length);

/// Part Two ///

const noOverlapAssignments = assignments.filter(
    (pairs) => pairs[1] < pairs[2] || pairs[3] < pairs[0]
);
const overlappingAssignments = assignments.length - noOverlapAssignments.length;

console.log(overlappingAssignments);
