const __root__ = this;

const getStyledLayout = function(style) {
	let view = new android.widget.LinearLayout(getContext());
	switch (style) {
		case "menu":
			view.setBackgroundColor(android.graphics.Color.parseColor("#AA484848"));
			break;
		case "popup":
			view.setBackgroundColor(android.graphics.Color.parseColor("#AA484848"));
			view.setPadding(20, 20, 20, 20);
			break;
		case "setting":
			view.setBackgroundColor(android.graphics.Color.parseColor("#AA464646"));
			view.setPadding(10, 10, 10, 10);
			break;
	}
	return view;
};

const getStyledButton = function(style) {
	let view = new android.widget.TextView(getContext());
	view.setTextColor(android.graphics.Color.WHITE);
	view.setTypeface(getTypeface());
	view.setPadding(45, 20, 45, 20);
	switch (style) {
		case "menu":
			view.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
			view.setBackgroundColor(android.graphics.Color.parseColor("#AA444444"));
			view.setTextSize(12);
			break;
		case "transparent":
			view.setPadding(30, 20, 30, 20);
			break;
	}
	return view;
};

const getStyledText = function(style) {
	let view = new android.widget.TextView(getContext());
	view.setTextColor(android.graphics.Color.WHITE);
	view.setTypeface(getTypeface());
	switch (style) {
		case "title":
			view.setPadding(25, 20, 25, 20);
			view.setTextSize(20);
			break;
		case "subtitle":
			view.setGravity(android.view.Gravity.CENTER);
			view.setPadding(0, 0, 0, 10);
			view.setTextSize(18);
			break;
		case "group":
			view.setTextColor(android.graphics.Color.LTGRAY);
			view.setPadding(10, 10, 10, 10);
			view.setTextSize(10);
			break;
		case "hint":
			view.setTextColor(android.graphics.Color.LTGRAY);
			view.setGravity(android.view.Gravity.CENTER);
			view.setPadding(20, 10, 20, 20);
			view.setTextSize(9);
			break;
		case "debug":
			view.setTextColor(android.graphics.Color.LTGRAY);
			view.setGravity(android.view.Gravity.CENTER);
			view.setPadding(5, 15, 5, 5);
			view.setTextSize(8);
			break;
	}
	return view;
};

const getStyledRadio = function(style) {
	let view = new android.widget.RadioButton(getContext());
	view.setTextColor(android.graphics.Color.WHITE);
	view.setTypeface(getTypeface());
	switch (style) {
		case "setting":
			view.setTextSize(10);
			break;
	}
	return view;
};

const getStyledCheck = function(style) {
	let view = new android.widget.CheckBox(getContext());
	view.setTextColor(android.graphics.Color.WHITE);
	view.setTypeface(getTypeface());
	switch (style) {
		case "setting":
			view.setTextSize(10);
			break;
	}
	return view;
};

const getStyledEdit = function(style) {
	let view = new android.widget.EditText(getContext());
	view.setTextColor(android.graphics.Color.WHITE);
	view.setHintTextColor(android.graphics.Color.LTGRAY);
	switch (style) {
		case "code":
			view.setInputType(android.text.InputType.TYPE_CLASS_TEXT |
				android.text.InputType.TYPE_TEXT_FLAG_MULTI_LINE |
				android.text.InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS);
			view.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_FULLSCREEN |
				android.view.inputmethod.EditorInfo.IME_FLAG_NO_ENTER_ACTION);
			view.setTypeface(android.graphics.Typeface.MONOSPACE);
			view.setTextSize(getFontSize(27));
			view.setHorizontalScrollBarEnabled(true);
			view.setHorizontallyScrolling(true);
			view.setSingleLine(false);
			view.setMinLines(3);
			break;
	}
	return view;
};

