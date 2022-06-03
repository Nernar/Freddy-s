const FailedWindow = new Window({
	content: {
		type: "frame",
		background: "black",
		childrens: [{
			type: "image",
			scale: "fit_xy",
			resource: "gameOver",
			params: "match"
		}, {
			type: "text",
			text: "Game Over",
			size: 56,
			color: "white",
			gravity: "right | bottom",
			font: "minecraft",
			padding: 40
		}]
	}
});

const DeathScene = parseAction({
	isStatic: true,
	tick: 1000,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				OverlayWindow.show();
			});
			let transition = new Transition();
			transition.withEntity(Player.get());
			transition.withFrom(51.62, 5.62, 24.35, -3.15, -1.12);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.ACCELERATE_DECELERATE);
			transition.addFrame(0, 0, 0, 0, 0, 0.5, Transition.Interpolator.ACCELERATE_DECELERATE);
			transition.addFrame(0, 0, 0.5, 0, 0, 0.66);
			transition.addFrame(0, 0, 0.25, 0, 0.27, 0.33);
			transition.addFrame(0, 0, 0, 0.02, 0.16, 0.5, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0.4, 1);
			transition.addFrame(0, 0, 0, 0, 0, 0.5, Transition.Interpolator.ACCELERATE_DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0, 0, 0, 0.5, Transition.Interpolator.ACCELERATE_DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0.75, -0.02, -0.83, 0.75, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0, 0, 0, 0.5, Transition.Interpolator.ACCELERATE_DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.DECELERATE);
			transition.addFrame(0, 0, 0.75, 0, 0, 1, Transition.Interpolator.DECELERATE);
			transition.withOnStartListener(function() {
				// Maybe it's not Bonnie, but we're need sound
				bonnieGoingSound.setLooping(true);
				bonnieGoingSound.resetSource();
				bonnieGoingSound.play();
			});
			transition.withOnFrameListener(function(b, i, r) {
				i == 13 && r == 0 && acquire(function() {
					OverlayWindow.translate(2500);
				});
			});
			transition.withOnFinishListener(function() {
				bonnieGoingSound.setLooping(false);
				bonnieGoingSound.source = Music.Source.ENTITY;
				bonnieGoingSound.stop();
				robotVoiceSound.resetSource();
				robotVoiceSound.play();
				let transition = new Transition();
				transition.withEntity(Player.get());
				transition.withFrom(66.46, 6.62, 32, -3.13, -0.25);
				transition.addFrame(0, 0, 0, 0, 0, 5, Transition.Interpolator.ACCELERATE_DECELERATE);
				transition.withOnFinishListener(function() {
					scope.exitDelay = 10;
					acquire(function() {
						FailedWindow.show();
					});
					robotVoiceSound.source = Music.Source.ENTITY;
					robotVoiceSound.stop();
					handle(function() {
						OverlayWindow.hide();
					}, 50);
				});
				transition.withOnFrameListener(function(b, i, r) {
					if (i == 0) {
						r == 240 && acquire(function() {
							// @todo: Must be animated endoskeleton and suit inject
							Entity.lookAtCoords(Robots.property.endoskeleton.entity, Player.getPosition()); 
							fixRotation(Robots.property.endoskeleton.entity);
						});
						r == 250 && acquire(function() {
							OverlayWindow.translate(1000);
						});
					}
				});
				transition.start();
			});
			transition.start();
		},
		onTick: function(scope, currently) {
			if (scope.exitDelay > 0) {
				scope.exitDelay--;
			} else if (scope.exitDelay == 0) {
				scope.complete();
				delete scope.exitDelay;
				if (random(10000) == 0) {
					CreepyEndScene.run(function() {
						FailedWindow.hide();
					});
				} else {
					/* @todo: Might be Menu */
					NightScene.run(function() {
						FailedWindow.hide();
					});
				}
			} else if (random(5) == 0) {
				acquire(function() {
					HallucinationWindow.show();
				});
			}
			return ++currently;
		}
	}
});
