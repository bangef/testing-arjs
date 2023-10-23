import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Loaders {
	constructor(sketch, path, number, x, y) {
		this.sketch = sketch;
		this.loaders = new GLTFLoader();
		this.createLoader(this.sketch, path, number, x, y);
		return this.loaders;
	}
	createLoader(sketch, path, number, x, y) {
		this.loaders.load(
			path,
			function (gltf) {
				let object = gltf.scene.children[0];
				object.scale.set(number, number, number);
				sketch.arjs.add(gltf.scene, x, y);
				sketch.animator.animate();
			},
			// called while loading is progressing
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			// called when loading has errors
			function (error) {
				console.log("An error happened");
			}
		);
	}
}
