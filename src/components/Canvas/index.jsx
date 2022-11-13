import { useState,useEffect,useRef} from 'react'
import * as THREE from 'three';
import {OrbitControls} from '../../../node_modules/three/examples/jsm/controls/OrbitControls';

function Canvas(props){
    
    let camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight ,0.1,1000);
    let scene = new THREE.Scene();
    let canvas = useRef();
    let renderer;
    let elements = [];

    useEffect(()=>{
        setDefaultValues();
        Animate();

        addElement(createElement.cube());
        addElement(createElement.plataform());
        addElement(createElement.ambientLight());
        addElement(createElement.pointLight());
    },[])

    let controls ;

    let setDefaultValues = ()=>{
        // Init renderer
        renderer = new THREE.WebGLRenderer({canvas:canvas.current})
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.setClearColor('#eae8e0');
        renderer.shadowMap.enabled = true;

        // Camara Position
        camera.position.set(4,4,4);
        camera.lookAt(0,0,0);


        // Adding orbital control
        controls= new OrbitControls( camera, renderer.domElement );
        controls.update();
    }


    let addElement = (element)=>{
        scene.add(element);
        elements.push(element)
    }

    let createElement = {
        cube:()=>{
            const geometry = new THREE.BoxGeometry(1,1,1);
            const material = new THREE.MeshStandardMaterial({color:'#e0cfcd',fog:true,roughness:0.7});
            const cube = new THREE.Mesh(geometry,material);
            cube.castShadow = true;
            return cube
        },

        plataform:()=>{
            const geometry = new THREE.PlaneGeometry(5,5);
            const material = new THREE.MeshStandardMaterial({color:'#eae8e0',reflectivity:0,fog:0});
            const plataform = new THREE.Mesh(geometry,material);
            plataform.rotateX(-Math.PI * 90 / 180)
            plataform.position.set(0,-0.5,0);
            plataform.receiveShadow = true;
            return plataform
        },

        ambientLight:()=>{
            return new THREE.AmbientLight(0x404040,3);
        },

        pointLight:()=>{
            const light = new THREE.PointLight('#68f0c1',0.5,100);
            light.position.set(-15,40,15);
            light.castShadow = true;
            return light
        }
    }


    let Animate =()=>{
        camera.updateProjectionMatrix();
        requestAnimationFrame(Animate);
        renderer.render(scene,camera);
        controls.update();
    }

    return(
            <canvas ref={canvas} id='canvas'/>
    )
}

export default Canvas;
