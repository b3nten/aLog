function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export class aLog {
  static LevelDebug = 100;
  static LevelInfo = 200;
  static LevelSuccess = 200;
  static LevelWarn = 300;
  static LevelError = 400;
  static LevelFatal = 500;
  static LevelProduction = 600;

  private name: string;
  private level: number;
  private color: [number, number, number];
  private gName: { s: string; c: string[] };

  constructor({
    name,
    color,
    level,
  }: {
    name?: string;
    color?: [hue: number, saturation: number, luminance: number];
    level?: number;
    timestamp?: boolean;
  }) {
    this.color = color ?? [40, 100, 70];
    this.level = level ?? aLog.LevelInfo;
    this.name = name ? `[${name}]` : "[LOG]";
    this.gName = this.#g(this.name);
  }

  public debug = (...args: unknown[]) =>
    this.#log(aLog.LevelDebug, true, ...args);
  public info = (...args: unknown[]) =>
    this.#log(aLog.LevelInfo, true, ...args);
  public success = (...args: unknown[]) =>
    this.#log(aLog.LevelSuccess, true, ...args);
  public warn = (...args: unknown[]) =>
    this.#log(aLog.LevelWarn, true, ...args);
  public error = (...args: unknown[]) =>
    this.#log(aLog.LevelError, true, ...args);
  public critical = (...args: unknown[]) =>
    this.#log(aLog.LevelFatal, true, ...args);
  public whisper = (...args: unknown[]) =>
    this.#log(aLog.LevelInfo, false, ...args);
  public shout = (...args: unknown[]) =>
    this.#log(aLog.LevelProduction, false, ...args);
  public speak = (...args: unknown[]) =>
    this.#log(aLog.LevelWarn, false, ...args);

  #ln = (level: number) => {
    switch (true) {
      case level <= aLog.LevelDebug:
        return { n: "DEBUG", c: "color: #ccc; font-style: italic;" };
      case level <= aLog.LevelInfo:
        return {
          n: "INFO",
          c: "color: #32a852; font-style: italic; font-weight: bold;",
        };
      case level <= aLog.LevelSuccess:
        return {
          n: "SUCCESS",
          c: "color: #32a852; font-style: italic; font-weight: bold;",
        };
      case level <= aLog.LevelWarn:
        return {
          n: "WARN",
          c: "color: #ff9600; font-style: italic; font-weight: bold;",
        };
      case level <= aLog.LevelError:
        return {
          n: "ERROR",
          c: "color: #ff1400; font-style: italic; font-weight: bold; text-decoration: underline;",
        };
      case level <= aLog.LevelFatal:
        return {
          n: "   FATAL   ",
          c: "color: black; font-style: italic; font-weight: bold; background-color: red;",
        };
      case level <= aLog.LevelProduction:
      default:
        return null;
    }
  };

  #g = (t: string) => {
    const d = 100 / t.length;
    return {
      s: "%c" + t.split("").join("%c"),
      c: t.split("").map((_, i) =>
        `color: ${hslToHex(this.color[0] - (i * d), this.color[1], this.color[2])}; font-weight: bold;`
      ),
    };
  };

  #log = (level: number, tag: boolean, ...args: unknown[]): void => {
    if (level < this.level) return;
    const ln = this.#ln(level);
    console.log(
      `${this.gName.s}${tag ? " %c" + ln?.n : ""}`,
      ...this.gName.c.concat(tag ? ln?.c! : []),
      ...args,
    );
  };
}

const log = new aLog({
  name: "SERVER",
  level: aLog.LevelDebug,
});

console.log("\n")
log.debug("Some debug thing") // won't call, below LevelInfo
log.info("this", "is", { a: true, b: false }, "?") // 0 [SERVER] INFO this is { a: true, b: false } ?
log.success("all right!")
log.warn("Uh oh")
log.error("Something went wrong")
log.critical("I don't feel so good...")
log.shout("ALWAYS VISIBLE") // Always visible, no tag.
log.whisper("SOMETIMES VISIBLE") // Visible at LevelInfo, no tag.
log.speak("SOMETIMES VISIBLE") // Visible at LevelWarn, no tag.
console.log("\n")