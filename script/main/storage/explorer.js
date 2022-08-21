MCSystem.setLoadingTip(NAME + ": Preparing APIs");

const Dirs = {
	EXTERNAL: android.os.Environment.getExternalStorageDirectory(),
	DATA: android.os.Environment.getDataDirectory() + "/data/" + (isHorizon ? getContext().getPackageName() : "com.zhekasmirnov.innercore") + "/",
	MOD: isHorizon ? __packdir__ + "innercore/mods/" : "/games/com.mojang/mods/",
	WORLD: isHorizon ? __packdir__ + "worlds/" : "/games/com.mojang/innercoreWorlds/",
	OPTION: isHorizon ? "/games/horizon/minecraftpe/options.txt" : "/games/com.mojang/minecraftpe/options.txt",
	LOGGING: __dir__ + ".logging/",
	TODO: __dir__ + ".todo/",
	EVALUATE: __dir__ + ".todo/.eval/",
	TESTING: __dir__ + ".todo/logging/"
};

Dirs.STORAGE = Dirs.DATA + "files/.ntfnaf/";

try {
	for (let item in Dirs) {
		if (item != "EXTERNAL" && item != "DATA" && item != "STORAGE") {
			if (!Dirs[item].startsWith(Dirs.EXTERNAL)) {
				Dirs[item] = String(Dirs.EXTERNAL + Dirs[item]);
			}
		}
	}
} catch (e) {
	reportError(e);
}

/**
 * Rounds file sizes (per 2^10 bytes).
 */
const formatSize = function(size) {
	return size < 100 ? Number(size).toFixed(2) :
		size < 1000 ? Number(size).toFixed(1) :
		size < 1024 ? Number(size).toFixed() : "?";
};

/**
 * Claimed by system media.
 */
const MediaTypes = {
	AUDIO: ["3gp", "mp4", "m4a", "aac", "ts", "flac", "gsm", "mid", "xmf",
	    "mxmf", "rtttl", "rtx", "ota", "imy", "mp3", "mkv", "wav", "ogg"],
	VIDEO: ["3gp", "mp4", "ts", "webm", "mkv"],
	IMAGE: ["bmp", "gif", "jpg", "jpeg", "png", "webp", "heic", "heif", "ico"]
};

Files.getFromAssets = function(name) {
	let assets = getContext().getAssets();
	return assets.open(name);
};

Files.readKey = function(file, separator) {
	separator = separator || "=";
	let text = this.read(file, true),
		obj = {};
	for (let i = 0; i < text.length; i++) {
		let source = text[i].split(separator);
		if (source.length == 2) obj[source[0]] = source[1];
	}
	return obj;
};

Files.writeKey = function(file, obj, separator) {
	separator = separator || "=";
	let result = [];
	for (let item in obj) {
		result.push(item + separator + obj[item]);
	}
	this.write(file, result.join("\n"));
};

Files.runScript = function(file) {
	eval(Files.read(file));
};

const Options = {};

Options.getValue = function(key) {
	let file = new java.io.File(Dirs.OPTION),
		reader = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file))),
		line = new String(),
		result = new String();
	while ((line = reader.readLine()) != null) {
		if (line.split(":")[0] == key) {
			result = line.split(":")[1];
			break;
		}
	}
	reader.close();
	return result;
};

Options.setValue = function(name, key) {
	let file = new java.io.File(Dirs.OPTION),
		reader = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file))),
		result = [],
		line;
	while ((line = reader.readLine()) != null) {
		if (line.split(":")[0] == name) {
			result.push(name + ":" + key);
		} else result.push(line);
	}
	Files.write(file, result.join("\n"));
};
