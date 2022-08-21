const AssetFactory = {
	loaded: {}
};

AssetFactory.loadAsset = function(key, path) {
	return (this.loaded[key] = new java.io.File(__dir__ + "assets", path));
};

AssetFactory.createFont = function(key) {
	let loaded = this.getFile(key + "Font") || this.getFile("minecraftFont"), exists = loaded && loaded.exists();
	return exists ? android.graphics.Typeface.createFromFile(loaded) : android.graphics.Typeface.MONOSPACE;
};

AssetFactory.getFile = function(key) {
	return this.loaded[key];
};

const ImageFactory = {
	loaded: {}
};

ImageFactory.loadFromFile = function(key, path) {
	let file = new java.io.File(__dir__ + "gui", path);
	this.loaded[key] = android.graphics.BitmapFactory.decodeFile(file);
	return {
		compress: function(min, max) {
			ImageFactory.compressBitmap(key, min, max);
		}
	};
};

ImageFactory.getCountByTag = function(tag) {
	let count = 0;
	this.loaded.forEach(function(where) {
		if (where.indexOf(tag) != -1) {
			count++;
		}
	});
	return count;
};

ImageFactory.compressBitmap = function(key, min, max) {
	let size = LOW_MEMORY_MODE ? min : getDisplayHeight() > 480 ? getDisplayHeight() < 1080 ? min + getDisplayHeight() / 1560 * (max - min) : max : min,
		bitmap = this.getBitmap(key), width = bitmap.getWidth(), height = bitmap.getHeight(), dx = Math.ceil(width * size), dy = Math.ceil(height * size);
	this.loaded[key] = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bitmap, 0, 0, width, height), dx, dy, false);
};

ImageFactory.getBitmap = function(key) {
	return this.loaded[key];
};
