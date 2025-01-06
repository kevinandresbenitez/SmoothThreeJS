import * as THREE from 'three';
import Experience from './Experience';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export class Helper{
    mainExperience;

    constructor(){
        this.mainExperience = new Experience();
    }

    addGridHelper(rows,cols){
        this.mainExperience.scene.add(new THREE.GridHelper(rows,cols));
    }


    addCameraHelper(camera){
        if(!(camera instanceof THREE.Camera)){
            return false;
        }
        this.mainExperience.scene.add(new THREE.CameraHelper(camera));
    }

    addChangerCameras(){        
        this.mainExperience.windowEvents.add("keydown",(event)=>{
            if(event.key >=0 && event.key <=9){
                this.mainExperience.camera.mainCameraIndex = event.key;
            }
        })
    }


}