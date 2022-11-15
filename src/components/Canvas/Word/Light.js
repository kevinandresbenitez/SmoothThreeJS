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
        const light = new THREE.DirectionalLight('#c7e4d2',0.4);
        light.shadow.camera.far = 20 ;
        light.shadow.mapSize.set(1024,1024);
        light.shadow.normalBias = 0.5;
        light.position.set(-20,-50,1);
        this.scene.add(light)
    }




}