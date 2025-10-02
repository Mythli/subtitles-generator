'use strict';
import removeSpaceAtBeginningOfLine from '../util/remove-space-at-beginning-of-line.js';

function divideIntoTwoLines(text: string): string {
  const lines = text.split('\n');

  let counter = 0;

  const result = lines.map((l) => {
    if (l === '') {
      return l;
    } else {
      if (counter === 0) {
        counter += 1;
        if (l[l.length - 1] === '.') {
          return l + '\n\n';
        }

        return l + '\n';
      } else if (counter === 1) {
        counter = 0;

        return l + '\n\n';
      }
    }
  });

  let stringResult = result.filter((r): r is string => r !== undefined);

  stringResult = removeSpaceAtBeginningOfLine(stringResult);
  // remove empty lines from list to avoid unwanted space a beginning of line
  stringResult = stringResult.filter(line => line.length !== 0);

  const finalResult = stringResult.join('').trim();

  return finalResult;
}

export default divideIntoTwoLines;
