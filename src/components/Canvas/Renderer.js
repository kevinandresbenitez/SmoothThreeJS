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
        this.renderer = new THREE.WebGL1Renderer({canvas:this.canvas,antialias:true});
        this.renderer.setClearColor('#c7e4d2')
        this.renderer.setSize(this.sizes.width,this.sizes.height)
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
        this.controls.update();
        this.renderer.render(this.scene,this.camera.orthograpicCamera);
    }


}