isHorizon = (function() {
	try {
		return Packages.com.zhekasmirnov.innercore.api.Version.INNER_CORE_VERSION.level >= 10;
	} catch (e) {
		return false;
	}
})();

isLegacy = (function() {
	try {
		return Packages.com.zhekasmirnov.apparatus.minecraft.version.MinecraftVersions.getCurrent().getCode() == 11;
	} catch (e) {
		return isHorizon;
	}
})();

$ = new JavaImporter(isHorizon ? Packages.com.zhekasmirnov.innercore.mod.build : Packages.zhekasmirnov.launcher.mod.build);
compileOrLoadExecutable = $.ModBuilder.__javaObject__.getDeclaredMethod("compileOrLoadExecutable", $.Mod.__javaObject__, $.CompiledSources.__javaObject__, $.BuildConfig.Source.__javaObject__);
compileOrLoadExecutable.setAccessible(true);

loadLibrary = function(sourceName) {
	try {
		for (let i = 0; i < __mod__.buildConfig.sourcesToCompile.size(); i++) {
			let source = __mod__.buildConfig.sourcesToCompile.get(i);
			if (source.sourceName == sourceName && (!isHorizon || isLegacy || source.gameVersion.isCompatible())) {
				if (source.apiInstance == null) {
					log("could not find api for " + source.path + ", maybe it is missing in build.config or name is incorrect, compilation failed.");
				} else {
					let library = compileOrLoadExecutable.invoke(null, __mod__, __mod__.createCompiledSources(), source);
					__mod__.onImportExecutable(library);
					library.initialize();
				}
				return;
			}
		}
	} catch (e) {
		log("loadLibrary: " + e);
		return;
	}
	log("could not find library " + sourceName + ", maybe it is missing in build.config or name is incorrect, compilation failed.");
};

loadLibrary("Files.js");
IMPORT("Files");
loadLibrary("Environment.js");
IMPORT("Environment");

let worldExtractionError = null;

try {
	let path = new java.io.File(getEnvironmentDependentLocation());
	let output = getModificationWorldLocation();
	let outputFile = new java.io.File(output);
	if (!IN_CREATIVE && outputFile.exists()) {
		Files.deleteRecursive(outputFile, true);
	}
	outputFile.mkdirs();
	executeInEnvironment(path, {
		innercore: !isHorizon,
		horizon: isHorizon,
		legacy: isLegacy,
		directory: output
	});
} catch (e) {
	worldExtractionError = e;
}
