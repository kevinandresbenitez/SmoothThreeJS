import Experience  from "./Experience";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Controls{
    mainExperience:Experience;
    orbitControl!:OrbitControls;    

    constructor(){
        this.mainExperience = new Experience();
    }

    addOrbitControll(camera:THREE.Camera):void{
        if(this.orbitControl){
            throw Error("Orbit control already exist in a camera");
        }

        this.orbitControl = new OrbitControls(camera,this.mainExperience.canvas);
        this.orbitControl.enableDamping = true;
        this.orbitControl.enableZoom = true;

    }

    update():void{
        if(this.orbitControl){
            this.orbitControl.update();
        }
    }


}