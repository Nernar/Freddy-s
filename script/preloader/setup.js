const getWorldsStorageLocation = function() {
	if (!isHorizon) {
		return android.os.Environment.getExternalStorageDirectory()
			+ "/games/com.mojang/innercoreWorlds/";
	}
	return __packdir__ + "worlds/";
};

const getModificationWorldDirectory = function() {
	return "Freddy Fazbear's";
};

const getModificationWorldName = function() {
	return "§l" + getModificationWorldDirectory();
};

const getModificationWorldLocation = function() {
	return getWorldsStorageLocation() + getModificationWorldDirectory() + "/";
};

const getEnvironmentDependentLocation = function() {
	return __dir__ + "assets/world/dependent.json";
};

let worldExtractionError = null;

tryout(function() {
	let path = new java.io.File(getEnvironmentDependentLocation()),
		environment = new Environment(path);
	environment.prepareScriptable();
	let scriptable = environment.getScriptable();
	scriptable.query.innercore = !isHorizon;
	scriptable.query.horizon = isHorizon;
	scriptable.query.legacy = isLegacy;
	let output = getModificationWorldLocation();
	scriptable.query.directory = output;
	output = new java.io.File(output);
	if (!IN_CREATIVE && output.exists()) {
		Files.deleteRecursive(output, true);
	}
	output.mkdirs();
	environment.execute();
}, function(e) {
	worldExtractionError = e;
});
