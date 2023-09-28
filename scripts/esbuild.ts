import esbuild from "npm:esbuild"

await esbuild.build({
		entryPoints: ["./mod.ts"],
		bundle: true,
		minify: true,
		outfile: "./mod.js",
})

