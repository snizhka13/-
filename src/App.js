import React, { useState, useEffect } from "react";
import First from "./components/First.js";
import Main from "./components/Main.js";
import Auth from "./components/Auth.js";
import "./App.css";
import image1 from "./images/lamp1.png"
import image2 from "./images/lamp2.PNG";
import image3 from "./images/lamp3.png";
import image4 from "./images/lamp4.PNG";

export default function App() {
   
    const [foundBook, setFoundBook] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUserData(JSON.parse(savedUser));
        }
    }, []);

    async function handleSearch(author, bookTitle) {
        const trimmedAuthor = author.trim();
        const trimmedBookTitle = bookTitle.trim();
    
        try {
            const response = await fetch(
                `http://localhost:5000/books?author=${encodeURIComponent(trimmedAuthor)}&title=${encodeURIComponent(trimmedBookTitle)}`
            );
            const book = await response.json();
            setFoundBook(book);
        } catch (error) {
            console.error("Помилка при запиті до сервера:", error);
            setFoundBook(null);
        }
    }
    
    
    const [buttonState, onOff] = React.useState(false)

    let lamp1, lamp2, back_color;
    if(buttonState){
        back_color = "#080301";
        lamp1 = image1;
        lamp2 = image2;
    }else{
        back_color = "rgb(254 254, 248)";
        lamp1 = image3;
        lamp2 = image4;
    }

    useEffect(() => {
        document.body.style.backgroundColor = back_color;
    }, [back_color]);

    return (
        <div>
            <Auth setUserData={setUserData} className="auth"/>
            <img id="lamp1" src={lamp1} alt="lamp1" />
            <First onSearch={handleSearch} buttonState={buttonState} setButtonState={onOff} />
            
            {foundBook ? (
                <Main 
                    key={foundBook.title}
                    item={foundBook}
                    userData={userData} 
                    {...foundBook}
                />
            ) : (<p style={{textAlign: "center"}}>No book found..</p>)
            }

            <img id="lamp2" src={lamp2} alt="lamp2" />
        </div>
    );
}

