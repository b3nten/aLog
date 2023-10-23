import {aLog} from "../_mod.ts";

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