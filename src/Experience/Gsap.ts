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
        const Camera = this.mainExperience.camera.getMainCamera();


        gsap.to(Camera.position,{
            x:()=>{return Sizes.aspect * -1.2},
            scrollTrigger:{
                trigger:'.second_section',
                start:'-100% center',
                end:'center center',
                scrub:true,
                markers:false
            }
            ,onComplete:()=>{                
                gsap.to(Camera.position,{
                    x:()=>{return Sizes.aspect * 0.08},
                    scrollTrigger:{
                        trigger:'.third_section',
                        start:'-120% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
                })

                gsap.to(Camera,{
                    zoom:()=>{return Sizes.aspect * 1.2},
                    scrollTrigger:{
                        trigger:'.third_section',
                        start:'-120% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
                })

                gsap.to(Camera.position,{
                    z:()=>{return Sizes.aspect * 4.2},
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
                })


            }
        })
        

        const itemsAnimation = this.mainExperience.resources.scene_items;
        
        gsap.to(itemsAnimation.Mini_Floor.position,{
                    x: -5.440549850463867,
                    z:13.613499641418457,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'-20% center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.Mailbox.position,{
                    y: -0.6809930801391602,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-45% center',
                        end:'-10% center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.FloorFirst.scale,{
                    x:1,
                    y:1,
                    z:1,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.FloorSecond.scale,{
                    x:1,
                    y:1,
                    z:1,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.FloorThird.scale,{
                    x:1,
                    y:1,
                    z:1,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.Flower1.scale,{
                    x:1,
                    y:1,
                    z:1,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.Flower2.scale,{
                    x:1,
                    y:1,
                    z:1,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
        });
        gsap.to(itemsAnimation.Lamp.scale,{
                    x:1,
                    y:1,
                    z:1,
                    scrollTrigger:{
                        trigger:'.fourd_section',
                        start:'-50% center',
                        end:'center center',
                        scrub:true,
                        markers:false
                    }
        });
    }

    addMediaQuerysScene(){
        if(!this.mainExperience.resources.scene_Model){
            console.warn('models not are loaded for mediaQuerys')
        }
        // const model =this.mainExperience.resources.scene_main;
        // const matchMadia = new gsap.matchMedia();



    //     matchMadia.add("(max-width:900px)",()=>{
    //         model.scale.set(0.09,0.09,0.09)
    //     }
    // )

    }

}