import Experience from "./Experience";
export class WindowEvents{
    mainExperience:Experience;
    eventsArray:EventListener[]= [];

    constructor(){
        this.mainExperience = new Experience();
    }

    add(eventName:string,callback:EventListener){
        if (!(eventName in window)) {
            return false;
        }

        window.addEventListener(eventName,callback);
        this.eventsArray.push(callback);
    }

    remove(eventName:string,callback:EventListener){
        if (!(eventName in window)) {
            return false;
        }
        
        window.removeEventListener(eventName,callback);
        this.eventsArray  = this.eventsArray.filter((event)=>event !== callback);
    }
}