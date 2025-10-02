import formatSeconds from './util/format-seconds.js';

interface SubtitleLine {
  start: number;
  end: number;
  text: string;
}

const srtGenerator = (vttJSON: SubtitleLine[]): string => {
  let srtOut = '';
  vttJSON.forEach((v, i) => {
    srtOut += `${ i + 1 }\n${ formatSeconds(v.start).replace('.', ',') } --> ${ formatSeconds(v.end).replace('.', ',') }\n${ v.text.trim() }\n\n`;
  });

  return srtOut;
};

export default srtGenerator;
