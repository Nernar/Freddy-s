let lastFixRotation = [];

/**
 * Simply moves entity by velocity to
 * determine currently setted rotation.
 */
const fixRotation = function(ent) {
	if (ent && !isHorizon) {
		lastFixRotation.push(ent);
	}
};

let prevFixRotation = [];
Callback.addCallback("tick", function() {
	while (prevFixRotation.length > 0) {
		let ent = prevFixRotation.shift();
		Entity.setVelocity(ent, 0.1, 0, 0.1);
	}
	while (lastFixRotation.length > 0) {
		let ent = lastFixRotation.shift();
		Entity.setVelocity(ent, -0.1, 0, -0.1);
		prevFixRotation.push(ent);
	}
});

if (Player.resetCameraEntity === undefined) {
	Player.resetCameraEntity = function() {
		Player.setCameraEntity(Player.get());
	};
}
