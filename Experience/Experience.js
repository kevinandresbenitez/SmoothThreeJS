import SmoothScroll from "./utils/SmoothScroll";
import {Camera} from './Camera.js';
import {Renderer} from './Renderer.js';
import {Word} from './Word.js';
import { Scene } from "three";
import * as THREE from 'three';

//Enable smooth js
SmoothScroll.enable();

export default class Experience{
    canvas;
    camera;
    renderer;
    word;
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
        this.word = new Word();
        this.scene = new Scene();
    }

    run(){
       this.camera.addPerspectiveCamera();
       this.renderer.configureRenderer();

       const geometry = new THREE.BoxGeometry( 1, 1, 1 );
       const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
       const cube = new THREE.Mesh( geometry, material );
       this.scene.add( cube );
       
       this.camera.mainCameraIndex = 5;
       this.camera.camerasEnabled[this.camera.mainCameraIndex].position.z = 5;

        this.renderer.animate();
    }


}