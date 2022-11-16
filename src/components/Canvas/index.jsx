import {Component, createRef} from 'react'
import * as THREE from 'three';
import Camera from './Camera';
import Sizes from '../../Utils/Sizes.js';
import Renderer from './Renderer'
import Elements from './Word/Elements';
import Light from './Word/Light'

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
        this.renderer = new Renderer();
        
    }



    render(){
        return(
            <canvas ref={this.canvas} id='canvas'/>
        )
    }
}

export default Canvas;
