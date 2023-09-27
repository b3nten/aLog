function hslToRgb(
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

function format(s: string, o: {
  b?: boolean;
  it?: boolean;
  ul?: boolean;
  fg?: string;
  bg?: string;
} = {}) {
  let c = `${o.b ? "1;" : ""}${o.it ? "3;" : ""}${o.ul ? "4;" : ""}${
    o.fg ? `38;2;${o.fg}` : ""
  }${o.bg ? `48;2;${o.bg};` : ""}`;
  while (c.endsWith(";")) c = c.slice(0, -1);
  return `\x1b[${c}m${s}\x1b[0m\x1b[0m`;
}

export function gradient(text: string, h: number, s: number, l: number, {
  b = false,
  it = false,
  ul = false,
} = {}) {
  const final: string[] = [];
  for (let i = 0; i < text.length; i++) {
    final.push(format(text[i], {
      fg: hslToRgb(h - (12 * i), s, l).join(";") + ";",
      b,
      it,
      ul,
    }));
  }
  return final.join("");
}

// maybe have generic writer interface that a class can use to write?

export class aLog {
  static LevelDebug = 0;
  static LevelInfo = 100;
  static LevelWarn = 200;
  static LevelError = 300;
  static LevelFatal = 400;

  fName: string;
  color = [300, 100, 70];

  constructor(
    public name = "aLog",
    public level = aLog.LevelInfo,
  ) {
    this.fName = gradient(
      `[${name}]`,
      this.color[0],
      this.color[1],
      this.color[2],
      { b: true },
    );
  }

  fmt(
    level: number,
    levelName: string,
    timestamp: number,
		args: unknown[],
  ): string {
    return `${timestamp} ${this.fName} ${levelName}`;
  }

  debug(...args: unknown[]) {
    if (this.level <= aLog.LevelDebug) {
      console.log(
        this.fmt(
          aLog.LevelDebug,
          format("DEBUG", { it: true, fg: "200;200;200;" }),
          performance.now(),
          args,
        ),
				...args,
      );
    }
  }
  info(...args: unknown[]) {
    if (this.level <= aLog.LevelInfo) {
      console.log(
        this.fmt(
          aLog.LevelInfo,
          format("INFO", { it: true, fg: "50;255;160;" }),
          performance.now(),
          args,
        ),
				...args,
      );
    }
  }
  success(...args: unknown[]) {
    if (this.level <= aLog.LevelInfo) {
      console.log(
        this.fmt(
          aLog.LevelInfo,
          format("SUCCESS", { it: true, fg: "10;255;10;" }),
          performance.now(),
          args,
        ),
				...args,
      );
    }
  }
  warn(...args: unknown[]) {
    if (this.level <= aLog.LevelWarn) {
      console.log(
        this.fmt(
          aLog.LevelWarn,
          format("WARN", { it: true, b: true, fg: "255;150;0;" }),
          performance.now(),
          args,
        ),
				...args,
      );
    }
  }
  error(...args: unknown[]) {
    if (this.level <= aLog.LevelError) {
      console.log(
        this.fmt(
          aLog.LevelError,
          format("ERROR", { it: true, b: true, ul: true, fg: "255;20;0;" }),
          performance.now(),
          args,
        ),
				...args,
      );
    }
  }
  fatal(...args: unknown[]) {
    if (this.level <= aLog.LevelFatal) {
      console.log(
        "\n",
        this.fmt(
          aLog.LevelFatal,
          format("    FATAL    ", { it: true, bg: "255;20;0;", b: true }),
          performance.now(),
          args,
        ),
        "\n",
      );
    }
  }
	say(...args: unknown[]) {
		console.log(this.fName, ...args);
	}
	whisper(...args: unknown[]) {
		if(this.level <= aLog.LevelWarn){
			console.log(this.fName, ...args);
		}
	}
}