const getStyledDialog = function(style, build) {
	let builder = new android.app.AlertDialog.Builder(getContext(),
		style == "foreground" || style == "wide" || style == "fullscreen" ?
			android.R.style.Theme_DeviceDefault_DialogWhenLarge :
		style == "light" ? android.R.style.Theme_DeviceDefault_Light_Dialog :
		android.R.style.Theme_DeviceDefault_Dialog);
	switch (style) {
		case "foreground":
		case "wide":
			let proto = {};
			build && build(builder);
			proto.create = function() {
				let dialog = builder.create();
				dialog.getWindow().setLayout(getDisplayWidth() / (style == "wide" ? 1.3 : 1.5),
					style == "foreground" ? android.view.ViewGroup.LayoutParams.WRAP_CONTENT : getDisplayHeight() / 1.2);
				return dialog;
			};
			return proto;
	}
	return builder;
};

const debugAbility = function(obj, item) {
	try {
		switch (typeof obj[item]) {
			case "number":
			case "string":
			case "boolean":
			case "object":
				let editText = getStyledEdit("code");
				editText.setHint(String(typeof obj[item]));
				editText.setText(typeof obj[item] == "object" ?
					JSON.stringify(obj[item], null, "\t") : String(obj[item]));
				
				let dialog = getStyledDialog("default");
				dialog.setTitle("Введите " + item);
				dialog.setPositiveButton("Ввод", function() {
					try {
						if (typeof obj[item] != "string") {
							eval("obj[item] = " + editText.getText());
						} else {
							obj[item] = String(editText.getText());
						}
					} catch (e) {
						reportError(e);
					}
				});
				dialog.setNegativeButton("Отмена", null);
				dialog.setCancelable(false);
				dialog.setView(editText);
				dialog.create().show();
				break;
			case "function":
				let str = obj[item].toString();
				let argument = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
				
				if (argument.length > 0) {
					editText = getStyledEdit("code");
					editText.setHint("Аргументы: " + argument);
					
					dialog = getStyledDialog("default");
					dialog.setTitle("Выполнение " + item);
					dialog.setPositiveButton("Запуск", function() {
						try {
							eval("obj[item](" + editText.getText() + ")");
						} catch (e) {
							reportError(e);
						}
					});
					dialog.setNegativeButton("Отмена", null);
					dialog.setCancelable(false);
					dialog.setView(editText);
					dialog.create().show();
				} else obj[item]();
				break;
		}
	} catch (e) {
		reportError(e);
	}
};

const debugScene = function(scene) {
	try {
		getStyledDialog("foreground", function(dialog) {
			dialog.setTitle("Цепочка (" + scene.id + ")");
			dialog.setItems(["Резапуск", "Завершение", "Ожидание"], function(d, i) {
				try {
					switch (i) {
						case 0:
							scene.run();
							break;
						case 1:
							scene.complete();
							break;
						case 2:
							if (scene.sleep === undefined) {
								scene.sleep = 50 /* default hardcoded */;
							}
							debugAbility(scene, "sleep");
							break;
					}
				} catch (e) {
					reportError(e);
				}
			});
			dialog.setNegativeButton("Отмена", null);
			dialog.setCancelable(false);
		}).create().show();
	} catch (e) {
		reportError(e);
	}
};

let evalHistory = [];

const debugEval = function(action) {
	try {
		let editText = getStyledEdit("code");
		editText.setHint("Ваше действие...");
		
		let dialog = getStyledDialog("default");
		dialog.setTitle(translate(NAME) + " " + translate(VERSION));
		dialog.setPositiveButton("Запуск", function() {
			try {
				let result = editText.getText().toString(),
					hasDone = false;
				evalHistory.forEach(function(e, i) {
					if (e == result) {
						evalHistory.splice(i, 1);
						evalHistory.unshift(result);
						hasDone = true;
					}
				});
				let returned = eval(String(result));
				if (!hasDone) evalHistory.unshift(result);
				action && typeof returned != "undefined" && action(returned);
				menuType !== null && (removeMenu(), createMenu(menuType));
			} catch (e) {
				reportError(e);
			}
		});
		dialog.setNegativeButton("Отмена", null);
		dialog.setCancelable(false);
		dialog.setView(editText);
		dialog.create().show();
	} catch (e) {
		reportError(e);
	}
};

