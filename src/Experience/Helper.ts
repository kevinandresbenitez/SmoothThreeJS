import * as THREE from 'three';
import Experience from './Experience';

export class Helper{
    mainExperience:Experience;
    CameraKey1:number = 1;
    CameraKey2:number = 2;

    constructor(){
        this.mainExperience = new Experience();
    }

    addGridHelper(rows:number,cols:number){
        this.mainExperience.scene.add(new THREE.GridHelper(rows,cols));
    }

    addCameraHelper(camera:THREE.Camera){
        this.mainExperience.scene.add(new THREE.CameraHelper(camera));
    }

    addChangerCameras(){        
        this.mainExperience.windowEvents.add("keydown",(event)=>{
            if(!(event instanceof KeyboardEvent)){
                return false;
            }
            
            if(event.key == String(this.CameraKey1)){
                this.mainExperience.camera.mainCamera = this.mainExperience.camera.orthographicCamera;
            }else if(event.key == String(this.CameraKey2)){
                this.mainExperience.camera.mainCamera = this.mainExperience.camera.perspectiveCamera;
            }



        })
    }


}