![a library with atoms](/.github/header.jpg)

# aLog (atomic logger)

A fast and beautiful logger in 750 bytes.

## Getting started
Deno: `import "aLog" from "https://deno.land/x/alog/mod.ts";`

NPM: `import aLog from "atomic-logger";`
```ts
// create log instance with the name "SERVER" & level "Info"
const log = new aLog("aLog", aLog.LevelInfo)

log.debug("Some debug thing") // won't call, below LevelInfo
log.info("this", "is", { a: true, b: false }, "?") // 0 [SERVER] INFO this is { a: true, b: false } ?
log.success("all right!")
log.warn("Uh oh")
log.error("Something went wrong")
log.fatal("I don't feel so good...")
log.shout("ALWAYS VISIBLE") // Always visible, no tag.
log.whisper("SOMETIMES VISIBLE") // Visible at LevelInfo, no tag.
```
![example logs](/.github/logs.PNG)
## Extending aLog

Create a writer class that inherits Writer and extend the aLog class with it. The custom writer has a single method, `write()` that takes in metadata about the log event and can console.log, write to the filesystem, or whatever you want.

You can extend or override log methods, add your own levels etc.

### Formatting Utility Functions

#### format()
`format(s: string, {b: boolean, it: boolean, it: boolean, fg: string, bg: string}): string`
Takes in a string and an object of properties, b (bold), it (italics), u (underline), fg (foreground color: "r;g;b") and bg (background color: "r;g;b"). Returns an ANSI string.

#### gradient()
`gradient(s: string, hue: number, saturation: number, luminosity: number, { b: boolean, it: boolean, u: boolean}): string`
Takes in a string, HSL values,  and an object of properties, b (bold), it (italics), u (underline). Returns an ANSI string.