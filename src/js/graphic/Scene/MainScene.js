import BaceScene from './BaceScene.js';
import * as THREE from 'three'
import * as OrbitControls from 'three-orbit-controls';
import ObjectController from '../../ObjectController.js';

export default class MainScene extends BaceScene {

    constructor() {
        super();
        this.objController;
        this.objects = ["plofile",'pictures','movies','softwares','roots'];

        this.lookObjNum = 0;
        this.lookObjName = this.objects[this.lookObjName];

        this.tick = 0;
        this.tickSpeed = 2;
        this.sceneName = 'menu';

        this.init();
    }

    init() {
        
        this.cursor.tapEvent = this.onTap.bind(this);

        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 30);

        this.camera.position.set(0, 2.5, 0)
        this.camera.rotation.set(-Math.PI / 13, 0, 0);

        var light = new THREE.AmbientLight(0xffffff, 0.4);
        light.position.set(2, 2, 2);
        light.castShadow = false;
        this.scene.add(light);

        light = new THREE.PointLight(0xffffff,0.1);
        light.position.set(0,3,0);
        light.castShadow = false;
        this.scene.add(light);

        light = new THREE.PointLight(0xffffff,0.2);
        light.position.set(0,0.1,0);
        light.castShadow = false;
        this.scene.add(light);

        light = new THREE.PointLight(0xffffff,0.4);
        light.position.set(0,19,0);
        light.castShadow = false;
        this.scene.add(light);
        

        light = new THREE.DirectionalLight(0xffffff,0.5);
        light.position.set(4, 15, 2.5);
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

        this.loadGLTF('plofile',0);
        this.loadGLTF('pictures',1);
        this.loadGLTF('movies',2);
        this.loadGLTF('softwares',3);
        this.loadGLTF('roots',4);

        this.Update();
    }

    onTap() {
        var activeObject = this.GetTouchObject();
        if (activeObject) {
            location.href = "./#/contents/" + this.lookObjName;
        }
    }

    OpenContents(contentId) {
        this.objController = new ObjectController(this.scene.getObjectByName(contentId));

        //一度のみ
        if (this.sceneName != 'menu') return;
        this.sceneName = 'contents';

        this.cameraController.delta = 0.01;
        this.cameraController.Move(17.5);

        this.objController.delta = 0.01;
        this.objController.Move(20.3);
        this.objController.SizeChange(0.5);
    }

    CloseContents() {
        //一度のみ
        if (this.sceneName != 'contents') return false;
        this.sceneName = 'menu';

        this.cameraController.delta = 0.01;
        this.cameraController.Move(0);

        this.objController.delta = 0.01;
        this.objController.Move(this.objPosY);
        this.objController.SizeChange(1);

        return true;
    }

    GetTouchObject() {
        var mouseX = this.cursor.x;
        var mouseY = this.cursor.y;

        mouseX = (mouseX / window.innerWidth) * 2 - 1;
        mouseY = -(mouseY / window.innerHeight) * 2 + 1;

        var pos = new THREE.Vector3(mouseX, mouseY, 1);
        pos.unproject(this.camera);

        var ray = new THREE.Raycaster(this.camera.position, pos.sub(this.camera.position).normalize());

        var touched = ray.intersectObjects(this.scene.children,true);
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

    CreateModel(contentName,index) {
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
        
        var rad = Math.PI * 2;
        var theta = rad * index / this.objects.length;
        obj.position.set(Math.sin(theta) * 5, this.objPosY, -Math.cos(theta) * 5);
        obj.rotation.set(0,-theta,0)
        obj.name = contentName;

        this.scene.add(obj);
        return obj;
    }

    CheckObjectMoving() {
        if (this.objController && this.objController.moving) {
            if (this.objController.Moving) return true;
            else return false;
        }
    }

    Update() {
        if (this.objController) this.objController.Update();
        if (this.cameraController) this.cameraController.Update();
        
        if(this.scene.getObjectByName(this.lookObjName))this.scene.getObjectByName(this.lookObjName).rotateY(this.cursor.deltaX * 0.005);
        requestAnimationFrame(this.Update.bind(this));
    }


}