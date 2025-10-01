import textSegmentation from './text-segmentation/index.js';
import addLineBreakBetweenSentences from './line-break-between-sentences/index.js';
import foldWords from './fold/index.js';
import divideIntoTwoLines from './divide-into-two-lines/index.js';

interface Word {
  id?: number;
  start: number;
  end: number;
  text: string;
}

/**
 * Takes in array of word object,
 *  and returns string containing all the text
 * @param {array} words - Words
 */
function getTextFromWordsList(words: Word[]): string {
  return words.map((word) => {return word.text;}).join(' ');
}

/**
 *
 * @param {*} textInput - can be either plain text string or an array of word objects
 */
function preSegmentText(textInput: Word[] | string, tmpNumberOfCharPerLine = 35): string {
  let text: string;
  if (Array.isArray(textInput)) {
    text = getTextFromWordsList(textInput);
  } else {
    text = textInput;
  }
  const segmentedText = textSegmentation(text);
  // - 2.Line brek between stentences
  const textWithLineBreakBetweenSentences = addLineBreakBetweenSentences(segmentedText);
  // - 3.Fold char limit per line
  const foldedText = foldWords(textWithLineBreakBetweenSentences, tmpNumberOfCharPerLine);
  // - 4.Divide into two lines
  // console.log(foldedText)
  const textDividedIntoTwoLines = divideIntoTwoLines(foldedText);

  return textDividedIntoTwoLines;
}

export {
  preSegmentText,
  getTextFromWordsList
};

export default preSegmentText;
