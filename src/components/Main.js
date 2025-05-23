import React, { useEffect } from 'react';
import Stars from "./Stars.js";
import { GrSend } from "react-icons/gr";

export default function Main({ item, userData }) {
  const [things, setThings] = React.useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`http://localhost:5000/books?author=${encodeURIComponent(item.author)}&title=${encodeURIComponent(item.title)}`);
        const data = await response.json();
        if (data && data.comments) {
          setThings(data.comments);
        }
      } catch (err) {
        console.error("Помилка при отриманні коментарів:", err);
      }
    }

    fetchComments();
  }, [item]);

  async function addItem() {
    const newThingText = document.getElementById("input").value.trim();

    if (!newThingText) {
      alert("Коментар не може бути порожнім!");
      return;
    }

    if (!userData) {
      alert("Спочатку авторизуйтесь, щоб залишити відгук!");
      return;
    }

    const newComment = {
      text: newThingText,
      email: userData.email,
      picture: userData.picture,
    };

    try {
      const response = await fetch(`http://localhost:5000/books/${item._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) throw new Error("Запит не вдалий");

      const updatedBook = await response.json();
      setThings(updatedBook.comments);
      document.getElementById("input").value = "";
    } catch (err) {
      console.error("Помилка при додаванні коментаря:", err);
    }
  }

 const thingsElements = things.map((thing, index) => (
    <div key={index} className='comment-item'>
      <div className='user-data'>
        <img src={thing.picture} alt="User" className="avatar" />
        <p className="email">{thing.email}</p>
      </div>
      <div><p className="comment-style">{thing.text}</p></div>
    </div>
  ));

  return (
    <div className="container2">
        <div className="container3">
            <img src="https://i.pinimg.com/564x/57/61/58/576158dcd192d30466c0bea6538cb191.jpg" className="book-image"/>
            <div className="overlay">
                <div className="container5">
                <div className='text'>
                <h3 id="title">{item.title}</h3>
                <h3 id="author">{item.author}</h3>
                </div>
                <Stars/>
                </div>
           </div>
        </div>
        <div className="scrollable">
            <div className="input_button">
              <input id="input" placeholder='залиш свої думки тут..' style={{fontFamily: "Montserrat Alternates"}}/>
              <button onClick={addItem}>
                <GrSend />
              </button>
            </div>
            
            <div className="comments">{thingsElements}</div>
         </div>
    </div>
  );
}
