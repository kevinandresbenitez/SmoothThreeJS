import Experience from "./Experience/Experience";
import './public/Normalice/index.css'
import './public/pageLoader.css'
import './public/Stiky.css'
import './public/style.css'

// Experience
let experience = new Experience(document.getElementById('experience__canvas'));
experience.run();
experience.onLoad = removePageLoader;
// Experience

function removePageLoader(){
    let pageLoader = document.querySelector('.pageloader-container');
    pageLoader.classList.add('hidde-pageloader');
    setTimeout(()=>{
        document.body.removeChild(document.querySelector('.pageloader-container'));
    },200);
    
}
