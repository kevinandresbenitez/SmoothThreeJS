import SmoothScroll from "./utils/SmoothScroll";
import {Camera} from './Camera';
import {Renderer} from './Renderer';
import {Resources} from './Resources';
import { Scene } from "three";
import * as THREE from 'three';
import { Sizes } from "./utils/Sizes";
import {WindowEvents} from "./WindowEvents";
import { Controls } from "./Controls";
import { configureModel } from "./public/models/RoomConfig";
import { Helper } from "./Helper";
import { CurvesCamera } from "./CurvesCamera";
import { Gsap } from "./Gsap";


//Enable smooth js
SmoothScroll.enableSmooth();
SmoothScroll.disableWindowScroll();

export default class Experience{
    canvas!:HTMLCanvasElement;
    camera!:Camera;
    renderer!:Renderer;
    resources!:Resources;
    scene!:Scene;
    windowEvents!:WindowEvents;
    controls!:Controls;
    helper!:Helper;
    curvesCamera!:CurvesCamera;
    gsap!:Gsap;

    static Instance:Experience;
    constructor(canvas?:HTMLCanvasElement){

        // Single pattron
        if(Experience.Instance || !canvas){
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
        this.gsap = new Gsap();
    }

    async run(){
       this.renderer.configureRenderer();
       this.resources.configureLoaders();

       let elementsAreLoaded = await this.resources.loadAssets();
       if(elementsAreLoaded){
            this.onModelsLoaded();
       }
    }
    
    onModelsLoaded = ()=>{
        this.onLoad();
        this.windowEvents.add("resize",this.resize);
        this.windowEvents.add("mousemove",this.mouseMove);
        this.configureExperience();
        this.gsap.addScrollAnimation();
        this.renderer.animate();
    }

    configureExperience(){
        // Configure world and add to the scene
        configureModel(this.resources.scene_Model);
        this.scene.add(this.resources.scene_main);

        // Add media querys models
        this.gsap.addMediaQuerysScene();

        // Add ligths
        this.resources.ligth.addAmbientLight();
        this.resources.ligth.addSunLigth()

        // Add cameras
        this.camera.addOrthographicCamera();
        this.camera.addPerspectiveCamera();

        // Add Orbit Control
        this.controls.addOrbitControll(this.camera.perspectiveCamera);
        
        // Add helpers
        
        // this.helper.addCameraHelper(this.camera.orthographicCamera);
        // this.helper.addGridHelper(20,20)
        // this.helper.addChangerCameras();
        


        // Configure cameras
        this.camera.orthographicCamera.position.y = 4;
        this.camera.orthographicCamera.position.z = 6;
        this.camera.orthographicCamera.rotation.x = -Math.PI / 6;
        this.camera.perspectiveCamera.position.z = 10;
        this.camera.perspectiveCamera.position.y = 10;
        this.camera.perspectiveCamera.lookAt(this.resources.scene_main.position);
        

        // Adding curves follow up cameras
        
        // this.curvesCamera.addCurveElement();
        // this.curvesCamera.addCameraFollowUp(this.camera.orthographicCamera,this.resources.scene_main.position);
        // this.curvesCamera.startMovimentsCameras();
        
        //Add scroll window event
        SmoothScroll.enableWindowScroll();
    }

    // functions window
    resize = ()=>{
        Sizes.updateSizes();
        this.renderer.resize();
        this.camera.resize()
    }
    mouseMove=(event:any)=>{
        let rotation =(((event.clientX - Sizes.width / 2)*2) / Sizes.width)/10;
        this.resources.scene_main.rotation.y = rotation
    }

    //Extern funcion
    onLoad = ()=>{};

}