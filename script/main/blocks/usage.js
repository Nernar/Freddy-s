Callback.addCallback("ItemUse", function(coords, item, block) {
	if (!isCorrectWorld) {
		return;
	}
	handle(function() {
		if (isCorrectWorld) {
			Office.checkUse(coords.x, coords.y, coords.z);
			TabletWindow.updateContainer();
		}
	});
});

/**
 * Determines world lightning in building
 * by currently availabled generator energy.
 */
const updateLightning = function() {
	if (Office.procent > 0) {
		DERenderer.buildParts(47, 7, 9, "officeLamp", 0);
		DERenderer.buildParts(56, 7, 16, "supplyLamp", 0);
		DERenderer.buildParts(52, 8, 14, "hallLamp", 0);
		DERenderer.buildParts(52, 8, 20, "hallLamp", 0);
		DERenderer.buildParts(42, 8, 14, "hallLamp", 0);
		DERenderer.buildParts(65, 7, 17, "hallLamp", 0);
		DERenderer.buildParts(27, 7, 42, "hallLamp", 0);
		DERenderer.buildParts(30, 7, 30, "hallLamp", 0);
		DERenderer.buildParts(41, 8, 29, "diningLamp", 0);
		DERenderer.buildParts(53, 8, 29, "diningLamp", 0);
	} else {
		DERenderer.buildParts(47, 7, 9, "officeLamp", 1);
		DERenderer.buildParts(56, 7, 16, "supplyLamp", 1);
		DERenderer.buildParts(52, 8, 14, "hallLamp", 1);
		DERenderer.buildParts(52, 8, 20, "hallLamp", 1);
		DERenderer.buildParts(42, 8, 14, "hallLamp", 1);
		DERenderer.buildParts(65, 7, 17, "hallLamp", 1);
		DERenderer.buildParts(27, 7, 42, "hallLamp", 1);
		DERenderer.buildParts(30, 7, 30, "hallLamp", 1);
		DERenderer.buildParts(41, 8, 29, "diningLamp", 1);
		DERenderer.buildParts(53, 8, 29, "diningLamp", 1);
	}
};
