/**
 * @constructor
 * More frequent module to working with
 * intellect and control entities.
 * @todo unrealized code
 */
const Robot = function(params) {
	let count = Robot.instances.push(this);
	this.id = "robot" + count;
	this.locations = new Object();
	
	this.addPoint = function(name, x, y) {};
	this.buildPath = function(location) {};
	this.findStraightPoint = function() {};
	this.findNearestPoint = function() {};
	this.findNextPoint = function() {};
};

Robot.instances = new Array();

const Robots = {
	property: {
		bonnie: {
			type: "ntfnaf:bonnie",
			spawnAtStart: true,
			x: 50.5,
			y: 6,
			z: 39.5,
			pitch: 180,
			yaw: 0
		},
		chica: {
			type: "ntfnaf:chica",
			spawnAtStart: true,
			x: 46.5,
			y: 6,
			z: 39.5,
			pitch: 180,
			yaw: 0
		},
		freddy: {
			type: "ntfnaf:freddy",
			spawnAtStart: true,
			x: 48.5,
			y: 6,
			z: 39.5,
			pitch: 180,
			yaw: 0
		},
		foxy: {
			type: "ntfnaf:foxy",
			spawnAtStart: true,
			x: 64.5,
			y: 6,
			z: 24.5,
			pitch: 90,
			yaw: -45
		},
		golden_freddy: {
			type: "ntfnaf:freddy",
			spawnAtStart: false
		},
		endoskeleton: {
			type: "ntfnaf:endoskeleton",
			spawnAtStart: true,
			x: 65.75,
			y: 5,
			z: 31.75,
			pitch: 180,
			yaw: 0
		}
	},
	ai: {
		bonnie: {
			place: "scene",
			params: {
				speed: 0.1
			},
			active: 20,
			pathes: {
				scene_service: [[50.5, 6, 39.5], [50.5, 5, 35.5], [60.5, 5, 35.5], [60.5, 5, 36.3], [64.5, 5, 36.3], [64.5, 5, 35.5]],
				scene_area: [[50.5, 6, 39.5], [50.5, 5, 35.5], [52.5, 5, 35.5], [52.5, 5, 28.5]],
				scene_corridor: [[50.5, 6, 39.5], [50.5, 5, 35.5], [52.5, 5, 35.5], [52.5, 5, 23.5]],
				area_corridor: [[52.5, 5, 28.5], [52.5, 5, 23.5]],
				service_corridor: [[64.5, 5, 35.5], [64.5, 5, 36.3], [60.5, 5, 36.3], [60.5, 5, 35.5], [52.5, 5, 35.5], [52.5, 5, 23.5]],
				service_area: [[64.5, 5, 35.5], [64.5, 5, 36.3], [60.5, 5, 36.3], [60.5, 5, 35.5], [52.5, 5, 35.5], [52.5, 5, 28.5]],
				corridor_supply: [[52.5, 5, 23.5], [52.5, 5, 16.375], [55.5, 5, 16.375], [55.5, 5, 19.5]],
				corridor_hall: [[52.5, 5, 23.5], [52.5, 5, 6.5]],
				supply_hall: [[55.5, 5, 19.5], [55.5, 5, 16.375], [52.5, 5, 16.375], [52.5, 5, 6.5]],
				hall_door: [[52.5, 5, 6.5], [51.5, 5, 6.5], [51.5, 5, 8.5]],
				supply_door: [[55.5, 5, 19.5], [55.5, 5, 16.375], [51.5, 5, 16.375], [51.5, 5, 8.5]],
				door_office: [[51.5, 5, 8.5], [48.5, 4.5, 8.5]]
			},
			calculate: function() {
				this.wait == 0 && this.active >= random(1, 20) && this.generate();
				this.wait != -1 && this.data.setEnabled(true);
				this.data.setSpeed(0.1 + this.active * 0.002);
				if (!this.wait) this.wait = 99;
			},
			finish: function() {
				if (this.location == "door") {
					if (Robots.ai.foxy.location != "door") Office.active[0] = false;
					Office.leftDanger = true;
				} else if (this.location == "office")
					handleRobotFollow("bonnie");
			},
			generate: function() {
				this.scream.setEnabled(true);
				let result = random(100), path, wait;
				switch (this.location) {
					case "scene":
						if (result < 40) path = "scene_service";
						else if (result < 95) path = "scene_area";
						else path = "scene_corridor";
						break;
					case "service":
						if (result < 65) path = "service_corridor";
						else path = "service_area";
						this.hasBeenArea = true;
						break;
					case "area":
						if (result < 60) path = "area_corridor";
						else if (!this.hasBeenArea) path = "service_area";
						else path = "area_corridor";
						this.hasBeenArea = true;
						break;
					case "corridor":
						if (result < 45) path = "corridor_hall";
						else if (!this.hasBeenSupply && result < 95) path = "corridor_supply";
						else if (!this.hasBeenArea) path = "area_corridor";
						else path = "corridor_hall";
						this.hasBeenArea = true;
						break;
					case "supply":
						if (!this.hasBeenHall && result < 60) path = "supply_hall";
						else if (!this.hasBeenArea && result < 90) path = "corridor_supply";
						else {
							Office.disactive("lightning");
							Office.active[0] = -1;
							path = "supply_door";
							wait = 110;
						}
						this.hasBeenSupply = true;
						break;
					case "hall":
						if (!this.hasBeenArea && result < 20) path = "corridor_hall";
						else if (!this.hasBeenSupply && result < 40) path = "supply_hall";
						else {
							Office.disactive("lightning");
							Office.active[0] = -1;
							path = "hall_door";
							wait = 50;
						}
						this.hasBeenHall = true;
						break;
					case "door":
						if (!Office.isActive("door", 0)) {
							path = "door_office";
							Office.disactive("lightning");
							Office.active[0] = Office.active[2] = wait = -1;
						} else if (!this.doorHandled) {
							handle(function() {
								if (gameTime < 6 && Robots.ai.bonnie.location == "door") {
									delete Office.leftDanger;
									if (result < 70) Robots.ai.bonnie.location = "area";
									else if (result < 90) Robots.ai.bonnie.location = "service";
									else Robots.ai.bonnie.location = "corridor";
									delete Robots.ai.bonnie.hasBeenArea;
									delete Robots.ai.bonnie.hasBeenSupply;
									delete Robots.ai.bonnie.hasBeenHall;
									Robots.requestLocation("bonnie");
									delete Robots.ai.bonnie.wait;
									Robots.ai.bonnie.generate();
								}
								delete Robots.ai.bonnie.doorHandled;
							}, random(1000, 8000) + this.active * 50);
						}
						this.doorHandled = true;
						wait = -1;
						break;
				}
				bonnieGoingSound.play();
				path && Robots.goNextPath("bonnie", path);
				wait && (this.wait = wait);
			}
		},
		chica: {
			place: "scene",
			params: {
				speed: 0.1
			},
			active: 20,
			pathes: {
				// This pathes provides going() doors update action
				scene_area: [[46.5, 6, 39.5], [46.5, 5, 35.5], [42.5, 5, 35.5], [42.5, 5, 28.5]],
				scene_toilet: [[46.5, 6, 39.5], [46.5, 5, 35.5], [30.5, 5, 35.5], [30.5, 5, 35.5]],
				scene_kitchen: [[46.5, 6, 39.5], [46.5, 5, 35.5], [35, 5, 35.5], [35, 5, 22.5], [35, 5, 19.5]],
				scene_corridor: [[46.5, 6, 39.5], [46.5, 5, 35.5], [42.5, 5, 35.5], [42.5, 5, 19.5]],
				area_corridor: [[42.5, 5, 28.5], [42.5, 5, 19.5]],
				area_kitchen: [[42.5, 5, 28.5], [42.5, 5, 35.5], [35, 5, 35.5], [35, 5, 22.5], [35, 5, 19.5]],
				area_toilet: [[42.5, 5, 28.5], [42.5, 5, 35.5], [30.5, 5, 35.5], [30.5, 5, 35.5]],
				toilet_kitchen: [[30.5, 5, 35.5], [35, 5, 35.5], [35, 5, 22.5], [35, 5, 19.5]],
				corridor_hall: [[42.5, 5, 19.5], [42.5, 5, 6.5]],
				corridor_door: [[42.5, 5, 19.5], [43.5, 5, 19.5], [43.5, 5, 11.5]],
				hall_door: [[42.5, 5, 6.5], [43.5, 5, 6.5], [43.5, 5, 11.5]],
				door_office: [[43.5, 5, 11.5], [43.5, 5, 8.5], [46.5, 5, 8.5]]
			},
			calculate: function() {
				this.wait == 0 && this.active >= random(1, 20) && this.generate();
				this.wait != -1 && this.data.setEnabled(true);
				this.data.setSpeed(0.1 + this.active * 0.002);
				if (!this.wait) this.wait = 100;
			},
			going: function() {
				let path = this.params.path,
					point = this.params.point,
					reversed = this.params.reversed,
					state = 0;
				if (path == "scene_kitchen" || path == "area_kitchen") state = point == 3 ? 1 : point == 4 ? 2 : 0;
				else if (path == "toilet_kitchen") state = point == 2 ? 1 : point == 3 ? 2 : 0;
				reversed && (state = state == 1 ? 2 : state == 2 ? 1 : 0);
				if (state == 1) {
					World.setBlock(35, 5, 21, 194, 1);
					World.setBlock(34, 5, 21, 194, 1);
				} else if (state == 2) {
					World.setBlock(35, 5, 21, 194, 5);
					World.setBlock(34, 5, 21, 194, 5);
				}
			},
			finish: function() {
				if (this.location == "door") {
					if (Robots.ai.freddy.location != "door") Office.active[1] = false;
					Office.rightDanger = true;
				} else if (this.location == "office")
					handleRobotFollow("chica");
			},
			generate: function() {
				this.scream.setEnabled(true);
				let result = random(100), path, wait;
				switch (this.location) {
					case "scene":
						if (result < 30) path = "scene_toilet";
						else if (result < 70) path = "scene_area";
						else if (result < 95) path = "scene_kitchen";
						else path = "scene_corridor";
						break;
					case "toilet":
						if (result < 40) path = "area_toilet";
						else if (!this.hasBeenKitchen) path = "toilet_kitchen";
						else path = "area_toilet";
						this.hasBeenToilet = true;
						break;
					case "area":
						if (result < 50) path = "area_corridor";
						else if (!this.hasBeenToilet && result < 80) path = "area_toilet";
						else if (!this.hasBeenKitchen) path = "area_kitchen";
						else path = "area_corridor";
						this.hasBeenArea = true;
						break;
					case "kitchen":
						if (result < 75) path = "area_kitchen";
						else if (!this.hasBeenToilet) path = "toilet_kitchen";
						else path = "area_kitchen";
						this.hasBeenKitchen = true;
						break;
					case "corridor":
						if (result < 75) path = "corridor_hall";
						else if (!this.hasBeenArea && result < 90) path = "area_corridor";
						else {
							Office.disactive("lightning");
							Office.active[1] = -1;
							path = "corridor_door";
							wait = 50;
						}
						this.hasBeenArea = true;
						break;
					case "hall":
						if (result < 75) {
							Office.disactive("lightning");
							Office.active[1] = -1;
							path = "hall_door";
							wait = 50;
						} else path = "corridor_hall";
						break;
					case "door":
						if (!Office.isActive("door", 1)) {
							path = "door_office";
							Office.disactive("lightning");
							wait = Office.active[1] = Office.active[3] = -1;
						} else if (!this.doorHandled) {
							handle(function() {
								if (gameTime < 6 && Robots.ai.chica.location == "door") {
									delete Office.rightDanger;
									if (result < 40) Robots.ai.chica.location = "area";
									else Robots.ai.chica.location = "corridor";
									delete Robots.ai.chica.hasBeenToilet;
									delete Robots.ai.chica.hasBeenArea;
									delete Robots.ai.chica.hasBeenKitchen;
									Robots.requestLocation("chica");
									delete Robots.ai.chica.wait;
									Robots.ai.chica.generate();
								}
								delete Robots.ai.chica.doorHandled;
							}, random(1200, 8500) + this.active * 50);
						}
						this.doorHandled = true;
						wait = -1;
				}
				chicaGoingSound.play();
				path && Robots.goNextPath("chica", path);
				wait && (this.wait = wait);
			}
		},
		freddy: {
			place: "scene",
			params: {
				speed: 0.275
			},
			active: 20,
			pathes: {
				scene_door: [[48.5, 6, 39.5], [48.5, 5, 36.5], [52.5, 5, 36.5], [52.5, 5, 8.5], [51.5, 5, 8.5]],
				scene_area: [[48.5,	6, 39.5], [48.5, 5, 36], [43.5, 5, 36], [43.25, 5, 23.75]],
				area_toilet: [[43.25, 5, 23.75],[43.5, 5, 36], [30.5, 5, 36.25], [30.25, 5, 32.5], [27.5, 5, 32.5]],
				toilet_kitchen: [[27.5, 5, 32.5], [30.25, 5, 32.5], [35, 5, 35.5], [35, 5, 22.5], [35, 5, 19.5], [26.5, 5, 19.5]],
				kitchen_corridor: [[26.5, 5, 19.5], [35, 5, 19.5], [35, 5, 22.5], [35, 5, 35.5], [43.5, 5, 35.75], [42.5, 5, 20.5]],
				corridor_hall: [[42.5, 5, 20.5], [43, 5, 6.75]],
				hall_door: [[43, 5, 6.75], [43.75, 5, 8.25]],
				door_office: [[43.75, 5, 8.25], [45.75, 5, 8.5]]
			},
			calculate: function() {
				if (Robots.ai.bonnie.location == "scene" || 
					Robots.ai.chica.location == "scene") return this.wait = 61;
				this.wait == 0 && this.active >= random(1, 20) && this.generate();
				this.wait != -1 && this.data.setEnabled(true);
				if (!this.wait) this.wait = 61;
			},
			going: function() {
				let path = this.params.path,
					point = this.params.point,
					reversed = this.params.reversed,
					state = 0;
				if (path == "toilet_kitchen") state = point == 4 ? 1 : point == 5 ? 2 : 0;
				else if (path == "kitchen_corridor") state = point == 2 ? 1 : point == 3 ? 2 : 0;
				reversed && (state = state == 1 ? 2 : state == 2 ? 1 : 0);
				if (state == 1) {
					World.setBlock(35, 5, 21, 194, 5);
					World.setBlock(34, 5, 21, 194, 5);
				} else if (state == 2) {
					World.setBlock(35, 5, 21, 194, 1);
					World.setBlock(34, 5, 21, 194, 1);
				}
			},
			finish: function() {
				if (this.location == "door") {
					if (Office.procent <= 0) {
						Robots.await("freddy");
						GameScene.energyTick = random(1, 4) * 100;
						musicBoxSound.setEntity(Robots.property.freddy.entity);
						musicBoxSound.play();
					}
				} else if (this.location == "office")
					handleRobotFollow("freddy");
			},
			generate: function() {
				this.scream.setEnabled(true);
				let result = random(100), path, wait;
				switch (this.location) {
					case "scene":
						path = "scene_area";
						break;
					case "area":
						path = "area_toilet";
						break;
					case "toilet":
						path = "toilet_kitchen";
						break;
					case "kitchen":
						path = "kitchen_corridor";
						break;
					case "corridor":
						path = "corridor_hall";
						break;
					case "hall":
						Office.disactive("lightning");
						Office.active[1] = -1;
						whisperingSound.play();
						path = "hall_door";
						wait = 40;
						break;
					case "door":
						whisperingSound.stop();
						if (!Office.isActive("door", 1)) {
							path = "door_office";
							Office.disactive("lightning");
							wait = Office.active[1] = Office.active[3] = -1;
						} else if (!this.doorHandled) {
							handle(function() {
								if (gameTime < 6 && Robots.ai.freddy.location == "door") {
									if (result < 20) Robots.ai.freddy.location = "area";
									else Robots.ai.freddy.location = "corridor";
									Robots.requestLocation("freddy");
									delete Robots.ai.freddy.wait;
									Robots.ai.freddy.generate();
									Office.active[1] = false;
								}
								delete Robots.ai.freddy.doorHandled;
							}, random(1200, 8500) + this.active * 50);
							this.doorHandled = true;
							wait = -1;
						}
				}
				freddyGoingSound.play();
				if (path) {
					Robots.goNextPath("freddy", path);
					path.indexOf("door") == -1 && freddyLaughSound.play();
				}
				wait && (this.wait = wait);
			}
		},
		foxy: {
			place: "cove",
			params: {
				speed: 0.3,
				jumpVel: 0.45
			},
			active: 20,
			pathes: {
				cove_stage: [[64.5, 6, 24.5], [63.25, 6, 24.5]],
				stage_area: [[63.25, 6, 24.5], [61.25, 5, 24.75]],
				area_corridor: [[61.25, 5, 24.75], [58.75, 5, 23], [52.5, 5, 23]],
				corridor_door: [[52.5, 5, 23], [52.5, 5, 8.5], [51.25, 5, 8.5]],
				door_office: [[51.25, 5, 8.5], [49.75, 5, 8.5]]
			},
			calculate: function() {
				this.wait == 0 && this.active >= random(1, 20) && this.generate();
				this.wait != -1 && this.data.setEnabled(true);
				if (!this.wait) this.wait = 101;
			},
			finish: function() {
				if (this.location == "office")
					handleRobotFollow("foxy");
			},
			generate: function() {
				this.scream.setEnabled(true);
				let result = random(100), path, wait;
				switch (this.location) {
					case "cove":
						DERenderer.buildParts(62, 6, 24, "coveCurtain", 0);
						path = "cove_stage";
						break;
					case "stage":
						World.setBlock(62, 6, 24, 0);
						World.setBlock(62, 7, 24, 0);
						World.setBlock(62, 8, 24, 0);
						path = "stage_area";
						break;
					case "area":
						foxyGoingSound.play();
						path = "area_corridor";
						wait = 1500 - 50 * this.active;
						break;
					case "corridor":
						Office.active[0] = -1;
						foxyRunningSound.play();
						path = "corridor_door";
						wait = random(5, 10);
						break;
					case "door":
						if (!Office.isActive("door", 0)) {
							path = "door_office";
							Office.disactive("lightning");
							wait = Office.active[0] = Office.active[2] = -1;
						} else if (!this.doorHandled) {
							foxyKnockSound.play();
							Office.procent -= 1 + this.attempts * 5;
							this.attempts++;
							handle(function() {
								if (gameTime < 6 && Robots.ai.foxy.location == "door") {
									if (result < 40) Robots.ai.foxy.location = "cove";
									else if (result < 80) Robots.ai.foxy.location = "stage";
									else Robots.ai.foxy.location = "area";
									Robots.requestLocation("foxy");
									delete Robots.ai.foxy.wait;
									Robots.ai.foxy.generate();
									if (result < 40) {
										World.setBlock(62, 6, 24, 35, 6);
										World.setBlock(62, 7, 24, 35, 6);
										World.setBlock(62, 8, 24, 35, 6);
									} else if (result < 80) {
										DERenderer.buildParts(62, 6, 24, "coveCurtain", 0);
									}
									Office.active[0] = false;
								}
								delete Robots.ai.foxy.doorHandled;
							}, 5000);
						}
						this.doorHandled = true;
						wait = -1;
						break;
				}
				path && Robots.goNextPath("foxy", path);
				wait && (this.wait = wait);
			},
			atCove: function() {
				return this.location == "cove" || this.location == "stage" || this.location == "area";
			}
		},
		endoskeleton: {
			place: "service",
			params: {
				speed: 0.2
			},
			pathes: {
				service_office: [[65.75, 5, 31.75], [64, 5, 31.75], [64, 5, 36.25], [52.5, 5, 36.25], [52.5, 5, 8.5], [48.5, 5, 8.5]]
			},
			finish: function() {
				 if (this.location == "office")
					 handleRobotFollow("endoskeleton");
			},
			calculate: new Function(),
			generate: new Function()
		}
	}
};

