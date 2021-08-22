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
