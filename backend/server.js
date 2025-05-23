import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/bookdb", {
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

app.get("/books", async (req, res) => {
  const { author, title } = req.query;

  const query = {};
  if (author) query.author = new RegExp(`^${author}$`, "i");
  if (title) query.title = new RegExp(`^${title}$`, "i");

  try {
    const book = await Book.findOne(query);
    res.json(book || null);
  } catch (err) {
    res.status(500).json({ error: "Помилка при запиті до бази" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

app.post("/books/:id/comments", async (req, res) => {
  const bookId = req.params.id;
  const comment = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $push: { comments: comment } },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    console.error("Помилка при додаванні коментаря:", error);
    res.status(500).json({ error: "Не вдалося додати коментар" });
  }
});
