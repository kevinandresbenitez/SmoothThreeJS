import Experience from "./Experience";
export class WindowEvents{
    mainExperience;
    eventsArray = [];

    constructor(){
        this.mainExperience = new Experience();
    }

    add(eventName,callback){
        if(!('on'+ eventName in window)){
            return false
        }

        window.addEventListener(eventName,callback);
        this.eventsArray.push(callback);
    }

    remove(callback){
        if(!('on'+ eventName in window)){
            return false
        }
        
        window.removeEventListener(callback);
        this.eventsArray  = this.eventsArray.filter((event)=>event !== callback);
    }
}