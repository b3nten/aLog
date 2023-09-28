import aLog  from "../mod.ts";

const log = new aLog("aLOG", aLog.LevelDebug);

console.log("\n")
log.debug("Some debug thing") // won't call, below LevelInfo
log.info("this", "is", { a: true, b: false }, "?") // 0 [SERVER] INFO this is { a: true, b: false } ?
log.success("all right!")
log.warn("Uh oh")
log.error("Something went wrong")
log.fatal("I don't feel so good...")
log.shout("ALWAYS VISIBLE") // Always visible, no tag.
log.whisper("SOMETIMES VISIBLE") // Visible at LevelInfo, no tag.
console.log("\n")