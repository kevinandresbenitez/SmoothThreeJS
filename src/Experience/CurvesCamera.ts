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
            new THREE.Vector3( -5, 0,0),
            new THREE.Vector3( 0, 0, -5 ),
            new THREE.Vector3( 5, 12, 0 ),
            new THREE.Vector3( 0, 5, 5 ),
            new THREE.Vector3( 15, 0, 5 ),
            new THREE.Vector3( 0, 5, 5 ),
            new THREE.Vector3( -12, 6, 5 )
        ] );

        const points = curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const curveObject = new THREE.Line( geometry, material );
        this.curveObject = curve;
        this.mainExperience.scene.add(curveObject);
    }

    addCameraFollowUp(camera:Camera,position:Vector3){
        this.camerasFollowUp.push(camera);
        this.camerasLookAt.push(position);
    }

    startMovimentsCameras(){
        if(this.IntervalInstance){
            return false;
        }
        // start animation        
        this.IntervalInstance = setInterval(()=>{
            this.curveObject.getPoint(this.CountFrameVector,this.vectorFollowUp);

            // Apli cameras changes
            this.camerasFollowUp.forEach((camera:THREE.Object3D,indice)=>{
                camera.position.copy(this.vectorFollowUp);
                camera.lookAt(this.camerasLookAt[indice])
            })

            this.CountFrameVector += 0.005;
        },this.speedInMs);
    }

    stopMovimentCameras(){
        if(!this.IntervalInstance){
            return false;
        }
        clearInterval(this.IntervalInstance);
    }
}