const formatInfo = function(obj) {
	for (let i = 0; i < obj.length; i++) {
		if (obj[i].startsWith("[Y]")) {
			obj[i] = obj[i].replace("[Y] ", new String());
			obj[i] = "<font color='#33CC33'>" + obj[i] + "</font>";
		} else if (obj[i].startsWith("[P]")) {
			obj[i] = obj[i].replace("[P] ", new String());
			obj[i] = "<font color='#AACC33'>" + obj[i] + "</font>";
		} else if (obj[i].startsWith("[N]")) {
			obj[i] = obj[i].replace("[N] ", new String());
			obj[i] = "<font color='#CC3333'>" + obj[i] + "</font>";
		} else if (obj[i].startsWith("#")) {
			obj[i] = "<font color='#AAAAAA'><i>" + obj[i] + "</i></font>";
		} else if (obj[i].length == 0 || obj[i].indexOf("=") != 1) {
			obj.splice(i, 1);
			i--;
		}
	}
	return android.text.Html.fromHtml(obj.join("<br/>"));
};

const LogWindow = new Window({
	gravity: "right | top",
	touchable: false,
	params: "wrap",
	content: {
		type: "linear",
		background: "#99222222",
		padding: 10,
		children: {
			type: "text",
			id: "container",
			params: "wrap",
			font: "minecraft",
			color: "ltgray",
			size: 11
		}
	},
	hooks: {
		onShow: function(scope) {
			scope.formatLog();
		}
	}
});

LogWindow.strokes = 15;
LogWindow.formatLog = function() {
	if (this.handled) return;
	handle(function() {
		let file = new java.io.File(Dirs.TESTING, launchTime + ".log"),
			lines = Files.linesCount(file), text = Files.readLines(file, lines - LogWindow.strokes - 1, lines);
		text && LogWindow.findWidgetById("container").setText(text.join("\n"));
		LogWindow.handled = false;
	}, 50);
	this.handled = true;
};

let CurrentMenuWindow = menuType = prevTimers = lastPath = lastRobot = null;

