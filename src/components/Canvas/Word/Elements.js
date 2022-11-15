import Canvas from "../index.jsx";
import {gsap} from 'gsap';
import * as THREE from 'three';

export default class Elements{

    constructor(){
        this.MainCanvas = new Canvas();
        this.scene = this.MainCanvas.scene;
        this.elements = {};
        // Add elements
        this.addCube();

        // Add Animation
        window.addEventListener('load',this.animateCube)
    }

    animateCube=()=>{
        let timeline = gsap.timeline();

        timeline.to(this.elements.cube.scale,{x:0.10,y:0.10,z:0.10,duration:0.3});
        timeline.to(this.elements.cube.scale,{x:0.25,y:0.25,z:0.25,duration:0.3});
        timeline.to(this.elements.cube.position,{x:0,y:0.5,z:1,duration:0.3});
    }

    addCube = ()=>{
        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshStandardMaterial({color:'#e0cfcd',fog:true,roughness:0.7});
        const cube = new THREE.Mesh(geometry,material);
        cube.position.set(0,0,0);
        cube.scale.set(0,0,0);
        cube.receiveShadow = true;
        this.elements['cube'] = cube;
        this.scene.add(cube);
    }




}