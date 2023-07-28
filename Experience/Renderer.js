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
        this.resize();
    }

    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.mainExperience.controls.update()
        this.renderer.render(this.mainExperience.scene,this.mainExperience.camera.camerasEnabled[0]);
    }

    resize(){
        this.renderer.setSize(Sizes.width,Sizes.height);
    }
}