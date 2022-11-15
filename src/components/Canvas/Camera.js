import Canvas from '../Canvas'
import * as THREE  from 'three';

export default class Camera{

    constructor(){
        this.MainCanvas = new Canvas();
        this.sizes = this.MainCanvas.sizes;
        this.scene = this.MainCanvas.scene;

        // Add camera
        this.addOrthograpicCamera();
    }

    
    addPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight ,0.1,1000);
        this.perspectiveCamera.position.set(3,3,3);
        this.perspectiveCamera.lookAt(0,0,0);
        this.scene.add(this.perspectiveCamera)
    }

    addOrthograpicCamera(){
        this.orthograpicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            (-this.sizes.frustrum / 2),
            (this.sizes.frustrum / 2)
        );
        
        this.orthograpicCamera.position.set(1,1,1);
        this.orthograpicCamera.lookAt(0,0,0);
        this.scene.add(this.orthograpicCamera)
    }

    
}