const createMenu = function(type) {
	handle(function() {
		let addCategory = function(name) {
			let text = getStyledText("group");
			text.setText(String(name));
			layout.addView(text);
			return text;
		};
		
		let addHint = function(name) {
			let text = getStyledText("hint");
			text.setText(String(name));
			layout.addView(text);
			return text;
		};
		
		let addMenu = function(name, count) {
			return addButton(name, function() {
				removeMenu();
				createMenu(count);
			});
		};
		
		let addButton = function(name, click, long) {
			let button = getStyledButton("menu");
			button.setText(String(name));
			click && button.setOnClickListener(function(v) {
				try {
					click(v);
				} catch (e) {
					reportError(e);
				}
			});
			long && button.setOnLongClickListener(function(v) {
				try {
					long && long(v);
					return true;
				} catch (e) {
					reportError(e);
				}
				return false;
			});
			layout.addView(button);
			return button;
		};
		
		let addState = function(name, click, long, descriptor) {
			let recolor = function(view, value) {
				view.setBackgroundColor(value == -1 ? android.graphics.Color.parseColor("#88888800") : value ?
					android.graphics.Color.parseColor("#88008800") : android.graphics.Color.parseColor("#88880000"));
			};
			let button = addButton(name, function(view) {
				click && click(view);
				if (typeof descriptor == "function") {
					recolor(view, descriptor());
				}
			}, function(view) {
				long && long(view);
				if (typeof descriptor == "function") {
					recolor(view, descriptor());
				}
			});
			if (typeof descriptor == "function") {
				recolor(button, descriptor());
			} else {
				recolor(button, descriptor);
			}
			return button;
		};
		
		let addSwitch = function(name, who, where, descriptor, long) {
			return addState(name, function(view) {
				where[who] = !where[who];
			}, function(view) {
				if (typeof long == "function") {
					long(where[who]);
				} else if (long !== undefined) {
					where[who] = long;
				} else {
					debugAbility(where, who);
				}
			}, function() {
				try {
					if (descriptor !== undefined) {
						return descriptor(where[who]);
					}
				} catch (e) {
					reportError(e);
				}
				return where[who];
			});
		};
		
		let addAbility = function(name, obj) {
			if ((function() {
				try {
					return typeof obj[name];
				} catch (e) {
					return true;
				}
			})() === true) {
				return addButton(name + "[]");
			}
			if (typeof obj[name] == "boolean") {
				return addSwitch(name, name, obj);
			}
			return addButton(name, function() {
				debugAbility(obj, name);
			});
		};
		
		let content = getStyledLayout("menu");
		content.setOrientation(android.widget.LinearLayout.VERTICAL);
		
		let layout = getStyledLayout();
		content.addView(layout);
		
		let title = getStyledText("title");
		title.setGravity(android.view.Gravity.CENTER);
		title.setText(type == 0 ? "Консоль" : "Прочее");
		title.setOnClickListener(function() {
			if (type == 0) {
				removeMenu();
				createButton();
			} else {
				removeMenu();
				createMenu(0);
			}
		});
		layout.addView(title);
		
		let scroll = new android.widget.ScrollView(getContext());
		content.addView(scroll);
		layout = getStyledLayout();
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);
		scroll.addView(layout);
		
		if (type == 0) {
			if (DEVELOP) {
				addCategory("События");
				addMenu("Сцены", 1);
				addMenu("Интерфейс", 5);
				addMenu("Офис и ночь", 2);
				addMenu("Интеллект", 4);
				addCategory("Разработка");
				addMenu("Продвинутое", 8);
				addMenu("Существа", 3);
				addMenu("Управление", 7);
				addMenu("Отладка", 6);
			}
			if (MAY_DEBUG) {
				addCategory("Проверка");
				addButton("Перемещения", function() {
					getStyledDialog("foreground", function(builder) {
						builder.setTitle("Запуск теста");
						builder.setMessage("Будет запущена кастомная ночь с максимальным уровнем интеллекта, "
							+ "скримеры автоматически отключаются. Ваша задача проконтролировать перемещения "
							+ "аниматороников: они не должны застревать, крутиться на месте. Ожидание "
							+ "следующего шага отключено, аниматронники должны пройти полный путь до офиса.");
						builder.setPositiveButton("Да", function() {
							showHint("Звучит красиво, но @todo");
							// launchMoveTest();
						});
						builder.setNegativeButton("Нет", null);
					}).create().show();
				});
				addButton("Пасхалки", function() {
					getStyledDialog("foreground", function(builder) {
						builder.setTitle("Запуск теста");
						builder.setMessage("Вы будете телепортированы по некоторым пасхалкам, выполняйте "
							+ "задания из лога для перехода к следующей стадии. При обнаружении ошибок "
							+ "или странного поведения аниматронников и игры в целом, зафиксируйте эти "
							+ "данные после завершения шага. Ночь будет автоматически приостановлена.");
						builder.setPositiveButton("Да", function() {
							showHint("Звучит красиво, но @todo");
							// launchSecretTest();
						});
						builder.setNegativeButton("Нет", null);
					}).create().show();
				});
			}
			if (!(DEVELOP || MAY_DEBUG)) {
				addHint("Зачем здесь нужно отладочное меню, если нет поводов для отладки?");
			}
		} else if (type == 1) {
			addCategory("Сцены");
			for (let i in __root__) {
				let s = __root__[i];
				if (s instanceof Action) {
					(function(name, scene) {
						addSwitch(name, "active", scene, function(value) {
							return scene.getAwait() == -1 ? value ? -1 : value : value && scene.getThread();
						}, function(active) {
							debugScene(scene);
						});
					})(i.replace("Scene", new String()), s);
				}
			}
			addHint("Нажми для переключения состояния тика, удерживай для запуска и изменения параметров.");
			addCategory("Действия");
			if (prevTimers) {
				addButton("Продолжить", function() {
					prevTimers.forEach(function(e) {
						e.active = true;
					});
					prevTimers = null;
					removeMenu(), createMenu(type);
				});
			} else {
				addButton("Пауза", function() {
					prevTimers = [];
					for (let i in __root__) {
						let scene = __root__[i];
						if (scene instanceof Action) {
							if (scene.isActive()) {
								scene.active = false;
								prevTimers.push(scene);
							}
						}
					}
					removeMenu(), createMenu(type);
				});
			}
		} else if (type == 2) {
			addCategory("Офис");
			for (let item in Office) {
				addAbility(item, Office);
			}
			addCategory("Ночь");
			addAbility("gameTime", __root__);
			addAbility("gameNight", __root__);
		} else if (type == 3) {
			addCategory("Аниматронники");
			for (let item in Robots) {
				addAbility(item, Robots);
			}
			addCategory("Камеры");
			for (let item in Cameras) {
				addAbility(item, Cameras);
			}
			addCategory("Игрок");
			addButton("Положение", function() {
				let position = Entity.getPosition(Player.get());
				for (let i in position) position[i] = Math.floor(position[i] * 10) / 10;
				showHint("Текущее положение: " + position.x + ", " + position.y + ", " + position.z);
			});
			addButton("Поворот", function() {
				let angle = Entity.getLookAngle(Player.get());
				for (let i in angle) angle[i] = Math.floor(angle[i] * 20) / 20;
				showHint("Текущий поворот: " + angle.pitch + ", " + angle.yaw);
			});
		} else if (type == 4) {
			addCategory("Выполнение");
			addButton("Остановить", function() {
				Robots.stop();
			});
			addButton("Продолжить", function() {
				Robots.continue();
			});
			addButton("Обновить", function() {
				Robots.update();
			});
			addHint("Влияет на состояние интеллекта.");
			addCategory("Аниматронник");
			for (let i in Robots.ai) {
				let button = addButton(i, function(view) {
					lastRobot = view.getText();
					lastPath = null;
					removeMenu();
					createMenu(type);
				});
				lastRobot == i && button.setBackgroundColor(android.graphics.Color.parseColor("#88008800"));
				Robots.ai[i] == null && button.setBackgroundColor(android.graphics.Color.parseColor("#88888800"));
			}
			if (lastRobot) {
				if (Robots.ai[lastRobot] == null) {
					Robots.ai[lastRobot] = {
						pathes: {}
					};
					showHint("Аниматронник инициализирован");
					removeMenu();
					createMenu(type);
				}
				addCategory("Путь");
				addButton("Изменить", function() {
					debugAbility(Robots.ai[lastRobot], "pathes");
				});
				addButton("Создать", function() {
					debugEval(function(r) {
						lastPath = r;
						Robots.ai[lastRobot].pathes[r] = [];
						showHint("Путь для " + lastRobot + " создан");
						removeMenu();
						createMenu(type);
					});
				});
				for (let i in Robots.ai[lastRobot].pathes) {
					let button = addButton(i, function(view) {
						lastPath = view.getText();
						removeMenu();
						createMenu(type);
					});
					lastPath == i && button.setBackgroundColor(android.graphics.Color.parseColor("#88008800"));
				}
				if (lastPath) {
					addCategory("Действия");
					addButton("Изменить", function() {
						debugAbility(Robots.ai[lastRobot].pathes, lastPath);
					});
					addButton("Запустить", function() {
						Robots.goNextPath(lastRobot, lastPath);
					});
					addButton("Добавить точку", function() {
						let position = Player.getPosition(); position.y -= 1.5;
						for (let i in position) position[i] = Math.floor(position[i] * 4) / 4;
						Robots.ai[lastRobot].pathes[lastPath].push([position.x, position.y, position.z]);
						showHint("Точка добавлена в путь " + lastPath + " для " + lastRobot);
						removeMenu();
						createMenu(type);
					});
					if (Robots.ai[lastRobot].pathes[lastPath].length > 0) {
						addButton("Отменить", function() {
							Robots.ai[lastRobot].pathes[lastPath].pop();
							showHint("Точка удалена из пути " + lastPath + " для " + lastRobot);
							removeMenu();
							createMenu(type);
						});
					}
				}
			}
		} else if (type == 5) {
			addCategory("Окна");
			for (let i in __root__) {
				let w = __root__[i];
				if (w instanceof Window) {
					(function(name, popup) {
						addState(name, function(view) {
							if (!popup.window) {
								popup.create();
							}
							if (popup.isShowed) {
								popup.hide();
							} else {
								popup.show();
							}
						}, function(view) {
							if (!popup.window) {
								showHint("Окно уже закрыто");
								return;
							}
							popup.remove();
						}, function() {
							return !popup.window ? -1 : popup.isShowed;
						});
					})(i.replace("Window", new String()), w);
				}
			}
			addHint("Нажми для переключения активности, удерживай для закрытия.");
		} else if (type == 6) {
			addCategory("Отладка");
			addButton("Планы", function() {
				getStyledDialog("wide", function(builder) {
					builder.setTitle("Запланированное");
					let file = new java.io.File(Dirs.TODO, "planned.txt");
					builder.setMessage(formatInfo(Files.read(file, true)));
				}).create().show();
			});
			addButton("События", function() {
				if (!LogWindow.window) LogWindow.create();
				LogWindow.isShowed ? LogWindow.hide() : LogWindow.show();
			}, function() {
				debugAbility(LogWindow, "strokes");
			});
			addButton("Выполнить", function() {
				debugEval(function(r) {
					showHint("Результат: " + r);
				});
			});
			let directory = new java.io.File(Dirs.EVALUATE),
				files = Files.listFiles(directory, true);
			let addAction = function(name, result) {
				result = String(result);
				let code = result.slice(0, 29);
				result.length > 30 && (code += " ...");
				addButton(name || code, function() {
					let hasDone = false;
					evalHistory.forEach(function(e, i) {
						if (e == result) {
							evalHistory.splice(i, 1);
							evalHistory.unshift(result);
							hasDone = true;
						}
					});
					let returned = eval(result);
					if (!hasDone) evalHistory.unshift(result);
					typeof returned != "undefined" && showHint("Результат: " + returned);
				}, name ? function() {
					Files.deleteRecursive(directory + "/" + name);
					removeMenu(); createMenu(type);
				} : function() {
					let editText = getStyledEdit("code");
					editText.setHint("debug.js");
					
					let dialog = getStyledDialog("default");
					dialog.setTitle("Введите имя файла");
					dialog.setPositiveButton("Ввод", function() {
						try {
							let name = editText.getText().toString().trim();
							if (name.length() == 0) name = "debug.js";
							let file = new java.io.File(directory, name);
							Files.write(file, result);
							removeMenu(); createMenu(type);
						} catch (e) {
							reportError(e);
						}
					});
					dialog.setNegativeButton("Отмена", null);
					dialog.setCancelable(false);
					dialog.setView(editText);
					dialog.create().show();
				});
			};
			if (directory.exists() && files.length > 0) {
				addCategory("Сохранения");
				for (let i = 0; i < files.length; i++) {
					addAction(files[i].getName(), Files.read(files[i]));
				}
			} else directory.mkdirs();
			if (evalHistory.length > 0) {
				addCategory("История");
				for (let i = 0; i < evalHistory.length; i++) {
					addAction(undefined, evalHistory[i]);
				}
			}
		} else if (type == 7) {
			addCategory("Управление");
			addState("Разработка", function(view) {
				if (!DEVELOP) {
					DEVELOP = !DEVELOP;
					return;
				}
				getStyledDialog("foreground", function(builder) {
					builder.setTitle("Отключение отладки");
					builder.setMessage("Вероятно, без дополнительной помощи, здесь больше " +
						"не будет возможности изменить эту настройку до конца текущей " +
						"игровой сессии. Вы уверены, что хотите отключить режим разработчика?");
					builder.setPositiveButton("Уверен", function() {
						try {
							DEVELOP = !DEVELOP;
							removeMenu(); createMenu(type);
						} catch (e) {
							reportError(e);
						}
					});
					builder.setNegativeButton("Нет", null);
				}).create().show();
			}, function(view) {
				showHint("@todo");
			}, function() {
				return !DEVELOP ? -1 : DEVELOP;
			});
			addSwitch("Отладка", "MAY_DEBUG", __root__);
			addSwitch("Творчество", "IN_CREATIVE", __root__)
			addSwitch("Демонстрация", "DEMO", __root__);
			addSwitch("Экономия памяти", "LOW_MEMORY_MODE", __root__);
			addCategory("Предустановки");
			addSwitch("Кнопка планшета", "showButton", Development);
			addSwitch("Активность логики", "logicEnabled", Development);
			addSwitch("Установка моделей", "modelPlacer", Development);
			addSwitch("Отображение лога", "showLog", Development);
		} else if (type == 8) {
			addHint("Далее представлены функции и переменные в основном контексте скрипта.");
			let functions = [],
				variables = [],
				arrays = [];
			for (let element in __root__) {
				let something = __root__[element];
				if ((function() {
					try {
    					let type = typeof something;
    					if (/^[A-Z][a-z0-9]/.test(element)) {
    						return true;
    					}
    					if (type == "function" || type == "object") {
    						return something.toString();
    					}
    					return false;
    				} catch (e) {
    					return true;
    				}
				})() === true) {
					continue;
				}
				if (something && typeof something == "object") {
					if (Array.isArray(something)) {
						arrays.push(element);
					}
					continue;
				}
				if (typeof something == "function") {
					functions.push(element);
					continue;
				}
				variables.push(element);
			}
			if (functions.length > 0) {
				addCategory("Функции");
				functions.forEach(function(element) {
					addAbility(element, __root__);
				});
			}
			if (variables.length > 0) {
				addCategory("Переменные");
				variables.forEach(function(element) {
					addAbility(element, __root__);
				});
			}
			if (arrays.length > 0) {
				addCategory("Массивы");
				arrays.forEach(function(element) {
					addAbility(element, __root__);
				});
			}
		} else {
			addHint("Жизнь в действительности несправедлива или тут ничего нет?");
		}
		
		debug = getStyledText("debug");
		debug.setText("Текущая версия: " + translate(VERSION));
		layout.addView(debug);
		
		CurrentMenuWindow = new android.widget.PopupWindow(content, getDisplayPercentWidth(30), android.view.ViewGroup.LayoutParams.MATCH_PARENT);
		CurrentMenuWindow.showAtLocation(getDecorView(), android.view.Gravity.LEFT, 0, 0);
		CurrentMenuWindow.setAttachedInDecor(isHorizon);
		menuType = type;
	}, function(e) {
		retraceOrReport(e);
		removeButton();
		removeMenu();
		if (type != 0) {
			createMenu(0);
		} else {
			createButton();
		}
	});
}

