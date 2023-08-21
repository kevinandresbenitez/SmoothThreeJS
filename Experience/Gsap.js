import Experience  from "./Experience";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sizes } from "./utils/Sizes";

gsap.registerPlugin(ScrollTrigger);

export class Gsap{
    mainExperience;

    constructor(){
        this.mainExperience = new Experience();
    }

    addScrollAnimation(){
        const SceneModel = this.mainExperience.resources.scene_Model.scene;

        gsap.to(SceneModel.position,{
            x:()=>{return Sizes.aspect * 1.2},
            scrollTrigger:{
                trigger:'.second_section',
                start:'-100% center',
                end:'center center',
                scrub:true,
                markers:true
            }
        })

    }

}