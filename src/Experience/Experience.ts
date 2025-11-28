import SmoothScroll from "./utils/SmoothScroll";
import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { Resources } from './Resources';
import { Scene } from "three";
import * as THREE from 'three';
import { Sizes } from "./utils/Sizes";
import { WindowEvents } from "./WindowEvents";
import { Controls } from "./Controls";
import { configureModel } from "./public/models/RoomConfig";
import { Helper } from "./Helper";
import { CurvesCamera } from "./CurvesCamera";
import { Gsap } from "./Gsap";
import dat from 'dat.gui';

// Disable scroll animation
SmoothScroll.disableWindowScroll();

export default class Experience {
    canvas!: HTMLCanvasElement;
    camera!: Camera;
    renderer!: Renderer;
    resources!: Resources;
    scene!: Scene;
    windowEvents!: WindowEvents;
    controls!: Controls;
    helper!: Helper;
    curvesCamera!: CurvesCamera;
    gsap!: Gsap;
    mode: "development" | "production" = "production";

    static Instance: Experience;
    constructor(canvas?: HTMLCanvasElement) {

        // Single pattron
        if (Experience.Instance || !canvas) {
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

    async run() {
        this.renderer.configureRenderer();
        this.resources.configureLoaders();

        let elementsAreLoaded = await this.resources.loadAssets();
        if (elementsAreLoaded) {
            this.onModelsLoaded();
        }
    }

    onModelsLoaded = () => {
        this.onLoad();
        //Add scroll window event
        this.windowEvents.add("resize", this.resize);
        window.scrollTo(0, 0);
        this.configureExperience();

        // inicialize animations
        this.gsap.inicializeAnimations();
        this.renderer.animate();
    }

    configureExperience() {

        // Adding resources in the scene
        this.resources.addModel()
        this.resources.addAmbientLight();
        this.resources.addDirectionalLight();

        // Add media querys models
        this.gsap.addMediaQuerysScene();

        // Add cameras
        this.camera.addOrthographicCamera();
        this.camera.addPerspectiveCamera();

        // Configure cameras
        const orthographicCamera = this.camera.getOrthographicCamera();
        const perspectiveCamera = this.camera.getPerspectiveCamera();
        const modelPosition = this.resources.getModel().position;

        orthographicCamera.position.y = 4;
        orthographicCamera.position.z = 6;
        orthographicCamera.rotation.x = -Math.PI / 6;
        orthographicCamera.lookAt(modelPosition)

        perspectiveCamera.position.z = 10;
        perspectiveCamera.position.y = 10;
        perspectiveCamera.lookAt(modelPosition);

        // Add Curve element 
        this.curvesCamera.addCurveElement();
        this.curvesCamera.addCameraFollowUp(orthographicCamera, modelPosition);

        if (this.mode == "development") {
            // Add Orbit Control
            this.controls.addOrbitControll(perspectiveCamera);

            // Add helpers
            this.helper.addCameraHelper(orthographicCamera);
            this.helper.addGridHelper(20, 20)
            this.helper.addChangerCameras();

            // Delete dom element
            const container: any = document.querySelectorAll('.container')[0];
            container.style.display = "none";

            // Data Gui Helper
            const gui = new dat.GUI();

            const directionalLight = this.resources.getDirectionalLight();

            gui.add(directionalLight.position, 'x', -20, 10).onChange((value) => {
                directionalLight.position.x = value;
            });

            gui.add(directionalLight.position, 'y', -15, 20).onChange((value) => {
                directionalLight.position.y = value;
            });

            gui.add(directionalLight.position, 'z', -10, 10).onChange((value) => {
                directionalLight.position.z = value;
            });


        }

    }

    // functions window
    resize = () => {
        Sizes.updateSizes();
        this.renderer.resize();
        this.camera.resize()
    }


    //Extern funcion
    onLoad = () => { };

}