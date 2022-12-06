import { readFileSync } from 'fs';

const file = 'input.txt';

const readFile = (filename: string): string => {
    return readFileSync(filename, 'utf-8');
};

const datastreamBuffer = readFile(file);
const splitData = datastreamBuffer.split('');

const isUnique = (arrToTest: string[]) => arrToTest.length === new Set(arrToTest).size;

const subroutineReducer = (data: string[], num: number) => {
    const reducedData = data.reduce((markerArr: string[], curData, index) => {
        if (markerArr.length < num) {
            const slice = data.slice(index + 1, index + num);
            const sliceContainsData = slice.includes(curData) ? true : false;
            if (!sliceContainsData) markerArr.push(...data.slice(index, index + num));
            markerArr = isUnique(markerArr) ? markerArr : [];
        }
        return markerArr;
    }, []);
    return reducedData.join('');
};

const firstMarker = datastreamBuffer.indexOf(subroutineReducer(splitData, 4)) + 4;

console.log(firstMarker);

/// PART TWO ///

const messageMarker = datastreamBuffer.indexOf(subroutineReducer(splitData, 14)) + 14;

console.log(messageMarker);
