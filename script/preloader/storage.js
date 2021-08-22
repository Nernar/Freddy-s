const removeDirectory = function(path) {
	let file = new java.io.File(path);
	if (file.isDirectory()) {
		let list = file.listFiles();
		for (let i = 0; i < list.length; i++) {
			let directory = list[i].getPath();
			removeDirectory(directory);
		}
	}
	file.delete();
};
