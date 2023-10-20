import * as THREE from "three";

class Scene {
	constructor(sketch, settings) {
		this.sketch = sketch;
		this.settings = { ...settings };

		this.scene = new THREE.Scene();
		return this.scene;
	}
}
export default Scene;
