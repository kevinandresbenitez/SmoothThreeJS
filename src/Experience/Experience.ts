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
import dat from 'dat.gui';

// Disable scroll animation
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
    mode: "development" | "production" = "production"; 

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
        //Add scroll window event
        this.windowEvents.add("resize",this.resize);
        this.windowEvents.add('load',()=>{window.scrollTo(0, 0);});
        this.configureExperience();

        // inicialize animations
        this.gsap.inicializeAnimations();
        this.renderer.animate();
    }

    configureExperience(){
        this.scene.add(this.resources.scene_main);

        

        // Add media querys models
        this.gsap.addMediaQuerysScene();

        // Add ligths
        this.resources.ligth.addAmbientLight();
        this.resources.ligth.addSunLigth();

        // Add cameras
        this.camera.addOrthographicCamera();
        this.camera.addPerspectiveCamera();

        // Add Curve element 
        this.curvesCamera.addCurveElement();
        this.curvesCamera.addCameraFollowUp(this.camera.orthographicCamera,this.resources.scene_main.position);


        if(this.mode  == "development"){
            // Add Orbit Control
            this.controls.addOrbitControll(this.camera.perspectiveCamera);
            // Add helpers
            this.helper.addCameraHelper(this.camera.orthographicCamera);
            this.helper.addGridHelper(20,20)
            this.helper.addChangerCameras();
            // Delete dom element
            const container:any = document.querySelectorAll('.container')[0];
            container.style.display = "none";

            // Data Gui Helper
            const gui = new dat.GUI();
            
    
            
            const Sunlight = this.scene.children[2]

            gui.add(Sunlight.position, 'x', -20, 10).onChange((value)=>{
                Sunlight.position.x = value;
            });
              
            gui.add(Sunlight.position, 'y', -15, 20).onChange((value)=>{                
                Sunlight.position.y = value;
            });
              
            gui.add(Sunlight.position, 'z', -10, 10).onChange((value)=>{                
                Sunlight.position.z = value;
            });

 
        }


        // Configure cameras
        this.camera.orthographicCamera.position.y = 4;
        this.camera.orthographicCamera.position.z = 6;
        this.camera.orthographicCamera.rotation.x = -Math.PI / 6;
        this.camera.orthographicCamera.lookAt(this.resources.scene_main.position)

        this.camera.perspectiveCamera.position.z = 10;
        this.camera.perspectiveCamera.position.y = 10;
        this.camera.perspectiveCamera.lookAt(this.resources.scene_main.position);


    }

    // functions window
    resize = ()=>{
        Sizes.updateSizes();
        this.renderer.resize();
        this.camera.resize()
    }


    //Extern funcion
    onLoad = ()=>{};

}