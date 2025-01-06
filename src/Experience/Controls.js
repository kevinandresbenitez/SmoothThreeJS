import Experience  from "./Experience";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Controls{
    mainExperience;
    orbitControl;    

    constructor(){
        this.mainExperience = new Experience();
    }

    addOrbitControll(camera,canvas){
        if(!(camera instanceof THREE.Camera) || !(canvas instanceof HTMLCanvasElement )){
            return false;
        }        
        this.orbitControl = new OrbitControls(camera,canvas);
        this.orbitControl.enableDamping = true;
        this.orbitControl.enableZoom = true;

    }

    update(){
        if(this.orbitControl){
            this.orbitControl.update();
        }
    }


}