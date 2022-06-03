const NightWindow = new Window({
	content: {
		type: "linear",
		orientate: "vertical",
		background: "black",
		gravity: "center",
		childrens: [{
			type: "text",
			text: "12:00 AM",
			size: 48,
			color: "white",
			gravity: "center",
			font: "minecraft"
		}, {
			type: "text",
			id: "night",
			size: 48,
			color: "white",
			gravity: "center",
			font: "minecraft"
		}]
	},
	hooks: {
		onUpdate: function(scope) {
			let night = scope.findWidgetById("night");
			if (gameNight == 1) night.setText("1st Night");
			else if (gameNight == 2) night.setText("2nd Night");
			else if (gameNight == 3) night.setText("3rd Night");
			else if (gameNight < 8) night.setText(gameNight + "th Night");
			else throw new Error("Night value cannot be > 7");
			OverlayWindow.hide();
		}
	}
});

const NightScene = parseAction({
	tick: 3250,
	sleep: 2,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				NightWindow.show();
			});
			blipSound.play();
		},
		onTick: function(scope, currently) {
			if (currently == 0) {
				gameTime = 0;
				Office.active = new Array();
				Office.procent = 99.9;
				if (!IN_CREATIVE) {
					Office.update();
					updateLightning();
				}
			}
			return ++currently;
		},
		onComplete: function(scope) {
			acquire(function() {
				TabletWindow.hide();
				startNight();
			});
		}
	}
});
