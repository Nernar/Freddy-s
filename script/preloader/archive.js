const unpackZip = function(source, output) {
	let zip = new java.util.zip.ZipFile(source),
		entries = zip.entries();
	while (entries.hasMoreElements()) {
		let element = entries.nextElement(),
			result = new java.io.File(output, element.getName());
		if (element.isDirectory()) {
			result.mkdirs();
		} else {
			result.getParentFile().mkdirs();
			writeStreamToFile(zip.getInputStream(element), result);
		}
	}
	zip.close();
};

const writeStreamToFile = function(stream, file) {
	let bis = new java.io.BufferedInputStream(stream),
		fos = new java.io.FileOutputStream(file),
		bos = new java.io.BufferedOutputStream(fos),
		buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096),
		line;
	while ((line = bis.read(buffer)) >= 0) {
		bos.write(buffer, 0, line);
	}
	bis.close();
	bos.close();
};

const packZip = function(shrink, who, output) {
	let fos = new java.io.FileOutputStream(output),
		bos = new java.io.BufferedOutputStream(fos),
		zip = new java.util.zip.ZipOutputStream(bos); 
	for (let i = 0; i < who.length; i++) {
		let path = Files.shrinkPathes(shrink, who[i]);
		writeFileToZip(who[i], path, zip);
	}
	zip.close();
};

const writeFileToZip = function(path, absolute, zip) {
	let fis = new java.io.FileInputStream(path),
		bis = new java.io.BufferedInputStream(fis, 4096),
		entry = new java.util.zip.ZipEntry(absolute),
		buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096),
		line;
	zip.putNextEntry(entry);
	while ((line = bis.read(buffer, 0, 4096)) >= 0) {
		zip.write(buffer, 0, line);
	}
	bis.close();
};

const restorePathCorrection = function(prefix, path) {
	if (path && new java.io.File(path).exists()) {
		return path;
	}
	return prefix ? path ? prefix + "/" + path : prefix : path;
};
