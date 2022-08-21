/**
 * Called when anyone robot enters office,
 * that means you're will be killed in few
 * seconds after all. Or stucked...
 * @param {string} name of robot
 */
const handleRobotFollow = function(name) {
	let robot = Robots.ai[name];
	if (robot && robot.data) {
		delete robot.data.listeners.pause;
		robot.data.params.followOffice = true;
		robot.data.resume();
	}
};

/** @todo */
const handleGoldenFreddy = function() {
	// Customize here ...
	laughSound.play();
};

const saveGame = function() {
	try {
		Preferences.save("night", gameNight);
	} catch (e) {
		reportError(e);
	}
};

const restoreGame = function() {
	try {
		gameNight = parseInt(Preferences.get("night"));
	} catch (e) {
		reportError(e);
	}
};

/**
 * Look on player when it somewhere around.
 * Only for hardcoded three seconds, huh.
 */
const checkExtraView = function() {
	if (Entity.getDistanceToCoords(Player.get(), Robots.property.freddy) < 10) {
		let position = Player.getPosition();
		Entity.lookAtCoords(Robots.property.bonnie.entity, position);
		Entity.lookAtCoords(Robots.property.chica.entity, position);
		Entity.lookAtCoords(Robots.property.freddy.entity, position);
		fixRotation(Robots.property.bonnie.entity);
		fixRotation(Robots.property.chica.entity);
		fixRotation(Robots.property.freddy.entity);
		officeDangerSound.play();
	} else if (Office.active[4] && Cameras.current == "1A") {
		let position = Entity.getPosition(Cameras.findCameraById("1A").entity);
		Entity.lookAtCoords(Robots.property.bonnie.entity, position);
		Entity.lookAtCoords(Robots.property.chica.entity, position);
		Entity.lookAtCoords(Robots.property.freddy.entity, position);
		fixRotation(Robots.property.bonnie.entity);
		fixRotation(Robots.property.chica.entity);
		fixRotation(Robots.property.freddy.entity);
		officeDangerSound.play();
	} else return;
	handle(function() {
		Entity.setLookAngle(Robots.property.bonnie.entity, Math.PI, 0);
		Entity.setLookAngle(Robots.property.chica.entity, Math.PI, 0);
		Entity.setLookAngle(Robots.property.freddy.entity, Math.PI, 0);
		fixRotation(Robots.property.bonnie.entity);
		fixRotation(Robots.property.chica.entity);
		fixRotation(Robots.property.freddy.entity);
	}, 3000);
};
