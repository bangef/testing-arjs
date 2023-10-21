import Renderer from "./components/renderer/index.js";
import Scene from "./components/scene/index.js";
import Animator from "./components/animator/index.js";
import Camera from "./components/camera/index.js";
import Lights from "./components/lights/index.js";
import Arjs from "./components/arjs/index.js";
import CamArjs from "./components/cam-arjs/index.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import DeviceOrientationControls from "./components/deviceorientationcontrol/index.js";

class Sketch {
	constructor() {
		this.scene = new Scene();
		this.camera = new Camera(this);
		this.renderer = new Renderer(this);
		this.deviceorientationcontrols = new DeviceOrientationControls(this);
		this.arjs = new Arjs(this);
		this.camarjs = new CamArjs(this);
		this.lights = new Lights(this);
		this.animator = new Animator(this);
	}
	init() {
		{
			const geom = new THREE.BoxGeometry(80, 80, 80);
			const mtl = new THREE.MeshBasicMaterial({ color: 0xb1e1ff });
			const box = new THREE.Mesh(geom, mtl);
			this.arjs.add(box, -6.394179290603103, 106.84657327029028);
		}

		{
			const LOADER = new GLTFLoader().setPath("./src/models/");
			this.createLoader(
				LOADER,
				this.arjs,
				"bds-tugu-kujang.glb",
				-6.394179290603103,
				106.84657327029028
			);
		}
		document.body.prepend(this.renderer.domElement);
		this.animator.animate();
	}
	// addObjects() {
	// 	const THINGS = [];
	// 	const COORDINATES_LENGTH = COORDINATES.length;
	// 	for (let index = 0; index < COORDINATES_LENGTH; index++) {
	// 		const POS_X = COORDINATES[index].lat;
	// 		const POS_Y = COORDINATES[index].lon;
	// 		const PATH = COORDINATES[index].path;
	// 		THINGS.push(new Thing(this, PATH, 100, POS_Y, POS_X));
	// 	}
	// }

	createLoader(instanceLoaderGLTF, arjsInstance, nameModel, lon, lat) {
		instanceLoaderGLTF.load(
			nameModel,
			(gltf) => {
				let obj = gltf.scene.children[0];
				obj.scale.set(20, 20, 20);
				arjsInstance.add(gltf.scene, lon, lat);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
	}
}

export default Sketch;
