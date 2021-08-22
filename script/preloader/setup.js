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

tryout(function() {
	let location = getWorldsStorageLocation(),
		outputPath = getModificationWorldDirectory(),
		worldPath = isHorizon ? "world-horizon.zip" : "world.zip";
	worldPath = new java.io.File(__dir__ + "assets", worldPath);
	outputPath = new java.io.File(location, outputPath);
	if (!IN_CREATIVE && outputPath.exists()) {
		removeDirectory(outputPath);
	}
	if (!outputPath.exists()) {
		unpackZip(worldPath, location);
	}
}, function(e) {
	worldExtractionError = e;
});
