import Experience  from "./Experience";
import * as THREE from 'three';

export class CurvesCamera{
    mainExperience;
    curveObject;
    camerasFollowUp = [];
    camerasLookAt = [];
    vectorFollowUp = new THREE.Vector3(0,0,0);
    CountFrameVector = 0 ;
    speedInMs = 25;
    IntervalInstance;

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

    getMainCurve(){
        return this.curveObject;
    }

    isCurveEnable(){
        return (this.curveObject);
    }

    addCameraFollowUp(camera,position){
        if(!camera || !(camera instanceof THREE.Camera)){
            throw Error('Need camera valid instance');
        }
        if(!position || !position instanceof THREE.Vector3){
            throw Error('Need position vector 3');
        }
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
            this.camerasFollowUp.forEach((camera,indice)=>{
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