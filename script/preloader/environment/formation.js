Object.defineProperty(Environment, "Formation", {
	value: function(environment, stroke) {
		this.environment = environment;
		if (typeof stroke == "string") {
			this.parse(stroke);
		} else {
			log("Environment formation must be string");
		}
	},
	enumerable: true,
	writable: false
});

Environment.Formation.prototype.getEnvironment = function() {
	return this.environment || null;
};

Environment.Formation.prototype.getBuffer = function() {
	return this.buffer || null;
};

Environment.Formation.prototype.parse = function(stroke) {
	let formation = [],
		bufferDefault = null,
		bufferRuntime = null;
	for (let i = 0; i < stroke.length; i++) {
		let char = stroke.charAt(i);
		if (char == "`") {
			if (bufferRuntime) {
				formation.push(bufferRuntime);
				bufferRuntime = null;
			} else {
				bufferRuntime = new Environment.Formation.Runtime(this.getEnvironment());
				if (bufferDefault) {
					formation.push(bufferDefault);
					bufferDefault = null;
				}
			}
		} else if (bufferRuntime) {
			bufferRuntime.append(char);
		} else {
			if (!bufferDefault) {
				bufferDefault = new String();
			}
			bufferDefault = bufferDefault.concat(char);
		}
	}
	if (bufferRuntime) {
		log("Environment formation runtime buffer must be closed");
		formation.push(bufferRuntime);
	} else if (bufferDefault) {
		formation.push(bufferDefault);
	}
	if (!this.hasOwnProperty("buffer")) {
		this.buffer = formation;
	} else {
		this.buffer = this.buffer.concat(formation);
	}
};

Environment.Formation.prototype.format = function() {
	let buffer = this.getBuffer();
	if (buffer == null) {
		return new String();
	}
	return buffer.concat().map(function(value) {
		if (value instanceof Environment.Formation.Runtime) {
			return value.run();
		}
		return value;
	}).join(new String());
};

Object.defineProperty(Environment.Formation, "Runtime", {
	value: function(environment, buffer) {
		this.environment = environment;
		if (typeof buffer == "string") {
			this.buffer = buffer;
		} else {
			this.buffer = new String();
		}
	}
});

Environment.Formation.Runtime.prototype.getEnvironment = function() {
	return this.environment || null;
};

Environment.Formation.Runtime.prototype.getBuffer = function() {
	return this.buffer || null;
};

Environment.Formation.Runtime.prototype.append = function(who) {
	this.buffer = this.buffer.concat(who);
};

Environment.Formation.Runtime.prototype.run = function() {
	return this.getEnvironment().evaluateString(this.getBuffer());
};

Environment.Formation.Runtime.prototype.test = function() {
	return this.run() == true;
};

const parseFormation = function(environment, stroke) {
	return new Environment.Formation(environment, stroke).format();
};

const instanceOrFormat = function(value) {
	if (value instanceof Environment.Formation) {
		return value.format();
	}
	return value;
};
