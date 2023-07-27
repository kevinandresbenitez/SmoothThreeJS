import * as THREE from 'three';
import Experience  from "./Experience";
import { Sizes } from './utils/Sizes';

export class Renderer{
    mainExperience;
    constructor(){
        this.mainExperience = new Experience();
        this.renderer = new THREE.WebGLRenderer({canvas:this.mainExperience.canvas});
    }

    configureRenderer(){
        this.renderer.setSize(Sizes.width,Sizes.height);
    }

    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.renderer.render(this.mainExperience.scene,this.mainExperience.camera.camerasEnabled[0]);
    }
}