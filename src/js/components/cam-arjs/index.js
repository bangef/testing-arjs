import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

export default class CamArjs {
	constructor(sketch, settings) {
		this.sketch = sketch;
		this.settings = { ...settings };

		this.camarjs = new THREEx.WebcamRenderer(this.sketch.renderer);
		return this.camarjs;
	}
}
