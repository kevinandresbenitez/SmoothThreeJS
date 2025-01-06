import Experience  from "./Experience";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import RoomModel from './public/models/Room.glb';

import * as THREE from 'three';

export class Resources{
    mainExperience;
    loaders = {};
    scene_Model;
    scene_main;
    scene_items = {};
    ligth;

    #__PublicDir = '../Experience/public/';

    constructor(){
        this.mainExperience = new Experience();
        this.ligth = new Light(this.mainExperience.scene);
    }

    configureLoaders(){
        this.loaders.GLTFLoader = new GLTFLoader();
        this.loaders.DRACOLoader = new DRACOLoader();

        // Configure loaders
        this.loaders.DRACOLoader.setDecoderPath('/draco/' );
        this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
    }



    async loadAssets(){
        // GLTF Loader 

        let filesLoaded = await new Promise((resolve,reject)=>{
            this.loaders.GLTFLoader.load(RoomModel,(file)=>{resolve(file)}); 
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
    scene;
    lightArray = [];

    constructor(Scene){
        if(!(Scene instanceof THREE.Scene)){
            throw new Error('Error, light need a THREE.Scene instance in constructor')
        }
        this.scene = Scene;
    }

    addAmbientLight(){
        let ligth = new THREE.AmbientLight("#ffffff",1);
        this.lightArray.push(ligth);
        this.scene.add(ligth);
    }
    
    addSunLigth(){
        let ligth = new THREE.DirectionalLight("#ffffff",3);
        ligth.castShadow = true;
        ligth.shadow.camera.far =20;
        ligth.shadow.mapSize.set(2048,2048);
        ligth.shadow.normalBias = 0.5;
        ligth.position.set(-1.5, 7, 3);
        this.lightArray.push(ligth);
        this.scene.add(ligth);
    }

    removeLight(ligthRemove){
        this.scene.remove(ligthRemove)
        this.lightArray  = this.lightArray.filter((ligth)=>ligth !== ligthRemove);
    }

}