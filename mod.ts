/**
 * @param hue
 * @param saturation
 * @param luminance
 * @returns Array<number> [r, g, b]
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (number: number) => {
    const k = (number + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return [f(0), f(8), f(4)];
}
/**
 * @param string
 * @param options
 * @param options.b bold
 * @param options.it italic
 * @param options.ul underline
 * @param options.fg foreground color "r;g;b"
 * @param options.bg background color "r;g;b"
 * @returns string
 */
export function format(s: string, o: {
  b?: boolean;
  it?: boolean;
  ul?: boolean;
  fg?: string;
  bg?: string;
} = {}) {
  if(typeof window !== "undefined") return s;
  let c = `${o.b ? "1;" : ""}${o.it ? "3;" : ""}${o.ul ? "4;" : ""}${
    o.fg ? `38;2;${o.fg}` : ""
  }${o.bg ? `48;2;${o.bg};` : ""}`;
  while (c.endsWith(";")) c = c.slice(0, -1);
  return `\x1b[${c}m${s}\x1b[0m\x1b[0m`;
}
/**
 * @param text - string
 * @param hue - number
 * @param saturation - number
 * @param l - number
 * @param options
 * @param options.b bold
 * @param options.it italic
 * @param options.ul underline
 * @returns
 */
export function gradient(text: string, h: number, s: number, l: number, {
  b = false,
  it = false,
  ul = false,
} = {}) {
  if (typeof window !== "undefined") return text;
  const final: string[] = [];
  const inc = 100 / text.length;
  for (let i = 0; i < text.length; i++) {
    final.push(format(text[i], {
      fg: hslToRgb(h - (inc * i), s, l).join(";") + ";",
      b,
      it,
      ul,
    }));
  }

  return final.join("");
}
/**
 * Generic writer interface
 * @interface
 * @property {function} write - write function
 * @param {string} loggerName - name of logger
 * @param {number} level - level of log
 * @param {string} levelName - name of level
 * @param {number} timestamp - timestamp of log
 * @param {unknown[]} args - arguments of log
 */
export interface Writer {
  write: (
    loggerName: string,
    level: number,
    levelName: string,
    timestamp: number,
    args: unknown[],
  ) => void;
}
/**
 * Console writer
 * @class ConsoleWriter
 * @implements {Writer}
 * @property {string} name - name of logger
 */
export class ConsoleWriter implements Writer {
  name: string;
  constructor(name: string) {
    this.name = gradient(
      `[${name}]`,
      40,
      100,
      70,
      { b: true },
    );
  }
  nameMap = {
    "DEBUG": format("DEBUG", { it: true, fg: "200;200;200;" }),
    "INFO": format("INFO", { it: true, fg: "50;255;160;" }),
    "SUCCESS": format("SUCCESS", { it: true, fg: "10;255;10;" }),
    "WARN": format("WARN", { it: true, b: true, fg: "255;150;0;" }),
    "ERROR": format("ERROR", { it: true, b: true, ul: true, fg: "255;20;0;" }),
    "FATAL": format("    FATAL    ", { b: true, bg: "255;20;0;" }),
  };
  write(
    loggerName: string,
    level: number,
    levelName: string,
    timestamp: number,
    args: unknown[],
  ) {
    // @ts-expect-error this is fine
    const n = this.nameMap[levelName];
    if (!n) {
      console.log(timestamp, this.name, ...args);
      return;
    }
    console.log(timestamp, this.name, n, ...args);
  }
}
/**
 * Logger class
 * @class aLog
 * @property {string} name - name of logger
 * @property {number} level - level of logger
 */
export default class aLog {
  static LevelDebug = 0;
  static LevelInfo = 100;
  static LevelWarn = 200;
  static LevelError = 300;
  static LevelFatal = 400;

  writer: Writer;

  constructor(
    public name = "aLog",
    public level = aLog.LevelInfo,
  ) {
    this.writer = new ConsoleWriter(name);
  }

  debug(...args: unknown[]) {
    if (this.level <= aLog.LevelDebug) {
      this.writer.write(
        this.name,
        aLog.LevelDebug,
        "DEBUG",
        performance.now(),
        args,
      );
    }
  }
  info(...args: unknown[]) {
    if (this.level <= aLog.LevelInfo) {
      this.writer.write(
        this.name,
        aLog.LevelInfo,
        "INFO",
        performance.now(),
        args,
      );
    }
  }
  success(...args: unknown[]) {
    if (this.level <= aLog.LevelInfo) {
      this.writer.write(
        this.name,
        aLog.LevelInfo,
        "SUCCESS",
        performance.now(),
        args,
      );
    }
  }
  warn(...args: unknown[]) {
    if (this.level <= aLog.LevelWarn) {
      this.writer.write(
        this.name,
        aLog.LevelWarn,
        "WARN",
        performance.now(),
        args,
      );
    }
  }
  error(...args: unknown[]) {
    if (this.level <= aLog.LevelError) {
      this.writer.write(
        this.name,
        aLog.LevelError,
        "ERROR",
        performance.now(),
        args,
      );
    }
  }
  fatal(...args: unknown[]) {
    if (this.level <= aLog.LevelFatal) {
      this.writer.write(
        this.name,
        aLog.LevelFatal,
        "FATAL",
        performance.now(),
        args,
      );
    }
  }
  shout(...args: unknown[]) {
    this.writer.write(
      this.name,
      aLog.LevelFatal,
      "",
      performance.now(),
      args,
    );
  }
  whisper(...args: unknown[]) {
    this.writer.write(
      this.name,
      aLog.LevelInfo,
      "",
      performance.now(),
      args,
    );
  }
}
