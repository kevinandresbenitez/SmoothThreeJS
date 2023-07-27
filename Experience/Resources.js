import Experience  from "./Experience";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export class Resources{
    mainExperience;
    loaders = {};
    scene_Model;
    scene_main;
    scene_items = {};

    #__PublicDir = '../Experience/public/';

    constructor(){
        this.mainExperience = new Experience();
    }

    configureLoaders(){
        this.setLoaders([GLTFLoader,DRACOLoader]);

        // Configure loaders
        this.loaders.DRACOLoader.setDecoderPath(this.#__PublicDir+'draco/');
        this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
    }


    setLoaders(LoadersArray){
        for(let loader of LoadersArray){
            this.loaders[loader.name] = new loader();
        }
    }

    async loadAssets(assetName){
        // GLTF Loader 

        let filesLoaded = await new Promise((resolve,reject)=>{
            this.loaders.GLTFLoader.load(this.#__PublicDir+'models/'+assetName,(file)=>{resolve(file)}); 
        });
        
        return new Promise((resolve,reject)=>{
            this.scene_Model = filesLoaded;
            this.scene_main = filesLoaded.scene;
            this.scene_item = {};
            
            //load items in scene
            this.scene_main.children.forEach((item)=>{
                this.scene_item[item.name] = item;
            })
            
            if(filesLoaded){
                resolve(true);
            }
        });
    }

}