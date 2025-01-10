import Experience  from "./Experience";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sizes } from "./utils/Sizes";
import SmoothScroll from "./utils/SmoothScroll";

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
         const model =this.mainExperience.resources.scene_main;
         const matchMadia = gsap.matchMedia();



         matchMadia.add("(max-width:900px)",()=>{
             model.scale.set(0.07,0.07,0.07)
         }
        )

    }

    setAnimationMouseMove(){
        const mouseMove=(event:any)=>{
            let rotation =(((event.clientX - Sizes.width / 2)*2) / Sizes.width)/10;
            this.mainExperience.resources.scene_main.rotation.y = rotation
        }
        this.mainExperience.windowEvents.add("mousemove",mouseMove);
    }

    async startFirstAnimation():Promise<Boolean>{
        const scene = this.mainExperience.resources.scene_main;
        const Cube = this.mainExperience.resources.scene_items.Cube;
        
        return new Promise((resolve,reject)=>{

            const tl = gsap.timeline();


            tl.to(scene.position,{x:-1.3,duration:1,delay:1});


            tl.from(".text_animated",{opacity:0,duration:0.3,y:-20,ease: "power3.out", stagger: 0.05 });
            tl.to(".text_animated",{opacity:0,duration:0.3,delay:0.5,y:20,ease: "power3.out", stagger: 0.05 });

            tl.to(scene.position,{duration:0.3,onComplete:()=>{
                gsap.to(scene.position,{x:0,y:-0.5,duration:1});
                gsap.to(scene.scale,{x:0.11,z:0.11,y:0.11,duration:1});

                this.mainExperience.curvesCamera.startCamerasAnimations().then((cameraAnimationEnd)=>{
                    gsap.to(Cube.scale,{x:0,z:0,y:0,duration:1});
                    resolve(true);
                })
                
            }})

        })
        
      
        
    }

    async inicializeAnimations(){
        this.addMediaQuerysScene();

        const firstAnimationEnd = await this.startFirstAnimation();

        if(firstAnimationEnd){
            this.setAnimationMouseMove();
            this.addScrollAnimation();
            SmoothScroll.enableSmooth();
            // Animate text
            gsap.to(".tools",{opacity:1,delay:0.5 ,duration:1,y:-20,ease: "power3.out"});
            gsap.to(".info",{opacity:1,delay:0.5 , duration:1,x:-20,ease: "power3.out"});
            
            
        }
    }
}