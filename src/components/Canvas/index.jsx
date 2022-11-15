import {Component, createRef} from 'react'
import * as THREE from 'three';
import Camera from './Camera';
import Sizes from '../../Utils/Sizes.js';
import Renderer from './Renderer'
import Elements from './Word/Elements';
import Light from './Word/Light'
import {OrbitControls} from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

class Canvas extends Component{
    
    static instance;
    constructor(props){
        super(props);

        // If is instance sent this
        if(Canvas.instance){
            return Canvas.instance
        }
        Canvas.instance = this;
        this.canvas = createRef();
        
    }

    componentDidMount(){
        this.sizes = new Sizes();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.elements = new Elements();
        this.lights = new Light();
        
        // Helpers
        this.controls = new OrbitControls(this.camera.orthograpicCamera,this.canvas.current)
        
        this.renderer = new Renderer();
        
    }



    // useEffect(()=>{
    //     setDefaultValues();

    //     // Load elements and animate
    //     addElement(createElement.cube());
    //     addElement(createElement.plataform());
    //     addElement(createElement.ambientLight());
    //     addElement(createElement.pointLight());
    //     Animate();

    //     // Add resize metod
    //     window.addEventListener('resize',resize)
    // },[])

    // let setDefaultValues = ()=>{
    //     // Init renderer
    //     renderer = new THREE.WebGLRenderer({canvas:canvas.current})
    //     renderer.setSize(window.innerWidth,window.innerHeight);
    //     renderer.setClearColor('#c7e4d2');
    //     renderer.shadowMap.enabled = true;


    //     // Adding orbital control
    //     controls= new OrbitControls( camera, renderer.domElement );
    //     controls.update();
    // }

    // let addElement = (element)=>{
    //     scene.add(element);
    //     elements.push(element)
    // }

    // let createElement = {
    //     cube:()=>{
    //         const geometry = new THREE.BoxGeometry(1,1,1);
    //         const material = new THREE.MeshStandardMaterial({color:'#e0cfcd',fog:true,roughness:0.7});
    //         const cube = new THREE.Mesh(geometry,material);
    //         cube.castShadow = true;
    //         return cube
    //     },

    //     plataform:()=>{
    //         const geometry = new THREE.PlaneGeometry(2,2);
    //         const material = new THREE.MeshStandardMaterial({color:'#eae8e0'});
    //         const plataform = new THREE.Mesh(geometry,material);
    //         plataform.rotateX(-Math.PI * 90 / 180)
    //         plataform.position.set(0,-0.5,0);
    //         plataform.receiveShadow = true;
    //         return plataform
    //     },

    //     ambientLight:()=>{
    //         return new THREE.AmbientLight(0x404040,3);
    //     },

    //     pointLight:()=>{
    //         const light = new THREE.PointLight('#68f0c1',0.5,100);
    //         light.position.set(-15,40,15);
    //         light.castShadow = true;
    //         return light
    //     }
    // }

    // let resize =()=>{
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize( window.innerWidth, window.innerHeight);
    // }

    // let Animate =()=>{
    //     camera.updateProjectionMatrix();
    //     requestAnimationFrame(Animate);
    //     renderer.render(scene,camera);
    //     controls.update();
    // }

    render(){
        return(
            <canvas ref={this.canvas} id='canvas'/>
        )
    }
}

export default Canvas;
