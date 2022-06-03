/**
 * @constructor
 * Shell for system window to overlay display
 * widget container on screen in script.
 * @param {object} params to apply
 */
const Window = function(params) {
	let count = Window.instances.push(this);
	this.width = this.height = Interface.Display.MATCH;
	this.x = this.y = this.gravity = 0;
	this.id = "window" + count;
	this.isTouchable = true;
	this.isShowed = false;
	
	this.setOnInitializationListener = function(action) {
		this.__init = function(scope) {
			action && tryout(function() {
				action(scope);
			});
		};
	};
	
	this.applyParams = function(params) {
		if (params instanceof Widget) {
			this.setWidget(params);
		} else for (let item in params) {
			let param = params[item];
			switch (item) {
				case "hooks":
				case "actions":
				case "listeners":
					param.onInit && this.setOnInitializationListener(param.onInit);
					param.onUpdate && this.setOnUpdateListener(param.onUpdate);
					param.onCreate && this.setOnCreateListener(param.onCreate);
					param.onRemove && this.setOnRemoveListener(param.onRemove);
					param.onShow && this.setOnShowListener(param.onShow);
					param.onHide && this.setOnHideListener(param.onHide);
					break;
				case "content":
				case "views":
					this.setContent(param);
					break;
				case "x":
					this.setX(param);
					break;
				case "y":
					this.setY(param);
					break;
				case "place":
				case "position":
				case "location":
					if (Array.isArray(param)) this.setPosition(param[0], param[1]);
					else if (typeof param != "object") this.setPosition(param, param);
					else this.setPosition(param.x, param.y);
					break;
				case "touchable":
				case "touch":
					this.setTouchable(param);
					break;
				case "gravity":
					this.setGravity(param);
					break;
				case "width":
					this.setWidth(param);
					break;
				case "height":
					this.setHeight(param);
					break;
				case "params":
				case "sizes":
					if (Array.isArray(param)) this.setParams(param[0], param[1]);
					else if (typeof param != "object") this.setParams(param, param);
					else this.setParams(param.width || param.x, param.height || param.y);
					break;
			}
		}
	};
	
	this.findWidgetById = function(id, widget) {
		!widget && (widget = this.widget);
		if (widget.id == id) return widget;
		if (!widget.childrens) return widget.id == id ? widget : undefined;
		for (let i = 0; i < widget.childrens.length; i++) {
			let child = widget.childrens[i];
			if (id == child.id) return child;
			if (child.childrens) {
				let result = this.findWidgetById(id, child);
				if (result) return result;
			}
		}
	};
	
	this.reset = function() {
		Window.instances.splice(count - 1, 1);
		this.window && this.remove();
	};
	
	this.setOnCreateListener = function(action) {
		this.__create = function(scope) {
			action && tryout(function() {
				action(scope);
			});
		};
	};
	
	this.create = function() {
		let scope = this;
		if (this.window) return;
		this.widget.setVisibility("gone");
		this.__create && this.widget.view.post(function() {
			scope.__create(scope);
		});
		this.window = new android.widget.PopupWindow(this.widget.view, this.width, this.height);
		isHorizon && this.window.setAttachedInDecor(isHorizon);
		this.window.setTouchable(false);
		this.window.showAtLocation(Interface.getDecorView(), this.gravity, this.x, this.y);
	};
	
	this.setOnRemoveListener = function(action) {
		this.__remove = function(scope) {
			action && tryout(function() {
				action(scope);
			});
		};
	};
	
	this.remove = function() {
		this.window.dismiss();
		delete this.window;
		this.isShowed = false;
		this.__remove && this.__remove(this);
	};
	
	this.setWidth = function(width) {
		typeof width != "undefined" && (this.width = Interface.getX(width));
		this.window && this.update();
	};
	
	this.setHeight = function(height) {
		typeof height != "undefined" && (this.height = Interface.getY(height));
		this.window && this.update();
	};
	
	this.setParams = function(width, height) {
		typeof width == "string" && (width = Interface.Display[width.toUpperCase()]);
		typeof height == "string" && (height = Interface.Display[height.toUpperCase()]);
		typeof width != "undefined" && (this.width = Interface.getX(width));
		typeof height != "undefined" && (this.height = Interface.getY(height));
		this.window && this.update();
	};
	
	this.setTouchable = function(touchable) {
		this.isTouchable = touchable;
		this.window && this.update();
	};
	
	this.setX = function(x) {
		typeof x != "undefined" && (this.x = Interface.getX(x));
		this.window && this.update();
	};
	
	this.setY = function(y) {
		typeof y != "undefined" && (this.y = Interface.getY(y));
		this.window && this.update();
	};
	
	this.setPosition = function(x, y) {
		typeof x != "undefined" && (this.x = Interface.getX(x));
		typeof y != "undefined" && (this.y = Interface.getY(y));
		this.window && this.update();
	};
	
	this.setGravity = function(gravity) {
		if (typeof gravity == "number") this.gravity = gravity;
		else this.gravity = Interface.Gravity.parse(gravity.toUpperCase());
		this.window && (this.remove(), this.create());
	};
	
	this.setWidget = function(widget) {
		this.widget = widget;
		this.window && this.update();
	};
	
	this.setContent = function(content) {
		if (Array.isArray(content)) this.setWidget(new Widget({
			type: "linear", childrens: content
		}));
		else this.setWidget(new Widget(content));
	};
	
	this.setOnUpdateListener = function(action) {
		this.__update = function(scope) {
			action && tryout(function() {
				action(scope);
			});
		};
	};
	
	this.update = function() {
		if (this.window) {
			this.window.update(this.x, this.y, this.width, this.height);
			this.window.setContentView(this.widget.view);
			this.window.setTouchable(this.isTouchable);
			this.__update && this.__update(this);
		}
	};
	
	this.setOnShowListener = function(action) {
		this.__show = function(scope) {
			action && tryout(function() {
				action(scope);
			});
		};
	};
	
	this.show = function(post) {
		let scope = this;
		if (!this.window) return;
		this.isTouchable && this.window.setTouchable(true);
		this.update();
		this.isShowed = true;
		this.__show && this.widget.view.post(function() {
			scope.__show(scope);
			post && handle(post);
		});
		this.widget.setVisibility("visible");
	};
	
	this.setOnHideListener = function(action) {
		this.__hide = function(scope) {
			action && tryout(function() {
				action(scope);
			});
		};
	};
	
	this.hide = function() {
		let scope = this;
		if (!this.window) return;
		this.isTouchable && this.window.setTouchable(false);
		this.update();
		this.isShowed = false;
		this.__hide && this.widget.view.post(function() {
			scope.__hide(scope);
		});
		this.widget.setVisibility("gone");
	};
	
	params && this.applyParams(params);
	this.__init && this.__init(this);
};

Window.instances = new Array();

/**
 * Dismisses everything active windows.
 */
Window.dismiss = function() {
	Window.instances.forEach(function(i) {
		i.window && i.remove();
	});
};
