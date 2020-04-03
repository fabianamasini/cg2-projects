var canvas = document.getElementById("renderCanvas");

        var engine = null;
        var scene = null;
        var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

        var createScene = function () {

            // Create the scene space
            var scene = new BABYLON.Scene(engine);
            scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

            // Add a camera to the scene and attach it to the canvas
            var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
            camera.setPosition(new BABYLON.Vector3(0, 0, -15));
            camera.attachControl(canvas, true);


            //Luz
            var light1 = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
            light1.diffuse = new BABYLON.Color3(1, 1, 1);
	        light1.specular = new BABYLON.Color3(0.8, 0.8, 0.8);

            //Luz
            var light2 = new BABYLON.PointLight("light", new BABYLON.Vector3(10, 0, 0), scene);
            light2.diffuse = new BABYLON.Color3(1, 1, 1);
	        light2.specular = new BABYLON.Color3(0.8, 0.8, 0.8);

            let sun = createBall(null, 3.5, 0, createMaterial(0.8, 0.8, 0), "sun");
            let earth = createBall(sun, 2, 4, createMaterial(0, 0, 1), "earth");
            let moon = createBall(earth, 0.75, 1.5, createMaterial(0.8, 0.8, 0.8), "moon");
            
            var universe = new BABYLON.Mesh("universe", scene);

            earth.addChild(moon);
            sun.addChild(earth);
            universe.addChild(sun);


            return scene;

        }

        function createMaterial(r, g, b){
            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
            myMaterial.diffuseColor = new BABYLON.Color3(0.4, 0, 0);
            myMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            myMaterial.emissiveColor = new BABYLON.Color3(r, g, b);
            myMaterial.ambientColor = new BABYLON.Color3(0.1, 0, 0);
            return myMaterial;
        }

        function createBall(ref, size, space, material, name){
            var angle = Math.PI / 4;
            var radius = 3;
            var x = Math.cos(angle) * radius;
            var z = Math.sin(angle) * radius;
            var newMesh = new BABYLON.Mesh(name, scene);

            var s = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: size}, scene);
            s.id = name;
            s.material = material;
            s.rotation.y = angle;
            if(!ref){
                s.position.x = 0;
                s.position.z = 0;
            }
            else{
                s.position.x = ref.position.x + space;
                s.position.z = ref.position.z + space;
            }
            return s;
        }

        function loop() {

            var suns = scene.getMeshesByID("sun");
            var earths = scene.getMeshesByID("earth");

            var inc = 1;
            suns.forEach(function (mesh) {
                mesh.rotation.y += (0.01 * inc);
                inc = inc * -1;
            });

            var inc = 5;
            earths.forEach(function (mesh) {
                mesh.rotation.y += (0.01 * inc);
                inc = inc * -1;
            });
        };

        engine = createDefaultEngine();
        if (!engine) throw 'engine should not be null.';
        scene = createScene();

        engine.runRenderLoop(function () {
            if (scene) {
                loop();
                scene.render();

            }
        });


        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });