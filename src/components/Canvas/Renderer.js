import * as THREE from 'three';
import Canvas from './index';

export default class Renderer {
    constructor(){
        this.MainCanvas = new Canvas();
        this.sizes = this.MainCanvas.sizes;
        this.scene = this.MainCanvas.scene;
        this.canvas = this.MainCanvas.canvas.current;
        this.camera = this.MainCanvas.camera;
        this.controls = this.MainCanvas.controls;

        this.setRender();
        this.animate();

        // Add resize element 
        window.addEventListener('resize',this.resize)
    }


    setRender(){
        this.renderer = new THREE.WebGLRenderer({canvas:this.canvas,antialias:true});
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor('#dfe7e5');
        this.renderer.setSize(this.sizes.width,this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize = ()=>{
        this.camera.resize();
        this.renderer.setSize( this.sizes.width, this.sizes.height);
    }

    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.camera.update();
        this.renderer.render(this.scene,this.camera.perspectiveCamera);
    }


}