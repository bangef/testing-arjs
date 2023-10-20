import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

export default class DeviceOrientationControls {
	constructor(sketch, settings) {
		this.sketch = sketch;
		this.settings = { ...settings };

		this.deviceOrientationControls = new THREEx.DeviceOrientationControls(
			this.sketch.camera
		);
		return this.deviceOrientationControls;
	}
}