Robots.update = function() {
	for (let item in this.property) {
		let robot = this.property[item];
		if (robot && robot.spawnAtStart) {
			if (!robot.entity) {
				robot.addon = Entity.spawnAddonAtCoords(robot, robot.type);
				if (robot.addon == null) {
					MCSystem.throwException("Robot " + item + " must be spawned");
				}
				robot.entity = robot.addon.id;
			} else {
				Entity.setPosition(robot.entity, robot.x, robot.y, robot.z);
			}
			Entity.setLookAngle(robot.entity, robot.pitch / 180 * Math.PI, -robot.yaw / 180 * Math.PI);
			if (!robot.ignoreRotateFix) fixRotation(robot.entity);
		}
	}
};

Robots.setNextPoint = function(name) {
	return this.ai[name].params.reversed ? (this.ai[name].params.point > 0 ? --this.ai[name].params.point : -1) :
		(this.ai[name].params.point < (this.ai[name].pathes[this.ai[name].params.path].length - 1) ? ++this.ai[name].params.point : -1);
};

Robots.createNextPath = function(name, path) {
	log("AI", "Setup path for " + name + " is " + path);
	this.ai[name].params.path = path;
	let reversed = this.ai[name].params.reversed = path.endsWith(this.ai[name].location);
	this.ai[name].params.point = reversed ? this.ai[name].pathes[path].length : -1;
	let split = path.split("_");
	return reversed ? split[0] : split[1];
};

