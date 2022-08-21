const ViewShortcut = {
	LayoutParams: {
		FILL: android.view.ViewGroup.LayoutParams.FILL_PARENT,
		WRAP: android.view.ViewGroup.LayoutParams.WRAP_CONTENT,
		MATCH: android.view.ViewGroup.LayoutParams.MATCH_PARENT,
		WIDTH: getDisplayWidth(),
		HEIGHT: getDisplayHeight(),
		DENSITY: getDisplayDensity()
	},
	Gravity: {
		BOTTOM: android.view.Gravity.BOTTOM,
		CENTER: android.view.Gravity.CENTER,
		FILL: android.view.Gravity.FILL,
		RIGHT: android.view.Gravity.RIGHT,
		LEFT: android.view.Gravity.LEFT,
		TOP: android.view.Gravity.TOP,
		NONE: android.view.Gravity.NO_GRAVITY
	},
	parseGravity: function(who) {
		who = ("" + who).toUpperCase();
		for (let element in this.Gravity) {
			who = "" + who.replace(element, "" + this.Gravity[element]);
		}
		return eval(who);
	}
};
