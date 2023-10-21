import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
	const CANVAS = document.getElementById("canvas");
	const SCENE = new THREE.Scene();
	const CAMERA = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
	const RENDERER = new THREE.WebGLRenderer({ canvas: CANVAS, antialias: true });
	RENDERER.shadowMap.enabled = true;
	const AMBIENT = new THREE.AmbientLight(0x404040, 7.5);
	const ARJS = new THREEx.LocationBased(SCENE, CAMERA);
	const CAM = new THREEx.WebcamRenderer(RENDERER);
	// Create the device orientation tracker
	// const DOC = new THREEx.DeviceOrientationControls(CAMERA);
	const LOADER = new GLTFLoader().setPath("./src/models/");
	createLoader(LOADER, ARJS, AMBIENT, "bds-tugu-kujang.glb", -0.72, 51.051);
	ARJS.fakeGps(-0.72, 51.05);
	// ARJS.startGps();
	requestAnimationFrame(render);
	function render() {
		if (
			CANVAS.width != CANVAS.clientWidth ||
			CANVAS.height != CANVAS.clientHeight
		) {
			RENDERER.setSize(CANVAS.clientWidth, CANVAS.clientHeight, false);
			const aspect = CANVAS.clientWidth / CANVAS.clientHeight;
			CAMERA.aspect = aspect;
			CAMERA.updateProjectionMatrix();
		}
		// DOC.update();
		CAM.update();
		RENDERER.render(SCENE, CAMERA);
		requestAnimationFrame(render);
	}
}

const createLoader = (
	instanceLoaderGLTF,
	arjsInstance,
	instanceAmbient,
	nameModel,
	lon,
	lat
) => {
	instanceLoaderGLTF.load(
		nameModel,
		(gltf) => {
			let obj = gltf.scene.children[0];
			obj.scale.set(20, 20, 20);
			arjsInstance.add(gltf.scene, lon, lat);
			arjsInstance.add(instanceAmbient);
		},
		undefined,
		function (error) {
			console.error(error);
		}
	);
};

main();
