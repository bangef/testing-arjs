import Renderer from "./components/renderer/index.js";
import Scene from "./components/scene/index.js";
import Animator from "./components/animator/index.js";
import Camera from "./components/camera/index.js";
import Lights from "./components/lights/index.js";
import Arjs from "./components/arjs/index.js";
import CamArjs from "./components/cam-arjs/index.js";

import Thing from "./elements/things/index.js";
import DeviceOrientationControls from "./components/deviceorientationcontrol/index.js";
import COORDINATES from "./utls/cons/coordinates.js";

class Sketch {
	constructor() {
		this.scene = new Scene();
		this.camera = new Camera(this);
		this.lights = new Lights(this);
		this.renderer = new Renderer(this);
		this.arjs = new Arjs(this);
		this.deviceorientationcontrols = new DeviceOrientationControls(this);
		this.camarjs = new CamArjs(this);
		this.animator = new Animator(this);
	}
	init() {
		this.addObjects();
		document.body.prepend(this.renderer.domElement);
		this.animator.animate();
	}
	addObjects() {
		const THINGS = [];
		const COORDINATES_LENGTH = COORDINATES.length;
		for (let index = 0; index < COORDINATES_LENGTH; index++) {
			const POS_X = COORDINATES[index].lat;
			const POS_Y = COORDINATES[index].lon;
			const PATH = COORDINATES[index].path;
			THINGS.push(new Thing(this, PATH, 100, POS_Y, POS_X));
		}
	}
}

export default Sketch;
