
import Experience  from "./Experience";
import { Sizes } from "./utils/Sizes";
import * as THREE from 'three';

export class Camera{
    mainExperience:Experience;
    
    perspectiveCamera!:THREE.PerspectiveCamera;
    orthographicCamera!: THREE.OrthographicCamera;
    mainCamera!:THREE.Camera;

    constructor(){
        this.mainExperience = new Experience();
    }

    getMainCamera():THREE.Camera{
        return this.mainCamera;
    }
    
    addPerspectiveCamera():void{

        if(this.perspectiveCamera){
            throw new Error('Perspective camera already exist');
        }

        let PerspectiveCamera = new THREE.PerspectiveCamera( 35, Sizes.aspect, 0.1, 1000 );
        this.perspectiveCamera = PerspectiveCamera;
        this.mainExperience.scene.add(PerspectiveCamera);
        
    };
    
    addOrthographicCamera():void{

        if(this.orthographicCamera){
            throw new Error('Orthographic camera already exist');
        }

        let OrthographicCamera = new THREE.OrthographicCamera(
            (-Sizes.aspect * Sizes.frustrum) / 2,
            (Sizes.aspect * Sizes.frustrum) / 2,
            (Sizes.frustrum / 2),
            (-Sizes.frustrum / 2),
            -20,20
        );
        this.orthographicCamera = OrthographicCamera;
        this.mainExperience.scene.add(OrthographicCamera);
        this.mainCamera = this.orthographicCamera
        
    };

    areCamerasEnabled():boolean{
        return (this.perspectiveCamera != null && this.orthographicCamera != null)
    }

    updateProjectionMatrix():void{
        if(!this.areCamerasEnabled()){
            throw Error("Cameras are not enabled")
        }
        this.perspectiveCamera.updateProjectionMatrix();
        this.orthographicCamera.updateProjectionMatrix();
    }

    resize():void{
        if(!this.areCamerasEnabled()){
            throw Error("Cameras are not enabled")
        }

        // Update Aspect in cameras perspective 
        this.perspectiveCamera.aspect = Sizes.aspect;

        // Update properties in camera ortograpic 
        this.orthographicCamera.left = (-Sizes.aspect * Sizes.frustrum) / 2;
        this.orthographicCamera.right = (Sizes.aspect * Sizes.frustrum) / 2;
        this.orthographicCamera.top = (Sizes.frustrum / 2);
        this.orthographicCamera.bottom = (-Sizes.frustrum / 2);
        
    }


}