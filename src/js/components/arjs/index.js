import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

export default class Arjs {
	constructor(sketch, settings) {
		this.sketch = sketch;
		this.settings = { ...settings };

		this.arjs = new THREEx.LocationBased(this.sketch.scene, this.sketch.camera);
		this.arjs.startGps();
		// this.arjs.fakeGps(-6.5973624487061775, 106.79955906666069);
		return this.arjs;
	}
}
