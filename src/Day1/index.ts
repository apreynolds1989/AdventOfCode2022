import { readFileSync } from 'fs';

const file = 'src/Day1/input.txt';

const readFile = (filename: string): number[] => {
    const fileContents = readFileSync(filename, 'utf-8');

    return fileContents.split(/\r?\n/).map(Number);
};

const createNestedArr = (arr: number[]) => {
    const emptyIndexNums: number[] = [];
    arr.forEach((element, index) => {
        if (element === 0) {
            emptyIndexNums.push(index);
        }
    });

    const nestedArr: number[][] = [];
    emptyIndexNums.forEach((num, index) => {
        const innerArr = arr.slice(index === 0 ? 0 : emptyIndexNums[index - 1] + 1, num);
        nestedArr.push(innerArr);
    });
    return nestedArr;
};

const getHighestTotal = (nestedArr: number[][]) => {
    const summedArr = nestedArr.map((innerArr) => innerArr.reduce((sum, num) => sum + num, 0));
    return summedArr.reduce((a, b) => Math.max(a, b));
};

console.log('Highest: ', getHighestTotal(createNestedArr(readFile(file))));

/// PART TWO ///

const getThreeHighest = (nestedArr: number[][]) => {
    const summedArr = nestedArr
        .map((innerArr) => innerArr.reduce((sum, num) => sum + num, 0))
        .sort((a, b) => a - b)
        .reverse();
    return summedArr.splice(0, 3).reduce((sum, num) => sum + num);
};

console.log('Three Highest:', getThreeHighest(createNestedArr(readFile(file))));
