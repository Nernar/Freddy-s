const __normalizeAngle = function(a) {
    for (; a > 2 * Math.PI;) a -= 2 * Math.PI;
    for (; 0 > a;) a += 2 * Math.PI;
    return a;
};

const __targetValue = function(a, b, c) {
    return a + Math.min(Math.max(-c, b - a), c);
};

const __targetAngle = function(a, b, c) {
    a = __normalizeAngle(a);
    b = __normalizeAngle(b);
    b - Math.PI > a && (b -= 2 * Math.PI);
    a - Math.PI > b && (b += 2 * Math.PI);
    return __targetValue(a, b, c);
};

const EntityAILine = function(ent) {
	this.data = {
		finished: true,
		movingYaw: 0
	};
	this.params = {
		enabled: true,
		followOffice: false,
		follow: false,
		speed: 0.05,
		jumpVel: 0.4,
		rotateSpeed: 1,
		rotateRatio: 1,
		rotateHead: true,
		denyY: true
	};
	this.listeners = new Object();
	this.isFinished = function() {
		return this.data.finished;
	};
	this.setEntity = function(ent) {
		this.entity = ent;
	};
	this.setEnabled = function(enabled) {
		this.params.enabled = enabled;
	};
	this.setSpeed = function(speed) {
		this.params.speed = speed;
	};
	this.setJumpVelocity = function(velocity) {
		this.params.jumpVel = velocity;
	};
	this.setRotateSpeed = function(speed) {
		this.params.rotateSpeed = speed;
	};
	this.setRotateRatio = function(ratio) {
		this.params.rotateRatio = ratio;
	};
	this.setRotateHeadEnabled = function(enabled) {
		this.params.rotateHead = enabled;
	};
	this.setDenyHeight = function(deny) {
		this.params.denyY = deny;
	};
	this.setTarget = function(x, y, z) {
		this.data.target = {
			x: x,
			y: y,
			z: z
		};
		if (this.isFinished()) this.resume();
	};
	this.setEntityTarget = function(ent) {
		this.data.targetEntity = ent;
		if (this.isFinished()) this.resume();
	};
	this.resume = function() {
		this.data.finished = false;
		if (this.listeners.resume) this.listeners.resume(this);
	};
	this.pause = function() {
		this.data.finished = true;
		if (this.listeners.pause) this.listeners.pause(this);
	};
	this.setOnResumeListener = function(listener) {
		this.listeners.resume = listener;
	};
	this.setOnPauseListener = function(listener) {
		this.listeners.pause = listener;
	};
	this.execute = function() {
		if (this.params.enabled && !this.data.finished && this.data.target) {
			let position = Entity.getPosition(this.entity);
			position.x = Math.round(position.x * 10) / 10;
			position.z = Math.round(position.z * 10) / 10;
			let target = this.params.follow ? Entity.getPosition(this.data.targetEntity) : this.data.target;
			this.params.follow && !this.params.followOffice && Office.inOffice() && (target = this.data.target);
			target.x = Math.round(target.x * 10) / 10;
			target.z = Math.round(target.z * 10) / 10;
			
			let a = Entity.getMovingVector(this.entity),
				c = Entity.getLookAt(this.entity, target.x, target.y, target.z).yaw,
				b = Entity.getMovingAngle(this.entity).yaw - c,
				x1 = Math.min(position.x, target.x), x2 = Math.max(position.x, target.x),
				z1 = Math.min(position.z, target.z), z2 = Math.max(position.z, target.z),
				speed = this.params.speed, x = x2 - x1, z = z2 - z1, w;
			
			this.data.movingYaw || (this.data.movingYaw = c);
			if (x < this.params.speed && z < this.params.speed) this.params.speed = Math.max(x, z), w = true;
			a.xzsize < .5 * this.params.speed && (this.data.movingYaw = __targetAngle(this.data.movingYaw, c + 1.2 * b, this.params.rotateSpeed));
			this.data.movingYaw = __targetAngle(this.data.movingYaw, c, this.params.rotateSpeed * this.params.rotateRatio);
			this.params.rotateHead && Entity.setLookAngle(this.entity, this.data.movingYaw, c.pitch);
			if (position.x == target.x && position.z == target.z) this.pause();
			else Entity.moveToAngle(this.entity, {
				yaw: this.data.movingYaw,
				pitch: 0
			}, this.params);
			this.params.speed = speed;
		}
	};
	if (ent) this.setEntity(ent);
};

const EntityAIScream = function(ent, scream) {
	this.data = {
		timer: 5
	};
    this.params = {
		enabled: true,
		follow: 6,
        range: 2.5
    };
	this.setEntity = function(ent) {
		this.entity = ent;
	};
	this.setEnabled = function(enabled) {
		this.params.enabled = enabled;
	};
	this.setScream = function(scream) {
		this.params.scream = scream;
	};
    this.execute = function () {
		if (this.params.enabled) {
			let scream = this.params.scream, distance = Entity.getDistanceToEntity(this.entity, Player.get());
			if (this.params.data)
				if (this.params.data.params.follow = distance <= this.params.follow)
					if ((this.params.data.params.followOffice && Office.inOffice()) || !Office.inOffice())
						this.params.data.resume();
			distance < this.params.range ? 0 > this.data.timer-- && (this.data.timer = 10, acquire(function() {
				Robots.stop();
				ScreamScene.setSource(scream);
				ScreamScene.run();
			})) : (this.data.timer = 0);
		}
	};
	if (ent) this.setEntity(ent);
	if (scream) this.setScream(scream);
};
