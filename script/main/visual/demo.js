const DemoWindow = new Window({
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
				text: "Thanks for playing the preview!",
				gravity: "center",
				padding: 30,
				size: 36,
				color: "white",
				font: "minecraft"
			}, {
				type: "text",
				text: "Preview completed, progress has been saved.\nWait the release, they add 5-day experience\nplus two unlockable modes of gameplay!\n\nFreddy and his friends are waiting!",
				gravity: "center",
				size: 33,
				color: "ltgray",
				font: "minecraft"
			}]
		}
	}
});

const DemoScene = parseAction({
	tick: 10000,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				DemoWindow.show();
			});
			musicBoxSound.play();
		},
		onComplete: function() {
			EnterScene.run(function() {
				DemoWindow.hide();
				musicBoxSound.stop();
			});
		}
	}
});
