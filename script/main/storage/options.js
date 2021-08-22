const Preferences = {
	unknown: {
		night: String(gameNight)
	},
	loaded: new Object()
};

Preferences.load = function() {
	let file = new java.io.File(Dirs.STORAGE, "progression.txt");
	if (!file.exists()) {
		Files.createNewWithParent(file);
	}
	this.loaded = Files.readKey(file);
};

Preferences.get = function(name) {
	return this.loaded[name] || this.unknown[name];
};

Preferences.save = function(name, str) {
	this.loaded[name] = String(str);
	let file = new java.io.File(Dirs.STORAGE, "progression.txt");
	Files.writeKey(file, this.loaded);
};
