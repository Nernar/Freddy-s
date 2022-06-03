const WinWindow = new Window({
	content: {
		type: "frame",
		background: "black",
		childrens: [{
			type: "linear",
			gravity: "center",
			childrens: [{
				type: "text",
				id: "slicing",
				text: "4\n5\n6",
				size: 106,
				color: "white",
				gravity: "center",
				font: "minecraft"
			}, {
				type: "text",
				text: " AM",
				size: 106,
				color: "white",
				gravity: "center",
				font: "minecraft"
			}]
		}, {
			type: "linear",
			params: {
				width: "match",
				height: Interface.Display.HEIGHT / 2 - 52
			},
			background: "black"
		}, {
			type: "linear",
			params: {
				width: "match",
				height: Interface.Display.HEIGHT / 2 - 53
			},
			y: Interface.Display.HEIGHT / 2 + 53,
			background: "black"
		}]
	},
	hooks: {
		onShow: function(scope) {
			let slicing = scope.findWidgetById("slicing").view,
				animate = android.view.animation.TranslateAnimation(0, 0, 0, -Interface.getY(106) - Interface.getFontMargin() * 2);
			animate.setAnimationListener({
				onAnimationEnd: function() {
					slicing.setY(slicing.getY() - Interface.getY(106) - Interface.getFontMargin() * 2);
					completeKidsSound.play();
				}
			});
			animate.setDuration(5000);
			slicing.startAnimation(animate);
		},
		onHide: function(scope) {
			let slicing = scope.findWidgetById("slicing").view;
			slicing.setY(slicing.getY() + Interface.getY(106) + Interface.getFontMargin() * 2);
		}
	}
});

const CompleteScene = parseAction({
	tick: 9000,
	sleep: 2,
	hooks: {
		onRun: function(scope) {
			Robots.stop();
			ScreamScene.isActive() && ScreamScene.complete();
			if (!DEMO) gameNight++;
			else if (gameNight < 3) gameNight++;
			else scope.buyGame = true;
			saveGame();
			Entity.setMobile(Player.get(), false);
		},
		onTick: function(scope, currently) {
			if (currently == 0) {
				Music.destroy();
				acquire(function() {
					TabletWindow.hide();
					WinWindow.show();
				});
				completeClockSound.play();
			}
			return ++currently;
		},
		onComplete: function(scope) {
			if (!scope.buyGame) {
				NightScene.run(function() {
					WinWindow.hide();
				});
			} else {
				delete scope.buyGame;
				DemoScene.run(function() {
					WinWindow.hide();
				});
			}
		}
	}
});
