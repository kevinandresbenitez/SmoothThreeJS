import Experience  from "./Experience";
import { GLTFLoader ,GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

//@ts-ignore types
import RoomModel from './public/models/Room.glb';

import * as THREE from 'three';
import { Scene } from "three";
import { AmbientLight } from "three";
import { DirectionalLight } from "three";

export class Resources{
    mainExperience:Experience;
    GLTFLoader!:GLTFLoader;
    DRACOLoader!:DRACOLoader;

    scene_Model!:GLTF;
    scene_main!:GLTF['scene'];
    scene_items: { [key: string]: THREE.Object3D } = {};
    ligth:Light;


    constructor(){
        this.mainExperience = new Experience();
        this.ligth = new Light(this.mainExperience.scene);
    }

    configureLoaders(){
        this.GLTFLoader = new GLTFLoader();
        this.DRACOLoader = new DRACOLoader();

        // Configure loaders
        this.DRACOLoader.setDecoderPath('./public/draco/' );
        this.GLTFLoader.setDRACOLoader(this.DRACOLoader);
    }


    async loadAssets(){
        // GLTF Loader 
        let filesLoaded:GLTF = await new Promise((resolve,reject)=>{
            this.GLTFLoader.load(RoomModel,(file:any)=>{resolve(file)}); 
        });
        
        return new Promise((resolve,reject)=>{
            this.scene_Model = filesLoaded;
            this.scene_main = filesLoaded.scene;
            this.scene_items = {};
            
            //load items in scene
            this.scene_main.children.forEach((item)=>{
                this.scene_items[item.name] = item;
            })
            
            if(filesLoaded){
                resolve(true);
            }
        });
    }
}

class Light{
    scene:Scene;

    ambientLight!:AmbientLight;
    directionalLight!:DirectionalLight;

    constructor(Scene:Scene){
        this.scene = Scene;
    }

    addAmbientLight(){
        let ligth = new THREE.AmbientLight("#ffffff",1);
        this.ambientLight = ligth;
        this.scene.add(ligth);
    }
    
    addSunLigth(){
        let ligth = new THREE.DirectionalLight("#ffffff",3);
        ligth.castShadow = true;
        ligth.shadow.camera.far =20;
        ligth.shadow.mapSize.set(2048,2048);
        ligth.shadow.normalBias = 0.5;
        ligth.position.set(-1.5, 7, 3);
        this.directionalLight = ligth;
        this.scene.add(ligth);
    }


}