import Loaders from "../loaders/index.js";

export default class Thing {
	constructor(sketch, path, number, x, y) {
		this.sketch = sketch;
		// this.mat = this.sketch.materials.getRandomMaterial();
		// this.geometry = this.sketch.geometries.getRandomGeometry();
		// this.mesh = new THREE.Mesh(this.geometry, this.mat);
		// this.sketch.arjs.add(this.mesh, x, y);
		return new Loaders(this.sketch, path, number, x, y);
		// this.sketch.loaders.createLoader(path, number, x, y);
		// this.rotationSpeed = 0.01;
		// this.sketch.animator.add(() => {
		// 	this.mesh.rotation.x += this.rotationSpeed;
		// 	if (this.sketch.animator.frame % 60 == 0) {
		// 		if (Math.random() > 0.7) {
		// 			this.mesh.material = this.sketch.materials.getRandomMaterial();
		// 			this.mesh.geometry = this.sketch.geometries.getRandomGeometry();
		// 		}
		// 	}
		// });
	}
}
