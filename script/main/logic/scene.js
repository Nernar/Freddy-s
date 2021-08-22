const GameScene = parseAction({
	isStatic: true,
	hooks: {
		onRun: function(scope) {
			acquire(function() {
				NightWindow.hide();
			});
		},
		onTick: function(scope, currently) {
			currently++;
			
			// Every 90 seconds next hour will be appeared
			if (currently % 1800 == 0) {
				gameTime++;
				
				// Updating office container
				acquire(function() {
					// Office.updateClock();
					TabletWindow.updateContainer();
				});
				
				// Every night intellect must be improved
				if (gameTime == 2) Robots.ai.bonnie.active++;
				else if (gameTime >= 3 && gameTime <= 4) {
					Robots.ai.bonnie.active++;
					Robots.ai.chica.active++;
					Robots.ai.foxy.active++;
				} else
				
				// And nightshift may completed as well
				if (gameTime == 6) {
					scope.complete();
					CompleteScene.run();
				}
			}
			
			if (gameTime < 6) {
				if (Office.procent > 0) {
					// Every animatronic claims power, golly
					if (Robots.ai.bonnie.active >= 2) {
						if (currently % 120 == 0 && Robots.ai.bonnie.active == 2) {
							Office.procent -= 0.1;
						} else if (currently % 100 == 0 && Robots.ai.bonnie.active == 3) {
							Office.procent -= 0.1;
						} else if (currently % 80 == 0 && Robots.ai.bonnie.active == 4) {
							Office.procent -= 0.1;
						} else if (currently % 60 == 0 && Robots.ai.bonnie.active >= 5) {
							Office.procent -= 0.1;
						}
					}
					
					// Random sound encounters or easter eggs
					if (currently % 80 == 0 && Robots.ai.foxy.location == "cove") {
						random(30) == 0 && foxySongSound.play();
					}
					
					if (currently % 100 == 0) {
						random(30) == 0 && circusSound.play();
					} 
					
					if (currently & 200 == 0 && random(50) == 1) {
						poundingSound.setBlock(random(1, 2) == 1 ? 50 : 44, 5, 8);
						poundingSound.setVolume(10 + random(40));
						poundingSound.play();
					}
					
					// Oh, you're found buckets, haven't you?..
					if (Robots.ai.chica.location == "kitchen" || Robots.ai.freddy.location == "kitchen") {
						if (!scope.kitchenNoise && random(2) == 0) {
							if (Robots.ai.chica.location == "kitchen") {
								kitchenNoiseSound.setEntity(Robots.property.chica.entity);
								kitchenNoiseSound.play();
							} else if (Robots.ai.freddy.location == "kitchen") {
								kitchenNoiseSound.setEntity(Robots.property.freddy.entity);
								kitchenNoiseSound.play();
							}
							scope.kitchenNoise = 80;
						} else if (scope.kitchenNoise > 0) scope.kitchenNoise--;
					}
					
					if (currently % 20 == 0) {
						// Of course ordinary power must be used too
						Office.procent -= Office.getUsage() / 10;
						
						// Just few more random encounters, yeah
						if (random(10000) == 0) handleGoldenFreddy();
						if (Robots.ai.freddy.location == "door" && random(4) == 0) Robots.ai.freddy.generate();
						if (random(500) == 0) checkExtraView();
						
						// Client interface ticking right here
						scope.cameraNoise = random(1, 3);
						
						acquire(function() {
							TabletWindow.updateContainer();
							if (random(1000) == 0) HallucinationWindow.show();
						});
					}
					
					// Ticiking tablet noise and foxy preparation
					if (Office.active[4]) {
						if (Cameras.current == "1C" && Robots.ai.foxy.atCove())
							Robots.ai.foxy.wait = 100;
						else if (Cameras.current == "2A")
							if (Robots.ai.foxy.data.data.finished)
								if (Robots.ai.foxy.location == "corridor")
									Robots.ai.foxy.wait = 0;
						acquire(function() {
							TabletWindow.findWidgetById("noise").setAlpha(150 + random(50) * scope.cameraNoise);
						});
					}
					
				} else {
					// No energy? Let's fun with me in dark!
					if (scope.energyTick == 0) {
						// Step after Freddy's in door
						scope.energyTick = -1;
						musicBoxSound.stop();
						musicBoxSound.resetSource();
						World.setBlock(51, 7, 8, 0);
						
						handleAction(function() {
							Robots.continue("freddy");
							Robots.goNextPath("freddy", "door_office");
							freddyGoingSound.play();
							handleAction(function() {
								acquire(function() {
									ScreamScene.setSource("freddy");
									ScreamScene.run();
								});
							}, function() {
								return gameTime < 6 && !ScreamScene.isActive();
							}, 10000);
						}, function() {
							return gameTime < 6 && !ScreamScene.isActive();
						}, random(500, 3000));
					} else if (scope.energyTick > 0) {
						// Very unstable blink, but still working
						if (random(4) == 0) World.setBlock(51, 7, 8, 0);
						else World.setBlock(51, 7, 8, BlockID.reserveLight);
						scope.energyTick--;
					} else if (!scope.energyTick) {
						// Power off everything that does
						scope.energyTick = -1;
						Robots.await();
						Robots.continue("freddy");
						Robots.ai.freddy.location = "scene";
						Robots.goNextPath("freddy", "scene_door");
						
						Music.destroy();
						powerBackgroundSound.play();
						powerDownSound.play();
						Office.disactive("lightning");
						Office.disactive("doors");
						// Office.updateClock();
						updateLightning();
						
						acquire(function() {
							Office.active[4] && Cameras.switchState();
							TabletButton.hide();
						});
					}
				}
				// On six am will be freezed
				Cameras.execute();
			}
			Robots.execute();
			return currently;
		},
		onComplete: function(scope) {
			delete scope.energyTick;
			delete scope.kitchenNoise;
		}
	}
});
