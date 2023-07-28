import SmoothScroll from "./utils/SmoothScroll";
import {Camera} from './Camera.js';
import {Renderer} from './Renderer.js';
import {Resources} from './Resources.js';
import { Scene } from "three";
import * as THREE from 'three';
import { Sizes } from "./utils/Sizes";
import {WindowEvents} from "./WindowEvents";
import { Controls } from "./Controls";


//Enable smooth js
SmoothScroll.enable();

export default class Experience{
    canvas;
    camera;
    renderer;
    resources;
    scene;
    windowEvents;
    controls;
    ModelfileToLoad = 'Room.glb';

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
        this.scene = new Scene();
        this.resources = new Resources();
        this.windowEvents = new WindowEvents();
        this.controls = new Controls();
    }

    async run(){
       this.renderer.configureRenderer();
       this.resources.configureLoaders();

       let elementsAreLoaded = await this.resources.loadAssets(this.ModelfileToLoad);
       if(elementsAreLoaded){
            this.main();
       }
    }
    
    main = ()=>{
        this.onLoad();
        this.windowEvents.add("resize",this.resize);
        this.configureWorld();
        this.renderer.animate();
    }

    configureWorld(){
        this.resources.ligth.addAmbientLight();
        this.resources.ligth.addSunLigth()
        this.resources.scene_main.scale.set(0.11,0.11,0.11);
        this.resources.configureModel(this.resources.scene_Model)

        this.camera.addPerspectiveCamera();
        this.camera.addOrthographicCamera();
        this.controls.addOrbitControll(this.camera.camerasEnabled[this.camera.mainCameraIndex],this.canvas);
        this.camera.addCameraHelper(this.camera.camerasEnabled[1]);
        this.camera.camerasEnabled[1].position.y = 4;
        this.camera.camerasEnabled[1].position.z = 5;
        this.camera.camerasEnabled[1].rotation.x = -Math.PI / 6;            


        this.camera.camerasEnabled[this.camera.mainCameraIndex].position.z = 10;
        this.camera.camerasEnabled[this.camera.mainCameraIndex].position.y = 10;
        this.camera.camerasEnabled[this.camera.mainCameraIndex].lookAt(this.resources.scene_main.position);

        this.scene.add(this.resources.scene_main);
    }

    resize = ()=>{
        Sizes.updateSizes();
        this.renderer.resize();
        this.camera.resize()
    }

    //Extern funcion
    onLoad = ()=>{};

}