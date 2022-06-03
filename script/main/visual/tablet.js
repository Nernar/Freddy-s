const TabletButton = new Window({
	params: {
		width: 600,
		height: 60
	},
	location: {
		x: 254,
		y: 638
	},
	content: {
		type: "frame",
		children: {
			type: "image",
			id: "container",
			image: "cameraButton",
			click: function() {
				Cameras.switchState();
			}
		}
	},
	hooks: {
		onShow: function(scope) {
			if (!Development.showButton) {
				let button = scope.findWidgetById("container").view,
					animate = android.view.animation.AlphaAnimation(1, 0);
				animate.setAnimationListener({
					onAnimationEnd: function() {
						button.setAlpha(0);
					}
				});
				animate.setDuration(5000);
				button.startAnimation(animate);
			}
		},
		onHide: function(scope) {
			scope.findWidgetById("container").setAlpha(1);
		}
	}
});

const TabletSwitch = new Window({
	content: {
		type: "image",
		id: "container",
		scale: "center_crop"
	},
	hooks: {
		onShow: function(scope) {
			scope.updateAnimation(!Office.active[4]);
			scope.containerAnimation.start();
		},
		onHide: function(scope) {
			scope.containerAnimation.stop();
		}
	}
});

TabletSwitch.updateAnimation = function(reversed) {
	let animation = new android.graphics.drawable.AnimationDrawable();
	animation.setOneShot(true);
	for (let i = 0; i < 11; i++) {
		let bitmap = ImageFactory.getBitmap("tablet" + (reversed ? 10 - i : i)),
			drawable = new android.graphics.drawable.BitmapDrawable(bitmap);
		animation.addFrame(drawable, 50);
	}
	handle(function() {
		if (reversed) TabletSwitch.hide();
		else TabletWindow.show();
	}, 575);
	TabletSwitch.findWidgetById("container").setResource(animation);
	TabletSwitch.containerAnimation = animation;
};

const TabletWindow = new Window({
	content: {
		type: "frame",
		id: "layout",
		childrens: [{
			id: "garble",
			params: "match",
			background: "black",
			alpha: 0
		}, {
			type: "image",
			id: "noise",
			scale: "fit_xy",
			params: "match"
		}, {
			type: "image",
			scale: "fit_xy",
			params: "match",
			image: "cameraBackground"
		}, {
			params: {
				width: 600,
				height: 60
			},
			position: {
				x: 254,
				y: 638
			},
			click: function() {
				Cameras.switchState();
			}
		}, {
			type: "text",
			id: "signal",
			size: 28,
			gravity: "center | top",
			color: "white",
			font: "minecraft",
			y: 69
		}, {
			type: "image",
			id: "circle",
			params: 60,
			position: {
				x: 67,
				y: 51
			}
		}, {
			type: "image",
			id: "container",
			scale: "fit_xy",
			params: 400,
			position: {
				x: 848,
				y: 313
			}
		}, {
			type: "linear",
			gravity: "top | center",
			params: {
				width: 350
			},
			position: {
				x: 850,
				y: 279
			},
			children: {
				type: "text",
				id: "location",
				color: "white",
				size: 23,
				font: "minecraft"
			}
		}, {
			type: "linear",
			gravity: "right | top",
			orientation: "vertical",
			padding: {
				top: 45,
				right: 55
			},
			childrens: [{
				type: "text",
				id: "time",
				size: 40,
				gravity: "right",
				color: "white",
				font: "minecraft"
			}, {
				type: "text",
				id: "night",
				size: 19,
				gravity: "right",
				color: "white",
				font: "minecraft"
			}]
		}, {
			type: "linear",
			gravity: "left | bottom",
			orientation: "vertical",
			padding: {
				left: 55,
				bottom: 45
			},
			childrens: [{
				type: "text",
				id: "power",
				size: 19,
				gravity: "left",
				color: "white",
				font: "minecraft"
			}, {
				type: "text",
				id: "usage",
				size: 19,
				gravity: "left",
				color: "white",
				font: "minecraft"
			}]
		}]
	},
	hooks: {
		onInit: function(scope) {
			let animation = new android.graphics.drawable.AnimationDrawable(),
				drawable = new android.graphics.drawable.BitmapDrawable(ImageFactory.getBitmap("cameraActived"));
			animation.addFrame(drawable, 2000);
			animation.addFrame(Interface.getEmptyDrawable(), 2000);
			animation.setOneShot(false);
			scope.findWidgetById("circle").setResource(animation);
			scope.circleAnimation = animation;
			
			animation = new android.graphics.drawable.AnimationDrawable();
			animation.setOneShot(false);
			for (let i = 0; i < 2; i++) {
				let bitmap = ImageFactory.getBitmap("cameraContainer" + i),
					drawable = new android.graphics.drawable.BitmapDrawable(bitmap);
				animation.addFrame(drawable, 2000);
			}
			scope.findWidgetById("container").setResource(animation);
			scope.containerAnimation = animation;
			
			animation = new android.graphics.drawable.AnimationDrawable();
			animation.setOneShot(false);
			for (let i = 0; i < 8; i++) {
				let bitmap = ImageFactory.getBitmap("noise" + i),
					drawable = new android.graphics.drawable.BitmapDrawable(bitmap);
				animation.addFrame(drawable, 100);
			}
			scope.findWidgetById("noise").setResource(animation);
			scope.noiseAnimation = animation;
		},
		onCreate: function(scope) {
			if (!scope.camera3Animation) {
				for (let i = 0; i < Cameras.cameras.length; i++) {
					TabletWindow.addCamera(Cameras.cameras[i]);
				}
			}
		},
		onShow: function(scope) {
			scope.noiseAnimation.start();
			scope.circleAnimation.start();
			scope.containerAnimation.start();
			TabletSwitch.hide();
			OverlayWindow.isShowed && OverlayWindow.hide();
		},
		onHide: function(scope) {
			scope.noiseAnimation.stop();
			scope.circleAnimation.stop();
			scope.containerAnimation.stop();
			scope["camera" + Cameras.current + "Animation"].stop();
		}
	}
});

