  import mongoose from "mongoose";
  import fetch from "node-fetch";

 
  const MONGO_URI = "mongodb://localhost:27017/bookdb"; // Заміни на свій URI
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  
  const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    comments: [
      {
        text: String,
        email: String,
        picture: String,
      },
    ],
  });

  const Book = mongoose.model("Book", bookSchema);

  const API_URL = "https://fakerapi.it/api/v1/books?_locale=en_US&_quantity=100";

  async function fetchBooks() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const formattedData = data.data.map(book => ({
        title: book.title,
        author: book.author,
        comments: [],
      }));

      await Book.deleteMany({});
      
      await Book.insertMany(formattedData);

      console.log("Книги успішно збережені в MongoDB!");
      mongoose.connection.close();
    } catch (error) {
      console.error("Помилка при збереженні даних:", error);
    }
  }

  fetchBooks();
