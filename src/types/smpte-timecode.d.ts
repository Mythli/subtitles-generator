declare module 'smpte-timecode' {
  interface Timecode {
    toString(): string;
  }

  function TC(timecode: number | string | Date, frameRate?: number, dropFrame?: boolean): Timecode;

  export default TC;
}
