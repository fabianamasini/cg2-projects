var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 2, 1, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
    var box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.75 }, scene);

    box.position.x = 1;

    //true - não duplica
    //false - duplica
    new BABYLON.Mesh.MergeMeshes([sphere, box], false);
    var pilot = new BABYLON.Mesh.MergeMeshes([sphere, box], false);
    var pilot2 = new BABYLON.Mesh.MergeMeshes([sphere, box], true);

    pilot.position.x = -2;
    pilot2.position.x = 2;

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