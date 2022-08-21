const launchModification = function(additionalScope) {
	if (this.isInstant !== undefined) {
		return;
	}
	if (additionalScope !== undefined) {
		__mod__.RunMod(additionalScope);
		return;
	}
	Launch();
};

(function() {
	try {
		ConfigureMultiplayer({
			isClientOnly: false
		});
	} catch (e) {
		launchModification({
			isOutdated: true
		});
		return;
	}
	launchModification();
})();
