var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -5));
    //camera.setPosition(new BABYLON.Vector3(0, 5, 0));
    camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    //creatingBoxes();
    var obj = creatingBoxes();
    obj.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);

    //creatingLines();

    return scene;
}

function creatingBoxes() {
    var x = 0;
    var angle = 2;
    var s = 0.1;

    var newMesh = new BABYLON.Mesh("grupo", scene);

    for (var i = 0; i < 3; i++) {
        var b = BABYLON.MeshBuilder.CreateBox("box", { size: 0.5 }, scene);
        //b.rotation.y = angle;
        b.position.y = x - 0.5;
        b.position.x = x + 0.5;
        //angle += (Math.PI / 4);
        //b.position.x = i;
        //b.scaling = new BABYLON.Vector3(s, s, s);
        //s += 0.18;
        newMesh.addChild(b);
    }
    return newMesh;
}

function creatingLines() {
    var myPoints = [
        new BABYLON.Vector3(1, 0, 0),
        new BABYLON.Vector3(-1, 0, 0)
    ];

    var myPoints2 = [
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(0, -1, 0)
    ];

    var myPoints3 = [
        new BABYLON.Vector3(5, 0, 20),
        new BABYLON.Vector3(0, -5, 20)
    ];

    var line1 = BABYLON.MeshBuilder.CreateLines("lines", { points: myPoints }, scene);
    var line2 = BABYLON.MeshBuilder.CreateLines("lines", { points: myPoints2 }, scene);
    var line3 = BABYLON.MeshBuilder.CreateLines("lines", { points: myPoints3 }, scene);

    return allLines = new BABYLON.Mesh.MergeMeshes([line1, line2], false);
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