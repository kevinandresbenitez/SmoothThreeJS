import Experience  from "./Experience";
import { Sizes } from "./utils/Sizes";
import * as THREE from 'three';

export class Camera{
    mainExperience;
    camerasEnabled = [];
    #mainCameraIndex = 0;

    constructor(){
        this.mainExperience = new Experience();
    }

    //Setters and getters
    set mainCameraIndex(value){
        return false
    }
    get mainCameraIndex(){
        return this.#mainCameraIndex;
    }
    //Setters and getters


    addPerspectiveCamera(){
        let PerspectiveCamera = new THREE.PerspectiveCamera( 75, Sizes.aspect, 0.1, 1000 );
        this.camerasEnabled.push(PerspectiveCamera);
        this.mainExperience.scene.add(PerspectiveCamera);
    };

    isAnyCameraEnabled(){
        return this.camerasEnabled.length;
    }
}