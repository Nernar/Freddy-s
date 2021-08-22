const ScreamScene = parseAction({
	isStatic: true,
	sleep: 161,
	hooks: {
		onRun: function(scope) {
			scope.fov = 70;
			delete scope.isBack;
			if (!TabletWindow.isShowed) {
				TabletButton.hide();
				OverlayWindow.show();
			}
			breathSound.play();
		},
		onTick: function(scope, currently) {
			currently++;
			if (currently > 40) {
				if (currently == 41) {
					if (TabletWindow.isShowed) {
						if (scope.pretick === undefined) scope.pretick = 900;
						else if (scope.pretick > 0) scope.pretick--;
						else acquire(function() {
							Cameras.switchState();
							TabletButton.hide();
						});
						!breathSound.isPlaying() && breathSound.play();
						currently--;
					} else {
						!OverlayWindow.isShowed && acquire(function() {
							OverlayWindow.show();
						});
						Interface.vibrate(3000);
						GameScene.finish();
						Music.destroy();
						screamSound.play();
					}
				} else if (currently < 101) {
					if (!scope.isBack) scope.fov < 75 ? (scope.fov += 1) : (scope.isBack = true);
					else scope.fov > 65 ? (scope.fov -= 1) : (scope.isBack = false);
					Player.setFov(scope.fov);
				} else if (currently == 141) {
					acquire(function() {
						OverlayWindow.translate(1000);
					});
				}
			} else if (currently == 1) {
				let entity = Robots.property[scope.source].entity,
					position = Entity.getPosition(entity),
					angle = Entity.getLookAngle(Player.get());
				scope.angle = Entity.getLookAt(Player.get(),
					position.x, position.y + 1.75, position.z);
				scope.angle.pitch -= angle.pitch;
				scope.angle.yaw -= angle.yaw;
			} else {
				let angle = Entity.getLookAngle(Player.get());
				angle.pitch += scope.angle.pitch / 40;
				angle.yaw += scope.angle.yaw / 40;
				Entity.setLookAngle(Player.get(), angle.yaw, angle.pitch);
			}
			return currently;
		},
		onComplete: function(scope) {
			delete scope.angle;
			delete scope.source;
			delete scope.pretick;
			DeathScene.run(function() {
				Player.resetFov();
			});
		}
	}
});

ScreamScene.setSource = function(id) {
	ScreamScene.source = id;
};
