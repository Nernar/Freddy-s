const DERenderer = {
	loaded: {},
	rendered: {},
	translated: {}
};

/**
 * Directly load specified model file from
 * `/models` directory in .der extension.
 * @param {string} name as relative path
 */
DERenderer.load = function(name) {
	name.endsWith(".der") && (name = name.substring(0, name.length - 4));
	let file = new java.io.File(__dir__ + "models", name + ".der");
	if (!file.exists()) return log("DERenderer", "Cannot find: " + name);
	let loaded = Encyption.decrypt(Files.readBytes(file));
	eval("this.loaded[name] = " + new java.lang.String(loaded));
};

/**
 * Compile previously divided .json model
 * from `/models/array` directory to release
 * type as .der extension, that can be loaded
 * with [[DERenderer.load]] completely.
 * @param {string} name as relative path
 */
DERenderer.compile = function(name) {
	name.endsWith(".json") && (name = name.substring(0, name.length - 5));
	let file = new java.io.File(__dir__ + "models/array", name + ".json"),
		source = new java.io.File(__dir__ + "models", name + ".der");
	if (!file.exists()) return log("DERenderer", "Cannot find: " + name);
	Files.writeBytes(source, Encyption.encrypt(Files.readBytes(file)));
};

/**
 * Loading everything availabled models and
 * compiles it before if [[IN_CREATIVE]] active
 * with [[DEVELOP]] mode from `/models/array`.
 */
DERenderer.prepare = function() {
	if (DEVELOP && IN_CREATIVE) {
		let arr = FileTools.GetListOfFiles(__dir__ + "models/array", "json");
		for (let i = 0; i < arr.length; i++) {
			MCSystem.setLoadingTip(NAME + ": Saving DERenderer " + (i + 1) + "/" + arr.length);
			Files.deleteRecursive(__dir__ + "models/" + arr[i].getName().replace(".json", ".der"));
			this.compile(arr[i].getName());
		}
	}
	let list = FileTools.GetListOfFiles(__dir__ + "models", "der");
	for (let i = 0; i < list.length; i++) {
		MCSystem.setLoadingTip(NAME + ": Loading DERenderer " + (i + 1) + "/" + list.length);
		this.load(list[i].getName());
	}
};

/**
 * If specified model previously loaded, sets
 * it on specified coordinates in-world.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {number} z coordinate
 * @param {string} name of model
 * @param {number} variation of model
 * Or may be applied with callback location.
 * @param {object} x coordinates object
 * @param {string} y as model name
 * @param {number} z as variation
 */
DERenderer.buildParts = function(x, y, z, name, variation) {
	typeof y == "object" && (name = x, variation = z, x = y.x, y = y.y, z = z.z);
	variation === undefined && (variation = 0);
	if (!this.rendered[name]) return log("DERenderer", "Not rendered " + name);
	let rendered = this.rendered[name][variation];
	if (!rendered) return log("DERenderer", "No variation: " + name + ", " + variation);
	let renderer = this.loaded[name][variation];
	for (let i = 0; i < renderer.length; i++) {
		let part = renderer[i][0];
		World.setBlock(x + part[0], y + part[1], z + part[2], rendered[i][0], rendered[i][1]);
	}
};

/**
 * @ignore
 */
DERenderer.getNextMeta = function(id, name, variation) {
	let rendered = this.rendered[name], current = 0;
	if (!rendered || rendered.length < variation) {
		return log("DERenderer", "Cannot locate: " + name);
	}
	for (let i = 0; i <= variation; i++) {
		if (rendered[i][0] && rendered[i][0][0] == id) {
			current += rendered[i].length;
		}
	}
	return current;
};

/**
 * Determines translation, that used to loading
 * model texture by specified identifier and data.
 * @param {number} id as numeric type
 * @param {number} data as variation
 * @param {object} params as locales
 * Locales must be `{ ru: ["sample_ru", 0] }`
 */
DERenderer.addTranslation = function(id, data, params) {
	if (!id) return log("DERenderer", "No base name for " + data);
	let language = Translation.getLanguage();
	if (params[language]) {
		typeof data == "undefined" && (data = 0);
		if (!this.translated[id]) this.translated[id] = {};
		this.translated[id][data] = params[language];
	}
};

/**
 * Replaces specified render textures to localization
 * pre-defined with [[addTranslation]] method.
 * @param {number} id as numeric type
 * @param {number} [data] if specified
 * Or may be applied with in-array identifier.
 * @param {Array} id identifiers to translate
 */
DERenderer.translate = function(id, data) {
	if (typeof id == "object" && Array.isArray(id[0])) {
		let result = [];
		id.forEach(function(e, i) {
			result.push(DERenderer.translate(e));
		});
		return result;
	}
	data === undefined && (data == 0);
	if (typeof id == "object") id.length > 2 ?
		(data = id[7], id = id[6]) : (data = id[1], id = id[0]);
	return this.translated[id] && this.translated[id][data]
		? this.translated[id][data] : [id, data];
};

/**
 * Changes specified block render(s) by given
 * loaded model name (or may called identifier).
 * All availabled variations will be applied to
 * block if [[variation]] doesn't specified.
 * @param {number} id as numeric type
 * @param {string} name of model
 * @param {number} [variation]
 */
DERenderer.setStaticRender = function(id, name, variation) {
	variation === undefined && (variation = -1);
	if (id < 0) return log("DERenderer", "Invalid identificator: " + id);
	if (!this.loaded[name]) return log("DERenderer", "Not loaded: " + name);
	if (!this.rendered[name]) this.rendered[name] = [];
	let hasCycle = variation == -1;
	hasCycle && (variation = this.rendered[name].length);
	let renderer = this.loaded[name][variation];
	if (!renderer) return;
	this.rendered[name][variation] = [];
	for (let i = 0; i < renderer.length; i++) {
		let boxes = renderer[i][1], collision = renderer[i][2];
		let meta = this.getNextMeta(id, name, variation);
		let render = new ICRender.Model();
		BlockRenderer.setStaticICRender(id, meta, render);
		let model = BlockRenderer.createModel();
		for (let b = 0; b < boxes.length; b++) {
			let box = boxes[b], translated = this.translate(box[6], box[7]);
			typeof translated[0] == "string" ? (box[6] = translated[0], box[7] = translated[1]) : (box[6] = translated);
			model.addBox.apply(model, box);
		}
		render.addEntry(model);
		if (collision.length > 1) {
			let shape = new ICRender.CollisionShape();
			BlockRenderer.setCustomCollisionShape(id, meta, shape);
			let model = shape.addEntry();
			for (let c = 0; c < collision.length; c++)
				model.addBox.apply(model, collision[c]);
		} else if (collision.length == 1) {
			let box = collision[0];
			Block.setShape(id, box[0], box[1], box[2], box[3], box[4], box[5], meta);
		}
		this.rendered[name][variation].push([id, meta]);
	}
	if (hasCycle) this.setStaticRender(id, name, -1);
};

/**
 * Just helper function to setup absolutely empty
 * render and collision to specified block.
 * @param {number} id as numeric type
 * @param {number} [meta] if specified
 */
DERenderer.setEmptyRender = function(id, meta) {
	meta === undefined && (meta = -1);
	if (id < 0) return log("DERenderer", "Invalid identificator: " + id);
	BlockRenderer.setStaticICRender(id, meta, new ICRender.Model());
	BlockRenderer.setCustomCollisionShape(id, meta, new ICRender.CollisionShape());
};
