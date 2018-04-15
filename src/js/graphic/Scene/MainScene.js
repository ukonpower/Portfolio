import BaceScene from './BaceScene.js';
import * as THREE from 'three'
import * as OrbitControls from 'three-orbit-controls';
import StyleController from '../../StyleController.js';
import ObjectController from '../../ObjectController.js';

export default class MainScene extends BaceScene {

    constructor() {
        super();
        this.styleController = new StyleController();
        this.objController;
        this.objects = new Array();
        this.lookObjNum = 0;
        this.lookObjName;
        this.tick = 0;
        this.tickSpeed = 2;
        this.init();
    }

    init() {
        this.cursor.tapEvent = this.onTap.bind(this);

        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 15);

        this.camera.position.set(0, 2.5, 0)
        this.camera.rotation.set(-Math.PI / 10, 0, 0);

        var light = new THREE.AmbientLight(0xffffff, 0.8);
        light.position.set(2, 2, 2);
        light.castShadow = false;
        this.scene.add(light);

        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(4, 10, 5);
        light.castShadow = true;

        var shadowSize = 7;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        light.shadow.mapSize.height = 1024;
        light.shadow.mapSize.width = 1024;
        this.scene.add(light);

        var geo = new THREE.PlaneGeometry(100, 100);
        var material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0
        })

        var plane = new THREE.Mesh(geo, material);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        plane.name = "plane";
        this.scene.add(plane);

        this.objects.push(this.CreateModel('plofile'));
        this.objects.push(this.CreateModel('pictures'));
        this.objects.push(this.CreateModel('movies'));
        this.objects.push(this.CreateModel('softwares'));
        this.objects.push(this.CreateModel('roots'));

        this.objects.forEach((obj, index) => {
            var rad = Math.PI * 2;
            var theta = rad * index / this.objects.length
            obj.position.set(Math.sin(theta) * 5, 1.3, -Math.cos(theta) * 5);
        });

        this.CameraRotation("plofile");
        this.Update();
    }

    onTap() {
        var activeObject = this.GetTouchObject();
        if ( activeObject != null){
            this.objController = new ObjectController(this.scene.getObjectByName(activeObject.name));
            this.styleController.CloseMenu();
            this.objController.Move(2);
        }
    }

    GetTouchObject() {
        var mouseX = this.cursor.x;
        var mouseY = this.cursor.y;

        mouseX = (mouseX / window.innerWidth) * 2 - 1;
        mouseY = -(mouseY / window.innerHeight) * 2 + 1;

        var pos = new THREE.Vector3(mouseX, mouseY, 1);
        pos.unproject(this.camera);

        var ray = new THREE.Raycaster(this.camera.position, pos.sub(this.camera.position).normalize());

        //ヒエラルキーを持った子要素も対象とする場合は第二引数にtrueを指定する
        var touched = ray.intersectObjects(this.scene.children);
        var obj;

        touched.forEach((n, index) => {
            if (n.object.name != "plane") {
                obj = n.object;
            }
        })
        return obj;
    }

    CameraRotation(contentName) {
        switch (contentName) {
            case "plofile":
                this.lookObjNum = 0;
                break;
            case "pictures":
                this.lookObjNum = 1;
                break;
            case "movies":
                this.lookObjNum = 2;
                break;
            case "softwares":
                this.lookObjNum = 3;
                break;
            case "roots":
                this.lookObjNum = 4;
                break;
        }
        this.lookObjName = contentName;
        this.cameraController.RotateIndex(this.lookObjNum, this.objects.length);
    }

    CreateModel(contentName) {
        var geometry;
        switch (contentName) {
            case "plofile":
                geometry = new THREE.CubeGeometry(1, 1, 1);
                break;
            case "pictures":
                geometry = new THREE.SphereGeometry(0.7, 20, 20);
                break;
            case "movies":
                geometry = new THREE.ConeGeometry(0.7, 1.5, 4);
                break;
            case "softwares":
                geometry = new THREE.TorusGeometry(0.6, 0.2, 20, 50);
                break;
            case "roots":
                geometry = new THREE.TorusGeometry(0.6, 0.2, 20, 50);
                break;
        }

        var material = new THREE.MeshStandardMaterial({
            roughness: 0.05,
        });
        var obj = new THREE.Mesh(geometry, material);
        obj.castShadow = true;
        obj.name = contentName;
        this.scene.add(obj);
        return obj;
    }

    Update() {
        this.scene.getObjectByName(this.lookObjName).rotateY(this.cursor.deltaX * 0.005);
        requestAnimationFrame(this.Update.bind(this));
    }


}