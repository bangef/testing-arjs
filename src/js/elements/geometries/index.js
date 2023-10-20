import * as THREE from "three";

export default class Geometries {
	constructor() {
		this.geometries = [
			new THREE.BoxGeometry(10, 10, 10),
			new THREE.ConeGeometry(10, 10, 10),
			new THREE.CylinderGeometry(10, 10, 10, 10),
			new THREE.TorusGeometry(5, 5, 5, 5),
		];
		return this;
	}
	getRandomGeometry() {
		return this.geometries[Math.floor(Math.random() * this.geometries.length)];
	}
}
