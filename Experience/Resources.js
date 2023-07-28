import Experience  from "./Experience";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
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


    // Test
    configureModel = (room)=>{
        // load element from the model
        room.scene.children.forEach((element)=>{
            element.castShadow = true;
            element.receiveShadow = true;          


            if (element instanceof THREE.Group) {
                element.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if (element.name === "Aquarium") {
                element.material = new THREE.MeshPhysicalMaterial();
                element.material.roughness = 0;
                element.material.color.set(0x549dd2);
                element.material.ior = 3;
                element.material.transmission = 1;
                element.material.opacity = 1;
            }

            // Elements in the mini floor
            if (element.name === "Mini_Floor") {
                element.position.x = -0.289521;
                element.position.z = 8.83572;
            }
            if(element.name == 'Mailbox'){
                element.position.x = 5;
                element.position.z = 3;
                
            }
            if(element.name == 'FloorFirst' || element.name == 'FloorSecond' || element.name == 'FloorThird'){
                element.position.x = -3;
                element.position.z = 3;
            }
            if(element.name == 'Dirt'){
                element.position.x = -3;
                element.position.z = 3;
            }
            if(element.name == 'Flower1' || element.name == 'Flower2'){
                element.position.x = -3;
                element.position.z = 3;
            }
            if(element.name == 'Lamp'){
                element.position.x = -3;
                element.position.z = 3;
            }

        })
        // Add Floor
        const geometry = new THREE.PlaneGeometry(40,40);
        const material = new THREE.MeshStandardMaterial( {color: '#c7e4d2', side: THREE.BackSide});
        const plane = new THREE.Mesh( geometry, material );
        plane.receiveShadow = true ;
        plane.rotation.x = Math.PI / 2;
        plane.rotation.z =Math.PI /4;
        plane.position.y = -1.5;
        plane.receiveShadow = true;
        room.scene.add(plane);
        
    }
    // Test
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
        let ligth = new THREE.AmbientLight('#2ddcbf',1);;
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