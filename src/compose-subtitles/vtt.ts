import formatSeconds from './util/format-seconds.js';

interface SubtitleLine {
  start: number;
  end: number;
  text: string;
}

const vttGenerator = (vttJSON: SubtitleLine[]): string => {
  let vttOut = 'WEBVTT\n\n';
  vttJSON.forEach((v, i) => {
    vttOut += `${ i + 1 }\n${ formatSeconds(v.start) } --> ${ formatSeconds(v.end) }\n${ v.text }\n\n`;
  });

  return vttOut;
};

export default vttGenerator;
