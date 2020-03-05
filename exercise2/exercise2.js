var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    // Add and manipulate meshes in the scene

    BABYLON.MeshBuilder.CreateBox("box", { height: 0.3, width: 0.5, depth: 1.0 }, scene);
    BABYLON.MeshBuilder.CreateBox("box2", { height: 0.3, width: 1.0, depth: 0.4 }, scene);

    BABYLON.MeshBuilder.CreateBox("box3", { height: 0.6, width: 0.75, depth: 0.4 }, scene);
    BABYLON.MeshBuilder.CreateBox("box4", { height: 0.6, width: 0.5, depth: 0.75 }, scene);

    BABYLON.MeshBuilder.CreateBox("box5", { height: 0.8, width: 0.6, depth: 0.4 }, scene);
    BABYLON.MeshBuilder.CreateBox("box6", { height: 0.8, width: 0.5, depth: 0.6 }, scene);

    BABYLON.MeshBuilder.CreateBox("box7", { height: 1.0, width: 0.5, depth: 0.3 }, scene);
    BABYLON.MeshBuilder.CreateBox("box8", { height: 1.0, width: 0.3, depth: 0.5 }, scene);

    return scene;

};

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