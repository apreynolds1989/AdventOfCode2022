import { readFileSync } from 'fs';
const file = 'input.txt';

const splitFile = (filename: string, top: boolean): string[] => {
    const fileContents = readFileSync(filename, 'utf-8').split(/\r?\n/);
    const emptyIndex = fileContents.indexOf('');
    return top
        ? fileContents.splice(0, emptyIndex)
        : fileContents.splice(emptyIndex + 1, fileContents.length + 1);
};

const crateStacksFileArr = splitFile(file, true);
const proceduresFileArr = splitFile(file, false);

// Re-arrange Crate Stacks File Array into useable arrays
const indexString = crateStacksFileArr[crateStacksFileArr.length - 1];
const crateStacks: (string | undefined)[][] = [];

for (let i = 0; i < indexString.length; i++) {
    if (/[1-9]/.test(indexString[i])) {
        const arr = crateStacksFileArr
            .map((char) => char[i])
            .reverse()
            .slice(1, crateStacksFileArr.length);
        crateStacks.push(arr);
    }
}
const crateStacksArr = crateStacks.map((stack) => stack.filter((element) => element !== ' '));

// Get Procedure Numbers for following rules:
// Index 0: How many stacks to move (moving 1 at a time)
// Index 1: Stack to Move from
// Index 2: Stacks to move to
const procedures = proceduresFileArr.map((procedure) =>
    procedure
        .replaceAll(/[a-zA-Z]/gi, '')
        .trim()
        .split(' ')
        .filter((char) => char !== '')
        .map(Number)
);

// Re-arrange Stacks and get the Top Crates
const crateMover9000 = (procedures: number[][], stacks: (string | undefined)[][]) => {
    procedures.forEach((procedure) => {
        for (let i = 0; i < procedure[0]; i++) {
            stacks[procedure[2] - 1].push(stacks[procedure[1] - 1].pop());
        }
    });
    return stacks;
};

const topCrates = crateMover9000(procedures, crateStacksArr)
    .map((stack) => stack[stack.length - 1])
    .toString()
    .replaceAll(',', '');

console.log('Top Crates:', topCrates);

/// Part Two ///

const crateStacksArr2 = crateStacks.map((stack) => stack.filter((element) => element !== ' '));

const crateMover9001 = (procedures: number[][], stacks: (string | undefined)[][]) => {
    // Turn on Air Conditioning
    // Admire Leather seats
    // Place ANOTHER coffee in the EXTRA cup holder

    procedures.forEach((procedure) => {
        const movingCrates = stacks[procedure[1] - 1].slice(
            stacks[procedure[1] - 1].length - procedure[0],
            stacks[procedure[1] - 1].length
        );
        stacks[procedure[1] - 1].splice(stacks[procedure[1] - 1].length - procedure[0]);
        const newStack = stacks[procedure[2] - 1].concat(movingCrates);
        stacks[procedure[2] - 1] = newStack;
    });
    return stacks;
};

const topCratesAsDoneByCrateMover9001 = crateMover9001(procedures, crateStacksArr2)
    .map((stack) => stack[stack.length - 1])
    .toString()
    .replaceAll(',', '');

console.log('Top Crates as done by CrateMover9001:', topCratesAsDoneByCrateMover9001);
