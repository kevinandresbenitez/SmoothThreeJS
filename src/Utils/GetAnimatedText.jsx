export default function GetAnimatedText(text,class_letter){
    let splitText = text.split(' ');

    let words = splitText.map((word,key)=>{
        
        let word_animated =[];

        for(let letter of word){
            word_animated.push(<span className={class_letter}>{letter}</span>);
        }

        return(
            <div key={key} className={'word__container'}>
                {word_animated.map((obj)=>{return obj})}
            </div>
        )
        
    })
    
    console.log(words)

    return(
        <div className={'words__container'}>
            {words.map((obj,key)=>{
                return (obj)
            })}
        </div>
    )
}