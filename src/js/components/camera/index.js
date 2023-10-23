import * as THREE from "three";

class Camera {
	constructor(sketch, settings) {
		this.sketch = sketch;
		this.settings = { ...settings };

		this.camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
		this.sketch.scene.add(this.camera);

		return this.camera;
	}
}
export default Camera;
