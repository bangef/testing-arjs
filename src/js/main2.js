import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
	const CANVAS = document.getElementById("canvas");
	const RENDERER = new THREE.WebGLRenderer({ canvas: CANVAS, antialias: true });

	const FOV = 60;
	const ASPECT = 1.33;
	const NEAR = 0.1;
	const FAR = 100000;
	const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	const SCENE = new THREE.Scene();
	RENDERER.setPixelRatio(Math.min(2, window.devicePixelRatio));
	const AMBIENT = new THREE.AmbientLight(0x404040, 7.5);
	const ARJS = new THREEx.LocationBased(SCENE, CAMERA);
	const CAM = new THREEx.WebcamRenderer(RENDERER);
	const DOC = new THREEx.DeviceOrientationControls(CAMERA);

	if (navigator.geolocation) {
		navigator.geolocation.watchPosition((success) => console.log(success));
	} else {
		console.log("YOUR BROWSER NOT SUPPORT!");
	}
	{
		const geom = new THREE.BoxGeometry(80, 80, 80);
		const mtl = new THREE.MeshBasicMaterial({ color: 0xb1e1ff });
		const box = new THREE.Mesh(geom, mtl);
		ARJS.add(box, -6.394179290603103, 106.84657327029028);
	}
	{
		const LOADER = new GLTFLoader().setPath("./src/models/");
		createLoader(
			LOADER,
			ARJS,
			AMBIENT,
			"bds-tugu-kujang.glb",
			-6.394179290603103,
			106.84657327029028
		);
	}
	// Create the device orientation tracker
	// ARJS.fakeGps(-0.720003747118712, 51.050002962571995);
	ARJS.startGps();
	requestAnimationFrame(render);
	function render() {
		if (
			CANVAS.width != CANVAS.clientWidth ||
			CANVAS.height != CANVAS.clientHeight
		) {
			RENDERER.setSize(CANVAS.clientWidth, CANVAS.clientHeight, false);
			CAMERA.aspect = CANVAS.clientWidth / CANVAS.clientHeight;
			CAMERA.updateProjectionMatrix();
		}
		DOC.update();
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