TabletWindow.addCamera = function(params) {
	let animation = new android.graphics.drawable.AnimationDrawable();
	animation.setOneShot(false);
	for (let i = 0; i < 2; i++) {
		let bitmap = ImageFactory.getBitmap("cameraSelected" + i),
			drawable = new android.graphics.drawable.BitmapDrawable(bitmap);
		animation.addFrame(drawable, 3000);
	}
	TabletWindow["camera" + params.id + "Animation"] = animation;
	
	TabletWindow.findWidgetById("layout").addChildren({
		type: "image",
		image: animation,
		position: params.ui,
		params: {
			width: 60,
			height: 40
		},
		click: function() {
			if (params.id != Cameras.current)
				Cameras.choose(params.id);
		}
	});
	
	TabletWindow.findWidgetById("layout").addChildren({
		type: "image",
		image: "camera" + params.id,
		position: {
			x: params.ui.x + 7.5,
			y: params.ui.y + 7.5
		},
		params: {
			width: 31,
			height: 25
		}
	});
};

const usageToLines = function() {
	let progress = new String(), usage = Office.getUsage();
	if (usage > 0) progress += "<font color=\"#11DD11\">\u2588</font><font color=\"#119911\">\u258C</font>";
	if (usage > 1) progress += "<font color=\"#11DD11\">\u2588</font><font color=\"#119911\">\u258C</font>";
	if (usage > 2) progress += "<font color=\"#DDDD11\">\u2588</font><font color=\"#999911\">\u258C</font>";
	if (usage > 3) progress += "<font color=\"#AA0000\">\u2588</font><font color=\"#660000\">\u258C</font>";
	if (usage > 4) progress += "<font color=\"#AA0000\">\u2588</font><font color=\"#660000\">\u258C</font>";
	return "<big>" + progress + "</big>";
};

TabletWindow.updateContainer = function() {
	TabletWindow.findWidgetById("time").setText("%s AM", String(gameTime > 0 ? gameTime : 12));
	TabletWindow.findWidgetById("night").setText("Night %s", String(gameNight));
	let procent = DEVELOP ? Math.round(Office.procent * 10) / 10 : Math.round(Office.procent);
	TabletWindow.findWidgetById("power").setText("Power left: %s", procent + "%");
	TabletWindow.findWidgetById("usage").setHtmlText("Usage: %s", usageToLines());
};

TabletWindow.setLocation = function(id) {
	let camera = Cameras.findCameraById(id), previous = Cameras.findCameraById(Cameras.current),
		type = typeof camera.entity == "undefined" ? "lost" : camera.id == "6" ? "audio" : "normal";
	TabletWindow.findWidgetById("location").setText(camera.name);
	TabletWindow.findWidgetById("garble").setAlpha(type == "normal" ? 0 : 255);
	TabletWindow.findWidgetById("signal").setText(type == "lost" ? "- SIGNAL LOST -" :
		type == "audio" ? "- CAMERA DISABLED -" + "\n" + "AUDIO ONLY" : new String());
	let animation = TabletWindow["camera" + previous.id + "Animation"];
	animation.isRunning() && (animation.stop(), animation.selectDrawable(0));
	animation = TabletWindow["camera" + camera.id + "Animation"];
	!animation.isRunning() && (animation.start(), animation.selectDrawable(1));
};
