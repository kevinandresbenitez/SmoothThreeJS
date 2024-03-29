import Lenis from "@studio-freight/lenis"


export default class SmoothScroll{
    static enableSmooth(){
        const lenis = new Lenis()        
        function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }

    static disableWindowScroll(){
        document.body.style.overflow='hidden';
    }

    static enableWindowScroll(){
        document.body.style.overflowY = 'scroll';
    }
}