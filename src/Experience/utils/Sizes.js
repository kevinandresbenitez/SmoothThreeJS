export class Sizes{
    static width = window.innerWidth;
    static height = window.innerHeight;
    static aspect = (Sizes.width/Sizes.height);
    static pixelRatio = Math.min(window.devicePixelRatio,2);
    static frustrum = 5;
    
    static updateSizes = ()=>{
        Sizes.width = window.innerWidth;
        Sizes.height = window.innerHeight;
        Sizes.aspect = (Sizes.width/Sizes.height);
        Sizes.pixelRatio = Math.min(window.devicePixelRatio,2);
    };
}