Robots.goNextPoint = function(name) {
	if (!this.ai[name].params.path) return false;
	let point = this.setNextPoint(name);
	if (point == -1) return false;
	let path = this.ai[name].pathes[this.ai[name].params.path][point];
	if (!path) return false;
	log("AI", "Moving " + name + " to " + Robots.ai[name].params.point + " point");
	this.ai[name].data.setTarget(path[0], path[1], path[2]);
	return true;
};

Robots.goNextPath = function(name, real) {
	let path = this.createNextPath(name, real);
	this.ai[name].data.setOnPauseListener(function() {
		if (!Robots.goNextPoint(name)) {
			log("AI", "Staing " + name + " at " + path);
			Robots.ai[name].location = path;
			Robots.ai[name].finish && Robots.ai[name].finish();
			delete Robots.ai[name].params.path;
		}
		Robots.ai[name].going && Robots.ai[name].going();
	});
	let type = this.ai[name].params.reversed ? "reversed" : "default",
		size = this.ai[name].pathes[real].length + " points";
	log("AI", "Path " + name + " is " + type + ", " + size);
	this.ai[name].data.pause();
};

Robots.findPathByTag = function(name, tag) {
	for (let i in this.ai[name].pathes) {
		let path = this.ai[name].pathes[i];
		if (i.indexOf(tag) != -1) return path;
	}
};

