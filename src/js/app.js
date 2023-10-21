import Scene from "./components/scene/index.js";
import Renderer from "./components/renderer/index.js";
import Camera from "./components/camera/index.js";
import Lights from "./components/lights/index.js";
import Animator from "./components/animator/index.js";

import Thing from "./elements/Thing/index.js";
import Materials from "./elements/Materials/index.js";
import Geometries from "./elements/Geometries/index.js";
import Arjs from "./components/arjs/index.js";
import CamArjs from "./components/cam-arjs/index.js";
import DeviceOrientationControls from "./components/deviceorientationcontrol/index.js";

class Sketch {
	constructor() {
		this.animator = new Animator(this);
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		this.scene = new Scene(this);
		this.renderer = new Renderer(this);
		this.camera = new Camera(this);
		this.doc = new DeviceOrientationControls(this);
		this.arjs = new Arjs(this);
		this.camarjs = new CamArjs(this);
		this.lights = new Lights(this);
	}
	init() {
		this.addObjects();
		document.body.appendChild(this.renderer.domElement);
		this.animator.animate();
	}
	addObjects() {
		this.materials = new Materials(this);
		this.geometries = new Geometries(this);

		this.things = [];
		this.num = 3;
		this.width = 6;
		for (let x = 0; x <= this.num; x++) {
			for (let y = 0; y <= this.num; y++) {
				const posX = -6.394179290603103;
				const posY = 106.84657327029028;
				this.things.push(new Thing(this, posX, posY));
			}
		}
	}
}

export default Sketch;
