try {
	ConfigureMultiplayer({
		isClientOnly: false
	});
	Launch();
} catch (e) {
	Logger.Log("Freddy's: Client outdated, modification is not supported! Please, upgrade Inner Core to Horizon.", "ERROR");
}
