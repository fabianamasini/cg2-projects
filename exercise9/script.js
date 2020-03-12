var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -5));
    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    var obj = myFunc();
    obj.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    return scene;

}

function myFunc() {
    // Add and manipulate meshes in the scene
    var x = -5;
    var angle = 0;
    var s = 0.1;

    var newMesh = new BABYLON.Mesh("grupo", scene);

    for (var i = 1; i < 10; i++) {
        var b = BABYLON.MeshBuilder.CreateBox("box", { size: 0.5 }, scene);
        b.rotation.y = angle;
        angle += (Math.PI / 4);
        b.position.x = x + i;
        b.scaling = new BABYLON.Vector3(s, s, s);
        s += 0.18;
        newMesh.addChild(b);
    }

    return newMesh;

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