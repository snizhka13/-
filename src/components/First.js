import React, { useState } from "react";

export default function First({ onSearch, buttonState, setButtonState }) {
    const [author, setAuthor] = useState("");
    const [bookTitle, setBookTitle] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(author, bookTitle);
        setButtonState(true);  
    
        setTimeout(() => {
            scrollDown();
        }, 100);
    }

    let color, color1;
    if(buttonState){
        color = "#fdf5e6";
        color1 = '#080301';
    }else{
        color = '#080301';
        color1 = "#fdf5e6";
    }

    const scrollDown = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="container">
             <div className="message"><h1 style={{fontSize: "50px"}}>Читослід</h1></div>
            <div className="message"><h3>..мудрість книги — мов світло в дорозі.. відгукнись на ту, що освітлює твій шлях..</h3></div>
            <div className="container1">
                <form onSubmit={handleSubmit}>
                    <input 
                            type="text" 
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)} 
                            placeholder="автор" 
                            style={{color: "#fdf5e6", fontFamily: "Montserrat Alternates"}}
                    />
                    <input 
                            type="text" 
                            value={bookTitle} 
                            onChange={(e) => setBookTitle(e.target.value)} 
                            placeholder="назва" 
                            style={{color: "#fdf5e6", fontFamily: "Montserrat Alternates"}}
                    />
                    <button type="submit" style={{backgroundColor: color, color: color1, fontFamily: "Montserrat Alternates"}}>знайти</button>
                </form>
            </div>
            </div>
        </div>
    );
}
