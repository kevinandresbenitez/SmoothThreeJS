import Experience from "./Experience/Experience";

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
function createPageLoader(){
    let containerPageLoader = document.createElement('div');
    containerPageLoader.classList.add('pageloader-container');
    let spanElement = document.createElement('span');
    spanElement.classList.add('loader');
    containerPageLoader.appendChild(spanElement);
    document.body.appendChild(containerPageLoader);
}
createPageLoader();