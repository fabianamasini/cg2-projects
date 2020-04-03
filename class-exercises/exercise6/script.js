var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 2, 1, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    /*
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    var box = BABYLON.MeshBuilder.CreateBox("box", { height: 0.3, width: 1.8 }, scene);
    box.position.y = 0.75;

    var box2 = BABYLON.MeshBuilder.CreateBox("box2", { height: 0.3, width: 1.8 }, scene);
    box2.position.y = -0.75;

    var box3 = BABYLON.MeshBuilder.CreateBox("box3", {height: 1.8, width: 0.3}, scene);
    box3.position.x = 0.75;

    var box3 = BABYLON.MeshBuilder.CreateBox("box3", {height: 1.8, width: 0.3}, scene);
    box3.position.x = -0.75;

    new BABYLON.Mesh.MergeMeshes([sphere, box, box2, box3], true);*/

    for(var i = -9; i < 9; i++){
        createObj().position.x = 2*i;
        for(var j = -9; j < 9; i++){
            var pilot2 = createObj()
            pilot2.position.x = 2*i;
            pilot2.position.y = 2*j;            
        }
    }

    //createObj();

    //true - não duplica
    //false - duplica
    /*
    new BABYLON.Mesh.MergeMeshes([sphere, box], false);
    var pilot = new BABYLON.Mesh.MergeMeshes([sphere, box], false);
    var pilot2 = new BABYLON.Mesh.MergeMeshes([sphere, box], true);

    pilot.position.x = -2;
    pilot2.position.x = 2;*/

    return scene;
}

const createObj = () =>{
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    var box = BABYLON.MeshBuilder.CreateBox("box", { height: 0.3, width: 1.8 }, scene);
    box.position.y = 0.75;

    var box2 = BABYLON.MeshBuilder.CreateBox("box2", { height: 0.3, width: 1.8 }, scene);
    box2.position.y = -0.75;

    var box3 = BABYLON.MeshBuilder.CreateBox("box3", {height: 1.8, width: 0.3}, scene);
    box3.position.x = 0.75;

    var box4 = BABYLON.MeshBuilder.CreateBox("box4", {height: 1.8, width: 0.3}, scene);
    box4.position.x = -0.75;

    return new BABYLON.Mesh.MergeMeshes([sphere, box, box2, box3, box4], false);
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