import * as THREE from 'three';
import Experience  from "./Experience";
import { Sizes } from './utils/Sizes';

export class Renderer{
    mainExperience;
    constructor(){
        this.mainExperience = new Experience();
        this.renderer = new THREE.WebGLRenderer({canvas:this.mainExperience.canvas,antialias:false});
    }

    configureRenderer(){
        this.resize();
        this.renderer.useLegacyLight = true;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 0.4;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor('#dfe7e5');
        this.renderer.setSize(Sizes.width,Sizes.height);
        this.renderer.setPixelRatio(Sizes.pixelRatio);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.mainExperience.controls.update()
        this.renderer.render(this.mainExperience.scene,this.mainExperience.camera.camerasEnabled[0]);
    }

    resize(){
        this.renderer.setSize(Sizes.width,Sizes.height);
        this.renderer.setPixelRatio(Sizes.pixelRatio);
    }
}