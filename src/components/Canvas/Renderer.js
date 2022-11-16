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
        this.renderer = new THREE.WebGLRenderer({canvas:this.canvas});
        this.renderer.sortObjects = false;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor('#c7e4d2');
        this.renderer.setSize(this.sizes.width,this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize = ()=>{
        this.camera.orthograpicCamera.aspect = this.sizes.aspect;
        this.camera.orthograpicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
        this.camera.orthograpicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
        this.camera.orthograpicCamera.top = (-this.sizes.frustrum / 2)
        this.camera.orthograpicCamera.bottom = (this.sizes.frustrum / 2)
        this.camera.orthograpicCamera.updateProjectionMatrix();
        this.renderer.setSize( this.sizes.width, this.sizes.height);
    }

    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.camera.controls.update();
        // this.renderer.render(this.scene,this.camera.orthograpicCamera);
        this.renderer.render(this.scene,this.camera.perspectiveCamera);
    }


}