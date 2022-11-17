import Canvas from "../index.jsx";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";


export default class Elements{

    constructor(){
        this.MainCanvas = new Canvas();
        this.scene = this.MainCanvas.scene;

        this.loadElements();
    }

    loadElements = async ()=>{
        // Load loaders
        this.gltfLoader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath( 'DracoDecoder/');
        this.gltfLoader.setDRACOLoader( this.dracoLoader );        


        // Load Elements
        let room = await this.loadRoom();
        room.scene.scale.set(0.11,0.11,0.11);
        room.scene.position.set(0,-0.9,0);
        this.configureRoom(room)

        // Add elements in the scene
        this.scene.add(room.scene)
    }

    configureRoom = (room)=>{
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

            if (element.name === "Mini_Floor") {
                element.position.x = -0.289521;
                element.position.z = 8.83572;
            }

            if (element.name === "Cube") {
                element.scale.set(0,0,0);
                element.position.set(-2,9,2);
                element.rotation.y = Math.PI / 4;
            }

        })

        //Add element light
        const rectLight = new THREE.RectAreaLight(0xffffff,1,0.5,0.7);
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        room.scene.add(rectLight);

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


    loadRoom =()=>{
        return new Promise((resolve,reject)=>{
            this.gltfLoader.load('/Models/Room.glb',(room)=>{
                resolve(room)
            })
        })
    }


}