Robots.requestLocation = function(name, isBack) {
	let location = this.ai[name].location,
		path = this.findPathByTag(name, location),
		point = isBack ? path.length - 1 : 0;
	if (location && path)
		Entity.setPosition(this.property[name].entity,
			path[point][0], path[point][1], path[point][2]);
};

Robots.create = function(name) {
	let entity = this.property[name].entity;
	this.ai[name].data = new EntityAILine(entity);
	for (let item in this.ai[name].data.params) {
		if (this.ai[name].params[item] != null)
			this.ai[name].data.params[item] = this.ai[name].params[item];
	}
	this.ai[name].data.data.targetEntity = Player.get();
	delete this.ai[name].wait;
	this.ai[name].location = this.ai[name].place;
	this.ai[name].calculate && this.ai[name].calculate();
	this.ai[name].scream = new EntityAIScream(entity, name);
	this.ai[name].scream.params.data = this.ai[name].data;
};

Robots.execute = function() {
	for (let robot in this.ai) {
		let ai = this.ai[robot];
		if (ai) {
			if (ai.data) {
				ai.data.execute();
				if (ai.data.data.finished) {
					if (ai.wait > 0) ai.wait--;
					else if (ai.wait > -1) ai.calculate();
				}
			}
			ai.scream && ai.scream.execute();
		}
	}
};

