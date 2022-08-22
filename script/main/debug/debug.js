const Development = {
	showButton: false,
	logicEnabled: !IN_CREATIVE,
	maximumLogged: 5 + (DEVELOP * 10),
	modelPlacer: false,
	showLog: false
};

/**
 * Default pixelated typeface.
 */
const getTypeface = function() {
	return AssetFactory.createFont();
};

const coordsSave = function(block, coords) {
	try {
		let file = new java.io.File(Dirs.TODO, "coords.js");
		let text = Files.read(file, true), index = 0;
		if (text.length > 0) index = text.length;
		
		for (let i in BlockID) {
			if (BlockID[i] == block.id) {
				block.id = i;
				break;
			}
		}
		
		if (typeof block.id == "string") block.id = "BlockID." + block.id;
		let str = coords.x + ", " + coords.y + ", " + coords.z + ", " + block.id + ":" + block.data;
		
		let builder = getStyledDialog(index >= 10 ? "wide" : "foreground");
		builder.setTitle("Сохранение " + (typeof block.id == "string" ? "кастомного" : "ванильного") + " блока");
		builder.setMessage(android.text.Html.fromHtml(text.slice(text.length - 10).join("<br/>") + "<br/><font color=\"#33AA33\">Сейчас доступно как " + str));
		builder.setNegativeButton("Отмена", null);
		builder.setNeutralButton("Комментарий", function() {
			text.push("// " + str);
			Files.write(file, text.join("\n"));
			showHint("Закомментировано как координаты");
		});
		builder.setPositiveButton("Блок", function() {
			text.push("World.setBlock(" + str + ");");
			Files.write(file, text.join("\n"));
			showHint("Добавлено в виде установки блока");
		});
		builder.create().show();
	} catch (e) {
		reportError(e);
	}
};

let lastModel = null;

const placeModel = function(block, coords) {
	try {
		let items = [], variations = [];
		for (let i in DERenderer.rendered) {
			for (let v in DERenderer.rendered[i]) {
				variations.push([i, v]);
				let variant = DERenderer.rendered[i][v];
				items.push(i + ", " + v + " (" + variant.length + " вариантов)");
			}
		}
		if (items.length == 0) return coordsSave(block, coords);
		let builder = getStyledDialog("foreground", function(builder) {
			builder.setTitle("Выберите одну из  " + items.length + " моделей");
			builder.setItems(items, function(d, i) {
				try {
					if (coords.side == 0) coords.y--;
					else coords.y++;
					lastModel = variations[i].slice();
					DERenderer.buildParts(variations[i][0], coords, variations[i][1]);
				} catch (e) {
					reportError(e);
				}
			});
			builder.setPositiveButton("Сохранение", function() {
				coordsSave(block, coords);
			});
			if (lastModel) {
				builder.setNeutralButton("Перестроить", function() {
					try {
						if (coords.side == 0) coords.y--;
						else coords.y++;
						DERenderer.buildParts(lastModel[0], coords, lastModel[1]);
					} catch (e) {
						reportError(e);
					}
				});
			}
			builder.setNegativeButton("Отмена", null);
		}).create().show();
	} catch (e) {
		reportError(e);
	}
};

/**
 * Debug development data to current log.
 * @param {*} tag of message
 * @param {*} msg to save
 */
const log = function(tag, msg) {
	if (DEVELOP || MAY_DEBUG) {
		let file = new java.io.File(Dirs.TESTING, launchTime + ".log");
		if (!file.exists()) {
			Files.createNewWithParent(file);
			let logged = Files.listFiles(file.getParentFile(), false).reverse();
			for (let i = Development.maximumLogged; i < logged.length; i++) {
				Files.deleteRecursive(logged[i]);
			}
			Files.write(file, launchTime);
		}
		msg === undefined && (msg = tag, tag = "Runtime");
		Files.addText(file, "\n" + getTime() + " " + tag + " " + msg);
		if (LogWindow && LogWindow.isShowed) {
			handle(function() {
				LogWindow.formatLog();
			});
		}
	}
};

LOW_MEMORY_MODE && log("Startup", "Too low memory level to stable work");

Callback.addCallback("ItemUse", function(coords, item, block) {
	if (!isCorrectWorld) {
		return;
	}
	handle(function() {
		if (DEVELOP && isCorrectWorld && Development.modelPlacer) {
			if (coords.side < 2) placeModel(block, coords);
			else coordsSave(block, coords);
		}
	});
});
