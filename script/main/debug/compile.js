/**
 * Convert `/models/joined` to `/models`.
 */
const convertModels = function() {
	let path = new java.io.File(__dir__ + "models/joined"),
		models = path.exists() ? path.listFiles() : [], blocks = {};
	for (let i = 0; i < models.length; i++) {
		if (models[i].isDirectory()) continue;
		MCSystem.setLoadingTip(NAME + ": Converting DERenderer " + (i + 1) + "/" + models.length);
		let name = String(models[i].getName()).replace(".js", new String()), buffer = [],
			time = Date.now(), lines = Files.read(models[i], true), variation = 0, part = [0, 0, 0];
		if (!blocks[name]) blocks[name] = [];
		for (let l = 0; l < lines.length; l++) {
			let line = lines[l].trim();
			if (line.startsWith("// variant: ")) {
				variation = parseInt(line.substring(12));
			} else if (line.startsWith("// block ")) {
				part = eval("[" + line.substring(9) + "]");
			} else if (line.length > 0) {
				buffer.push(line);
			}
			if (line.length == 0 || l == lines.length - 1) {
				let model = {
					boxes: [],
					addBox: function() {
						this.boxes.push(Array.prototype.slice.call(arguments));
					}
				};
				let shape = {
					boxes: [],
					addBox: function() {
						this.boxes.push(Array.prototype.slice.call(arguments));
					}
				};
				eval(buffer.join("\n"));
				buffer = [];
				if (!blocks[name][variation]) blocks[name][variation] = [];
				log("Development", name + ": " + variation + " / " + blocks[name].length);
				blocks[name][variation].push([part, model.boxes, shape.boxes]);
			}
		}
		let file = new java.io.File(__dir__ + "models", name + ".json");
		log("DERenderer", "Converted " + name + " (took " + (Date.now() - time) + " ms)");
		Files.deleteRecursive(file.getPath());
		Files.write(file, JSON.stringify(blocks[name], null, "\t"));
	}
};
