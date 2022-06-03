/**
 * @constructor
 * Shell for system widget to describe it in
 * script by apply and became container.
 * @param {object} params to apply
 */
const Widget = function(params) {
	let count = Widget.instances.push(this);
	this.id = "widget" + count;
	
	this.reset = function(type) {
		switch (type) {
			case "layout":
			case "linear":
				this.type = "layout";
				this.view = new android.widget.LinearLayout(getContext());
				break;
			case "relative":
				this.type = "layout";
				this.view = new android.widget.RelativeLayout(getContext());
				break;
			case "frame":
				this.type = "layout";
				this.view = new android.widget.FrameLayout(getContext());
				break;
			case "text":
				this.type = "text";
				this.view = new android.widget.TextView(getContext());
				break;
			case "image":
				this.type = "image";
				this.view = new android.widget.ImageView(getContext());
				break;
			case "button":
				this.type = "text";
				this.view = new android.widget.Button(getContext());
				break;
			case "view":
			default:
				this.type = "view";
				this.view = new android.view.View(getContext());
		}
		this.type == "layout" && (this.childrens = []);
	};
	
	this.addChildren = function(widget) {
		if (this.type != "layout" || !this.childrens) return;
		widget instanceof Widget == false && (widget = new Widget(widget));
		if (widget.view) {
			this.view.addView(widget.view);
			this.childrens.push(widget);
		}
	};
	
	this.applyParams = function(params) {
		for (let item in params) {
			let param = params[item];
			switch (item) {
				case "id":
				case "key":
				case "special":
					this.setId(param);
					break;
				case "click":
					this.setOnClickListener(param);
					break;
				case "children":
				case "childrens":
					if (param instanceof Widget) this.addChildren(param);
					else if (!Array.isArray(param)) this.addChildren(param);
					else for (let c = 0; c < param.length; c++) this.addChildren(param[c]);
					break;
				case "width":
					this.setWidth(param);
					break;
				case "height":
					this.setHeight(param);
					break;
				case "params":
					if (this.type == "layout" || this.type == "image" || this.type == "view") {
						if (Array.isArray(param)) this.setParams(param[0], param[1]);
						else if (typeof param != "object") this.setParams(param, param);
						else this.setParams(param.width || param.x, param.height || param.y);
					} else {
						if (Array.isArray(param)) this.setSizes(param[0], param[1]);
						else if (typeof param != "object") this.setSizes(param, param);
						else this.setSizes(param.width || param.x, param.height || param.y);
					}
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
				case "text":
					if (Array.isArray(param)) this.setText(param[0], param[1]);
					else if (typeof param != "object") this.setText(param);
					else this.setText(param.text, param.format);
					break;
				case "size":
					this.setTextSize(param);
					break;
				case "gravity":
					this.setGravity(param);
					break;
				case "orientate":
				case "orientation":
					this.setOrientation(param);
					break;
				case "typeface":
				case "font":
					this.setFont(param);
					break;
				case "color":
					if (this.type == "text") this.setTextColor(param);
					else this.setBackground(param);
					break;
				case "alpha":
					this.setAlpha(param);
					break;
				case "background":
					this.setBackground(param);
					break;
				case "scale":
				case "scaling":
					this.setScaleType(param);
					break;
				case "image":
				case "resource":
				case "bitmap":
					if (this.type == "image") this.setResource(param);
					else this.setBackground(param);
					break;
				case "padding":
					if (Array.isArray(param)) {
						if (param.length < 3) this.setPaddingRelative(param[0], param[1]);
						else this.setPadding(param[0], param[1], param[2], param[3]);
					} else if (typeof param != "object") this.setPadding(param, param, param, param);
					else if (param.horizontal || param.vertical) this.setPaddingRelative(param.horizontal, param.vertical);
					else this.setPadding(param.left, param.top, param.right, param.bottom);
					break;
			}
		}
	};
	
	this.setOrientation = function(orientate) {
		if (typeof orientate == "number") this.view.setOrientation(orientate);
		else this.view.setOrientation(Interface.Orientate[orientate.toUpperCase()]);
	};
	
	this.setGravity = function(gravity) {
		if (typeof gravity == "number") this.view.setGravity(gravity);
		else this.view.setGravity(Interface.Gravity.parse(gravity.toUpperCase()));
	};
	
	this.setText = function(text, format) {
		if (!format) this.view.setText(translate(text));
		else this.view.setText(translate(text, format));
	};
	
	this.setHtmlText = function(text, format) {
		if (!format) this.view.setText(android.text.Html.fromHtml(translate(text)));
		else this.view.setText(android.text.Html.fromHtml(translate(text, format)));
	};
	
	this.setTextSize = function(size) {
		this.view.setTextSize(Interface.getFontSize(size));
	};
	
	this.setTextColor = function(color) {
		if (typeof color == "number") this.view.setTextColor(color);
		else if (typeof color == "string") {
			if (color.startsWith("#")) this.view.setTextColor(Interface.Color.parse(color));
			else this.view.setTextColor(Interface.Color[color.toUpperCase()]);
		}
	};
	
	this.setFont = function(font) {
		if (typeof font == "string") this.view.setTypeface(AssetFactory.createFont(font));
		else font ? this.view.setTypeface(font) : this.view.setTypeface(AssetFactory.createFont());
	};
	
	this.setResource = function(image) {
		if (typeof image == "string") this.view.setImageBitmap(ImageFactory.getBitmap(image));
		else if (image instanceof android.graphics.Bitmap) this.view.setImageBitmap(image);
		else this.view.setImageDrawable(image);
	};
	
	this.setScaleType = function(scale) {
		if (typeof scale == "object") this.view.setScaleType(scale);
		else this.view.setScaleType(Interface.Scale[scale.toUpperCase()]);
	};
	
	this.setOnClickListener = function(action) {
		let scope = this;
		this.view.setOnClickListener(function() {
			tryout(function() {
				action && action(scope);
			});
		});
	};
	
	this.setAlpha = function(alpha) {
		typeof alpha == "number" && (this.view.setAlpha(0.00390625 * alpha));
	};
	
	this.setPadding = function(left, top, right, bottom) {
		let dl = dt = dr = db = 0;
		typeof left == "number" && (dl = left);
		typeof top == "number" && (dt = top);
		typeof right == "number" && (dr = right);
		typeof bottom == "number" && (db = bottom);
		this.view.setPadding(dl, dt, dr, db);
	};
	
	this.setPaddingRelative = function(horizontal, vertical) {
		this.setPadding(horizontal, vertical, horizontal, vertical);
	};
	
	this.setParams = function(width, height) {
		typeof width == "string" && (width = Interface.Display[width.toUpperCase()]);
		typeof height == "string" && (height = Interface.Display[height.toUpperCase()]);
		this.view.setLayoutParams(Interface.getLayoutParams(width, height));
	};
	
	this.setSizes = function(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	};
	
	this.setWidth = function(width) {
		typeof width == "number" && (this.view.setWidth(Interface.getX(width)));
	};
	
	this.setHeight = function(height) {
		typeof height == "number" && (this.view.setHeight(Interface.getY(height)));
	};
	
	this.setPosition = function(x, y) {
		this.setX(x);
		this.setY(y);
	};
	
	this.setX = function(x) {
		typeof x == "number" && (this.view.setX(Interface.getX(x)));
	};
	
	this.setY = function(y) {
		typeof y == "number" && (this.view.setY(Interface.getY(y)));
	};
	
	this.setBackground = function(background) {
		if (typeof background == "number") this.view.setBackgroundColor(background);
		else if (typeof background == "string") {
			if (background.startsWith("#")) this.view.setBackgroundColor(Interface.Color.parse(background));
			else if (Interface.Color[background.toUpperCase()] !== undefined) this.view.setBackgroundColor(Interface.Color[background.toUpperCase()]);
			else this.view.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(ImageFactory.getBitmap(background)));
		} else this.view.setBackgroundDrawable(background);
	};
	
	this.setVisibility = function(visibility) {
		if (typeof visibility == "number") this.view.setVisibility(visibility);
		else this.view.setVisibility(Interface.Visibility[visibility.toUpperCase()]);
	};
	
	this.setId = function(id) {
		this.id = id;
	};
	
	if (params) {
		this.reset(params.type);
		this.applyParams(params);
	}
};

Widget.instances = [];
