var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(5, 5, -5));
	camera.attachControl(canvas, true);

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	//Array of points to construct a spiral with lines
    var myPoints = [];
    var myPoints2 = [];

    var deltaTheta = 0.1;
    var deltaY = 0.005;

    var radius = 1;
    var theta = 0;
    var Y = 0;
    for (var i = 0; i<400; i++) {
        myPoints.push(new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)));
        theta += deltaTheta;
        Y += deltaY
    }
    
    var radius = 0.5;
    var theta = 0;
    var Y = 0;
    for (var i = 0; i<400; i++) {
        myPoints2.push(new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)));
        theta += deltaTheta;
        Y += deltaY
    }
	
	//Create lines 
    var lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints}, scene); 
    BABYLON.MeshBuilder.CreateDashedLines("lines", {points: myPoints2, dashNb: 400}, scene); 

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