Robots.stop = function(name) {
	let list = name ? [name] : new Array();
	if (!name) {
		for (let robot in this.ai) {
			let ai = this.ai[robot];
			if (ai) list.push(robot);
		}
		log("Robots", "Stopping all");
	} else log("Robots", "Stopping " + name);
	list.forEach(function(e, i) {
		let ai = Robots.ai[e];
		ai.data && ai.data.setEnabled(false);
		ai.scream && ai.scream.setEnabled(false);
		delete ai.wait;
	});
};

Robots.continue = function(name) {
	let list = name ? [name] : new Array();
	if (!name) {
		for (let robot in this.ai) {
			let ai = this.ai[robot];
			if (ai) list.push(robot);
		}
		log("Robots", "Continuing all");
	} else log("Robots", "Continuing " + name);
	list.forEach(function(e, i) {
		let ai = Robots.ai[e];
		ai.data && ai.data.setEnabled(true);
		ai.scream && ai.scream.setEnabled(true);
	});
};

Robots.await = function(name) {
	let list = name ? [name] : new Array();
	if (!name) {
		for (let robot in this.ai) {
			let ai = this.ai[robot];
			if (ai) list.push(robot);
		}
		log("Robots", "Awaiting all");
	} else log("Robots", "Awaiting " + name);
	list.forEach(function(e, i) {
		let ai = Robots.ai[e];
		ai.data && ai.data.setEnabled(false);
		delete ai.wait;
	});
};
