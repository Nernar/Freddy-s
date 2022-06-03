/**
 * @constructor
 * Used to working with custom surround sound
 * inside world from receiver to source.
 * Sounds must be placed into `/music` directory.
 * @param {string} path as relative name
 */
const Music = function(path) {
	let count = Music.instances.push(this);
	this.player = new android.media.MediaPlayer();
	this.source = Music.Source.DEFAULT;
	this.id = "music" + count;
	this.radius = 10;
	this.volume = 1;
	this.size = 3;
	
	this.setSource = function(path) {
		let file = new java.io.File(__dir__ + "music", path);
		if (file.exists()) {
			this.reset();
			this.player.setDataSource(file);
			!LOW_MEMORY_MODE && this.player.prepare();
		} else log("Music", "Cannot find " + file.getName());
	};
	
	this.resizeSource = function(radius) {
		this.size = radius;
	};
	
	this.randomizeSource = function(action) {
		this.__source = function() {
			return tryout.call(this, function() {
				if (action) return action.call(this);
			});
		};
	};
	
	this.setLooping = function(loop) {
		this.player.setLooping(loop);
	};
	
	this.isLooping = function() {
		return this.player.isLooping();
	};
	
	this.isPlaying = function() {
		return this.player.isPlaying();
	};
	
	this.restart = function() {
		this.pause();
		this.seekTo(0);
	};
	
	this.play = function() {
		this.isPlaying() && this.restart();
		this.__source && this.setSource(this.__source());
		LOW_MEMORY_MODE && this.player.prepare();
		this.player.start();
	};
	
	this.pause = function() {
		this.isPlaying() && this.player.pause();
	};
	
	this.stop = function() {
		if (this.isPlaying()) {
			this.player.stop();
			!LOW_MEMORY_MODE && this.player.prepare();
		}
	};
	
	this.seekTo = function(ms) {
		this.player.seekTo(ms);
	};
	
	this.setRadius = function(radius) {
		this.radius = radius;
	};
	
	this.setReceiver = function(entity, volume) {
		this.receiver = entity;
		volume >= 0 && this.setReceiverVolume(volume);
	};
	
	this.setReceiverVolume = function(volume) {
		this.receiverVolume = volume / 100;
	};
	
	this.resetReceiver = function() {
		delete this.receiver;
		delete this.receiverVolume;
	};
	
	this.setEntity = function(entity, radius) {
		this.source = Music.Source.ENTITY;
		radius && (this.radius = radius);
		entity && (this.entity = entity);
	};
	
	this.setBlock = function(x, y, z, radius) {
		this.source = Music.Source.BLOCK;
		if (typeof x == "number") {
			radius && (this.radius = radius);
			this.position = { x: x, y: y, z: z };
		} else if (typeof x == "object") {
			y && (this.radius = y);
			this.position = x;
		}
	};
	
	this.resetSource = function() {
		this.source = Music.Source.DEFAULT;
		this.needResetSource = true;
	};
	
	this.setVolume = function(volume) {
		this.volume = volume / 100;
		this.needResetSource = true;
	};
	
	this.updateVolume = function(action) {
		this.__volume = function() {
			return require.call(this, function() {
				if (action) return action.call(this);
			}, this.volume);
		};
	};
	
	this.resetVolume = function() {
		delete this.__volume;
	};
	
	this.reset = function() {
		this.player.reset();
	};
	
	this.setOnCompletionListener = function(action) {
		this.player.setOnCompletionListener(function() {
			tryout(function() {
				action && action();
			});
		}); 
	};
	
	this.setId = function(id) {
		this.id = id;
	};
	
	path && this.setSource(path);
};

Music.instances = new Array();
Music.get = function(id) {
	Music.instances.forEach(function(s) {
		if (s.id == id) return s;
	});
};

Music.setReceiver = function(entity, volume) {
	Music.instances.forEach(function(s) {
		s.setReceiver(entity, volume);
	});
};

Music.resetReceiver = function() {
	Music.instances.forEach(function(s) {
		s.resetReceiver();
	});
};

