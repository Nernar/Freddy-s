ModAPI.registerAPI("FNaF", {
	// Used to handle your conditioned events
	Action: Action,
	// Create conditioned sounds with advanced volume
	Music: Music,
	// Scenes and animations as world transition
	Transition: Transition,
	// Modules used to control entities
	Robots: Robots,
	Cameras: Cameras,
	// Create widget by params
	Widget: Widget,
	// Used to work with windows
	Window: Window,
	// Working with files
	Dirs: Dirs,
	Files: Files,
	Options: Options,
	// Resource factories
	Factory: {
		Asset: AssetFactory,
		Image: ImageFactory
	},
	// For every something else
	requireGlobal: function(who) {
		return eval(who);
	}
});

Logger.Log("Freddy's API shared with name \"FNaF\"", "API");
