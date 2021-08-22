/**
 * Setup everything custom blocks to world
 * and it's expandable second parts.
 */
const setupBlocks = function() {
	DERenderer.buildParts(48, 5, 11, "officeTable", 0);
	DERenderer.buildParts(49, 6, 12, "officeMonitor", 0);
	DERenderer.buildParts(45, 6, 12, "officeMonitor", 1);
	DERenderer.buildParts(46, 6, 11, "officeVentilator", 0);
	DERenderer.buildParts(50, 6, 10, "officeWindow", 0);
	DERenderer.buildParts(44, 6, 10, "officeWindow", 0);
	DERenderer.buildParts(49, 5, 7, "officeButton", 0);
	DERenderer.buildParts(49, 6, 7, "officeButton", 4);
	DERenderer.buildParts(45, 5, 7, "officeButton", 1);
	DERenderer.buildParts(45, 6, 7, "officeButton", 5);
	
	DERenderer.buildParts(43, 6, 6, "hallPoster", 0);
	DERenderer.buildParts(52, 6, 6, "hallPoster", 2);
	
	DERenderer.buildParts(52, 8, 8, "hallLamp", 1);
	
	DERenderer.buildParts(42, 8, 8, "hallLamp", 1);
	DERenderer.buildParts(42, 8, 20, "hallLamp", 1);
	
	DERenderer.buildParts(27, 7, 16, "diningLamp", 1);
	DERenderer.buildParts(35, 7, 16, "diningLamp", 1);
	DERenderer.buildParts(31, 7, 16, "diningLamp", 1);
	
	DERenderer.buildParts(48, 7, 40, "sceneClouds", 0);
	
	DERenderer.buildParts(47, 5, 24, "diningTable", 0);
	DERenderer.buildParts(47, 5, 30, "diningTable", 0);
	DERenderer.buildParts(49, 5, 24, "diningChair", 1);
	DERenderer.buildParts(49, 5, 25, "diningChair", 1);
	DERenderer.buildParts(49, 5, 26, "diningChair", 1);
	DERenderer.buildParts(49, 5, 27, "diningChair", 1);
	DERenderer.buildParts(49, 5, 28, "diningChair", 1);
	DERenderer.buildParts(49, 5, 30, "diningChair", 1);
	DERenderer.buildParts(49, 5, 31, "diningChair", 1);
	DERenderer.buildParts(49, 5, 32, "diningChair", 1);
	DERenderer.buildParts(49, 5, 33, "diningChair", 1);
	DERenderer.buildParts(49, 5, 34, "diningChair", 1);
	DERenderer.buildParts(45, 5, 24, "diningChair", 0);
	DERenderer.buildParts(45, 5, 25, "diningChair", 0);
	DERenderer.buildParts(45, 5, 26, "diningChair", 0);
	DERenderer.buildParts(45, 5, 27, "diningChair", 0);
	DERenderer.buildParts(45, 5, 28, "diningChair", 0);
	DERenderer.buildParts(45, 5, 30, "diningChair", 0);
	DERenderer.buildParts(45, 5, 31, "diningChair", 0);
	DERenderer.buildParts(45, 5, 32, "diningChair", 0);
	DERenderer.buildParts(45, 5, 33, "diningChair", 0);
	DERenderer.buildParts(45, 5, 34, "diningChair", 0);
	DERenderer.buildParts(47, 6, 24, "diningCone", 0);
	DERenderer.buildParts(47, 6, 25, "diningCone", 1);
	DERenderer.buildParts(47, 6, 26, "diningCone", 2);
	DERenderer.buildParts(47, 6, 27, "diningCone", 3);
	DERenderer.buildParts(47, 6, 28, "diningCone", 1);
	DERenderer.buildParts(47, 6, 30, "diningCone", 0);
	DERenderer.buildParts(47, 6, 31, "diningCone", 1);
	DERenderer.buildParts(47, 6, 32, "diningCone", 2);
	DERenderer.buildParts(47, 6, 33, "diningCone", 3);
	DERenderer.buildParts(47, 6, 34, "diningCone", 1);
	
	DERenderer.buildParts(55, 5, 24, "diningTable", 0);
	DERenderer.buildParts(55, 5, 30, "diningTable", 0);
	DERenderer.buildParts(57, 5, 24, "diningChair", 1);
	DERenderer.buildParts(57, 5, 25, "diningChair", 1);
	DERenderer.buildParts(57, 5, 26, "diningChair", 1);
	DERenderer.buildParts(57, 5, 27, "diningChair", 1);
	DERenderer.buildParts(57, 5, 28, "diningChair", 1);
	DERenderer.buildParts(57, 5, 30, "diningChair", 1);
	DERenderer.buildParts(57, 5, 31, "diningChair", 1);
	DERenderer.buildParts(57, 5, 32, "diningChair", 1);
	DERenderer.buildParts(57, 5, 33, "diningChair", 1);
	DERenderer.buildParts(57, 5, 34, "diningChair", 1);
	DERenderer.buildParts(53, 5, 24, "diningChair", 0);
	DERenderer.buildParts(53, 5, 25, "diningChair", 0);
	DERenderer.buildParts(53, 5, 26, "diningChair", 0);
	DERenderer.buildParts(53, 5, 27, "diningChair", 0);
	DERenderer.buildParts(53, 5, 28, "diningChair", 0);
	DERenderer.buildParts(53, 5, 30, "diningChair", 0);
	DERenderer.buildParts(53, 5, 31, "diningChair", 0);
	DERenderer.buildParts(53, 5, 32, "diningChair", 0);
	DERenderer.buildParts(53, 5, 33, "diningChair", 0);
	DERenderer.buildParts(53, 5, 34, "diningChair", 0);
	DERenderer.buildParts(55, 6, 24, "diningCone", 1);
	DERenderer.buildParts(55, 6, 25, "diningCone", 3);
	DERenderer.buildParts(55, 6, 26, "diningCone", 2);
	DERenderer.buildParts(55, 6, 27, "diningCone", 1);
	DERenderer.buildParts(55, 6, 28, "diningCone", 0);
	DERenderer.buildParts(55, 6, 30, "diningCone", 1);
	DERenderer.buildParts(55, 6, 31, "diningCone", 3);
	DERenderer.buildParts(55, 6, 32, "diningCone", 2);
	DERenderer.buildParts(55, 6, 33, "diningCone", 1);
	DERenderer.buildParts(55, 6, 34, "diningCone", 0);
	
	DERenderer.buildParts(39, 5, 24, "diningTable", 0);
	DERenderer.buildParts(39, 5, 30, "diningTable", 0);
	DERenderer.buildParts(41, 5, 24, "diningChair", 1);
	DERenderer.buildParts(41, 5, 25, "diningChair", 1);
	DERenderer.buildParts(41, 5, 26, "diningChair", 1);
	DERenderer.buildParts(41, 5, 27, "diningChair", 1);
	DERenderer.buildParts(41, 5, 28, "diningChair", 1);
	DERenderer.buildParts(41, 5, 30, "diningChair", 1);
	DERenderer.buildParts(41, 5, 31, "diningChair", 1);
	DERenderer.buildParts(41, 5, 32, "diningChair", 1);
	DERenderer.buildParts(41, 5, 33, "diningChair", 1);
	DERenderer.buildParts(41, 5, 34, "diningChair", 1);
	DERenderer.buildParts(37, 5, 24, "diningChair", 0);
	DERenderer.buildParts(37, 5, 25, "diningChair", 0);
	DERenderer.buildParts(37, 5, 26, "diningChair", 0);
	DERenderer.buildParts(37, 5, 27, "diningChair", 0);
	DERenderer.buildParts(37, 5, 28, "diningChair", 0);
	DERenderer.buildParts(37, 5, 30, "diningChair", 0);
	DERenderer.buildParts(37, 5, 31, "diningChair", 0);
	DERenderer.buildParts(37, 5, 32, "diningChair", 0);
	DERenderer.buildParts(37, 5, 33, "diningChair", 0);
	DERenderer.buildParts(37, 5, 34, "diningChair", 0);
	DERenderer.buildParts(39, 6, 24, "diningCone", 0);
	DERenderer.buildParts(39, 6, 25, "diningCone", 1);
	DERenderer.buildParts(39, 6, 26, "diningCone", 2);
	DERenderer.buildParts(39, 6, 27, "diningCone", 3);
	DERenderer.buildParts(39, 6, 28, "diningCone", 1);
	DERenderer.buildParts(39, 6, 30, "diningCone", 0);
	DERenderer.buildParts(39, 6, 31, "diningCone", 1);
	DERenderer.buildParts(39, 6, 32, "diningCone", 2);
	DERenderer.buildParts(39, 6, 33, "diningCone", 3);
	DERenderer.buildParts(39, 6, 34, "diningCone", 1);
	
	DERenderer.buildParts(66, 7, 33, "hallLamp", 1);
	
	DERenderer.buildParts(30, 7, 24, "hallLamp", 1);
	DERenderer.buildParts(29, 6, 34, "bathPizza", 0);
	DERenderer.buildParts(29, 6, 30, "bathPizza", 0);
	DERenderer.buildParts(29, 6, 26, "bathPizza", 0);
	
	DERenderer.buildParts(24, 7, 33, "hallLamp", 1);
	DERenderer.buildParts(23, 5, 32, "bathSink", 0);
	DERenderer.buildParts(24, 5, 32, "bathSink", 0);
	DERenderer.buildParts(25, 5, 32, "bathSink", 0);
	DERenderer.buildParts(26, 5, 37, "bathToilet", 1);
	DERenderer.buildParts(24, 5, 37, "bathToilet", 1);
	
	DERenderer.buildParts(24, 7, 27, "hallLamp", 1);
	DERenderer.buildParts(23, 5, 28, "bathSink", 1);
	DERenderer.buildParts(24, 5, 28, "bathSink", 1);
	DERenderer.buildParts(25, 5, 28, "bathSink", 1);
	DERenderer.buildParts(26, 5, 23, "bathToilet", 0);
	DERenderer.buildParts(24, 5, 23, "bathToilet", 0);
	
	DERenderer.buildParts(43, 8, 44, "hallLamp", 1);
	DERenderer.buildParts(39, 8, 44, "hallLamp", 1);
	DERenderer.buildParts(35, 8, 44, "hallLamp", 1);
	DERenderer.buildParts(40, 7, 40, "hallLamp", 1);
	DERenderer.buildParts(35, 7, 40, "hallLamp", 1);
	
	DERenderer.buildParts(35, 8, 24, "diningLamp", 1);
	DERenderer.buildParts(35, 8, 29, "diningLamp", 1);
	DERenderer.buildParts(35, 8, 34, "diningLamp", 1);
	DERenderer.buildParts(41, 8, 24, "diningLamp", 1);
	DERenderer.buildParts(41, 8, 34, "diningLamp", 1);
	DERenderer.buildParts(47, 8, 24, "diningLamp", 1);
	DERenderer.buildParts(47, 8, 29, "diningLamp", 1);
	DERenderer.buildParts(47, 8, 34, "diningLamp", 1);
	DERenderer.buildParts(53, 8, 24, "diningLamp", 1);
	DERenderer.buildParts(53, 8, 34, "diningLamp", 1);
	DERenderer.buildParts(59, 8, 24, "diningLamp", 1);
	DERenderer.buildParts(59, 8, 29, "diningLamp", 1);
	DERenderer.buildParts(59, 8, 34, "diningLamp", 1);
};