Callback.addCallback("tick", function() {
	if (menuType == 4 && lastRobot && lastPath && Robots.property[lastRobot] && Robots.ai[lastRobot].pathes[lastPath].length > 0) {
		if (Robots.property[lastRobot].entity && !Robots.ai[lastRobot].data || (Robots.ai[lastRobot].data && Robots.ai[lastRobot].data.data.finished)) {
			let point = Robots.ai[lastRobot].pathes[lastPath][Robots.ai[lastRobot].pathes[lastPath].length - 1];
			Entity.setPosition(Robots.property[lastRobot].entity, point[0], point[1], point[2]);
		}
	}
});

let CurrentButtonWindow = null;

const createButton = function() {
	handle(function() {
		let layout = getStyledLayout("menu");
		layout.setAlpha(0);
		
		button0 = getStyledButton("menu");
		button0.setOnClickListener(function(viewarg) {
			createMenu(0), removeButton();
		});
		layout.addView(button0);
		
		CurrentButtonWindow = new android.widget.PopupWindow(layout, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
		CurrentButtonWindow.showAtLocation(getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
	});
};

DEVELOP && createButton();

const removeButton = function() {
	handle(function() {
		if (CurrentButtonWindow) {
			CurrentButtonWindow.dismiss();
			CurrentButtonWindow = null;
		}
	});
};

const removeMenu = function() {
	handle(function() {
		if (CurrentMenuWindow) {
			CurrentMenuWindow.dismiss();
			CurrentMenuWindow = menuType = null;
		}
	});
};
