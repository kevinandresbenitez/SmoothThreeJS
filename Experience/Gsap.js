import Experience  from "./Experience";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sizes } from "./utils/Sizes";
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger);

export class Gsap{
    mainExperience;

    constructor(){
        this.mainExperience = new Experience();
    }

    addScrollAnimation(){
        const SceneModel = this.mainExperience.resources.scene_Model.scene;
        const Camera = this.mainExperience.camera.getMainCamera();
        
        gsap.to(SceneModel.position,{
            x:()=>{return Sizes.aspect * 1.2},
            scrollTrigger:{
                trigger:'.second_section',
                start:'-100% center',
                end:'center center',
                scrub:true,
                markers:true
            }
            ,onComplete:()=>{                
                gsap.to(SceneModel.position,{
                    x:()=>{return Sizes.aspect * -0.5},
                    z:()=>{return Sizes.aspect * 0.5},
                    scrollTrigger:{
                        trigger:'.third_section',
                        start:'-120% center',
                        end:'center center',
                        scrub:true,
                        markers:true
                    }
                })
                                
                gsap.to(SceneModel.scale,{
                    // x:0.19,y:0.19,z:0.19,
                    x:()=>{return Sizes.aspect * 0.1},
                    z:()=>{return Sizes.aspect * 0.1},
                    y:()=>{return Sizes.aspect * 0.1},
                    // onUpdate:()=>{
                    //     Camera.lookAt(5,5,5)
                    // },
                    scrollTrigger:{
                        trigger:'.third_section',
                        start:'-120% center',
                        end:'center center',
                        scrub:true,
                        markers:true
                    }
                })

            }
        })
        


    }

    addMediaQuerysScene(){
        if(!this.mainExperience.resources.scene_Model){
            console.warn('models not are loaded for mediaQuerys')
        }
        const model =this.mainExperience.resources.scene_main;
        const matchMadia = new gsap.matchMedia();

        matchMadia.add("(max-width:900px)",()=>{
                model.scale.set(0.08,0.08,0.08)
            }
        )

    //     matchMadia.add("(max-width:900px)",()=>{
    //         model.scale.set(0.09,0.09,0.09)
    //     }
    // )

    }

}