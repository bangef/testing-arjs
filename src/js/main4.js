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
	camera.position.z = 2;
	const scene = new THREE.Scene();
	const arjs = new THREEx.LocationBased(scene, camera);
	const cam = new THREEx.WebcamRenderer(renderer);
	// const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

	light(0x40404, 7.5, scene);

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

	const boxWidth = 10;
	const boxHeight = 10;
	const boxDepth = 10;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	function makeInstance(geometry, color, lat, lon) {
		const material = new THREE.MeshPhongMaterial({ color });

		const cube = new THREE.Mesh(geometry, material);
		arjs.add(cube, lat, lon);

		// cube.position.x = x;

		return cube;
	}
	// makeInstanceLoader(
	// 	"bds-tugu-kujang.glb",
	// 	-0.7201180071381208,
	// 	51.05064372540331,
	// 	20
	// );
	// makeInstanceLoader("bds-tugu-kujang.glb", -0.72, 51.051, 20);
	const cubes = [
		makeInstance(geometry, 0x44aa88, -6.39027332757639, 106.85327164924476),
		makeInstance(geometry, 0x8844aa, -6.390281990594112, 106.85324817991753),
		makeInstance(geometry, 0xaa8844, -6.390281990594112, 106.85327366090137),
	];
	// GPSActive(arjs);
	arjs.startGps();
	arjs.addEventListener("gps-coordinates-changed", function (event) {
		var coordinates = event.detail;
		var latitude = coordinates.latitude;
		var longitude = coordinates.longitude;
		var altitude = coordinates.altitude;
		console.log({ coordinates, latitude, longitude, altitude });
		// Use the coordinates in your AR.js content
	});
	// arjs.fakeGps(-6.3902712, 106.8532496);

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
		// time *= 0.0001; // convert time to seconds
		// cubes.forEach((cube, ndx) => {
		// 	const speed = 0.1 + ndx;
		// 	const rot = time * speed;
		// 	cube.rotation.y = rot;
		// });
		// Update the scene using the latest sensor readings
		// deviceOrientationControls.update();

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

const light = (color, intensity, scene) => {
	const light = new THREE.AmbientLight(color, intensity);
	scene.add(light);
};

main();
