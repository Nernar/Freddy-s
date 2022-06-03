const EnterScene = parseAction({
	isStatic: true,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				OverlayWindow.show();
			});
			let transition = new Transition();
			transition.withEntity(Player.get());
			transition.withFrom(29.39, 12.24, 76.99, 8.75, -0.31);
			transition.addFrame(-2.17, -5.62, -22.07, -1.48, 0.37, 6.5, Transition.Interpolator.DECELERATE);
			transition.addFrame(11.43, 0, -7.33, 2.71, -0.09, 5, Transition.Interpolator.ACCELERATE_DECELERATE);
			transition.withOnFinishListener(function() {
				scope.complete();
			});
			transition.start();
		},
		onComplete: function(scope) {
			NightScene.run(function() {
				OverlayWindow.hide();
			});
		}
	}
});

const WarningWindow = new Window({
	content: {
		type: "frame",
		childrens: {
			type: "linear",
			id: "container",
			gravity: "center",
			background: "black",
			orientate: "vertical",
			childrens: [{
				type: "text",
				text: "WARNING!",
				gravity: "center",
				padding: 30,
				size: 42,
				color: "red",
				font: "minecraft"
			}, {
				type: "text",
				text: IN_CREATIVE ? "Contact developer, if you have\ncompress world safety!" : DEVELOP ? "It's a time for create the best\ncontent, users are waiting!" : "This game contains flashing lights, loud\nnoises, and lots of jumscares!",
				gravity: "center",
				size: 36,
				color: "ltgray",
				font: "minecraft"
			}]
		}
	},
	hooks: {
		onShow: function(scope) {
			let animate = android.view.animation.AlphaAnimation(0, 1);
			scope.findWidgetById("container").view.startAnimation(animate);
			animate.setDuration(1500);
		}
	}
});

WarningWindow.dismiss = function() {
	let animate = android.view.animation.AlphaAnimation(1, 0);
	WarningWindow.findWidgetById("container").view.startAnimation(animate);
	animate.setDuration(1500);
	handle(function() {
		WarningWindow.hide();
	}, 1500);
};

// @todo: Might be used before menu startup
// const WarningScene = parseAction({
	// tick: 3500,
	// hooks: {
		// onRun: function(scope) {
			// WarningWindow.show();
		// },
		// onComplete: function() {
			// acquire(function() {
				// WarningWindow.dismiss();
				// if (random(1000) == 0) CreepyStartScene.run();
				// else MenuScene.run();
			// });
		// }
	// }
// });
