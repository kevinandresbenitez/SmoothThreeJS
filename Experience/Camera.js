import Experience  from "./Experience";
import { Sizes } from "./utils/Sizes";
import * as THREE from 'three';

export class Camera{
    mainExperience;
    camerasEnabled = [];
    #mainCameraIndex = 0;
    camerasItems = {};

    constructor(){
        this.mainExperience = new Experience();
    }

    //Setters and getters
    set mainCameraIndex(value){
        if(!this.camerasEnabled[value]){
            return false
        };
        this.#mainCameraIndex = value
        return true
    }
    get mainCameraIndex(){
        return this.#mainCameraIndex;
    }
    //Setters and getters

    addPerspectiveCamera(cameraName){
        if(!cameraName){
            throw new Error('Camera need name');
        }
        if(cameraName in this.camerasItems){
            throw new Error('Camera '+cameraName+' Already exist');
        }

        let PerspectiveCamera = new THREE.PerspectiveCamera( 35, Sizes.aspect, 0.1, 1000 );
        this.camerasEnabled.push(PerspectiveCamera);
        this.mainExperience.scene.add(PerspectiveCamera);
        this.camerasItems[cameraName] = PerspectiveCamera;
    };
    addOrthographicCamera(cameraName){
        if(!cameraName){
            throw new Error('Camera need name');
        }
        if(cameraName in this.camerasItems){
            throw new Error('Camera '+cameraName+' Already exist');
        }
        let OrthographicCamera = new THREE.OrthographicCamera(
            (-Sizes.aspect * Sizes.frustrum) / 2,
            (Sizes.aspect * Sizes.frustrum) / 2,
            (Sizes.frustrum / 2),
            (-Sizes.frustrum / 2),
            -20,20
        );
        this.camerasEnabled.push(OrthographicCamera);
        this.mainExperience.scene.add(OrthographicCamera);
        this.camerasItems[cameraName] = OrthographicCamera;
    }
    addCameraHelper(camera){
        if(camera instanceof THREE.Camera){
            // Helper
            this.mainExperience.scene.add(new THREE.CameraHelper(camera));
        }
    }

    isAnyCameraEnabled(){
        return this.camerasEnabled.length;
    }

    updateProjectionMatrix(){
        this.camerasEnabled.forEach((camera)=>{
            if(camera instanceof THREE.PerspectiveCamera || camera instanceof THREE.OrthographicCamera){
                camera.updateProjectionMatrix()
            }
        });
    }

    resize(){
        
        // Update Aspect in cameras perspective 
        this.camerasEnabled.forEach((camera)=>{
            if(camera instanceof THREE.PerspectiveCamera){
                camera.aspect = Sizes.aspect;
            }
        });

        // Update properties in camera ortograpic 
        this.camerasEnabled.forEach((camera)=>{
            if(camera instanceof THREE.OrthographicCamera){
                camera.left = (-Sizes.aspect * Sizes.frustrum) / 2;
                camera.right = (Sizes.aspect * Sizes.frustrum) / 2;
                camera.top = (Sizes.frustrum / 2);
                camera.bottom = (-Sizes.frustrum / 2);
            }
        });
    }

    getMainCamera(){
        if(!this.isAnyCameraEnabled()){
            return false
        }
        return this.camerasEnabled[this.#mainCameraIndex];
    }
}