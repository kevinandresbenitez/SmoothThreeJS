import Canvas from "../index.jsx";
import * as THREE from 'three';

export default class Light{

    constructor(){
        this.MainCanvas = new Canvas();
        this.scene = this.MainCanvas.scene;

        // Add elements
        this.addAmbientLight();
        this.addDirectionalLight();


    }

    addAmbientLight = ()=>{
        let ambienLight = new THREE.AmbientLight('#2ddcbf',1);
        this.scene.add(ambienLight);
    }

    addDirectionalLight = ()=>{
        const light = new THREE.DirectionalLight('#ffffff',3);
        light.shadow.camera.far = 20 ;
        light.castShadow = true;
        light.shadow.mapSize.set(2048,2048);
        light.shadow.camera.far=20;
        light.shadow.normalBias = 0.05;
        light.position.set(-1.5, 7, 3);
        this.scene.add(light)
    }




}