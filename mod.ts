type LogMessage = {
  level: number;
  levelName?: string;
  timestamp: number;
  args: any[];
};

interface Writer {
  write(msg: LogMessage): void;
}

class TermWriter implements Writer {
	name: string;
	constructor(name: string){
		this.name = `[${name}]`
	}
	ln = {
		DEBUG: "DEBUG",
		INFO: "INFO",
		SUCCESS: "SUCCESS",
		WARN: "WARN",
		ERROR: "ERROR",
		CRITICAL: "CRITICAL",
	}
  write(msg: LogMessage): void {
    console.log();
  }
}

class BrowserWriter implements Writer {
	name: string;
	constructor(name: string){
		this.name = `[${name}]`
	}
  write(msg: LogMessage) {
    console.log(msg);
  }
}

export class aLog {
  writer = typeof window === "undefined"
    ? new TermWriter("SERVER")
    : new BrowserWriter("SERVER");
  public debug = (...args: unknown[]) =>
    this.writer.write({
      level: 100,
      levelName: "DEBUG",
      timestamp: performance.now(),
      args,
    });
  public info = (...args: unknown[]) =>
    this.writer.write({
      level: 200,
      levelName: "INFO",
      timestamp: performance.now(),
      args,
    });
  public success = (...args: unknown[]) =>
    this.writer.write({
      level: 200,
      levelName: "SUCCESS",
      timestamp: performance.now(),
      args,
    });
  public warn = (...args: unknown[]) =>
    this.writer.write({
      level: 300,
      levelName: "WARN",
      timestamp: performance.now(),
      args,
    });
  public error = (...args: unknown[]) =>
    this.writer.write({
      level: 400,
      levelName: "ERROR",
      timestamp: performance.now(),
      args,
    });
  public critical = (...args: unknown[]) =>
    this.writer.write({
      level: 500,
      levelName: "CRITICAL",
      timestamp: performance.now(),
      args,
    });
  public whisper = (...args: unknown[]) =>
    this.writer.write({ level: 200, timestamp: performance.now(), args });
  public shout = (...args: unknown[]) =>
    this.writer.write({ level: 600, timestamp: performance.now(), args });
  public speak = (...args: unknown[]) =>
    this.writer.write({ level: 300, timestamp: performance.now(), args });
}
