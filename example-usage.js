import fs from 'fs';
import subtitlesGenerator from './src/index.js';
import type { Word, SubtitleLine } from './src/index.js';

const transcript: { words: Word[] } = JSON.parse(fs.readFileSync('./sample/words-list.sample.json', 'utf-8'));
const sampleWords = transcript.words;

function getTextFromWordsList(words: Word[]): string {
  return words.map((word) => {return word.text;}).join(' ');
}

const plainText = getTextFromWordsList(sampleWords);

const subtitlesJson = subtitlesGenerator({ words: sampleWords, type: 'json' }) as SubtitleLine[];
const ttmlPremiere = subtitlesGenerator({ words: sampleWords, type: 'premiere' }) as string;
const ittData = subtitlesGenerator({ words: sampleWords, type: 'itt' }) as string;
const ttmlData = subtitlesGenerator({ words: sampleWords, type: 'ttml' }) as string;
const srtData = subtitlesGenerator({ words: sampleWords, type: 'srt', numberOfCharPerLine: 35 }) as string;
const vttData = subtitlesGenerator({ words: sampleWords, type: 'vtt' }) as string;
const csvData = subtitlesGenerator({ words: sampleWords, type: 'csv' }) as string;
const preSegmentTextData = subtitlesGenerator({ words: sampleWords, type: 'pre-segment-txt' }) as string;
const testTet = subtitlesGenerator({ words: plainText, type: 'txt' }) as string;

fs.writeFileSync('./example-output/test.json', JSON.stringify(subtitlesJson, null, 2));
fs.writeFileSync('./example-output/test-premiere.xml', ttmlPremiere);
fs.writeFileSync('./example-output/test.itt', ittData);
fs.writeFileSync('./example-output/test.ttml', ttmlData);
fs.writeFileSync('./example-output/test.srt', srtData);
fs.writeFileSync('./example-output/test.vtt', vttData);
fs.writeFileSync('./example-output/test.csv', csvData);
fs.writeFileSync('./example-output/test-presegment.txt', preSegmentTextData);
fs.writeFileSync('./example-output/test.txt', testTet);
