var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0,0,0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -5));
    camera.attachControl(canvas, true);

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    var b = BABYLON.MeshBuilder.CreateBox("box", { size: 0.75 }, scene);
  
    b.rotation.x = Math.PI / 4;
    b.rotation.y = Math.PI / 4;
    b.rotation.z = Math.PI / 4;

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

window.addEventListener("resize", function () {
    engine.resize();
});