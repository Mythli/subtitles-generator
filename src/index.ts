import textSegmentation from './presegment-text/text-segmentation/index.js';
import addLineBreakBetweenSentences from './presegment-text/line-break-between-sentences/index.js';
import foldWords from './presegment-text/fold/index.js';
import divideIntoTwoLines from './presegment-text/divide-into-two-lines/index.js';
import preSegmentText from './presegment-text/index.js';
import { getTextFromWordsList } from './presegment-text/index.js';

import ttmlGeneratorPremiere from './compose-subtitles/premiere.js';
import ittGenerator from './compose-subtitles/itt.js';
import ttmlGenerator from './compose-subtitles/ttml.js';
import srtGenerator from './compose-subtitles/srt.js';
import vttGenerator from './compose-subtitles/vtt.js';
import csvGenerator from './compose-subtitles/csv.js';

export interface Word {
  id?: number;
  start: number;
  end: number;
  text: string;
}

export interface SubtitleLine {
  start: number;
  end: number;
  text: string;
}

function segmentedTextToList(text: string): string[] {
  let result = text.split('\n\n');
  result = result.map(line => {
    return line.trim();
  });

  return result;
}

function countWords(text: string): number {
  return text
    .trim()
    .replace(/\n /g, '')
    .replace(/\n/g, ' ')
    .split(' ').length;
}

function addTimecodesToLines(wordsList: Word[], lines: string[]): SubtitleLine[] {
  let startWordCounter = 0;
  let endWordCounter = 0;
  const results = lines.map((line) => {
    endWordCounter += countWords(line);
    const jsonLine: Partial<SubtitleLine> = { text: line.trim() };
    jsonLine.start = wordsList[startWordCounter].start;
    jsonLine.end = wordsList[endWordCounter - 1].end;
    startWordCounter = endWordCounter;

    return jsonLine as SubtitleLine;
  });

  return results;
}

function preSegmentTextJson(wordsList: Word[], numberOfCharPerLine?: number): SubtitleLine[] {
  const result = preSegmentText(wordsList, numberOfCharPerLine);
  const segmentedTextArray = segmentedTextToList(result);

  return addTimecodesToLines(wordsList, segmentedTextArray);
}

type SubtitleType = 'premiere' | 'ttml' | 'itt' | 'srt' | 'vtt' | 'json' | 'csv' | 'pre-segment-txt' | 'txt';

interface SubtitlesComposerParams {
  words: Word[] | string;
  type?: SubtitleType;
  numberOfCharPerLine?: number;
}

type SubtitlesComposerResult = string | SubtitleLine[] | {
  ttml: string;
  premiere: string;
  itt: string;
  srt: string;
  vtt: string;
  json: SubtitleLine[];
};

function subtitlesComposer({ words, type, numberOfCharPerLine }: SubtitlesComposerParams): SubtitlesComposerResult {
  if (typeof words === 'string') {
    return preSegmentText(words, numberOfCharPerLine);
  }
  const subtitlesJson = preSegmentTextJson(words, numberOfCharPerLine);

  switch (type) {
  case 'premiere':
    return ttmlGeneratorPremiere(subtitlesJson);
  case 'ttml':
    return ttmlGenerator(subtitlesJson);
  case 'itt':
    return ittGenerator(subtitlesJson);
  case 'srt':
    return srtGenerator(subtitlesJson);
  case 'vtt':
    return vttGenerator(subtitlesJson);
  case 'json':
    return subtitlesJson;
  case 'csv':
    return csvGenerator(subtitlesJson);
  case 'pre-segment-txt':
    return preSegmentText(words, numberOfCharPerLine);
  case 'txt':
    return preSegmentText(words, numberOfCharPerLine);
  default:
    return {
      ttml: ttmlGenerator(subtitlesJson),
      premiere: ttmlGeneratorPremiere(subtitlesJson),
      itt: ittGenerator(subtitlesJson),
      srt: srtGenerator(subtitlesJson),
      vtt: vttGenerator(subtitlesJson),
      json: subtitlesJson
    };
  }
}

export {
  textSegmentation,
  addLineBreakBetweenSentences,
  foldWords,
  divideIntoTwoLines,
  getTextFromWordsList,
  preSegmentText,
  ttmlGeneratorPremiere,
  ttmlGenerator,
  ittGenerator,
  srtGenerator,
  vttGenerator
};

export default subtitlesComposer;
