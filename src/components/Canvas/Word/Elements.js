import Canvas from "../index.jsx";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";


export default class Elements{

    constructor(){
        this.MainCanvas = new Canvas();
        this.scene = this.MainCanvas.scene;
        this.elements = {};

        this.loadElements();
    }

    loadElements = async ()=>{
        // Load loaders
        this.gltfLoader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath( '../../../../node_modules/three/examples/js/libs/draco/');
        this.gltfLoader.setDRACOLoader( this.dracoLoader );        


        // Load Elements
        let room = await this.loadRoom();
        // room.scene.rotation.set(180 * Math.PI / 180,0,0);
        room.scene.scale.set(0.11,0.11,0.11);

        // Add elements in the scene
        this.scene.add(room.scene)
    }

    loadRoom =()=>{
        return new Promise((resolve,reject)=>{
            this.gltfLoader.load('../../../../public/Models/Room.glb',(room)=>{
                resolve(room)
            })
        })
    }


}