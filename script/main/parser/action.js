/**
 * Parse specified object as [[Action]] by
 * hardcoded json-represent descriptor.
 * @param {object} who will apply descriptor
 * @param {boolean} [preserveUnknownProperties]
 * @returns {Action} as result
 */
const parseAction = function(who, preserveUnknownProperties) {
	if (typeof who != "object" || who == null) {
		MCSystem.throwException("parseAction: null");
	}
	let instance = new Action();
	for (let property in who) {
		let someone = who[property];
		switch (property) {
			case "hooks": case "actions": case "listeners":
				if (typeof someone != "object" || someone == null) {
					MCSystem.throwException("Freddy's: parseAction: " + property + " must be object");
				}
				try {
					someone.onInit && someone.onInit(instance);
				} catch (e) {
					reportError(e);
				}
				someone.onRun && instance.setOnRunListener(someone.onRun);
				someone.onExecute && instance.setOnCreateListener(someone.onExecute);
				someone.onTick && instance.setOnTickListener(someone.onTick);
				someone.onCancel && instance.setOnCancelListener(someone.onCancel);
				someone.onPause && instance.setOnPauseListener(someone.onPause);
				someone.onDestroy && instance.setOnDestroyListener(someone.onDestroy);
				someone.onComplete && instance.setAction(someone.onComplete);
				someone.onFinish && instance.setAction(someone.onFinish);
				break;
			case "game": case "time":
				if (typeof someone == "number") {
					instance.setTickTime(someone);
				} else if (typeof someone == "object" && someone != null) {
					someone.tick >= 0 && instance.setTickTime(someone.tick);
					someone.static && instance.makeInfinity();
				}
				break;
			case "tick": case "wait":
				instance.setTickTime(someone);
				break;
			case "static": case "isStatic":
				someone && instance.makeInfinity();
				break;
			case "await": case "sleep":
				instance.setAwait(someone);
				break;
			case "action": case "complete":
				instance.setAction(someone);
				break;
			case "condition":
				instance.setCondition(someone);
				break;
			case "cancel":
				instance.setOnCancelListener(someone);
				break;
			case "priority":
				instance.setPriority(someone);
				break;
			default:
				if (preserveUnknownProperties === false) {
					continue;
				}
				Logger.Log("parseAction: Unknown property " + property, "WARNING")
		}
	}
	return instance;
};
