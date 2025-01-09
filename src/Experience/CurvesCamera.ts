import { CatmullRomCurve3 } from "three";
import Experience  from "./Experience";
import * as THREE from 'three';
import { Vector3 } from "three";
import { Camera } from "three";

export class CurvesCamera{
    mainExperience:Experience;
    curveObject!:CatmullRomCurve3;
    camerasFollowUp:Camera[] = [];
    camerasLookAt:Vector3[] = [];
    vectorFollowUp:Vector3 = new THREE.Vector3(0,0,0);
    CountFrameVector:number = 0 ;
    speedInMs:number = 25;
    IntervalInstance:any;

    constructor(){
        this.mainExperience = new Experience();
    }

    addCurveElement(){
        const curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3(0, 4, 6,),
            new THREE.Vector3( -5, 0,0),
            new THREE.Vector3( 0, -4, -5 ),
            new THREE.Vector3( 5, 12, 0 ),
            new THREE.Vector3( 0, 5, 5 ),
            new THREE.Vector3(0, 4, 6,),
        ] );

        const points = curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const isTrasparent = this.mainExperience.mode == 'production' ? true:false;
        const opacity = this.mainExperience.mode == 'production' ? 0:1;

        const material = new THREE.LineBasicMaterial( { color: 0xff0000,opacity:opacity,transparent:isTrasparent} );
        const curveObject = new THREE.Line( geometry, material );
        this.curveObject = curve;
        this.mainExperience.scene.add(curveObject);
    }

    addCameraFollowUp(camera:Camera,position:Vector3){
        this.camerasFollowUp.push(camera);
        this.camerasLookAt.push(position);
    }

    startCamerasAnimations():Promise<Boolean>{
        

        return new Promise((resolve)=>{
        // start animation        
        this.IntervalInstance = setInterval(()=>{
            this.curveObject.getPoint(this.CountFrameVector,this.vectorFollowUp);

            // Apli cameras changes
            this.camerasFollowUp.forEach((camera:THREE.Object3D,indice)=>{
                camera.position.copy(this.vectorFollowUp);
                camera.lookAt(0,0,0)
            })
            
            if(this.CountFrameVector >= 1){
                    this.stopMovimentCameras();
                    resolve(true);
            }

            this.CountFrameVector += 0.006;
        },this.speedInMs);


        })
    }

    stopMovimentCameras(){
        if(!this.IntervalInstance){
            return false;
        }
        clearInterval(this.IntervalInstance);
    }
}