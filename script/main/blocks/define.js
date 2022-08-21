try {
	MCSystem.setLoadingTip(NAME + ": Registering Blocks");
	DEVELOP && convertModels();
	DERenderer.prepare();
	
	IDRegistry.genBlockID("officeDoor");
	Block.createBlock("officeDoor", [
		{ name: "Door Lower", texture: [["office_door", 0]], inCreative: IN_CREATIVE },
		{ name: "Door Upper", texture: [["office_door", 1]], inCreative: IN_CREATIVE }
	]);
	Block.setShape(BlockID.officeDoor, 6/16, 0/16, 0/16, 10/16, 16/16, 16/16);
	
	IDRegistry.genBlockID("officeTable");
	Block.createBlock("officeTable", [
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE },
		{ name: "Office Table", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.officeTable, "officeTable");
	
	IDRegistry.genBlockID("officeButton");
	Block.createBlock("officeButton", [
		{ name: "Office Button Light Left", inCreative: IN_CREATIVE },
		{ name: "Office Button Light Right", inCreative: IN_CREATIVE },
		{ name: "Office Button Light Left", inCreative: IN_CREATIVE },
		{ name: "Office Button Light Right", inCreative: IN_CREATIVE },
		{ name: "Office Button Door Left", inCreative: IN_CREATIVE },
		{ name: "Office Button Door Right", inCreative: IN_CREATIVE },
		{ name: "Office Button Door Left", inCreative: IN_CREATIVE },
		{ name: "Office Button Door Right", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.officeButton, "officeButton");
	
	IDRegistry.genBlockID("officeLight");
	Block.createBlock("officeLight", [
		{ name: "Office Light", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		lightopacity: 0, lightlevel: 8
	}));
	DERenderer.setEmptyRender(BlockID.officeLight);
	
	IDRegistry.genBlockID("reserveLight");
	Block.createBlock("reserveLight", [
		{ name: "Reserve Light", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		lightopacity: 0, lightlevel: 4
	}));
	DERenderer.setEmptyRender(BlockID.reserveLight);
	
	IDRegistry.genBlockID("officeVentilator");
	Block.createBlock("officeVentilator", [
		{ name: "Office Ventilator", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.officeVentilator, "officeVentilator");
	
	DERenderer.addTranslation("celebrate", 0, {
		ru: ["celebrate", 4]
	});
	DERenderer.addTranslation("celebrate", 1, {
		ru: ["celebrate", 5]
	});
	DERenderer.addTranslation("celebrate", 2, {
		ru: ["celebrate", 6]
	});
	DERenderer.addTranslation("celebrate", 3, {
		ru: ["celebrate", 7]
	});
	
	IDRegistry.genBlockID("officeMonitor");
	Block.createBlock("officeMonitor", [
		{ name: "Office Monitor Left", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Left", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Left", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Left", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Left", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Left", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Right", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Right", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Right", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Right", inCreative: IN_CREATIVE },
		{ name: "Office Monitor Right", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.officeMonitor, "officeMonitor");
	
	IDRegistry.genBlockID("officeWindow");
	Block.createBlock("officeWindow", [
		{ name: "Office Window", inCreative: IN_CREATIVE },
		{ name: "Office Window", inCreative: IN_CREATIVE },
		{ name: "Office Window", inCreative: IN_CREATIVE },
		{ name: "Office Window", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		renderlayer: 2, lightopacity: 0
	}));
	DERenderer.setStaticRender(BlockID.officeWindow, "officeWindow");
	
	IDRegistry.genBlockID("officeLamp");
	Block.createBlock("officeLamp", [
		{ name: "Office Lamp", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		lightlevel: 8, lightopacity: 0
	}));
	DERenderer.setStaticRender(BlockID.officeLamp, "officeLamp", 0);
	
	IDRegistry.genBlockID("officeLampDark");
	Block.createBlock("officeLampDark", [
		{ name: "Office Lamp", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.officeLampDark, "officeLamp", 1);
	
	IDRegistry.genBlockID("hallLamp");
	Block.createBlock("hallLamp", [
		{ name: "Hall Lamp", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		lightlevel: 6, lightopacity: 0
	}));
	DERenderer.setStaticRender(BlockID.hallLamp, "hallLamp", 0);
	
	IDRegistry.genBlockID("hallLampDark");
	Block.createBlock("hallLampDark", [
		{ name: "Hall Lamp", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.hallLampDark, "hallLamp", 1);
	
	IDRegistry.genBlockID("diningLamp");
	Block.createBlock("diningLamp", [
		{ name: "Dining Lamp", inCreative: IN_CREATIVE },
		{ name: "Dining Lamp", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		lightlevel: 5, lightopacity: 0
	}));
	DERenderer.setStaticRender(BlockID.diningLamp, "diningLamp", 0);
	
	IDRegistry.genBlockID("diningLampDark");
	Block.createBlock("diningLampDark", [
		{ name: "Dining Lamp Dark", inCreative: IN_CREATIVE },
		{ name: "Dining Lamp Dark", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.diningLampDark, "diningLamp", 1);
	
	IDRegistry.genBlockID("supplyLamp");
	Block.createBlock("supplyLamp", [
		{ name: "Supply Lamp", inCreative: IN_CREATIVE }
	], Block.createSpecialType({
		lightlevel: 7, lightopacity: 0
	}));
	DERenderer.setStaticRender(BlockID.supplyLamp, "supplyLamp", 0);
	
	IDRegistry.genBlockID("supplyLampDark");
	Block.createBlock("supplyLampDark", [
		{ name: "Supply Lamp", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.supplyLampDark, "supplyLamp", 1);
	
	IDRegistry.genBlockID("diningTable");
	Block.createBlock("diningTable", [
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE },
		{ name: "Dining Table", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.diningTable, "diningTable");
	
	IDRegistry.genBlockID("diningChair");
	Block.createBlock("diningChair", [
		{ name: "Dining Chair", inCreative: IN_CREATIVE },
		{ name: "Dining Chair", inCreative: IN_CREATIVE },
		{ name: "Dining Chair", inCreative: IN_CREATIVE },
		{ name: "Dining Chair", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.diningChair, "diningChair");
	
	IDRegistry.genBlockID("diningCone");
	Block.createBlock("diningCone", [
		{ name: "Dining Cone", inCreative: IN_CREATIVE },
		{ name: "Dining Cone", inCreative: IN_CREATIVE },
		{ name: "Dining Cone", inCreative: IN_CREATIVE },
		{ name: "Dining Cone", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.diningCone, "diningCone");
	
	IDRegistry.genBlockID("bathPizza");
	Block.createBlock("bathPizza", [
		{ name: "Bath Pizza", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.bathPizza, "bathPizza");
	
	IDRegistry.genBlockID("bathSink");
	Block.createBlock("bathSink", [
		{ name: "Bath Sink", inCreative: IN_CREATIVE },
		{ name: "Bath Sink", inCreative: IN_CREATIVE },
		{ name: "Bath Sink", inCreative: IN_CREATIVE },
		{ name: "Bath Sink", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.bathSink, "bathSink");
	
	IDRegistry.genBlockID("bathToilet");
	Block.createBlock("bathToilet", [
		{ name: "Bath Toilet", inCreative: IN_CREATIVE },
		{ name: "Bath Toilet", inCreative: IN_CREATIVE },
		{ name: "Bath Toilet", inCreative: IN_CREATIVE },
		{ name: "Bath Toilet", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.bathToilet, "bathToilet");
	
	IDRegistry.genBlockID("sceneClouds");
	Block.createBlock("sceneClouds", [
		{ name: "Scene Clouds", inCreative: IN_CREATIVE },
		{ name: "Scene Clouds", inCreative: IN_CREATIVE },
		{ name: "Scene Clouds", inCreative: IN_CREATIVE },
		{ name: "Scene Clouds", inCreative: IN_CREATIVE },
		{ name: "Scene Clouds", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.sceneClouds, "sceneClouds");
	
	IDRegistry.genBlockID("coveCurtain");
	Block.createBlock("coveCurtain", [
		{ name: "Cove Curtain", inCreative: IN_CREATIVE },
		{ name: "Cove Curtain", inCreative: IN_CREATIVE },
		{ name: "Cove Curtain", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.coveCurtain, "coveCurtain");
	
	DERenderer.addTranslation("rules", 0, {
		ru: ["rules", 2]
	});
	DERenderer.addTranslation("rules", 1, {
		ru: ["rules", 3]
	});
	DERenderer.addTranslation("party", 0, {
		ru: ["party", 1]
	});
	
	IDRegistry.genBlockID("hallPoster");
	Block.createBlock("hallPoster", [
		{ name: "Hall Poster", inCreative: IN_CREATIVE },
		{ name: "Hall Poster", inCreative: IN_CREATIVE },
		{ name: "Hall Poster", inCreative: IN_CREATIVE }
	]);
	DERenderer.setStaticRender(BlockID.hallPoster, "hallPoster");
} catch (e) {
	reportError(e);
}
