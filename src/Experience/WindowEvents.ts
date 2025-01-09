import Experience from "./Experience";
export class WindowEvents{
    mainExperience:Experience;
    eventsArray:EventListener[]= [];

    constructor(){
        this.mainExperience = new Experience();
    }

    add(eventName:string,callback:EventListener){
        window.addEventListener(eventName,callback);
        this.eventsArray.push(callback);
    }

    remove(eventName:string,callback:EventListener){
        window.removeEventListener(eventName,callback);
        this.eventsArray  = this.eventsArray.filter((event)=>event !== callback);
    }
}