import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
	const canvas = document.getElementById("canvas");

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);

	const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	renderer.shadowMap.enabled = true;
	//Adding Shadow
	const arjs = new THREEx.LocationBased(scene, camera);
	const cam = new THREEx.WebcamRenderer(renderer);
	const hlight = new THREE.AmbientLight(0x404040, 100);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
	directionalLight.position.set(0, 1, 0);
	directionalLight.castShadow = true;
	// const geom = new THREE.BoxGeometry(20, 20, 20);
	// const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	// const box = new THREE.Mesh(geom, mtl);
	const loader = new GLTFLoader().setPath("./src/models/");
	createLoader(
		loader,
		arjs,
		"bds-tugu-kujang.glb",
		-6.391410900352424,
		106.84658840709042
	);

	// loader.load(
	// 	"bds-tugu-kujang.glb",
	// 	(gltf) => {
	// 		let obj = gltf.scene.children[0];
	// 		obj.scale.set(20, 20, 20);
	// 		arjs.add(gltf.scene, -0.72, 51.051);
	// 	},
	// 	undefined,
	// 	function (error) {
	// 		console.error(error);
	// 	}
	// );

	// loader.load("mall-botani-square.glb", (gltf) => {
	// 	let obj = gltf.scene.children[0];
	// 	obj.scale.set(15, 15, 15);
	// 	arjs.add(gltf.scene, -0.72, 51.051);
	// });

	arjs.add(hlight);
	arjs.add(directionalLight);
	arjs.startGps();
	// arjs.fakeGps(-0.72, 51.05);

	requestAnimationFrame(render);

	function render() {
		if (
			canvas.width != canvas.clientWidth ||
			canvas.height != canvas.clientHeight
		) {
			renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
			const aspect = canvas.clientWidth / canvas.clientHeight;
			camera.aspect = aspect;
			camera.updateProjectionMatrix();
		}
		requestAnimationFrame(render);
		cam.update();
		renderer.render(scene, camera);
	}
}

const createLoader = (
	instanceLoaderGLTF,
	arjsInstance,
	nameModel,
	lon,
	lat
) => {
	return instanceLoaderGLTF.load(
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
};

main();
