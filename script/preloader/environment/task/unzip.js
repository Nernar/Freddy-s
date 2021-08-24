Object.defineProperty(Environment.Task, "Unpack", {
	value: function(environment, json) {
		Environment.Task.apply(this, arguments);
	},
	enumerable: true,
	writable: false
});

Environment.Task.Unpack.prototype = new Environment.Task;
Environment.Task.Unpack.prototype.SUBTASK = Environment.Task.Unpack;

Environment.Task.Unpack.prototype.parseJson = function(json) {
	Environment.Task.prototype.parseJson.apply(this, arguments);
	if (json != null && typeof json == "object") {
		if (json.hasOwnProperty("output") && json.output) {
			this.output = new Environment.Formation(this.getEnvironment(), json.output);
		}
		if (json.hasOwnProperty("path") && json.path) {
			this.path = new Environment.Formation(this.getEnvironment(), json.path);
		}
	} else if (typeof json == "string") {
		this.path = new Environment.Formation(this.getEnvironment(), json);
	} else {
		log("Unpack task must be object or string")
	}
};

Environment.Task.Unpack.prototype.getPath = function() {
	let prefix = this.getEnvironment().getPath(),
		path = instanceOrFormat(this.path) || null;
	return restorePathCorrection(prefix, path);
};

Environment.Task.Unpack.prototype.getOutput = function() {
	let prefix = this.getEnvironment().getPath(),
		path = instanceOrFormat(this.output) || null;
	return restorePathCorrection(prefix, path);
};

Environment.Task.Unpack.prototype.process = function() {
	unpackZip(this.getPath(), this.getOutput());
	return true;
};

Environment.Task.registerTask("unzip", Environment.Task.Unpack);
Environment.Task.registerTask("unpack", Environment.Task.Unpack);
Environment.Task.registerTask("explorer:unzip", Environment.Task.Unpack);
Environment.Task.registerTask("explorer:unpack", Environment.Task.Unpack);
