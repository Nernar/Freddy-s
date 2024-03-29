/*

   Copyright 2016-2021 Nernar (github.com/nernar)
   
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
       http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

if (!this.hasOwnProperty("MCSystem")) {
	MCSystem = ModAPI.requireGlobal("MCSystem");
}

// Currently build information
const NAME = __mod__.getInfoProperty("name");
const AUTHOR = __mod__.getInfoProperty("author");
const VERSION = __mod__.getInfoProperty("version");
const DESCRIPTION = __mod__.getInfoProperty("description");

MCSystem.setLoadingTip(NAME + ": Initialization Script");

IMPORT("Files");
IMPORT("Retention");

/**
 * Based on 1280px screen width.
 * @param {number} x coordinate
 * @returns {number} dimension
 */
getX = function(x) {
	return x > 0 ? Math.round(getDisplayWidth() / (1280 / x)) : x;
};

/**
 * Based on 720px screen height.
 * @param {number} y coordinate
 * @returns {number} dimension
 */
getY = function(y) {
	return y > 0 ? Math.round(getDisplayHeight() / (720 / y)) : y;
};

/**
 * @returns {number} dimension
 */
getFontSize = function(size) {
	return Math.round(getX(size) / getDisplayDensity());
};

/**
 * @returns {number} dimension
 */
getFontMargin = function() {
	return getY(7);
};

/**
 * Modification preloader scope.
 */
const PRELOADER = (function() {
	let preloader = __mod__.compiledPreloaderScripts.get(0);
	if (!preloader.isRunning()) {
		__mod__.RunPreloaderScripts();
	}
	return preloader.getScope();
})();

// Development and various constants
let DEVELOP = true;
let MAY_DEBUG = false;
let DEMO = true;
let LOW_MEMORY_MODE = (function() {
	let runtime = java.lang.Runtime.getRuntime();
	return runtime.maxMemory() < 2048 * 1024 * 1024 * 8
		|| runtime.totalMemory() < 512 * 1024 * 1024 * 8;
})();
let IN_CREATIVE = (function() {
	return PRELOADER.IN_CREATIVE || false;
})();

// Runtime gameplay changed values
let gameTime = DEVELOP ? 0 : 0;
let gameNight = DEVELOP ? 3 : 1;

if (DEVELOP || MAY_DEBUG) {
	IMPORT("Stacktrace");
}

/**
 * Represent call of [[reportTrace]] or
 * [[reportError]] depends on build type.
 * Displays runtime exception information.
 * @param {any} error to report
 */
const retraceOrReport = function(error) {
	if (DEVELOP || MAY_DEBUG) {
		reportTrace(error);
	} else {
		reportError(error);
	}
};

IMPORT("Transition");
IMPORT("Action");

Action.prototype.__run = Action.prototype.run;

Action.prototype.run = function(post) {
	this.__run && this.__run.apply(this, arguments);
	typeof post == "function" && handle(post);
};

if (DEVELOP || MAY_DEBUG) {
	Action.prototype._run = Action.prototype.run;
	
	Action.prototype.run = function() {
		log("Action", "Running " + this.id);
		this._run && this._run.apply(this, arguments);
		DEVELOP && menuType == 1 && (removeMenu(), createMenu(1));
	};
	
	Action.prototype._pause = Action.prototype.pause;
	
	Action.prototype.pause = function(millis) {
		log("Action", "Pausing " + this.id + " as " + millis + " ms");
		this._pause && this._pause.apply(this, arguments);
		DEVELOP && menuType == 1 && (removeMenu(), createMenu(1));
	};
	
	Action.prototype._complete = Action.prototype.complete;
	
	Action.prototype.complete = function() {
		log("Action", "Completing " + this.id);
		this._complete && this._complete.apply(this, arguments);
	};
	
	Action.prototype._destroy = Action.prototype.destroy;
	
	Action.prototype.destroy = function() {
		log("Action", "Destroying " + this.id);
		this._destroy && this._destroy.apply(this, arguments);
		DEVELOP && menuType == 1 && (removeMenu(), createMenu(1));
	};
}

/**
 * Resolves environment worlds storage.
 * @returns {string} path to worlds
 */
const getWorldsStorageLocation = function() {
	return PRELOADER.getWorldsStorageLocation();
};

/**
 * Resolves modification world directory.
 * @returns {string} world directory
 */
const getModificationWorldDirectory = function() {
	return PRELOADER.getModificationWorldDirectory();
};

/**
 * Resolves modification world name.
 * @returns {string} world name
 */
const getModificationWorldName = function() {
	return PRELOADER.getModificationWorldName();
};

/**
 * Resolves modification world location.
 * @returns {string} path to world
 */
const getModificationWorldLocation = function() {
	return PRELOADER.getModificationWorldLocation();
};

/**
 * If due world extraction something happened, it
 * must be resolved into loading stage.
 * @returns {null|Error} something
 */
const getWorldExtractionError = function() {
	return PRELOADER.worldExtractionError;
};
