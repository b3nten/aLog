import esbuild from "npm:esbuild"

await esbuild.build({
		entryPoints: ["./mod.ts"],
		bundle: true,
		minify: true,
		target: "esnext",
		outfile: "./mod.js",
})

