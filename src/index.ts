import Experience from "./Experience/Experience";
import './public/Normalice/index.css'
import './public/Stiky.css'
import './public/style.css'

// Experience
const CanvasHtml:HTMLElement | null = document.getElementById('experience__canvas');
if(!CanvasHtml || !(CanvasHtml instanceof HTMLCanvasElement)){
    throw Error("Canvas not found");
}

let experience = new Experience(CanvasHtml);
experience.run();
experience.onLoad = removePageLoader;
// Experience

function removePageLoader(){
    let pageLoader = document.querySelector('.pageloader-container');

    if(!pageLoader){
        throw Error("Paga loader not fonund");
    }

    pageLoader.classList.add('hidde-pageloader');
    setTimeout(()=>{
        document.body.removeChild(pageLoader);
    },200);

    
}
