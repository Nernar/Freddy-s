/**
 * Teleport player to pizzeria with start night
 * if [[Development.logicEnabled]] active.
 * Or just startup office ambience at all.
 */
const startNight = function() {
	try {
		TabletWindow.updateContainer();
		Entity.setPosition(Player.get(), 47.5, 7, 6.5);
		Entity.setLookAngle(Player.get(), 0, 0);
		Entity.setMobile(Player.get(), true);
		Player.setCameraEntity(Player.get());
		
		ambienceSound.play();
		officeBackgroundSound.play();
		prescBackgroundSound.play();
		Music.Source.updateVolume();
		
		if (Development.logicEnabled) {
			Robots.update();
			Robots.continue();
			Cameras.update();
			TabletButton.show();
			let next = Cameras.findCameraById("1A");
			TabletWindow.setLocation(next.id);
			Cameras.current = "1A";
			
			Robots.create("bonnie");
			bonnieGoingSound.setEntity(Robots.property.bonnie.entity, 15);
			Robots.ai.bonnie.scream.setEnabled(false);
			Robots.create("chica");
			chicaGoingSound.setEntity(Robots.property.chica.entity, 15);
			Robots.ai.chica.scream.setEnabled(false);
			Robots.create("freddy");
			freddyLaughSound.setEntity(Robots.property.freddy.entity, 30);
			freddyGoingSound.setEntity(Robots.property.freddy.entity, 15);
			whisperingSound.setEntity(Robots.property.freddy.entity, 10);
			Robots.ai.freddy.scream.setEnabled(false);
			Robots.create("foxy");
			foxySongSound.setEntity(Robots.property.foxy.entity, 8);
			foxyGoingSound.setEntity(Robots.property.foxy.entity, 12);
			foxyRunningSound.setEntity(Robots.property.foxy.entity, 15);
			Robots.ai.foxy.scream.setEnabled(false);
			Robots.ai.foxy.attempts = 0;
			
			switch (gameNight) {
				case 1:
					Robots.ai.bonnie.active = Robots.ai.chica.active = Robots.ai.foxy.active = Robots.ai.freddy.active = 0;
					break;
				case 2:
					Robots.ai.bonnie.active = 3;
					Robots.ai.chica.active = Robots.ai.foxy.active = 1;
					Robots.ai.freddy.active = 0;
					break;
				case 3:
					Robots.ai.bonnie.active = 0;
					Robots.ai.chica.active = 5;
					Robots.ai.foxy.active = 2;
					Robots.ai.freddy.active = 1;
					break;
				// case 4:
					// Robots.ai.bonnie.active = 2;
					// Robots.ai.chica.active = 4;
					// Robots.ai.foxy.active = 6;
					// Robots.ai.freddy.active = 1 + random(2);
					// break;
				// case 5:
					// Robots.ai.bonnie.active = Robots.ai.foxy.active = 5;
					// Robots.ai.chica.active = 7;
					// Robots.ai.freddy.active = 3;
					// break;
				// case 6:
					// Robots.ai.bonnie.active = 10;
					// Robots.ai.chica.active = 12;
					// Robots.ai.foxy.active = 6;
					// Robots.ai.freddy.active = 4;
					// break;
			}
			
			if (gameNight < 6) {
				let suffix = Translation.getLanguage() == "ru" ? "_ru" : new String();
				phoneGuySound.setSource("phone/phone" + gameNight + suffix + ".mp3");
				phoneGuySound.play();
			}
			GameScene.run();
		} else NightWindow.hide();
	} catch (e) {
		reportError(e);
	}
};

/**
 * Close currently opened windows, started
 * music and development menus. Must be called
 * when world is unloading at all.
 */
const releaseAll = function() {
	try {
		Window.dismiss();
		Music.destroy();
	} catch (e) {
		reportError(e);
	}
};

/**
 * Attaches window containers to screen just
 * for better stability when manipulation with it.
 * Must be called when world is loading at all.
 */
const buildAll = function() {
	try {
		TabletWindow.create();
		TabletButton.create();
		TabletSwitch.create();
		HallucinationWindow.create();
		OverlayWindow.create();
		NightWindow.create();
		WinWindow.create();
		DemoWindow.create();
		FailedWindow.create();
		CreepyStartWindow.create();
		CreepyEndWindow.create();
		if (DEVELOP || MAY_DEBUG) {
			LogWindow.create();
		}
		Development.showLog && LogWindow.show();
		if (DEVELOP) {
			removeMenu();
			removeButton();
			createButton();
		}
	} catch (e) {
		reportError(e);
	}
};

let isCorrectWorld = null;

Callback.addCallback("LevelSelected", function(nameWorld, dirWorld) {
	handle(function() {
		if (nameWorld == getModificationWorldName()) {
			log("World", "Starting enter sequence to preloading");
			if (dirWorld != getModificationWorldDirectory()) {
				log("World", "Custom world detected at /" + dirWorld);
			}
			isCorrectWorld = true;
			handle(function() {
				buildAll();
			}, 2000);
			Development.showButton = !__config__.getBool("interface.hide_tablet_button");
			if (MAY_DEBUG) Development.showLog = __config__.getBool("interface.show_debug_log_window");
			WarningWindow.create();
			WarningWindow.show();
		} else isCorrectWorld = false;
	});
});

Callback.addCallback(isHorizon ? "LevelDisplayed" : "LevelLoaded", function() {
	if (!isCorrectWorld) {
		return;
	}
	handle(function() {
		if (isCorrectWorld) {
			log("World", "Sequence must be completed now");
			if (!IN_CREATIVE) {
				if (random(1, 1000) == 1) CreepyStartScene.run();
				else EnterScene.run();
				World.setNightMode(isHorizon);
				setupBlocks();
			}
			WarningWindow.dismiss();
		}
	});
});

Callback.addCallback("LevelLeft", function() {
	handle(function() {
		isCorrectWorld && releaseAll();
		isCorrectWorld = null;
	});
});

Callback.addCallback("DestroyBlockStart", function(coords, block, player) {
	isCorrectWorld && !DEVELOP && !IN_CREATIVE && Game.prevent();
});

Callback.addCallback("EntityHurt", function(attacker, victim, damage) {
	isCorrectWorld && !DEVELOP && !IN_CREATIVE && Game.prevent();
});
