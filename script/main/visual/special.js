const HallucinationWindow = new Window({
	content: {
		type: "image",
		id: "hallucination",
		scale: "fit_xy"
	},
	hooks: {
		onInit: function(scope) {
			let animation = new android.graphics.drawable.AnimationDrawable();
			animation.setOneShot(false);
			for (let i = 0; i < 4; i++) {
				let bitmap = ImageFactory.getBitmap("hallucination" + i),
					drawable = new android.graphics.drawable.BitmapDrawable(bitmap);
				animation.addFrame(drawable, 75);
			}
			scope.findWidgetById("hallucination").setResource(animation);
			scope.animation = animation;
		},
		onShow: function(scope) {
			scope.animation.start();
			handle(function() {
				scope.hide();
			}, random(1, 3) * 300);
		},
		onHide: function(scope) {
			scope.animation.stop();
		}
	}
});

const CreepyStartWindow = new Window({
	content: {
		type: "image",
		id: "container",
		scale: "fit_xy"
	},
	hooks: {
		onShow: function(scope) {
			scope.findWidgetById("container").setResource("creepyStart0");
		}
	}
});

CreepyStartWindow.setup = function() {
	CreepyStartWindow.findWidgetById("container").setResource("creepyStart1");
};

const CreepyStartScene = parseAction({
	tick: 500,
	sleep: 20,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				CreepyStartWindow.show();
			});
		},
		onTick: function(scope, currently) {
			if (currently == 18) {
				acquire(function() {
					CreepyStartWindow.setup();
				});
			}
			return ++currently;
		},
		onComplete: function(scope) {
			EnterScene.run(function() {
				CreepyStartWindow.hide();
			});
		}
	}
});

const CreepyEndWindow = new Window({
	content: {
		type: "image",
		resource: "creepyEnd",
		scale: "fit_xy"
	}
});

const CreepyEndScene = parseAction({
	tick: 1000,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				CreepyEndWindow.show();
			});
			bassScreamSound.play();
		},
		onTick: function(scope, currently) {
			acquire(function() {
				getContext().finish();
			});
			return ++currently;
		}
	}
});

const OverlayWindow = new Window({
	content: {
		type: "frame",
		children: {
			type: "frame",
			id: "container",
			background: "black",
			params: "match",
			alpha: 0
		}
	}
});

OverlayWindow.setAlpha = function(alpha) {
	OverlayWindow.findWidgetById("container").setAlpha(alpha);
};

OverlayWindow.translate = function(time, post) {
	let view = OverlayWindow.findWidgetById("container").view,
		animate = android.view.animation.AlphaAnimation(0, 1);
	animate.setDuration(time || 1500);
	handle(function() {
		tryout(function() {
			post && post();
		});
		let animate = android.view.animation.AlphaAnimation(1, 0);
		animate.setDuration(time || 1500);
		handle(function() {
			OverlayWindow.setAlpha(0);
		}, time || 1500);
		view.startAnimation(animate);
	}, time || 1500);
	view.startAnimation(animate);
	OverlayWindow.setAlpha(255);
};
