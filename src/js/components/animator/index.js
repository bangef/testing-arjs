class Animator {
	constructor(sketch, settings) {
		this.sketch = sketch;
		this.settings = { ...settings };

		this.tasks = [];

		this.frame = 0;
	}
	animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.frame++;
		this.sketch.deviceorientationcontrols.update();
		this.sketch.camarjs.update();
		this.sketch.renderer.update();
	}
}
export default Animator;
