var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(-1, 0, -5));
	camera.attachControl(canvas, true);

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	//Array of points to construct lines
	var myPoints = [
		new BABYLON.Vector3(-1, -1, 0),
		new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(-1, 1, 0),
        new BABYLON.Vector3(-2, 0, 0),
        new BABYLON.Vector3(-1, -1, 0)
    ];
    
    var myPoints2 = [
		new BABYLON.Vector3(-1, -1, -1),
		new BABYLON.Vector3(0, 0, -1),
        new BABYLON.Vector3(-1, 1, -1),
        new BABYLON.Vector3(-2, 0, -1),
        new BABYLON.Vector3(-1, -1, -1)
	];
	
	//Create lines 
    BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints}, scene); 
    BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints2}, scene);

	return scene;
}

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});