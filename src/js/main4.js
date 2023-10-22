import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
	const canvas = document.getElementById("canvasOne");
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas,
	});
	const fov = 60;
	const aspect = 1.33;
	const near = 0.1;
	const far = 10000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 3;
	const scene = new THREE.Scene();
	const arjs = new THREEx.LocationBased(scene, camera);
	const cam = new THREEx.WebcamRenderer(renderer);
	const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

	{
		const color = 0x404040;
		const intensity = 7.5;
		const light = new THREE.AmbientLight(color, intensity);
		scene.add(light);
	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	function makeInstanceLoader(pathModels, coorLat, coorLon, scaleSet) {
		const loader = new GLTFLoader().setPath("./src/models/");
		loader.load(
			pathModels,
			(gltf) => {
				const root = gltf.scene;
				root.children[0].scale.set(scaleSet, scaleSet, scaleSet);
				arjs.add(root, coorLat, coorLon);
			},
			(isSuccess) => console.log(isSuccess.loaded),
			(isError) => console.log(isError)
		);
		return loader;
	}

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({ color });

		const cube = new THREE.Mesh(geometry, material);
		arjs.add(cube, -6.390263265822663, 106.85320710027743);

		// cube.position.x = x;

		return cube;
	}
	makeInstanceLoader("bds-tugu-kujang.glb", -6.390272, 106.853283, 20);
	makeInstanceLoader("bds-tugu-kujang.glb", -0.72, 51.051, 20);
	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
		makeInstance(geometry, 0x8844aa, -2),
		makeInstance(geometry, 0xaa8844, 2),
	];
	// GPSActive(arjs);
	arjs.fakeGps(-6.390263265822663, 106.85320710027743);

	requestAnimationFrame(render);
	function render(time) {
		if (
			canvas.width != canvas.clientWidth ||
			canvas.height != canvas.clientHeight
		) {
			renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
			const aspect = canvas.clientWidth / canvas.clientHeight;
			camera.aspect = aspect;
			camera.updateProjectionMatrix();
		}
		time *= 0.0001; // convert time to seconds
		cubes.forEach((cube, ndx) => {
			const speed = 0.1 + ndx;
			const rot = time * speed;
			cube.rotation.y = rot;
		});
		// Update the scene using the latest sensor readings
		deviceOrientationControls.update();

		cam.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
}

const GPSActive = (arjs) => {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(
			(myLocation) => {
				const {
					coords: { latitude, longitude },
				} = myLocation;
				arjs.fakeGps(longitude, latitude);
				console.log(arjs._lastCoords);
				console.log(arjs);
			},
			(error) => console.error(error)
		);
	} else {
		console.log("NOT SUPPORT GEOLOCATION!");
	}
};

main();
