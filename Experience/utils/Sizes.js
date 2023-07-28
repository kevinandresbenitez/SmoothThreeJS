export class Sizes{
    static width = window.innerWidth;
    static height = window.innerHeight;
    static aspect = (Sizes.width/Sizes.height);
    
    static updateSizes = ()=>{
        Sizes.width = window.innerWidth;
        Sizes.height = window.innerHeight;
        Sizes.aspect = (Sizes.width/Sizes.height);
    };
}