Music.destroy = function() {
	Music.instances.forEach(function(s) {
		s.player && s.restart();
	});
};

Music.Source = {
	EMPTY: 0,
	DEFAULT: 1,
	BLOCK: 2,
	ENTITY: 3
};

Music.Source.updateVolume = function() {
	let cp = Player.getPosition(),
		ca = Entity.getLookAngle(Player.get());
	for (let i = 0; i < Music.instances.length; i++) {
		let s = Music.instances[i];
		if (!s.isPlaying()) continue;
		let leftVol = rightVol = s.volume;
		if (s.__volume) {
			let math = s.__volume();
			leftVol *= math / 100;
			rightVol *= math / 100;
		}
		
		if (s.source == this.EMPTY) {
			s.player.setVolume(leftVol, rightVol);
			continue;
		}
		
		let pz = { x: 0, y: 0, z: 5 };
		let pp = s.receiver ? Entity.getPosition(s.receiver) : cp;
		let pa = s.receiver ? Entity.getLookAngle(s.receiver) : ca;
		// @todo: It might be not working after everything
		if (s.receiver && s.receiverVolume >= 0) {
			let ov = 1 - s.receiverVolume;
			pp.x = pp.x * s.receiverVolume + cp.x * ov;
			pp.y = pp.y * s.receiverVolume + cp.y * ov;
			pp.z = pp.z * s.receiverVolume + cp.z * ov;
			pa.pitch = pa.pitch * s.receiverVolume + ca.pitch * ov;
			pa.yaw = pa.yaw * s.receiverVolume + ca.yaw * ov;
		}
		
		let pb = require(function() {
			if (s.source == this.BLOCK) {
				return {
					x: s.position.x - pp.x,
					y: s.position.y - pp.y,
					z: s.position.z - pp.z
				};
			} else if (s.source == this.ENTITY) {
				let pe = Entity.getPosition(s.entity);
				return {
					x: pe.x - pp.x,
					y: pe.y - pp.y,
					z: pe.z - pp.z
				};
			} else if (s.source == this.DEFAULT) {
				if (s.needResetSource || s.__volume) {
					s.player.setVolume(leftVol, rightVol);
					delete s.needResetSource;
				}
			}
		}, null);
		if (!pb) continue;
		
		let sqrt = Math.sqrt(pb.x * pb.x + pb.y * pb.y + pb.z * pb.z);
		let pAngle = ((2 * Math.PI) - (pa.yaw % (2 * Math.PI))) % (2 * Math.PI);
		if (pAngle < 0) pAngle += 2 * Math.PI;
		let bAngle = Math.acos((pb.x * pz.x + pb.y * pz.y + pb.z * pz.z) / (sqrt * Math.sqrt(pz.x * pz.x + pz.y * pz.y + pz.z * pz.z)));
		if (s.position && pp.x > s.position.x) bAngle = 2 * Math.PI - bAngle;
		
		let angle = bAngle - pAngle + (Math.PI / 2);
		if (angle < 0) angle += 2 * Math.PI;
		if (angle > Math.PI) angle -= 2 * Math.PI;
		
		let radVol = 0.9 / (Math.PI);
		if (angle < 0) angle *= -1;
		let P20 = 30 - 20 * Math.log10(sqrt);
		let distance = s.radius - sqrt;
		if (distance < 0) distance = 0;
		
		leftVol *= 0.1 + (radVol * angle);
		rightVol *= 1 - (radVol * angle);
		if (sqrt > s.size) {
			// @todo: Something may goes wrong
			if (s.reversed) {
				leftVol /= s.radius - s.size * distance;
				rightVol /= s.radius - s.size * distance;
			} else {
				leftVol /= s.radius - s.size;
				leftVol *= distance;
				rightVol /= s.radius - s.size;
				rightVol *= distance;
			}
		}
		s.player.setVolume(leftVol, rightVol);
	}
};

Callback.addCallback("tick", function() {
	tryout(function() {
		Music.Source.updateVolume();
	});
});
