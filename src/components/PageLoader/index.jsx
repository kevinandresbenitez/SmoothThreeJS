import {useEffect,useRef,useState} from 'react';

function PageLoader(){

    const [isPageLoaded,setPageLoaded] = useState(false);
    const pageLoaderDom = useRef();

    useEffect(()=>{
        // On load set animation for dissmis and delete 
        window.addEventListener('load',()=>{
            setPageLoaded(true);
            setTimeout(()=>{
                pageLoaderDom.current.style.display ='none'
            },1000)
        })
    },[])

    return(
        <div ref={pageLoaderDom} className={`pageloader-container ${!isPageLoaded || 'hidde-pageloader'}`}>
            <span className="loader"></span>
        </div>
    )
}




export default PageLoader