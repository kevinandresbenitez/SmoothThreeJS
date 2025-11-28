import Experience from "./Experience";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

//@ts-ignore types
import RoomModel from './public/models/Room.glb';

import * as THREE from 'three';
import { Scene } from "three";
import { AmbientLight } from "three";
import { DirectionalLight } from "three";
import { configureModel } from "./public/models/RoomConfig";

export class Resources {
    mainExperience: Experience;
    #GLTFLoader!: GLTFLoader;
    #DRACOLoader!: DRACOLoader;

    #model!: GLTF['scene'];
    #modelItems: { [key: string]: THREE.Object3D } = {};

    #directionalLight!: DirectionalLight;
    #ambientLight!: AmbientLight;

    constructor() {
        this.mainExperience = new Experience();
    }

    configureLoaders() {
        this.#GLTFLoader = new GLTFLoader();
        this.#DRACOLoader = new DRACOLoader();

        // Configure loaders
        this.#DRACOLoader.setDecoderPath('./public/draco/');
        this.#GLTFLoader.setDRACOLoader(this.#DRACOLoader);
    }


    async loadAssets() {
        // GLTF Loader 
        let filesLoaded: GLTF = await new Promise((resolve, reject) => {
            this.#GLTFLoader.load(RoomModel, (file: any) => { resolve(file) });
        });


        // Configure models
        configureModel(filesLoaded);


        return new Promise((resolve, reject) => {
            this.#model = filesLoaded.scene;
            this.#modelItems = {};

            //load items in scene
            this.#model.children.forEach((item) => {
                this.#modelItems[item.name] = item;
            })

            if (filesLoaded) {
                resolve(true);
            }
        });
    }

    getModel() {
        return this.#model;
    }

    getModelItems() {
        return this.#modelItems;
    }

    addModel() {
        this.mainExperience.scene.add(this.#model);
    }

    addAmbientLight() {
        let light = new THREE.AmbientLight("#ffffff", 1);
        this.mainExperience.scene.add(light);
        this.#ambientLight = light;
    }

    addDirectionalLight() {
        let light = new THREE.DirectionalLight("#ffffff", 3);
        light.castShadow = true;
        light.shadow.camera.far = 20;
        light.shadow.mapSize.set(2048, 2048);
        light.shadow.normalBias = 0.5;
        light.position.set(2, 7, 3);
        this.mainExperience.scene.add(light);
        this.#directionalLight = light;
    }

    getDirectionalLight() {
        return this.#directionalLight;
    }

    getAmbientLight() {
        return this.#ambientLight;
    }
}
