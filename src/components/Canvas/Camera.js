import Canvas from '../Canvas'
import * as THREE  from 'three';
import {OrbitControls} from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

export default class Camera{

    constructor(){
        this.MainCanvas = new Canvas();
        this.sizes = this.MainCanvas.sizes;
        this.scene = this.MainCanvas.scene;
        this.canvas = this.MainCanvas.canvas;

        // Add camera
        this.addOrthograpicCamera();
        this.addPerspectiveCamera();


        // Helpers
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas.current)
        this.controls.enableDamping = true
        this.controls.enableZoom = true
    }

    
    addPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            5,this.sizes.aspect,1,100
        );
        this.perspectiveCamera.position.set(39,24,32)
        this.scene.add(this.perspectiveCamera)
    }

    addOrthograpicCamera(){
        this.orthograpicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            (-this.sizes.frustrum / 2),
            (this.sizes.frustrum / 2)
        );
        
        this.orthograpicCamera.position.set(-Math.PI / 6,5.65,10)
        this.scene.add(this.orthograpicCamera)
    }

    resize(){
        // Resize persepctive camera
        this.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        this.perspectiveCamera.updateProjectionMatrix();
        
        // Resize ortografic camera
        this.orthograpicCamera.aspect = this.sizes.aspect;
        this.orthograpicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthograpicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthograpicCamera.top = (-this.sizes.frustrum / 2)
        this.orthograpicCamera.bottom = (this.sizes.frustrum / 2)
        this.orthograpicCamera.updateProjectionMatrix();

    }

    update(){
        this.controls.update();
    }
}