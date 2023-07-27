import SmoothScroll from "./utils/SmoothScroll";
import {Camera} from './Camera.js';
import {Renderer} from './Renderer.js';
import {Resources} from './Resources.js';
import { Scene } from "three";
import * as THREE from 'three';



//Enable smooth js
SmoothScroll.enable();

export default class Experience{
    canvas;
    camera;
    renderer;
    resources;
    scene;

    static Instance;
    constructor(canvas = false){
        // Validation canvas
        if(canvas && !(canvas instanceof HTMLCanvasElement)){throw Error('Experience need canvas element');}

        // Single pattron
        if(Experience.Instance){
            return Experience.Instance;
        }

        Experience.Instance = this;
        // Single pattron
        this.canvas = canvas;
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources();
        this.scene = new Scene();
    }

    async run(){
       this.camera.addPerspectiveCamera();
       this.renderer.configureRenderer();

       this.resources.configureLoaders();
       let elementsAreLoaded = await this.resources.loadAssets('Room.glb');
       if(elementsAreLoaded){
            this.onLoad()
       }

       const geometry = new THREE.BoxGeometry( 1, 1, 1 );
       const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
       const cube = new THREE.Mesh( geometry, material );
       this.scene.add( cube );
       
       this.camera.mainCameraIndex = 5;
       this.camera.camerasEnabled[this.camera.mainCameraIndex].position.z = 5;

        this.renderer.animate();
    }

    onLoad = ()=>{};

}