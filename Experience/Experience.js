import SmoothScroll from "./utils/SmoothScroll";
import {Camera} from './Camera.js';
import {Renderer} from './Renderer.js';
import {Resources} from './Resources.js';
import { Scene } from "three";
import * as THREE from 'three';
import { Sizes } from "./utils/Sizes";
import {WindowEvents} from "./WindowEvents";
import { Controls } from "./Controls";
import { configureModel } from "./public/models/RoomConfig";
import { Helper } from "./Helper";
import { CurvesCamera } from "./CurvesCamera";

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
    helper;
    curvesCamera;
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
        this.helper = new Helper();
        this.curvesCamera = new CurvesCamera();
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
        // Configure world and add to the scene
        configureModel(this.resources.scene_Model);
        this.scene.add(this.resources.scene_main);

        // Add ligths
        this.resources.ligth.addAmbientLight();
        this.resources.ligth.addSunLigth()

        // Add cameras
        this.camera.addPerspectiveCamera('PerspectiveCamera_1');
        this.camera.addOrthographicCamera('OrthographicCamera_1');

        // Add Orbit Control
        this.controls.addOrbitControll(this.camera.camerasItems.PerspectiveCamera_1,this.canvas);
        
        // Add helpers
        this.helper.addCameraHelper(this.camera.camerasItems.OrthographicCamera_1);
        this.helper.addGridHelper(20,20)
        this.helper.addChangerCameras();

        // Configure cameras
        this.camera.camerasItems.OrthographicCamera_1.position.y = 4;
        this.camera.camerasItems.OrthographicCamera_1.position.z = 5;
        this.camera.camerasItems.OrthographicCamera_1.rotation.x = -Math.PI / 6;
        this.camera.camerasItems.PerspectiveCamera_1.position.z = 10;
        this.camera.camerasItems.PerspectiveCamera_1.position.y = 10;
        this.camera.camerasItems.PerspectiveCamera_1.lookAt(this.resources.scene_main.position);
        

        // Adding curves follow up cameras
        this.curvesCamera.addCurveElement();
        this.curvesCamera.addCameraFollowUp(this.camera.camerasItems.OrthographicCamera_1,this.resources.scene_main.position);
        this.curvesCamera.startMovimentsCameras();
            
    }

    resize = ()=>{
        Sizes.updateSizes();
        this.renderer.resize();
        this.camera.resize()
    }

    //Extern funcion
    onLoad = ()=>{};

}