import { Router } from "express";
import {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} from "./library.service.js";

export const router = Router();

// Server route to send books as JSON
router.get('/books', async (req, res) => {
  try {
    const books = await getBooks();  // Fetch data from the database
    res.setHeader('Content-Type', 'application/json');  // Ensure the response is JSON
    res.json(books);  // Send books as JSON response
  } catch (error) {
    console.error("Error:", error);  // Log the error
    res.status(500).json({ message: "Internal Server Error" });  // Return error message as JSON
  }
});

// เพิ่มหนังสือใหม่
router.post('/books', async (req, res) => {
  const { bookname, price, description } = req.body;

  if (!bookname || !price || !description) {
    return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
  }

  try {
    await createBook( bookname, price, description);
    res.status(201).json({ message: 'เพิ่มหนังสือสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ทดสอบ
router.get("/test", (req, res) => {
  res.json([
    { id: 1, title: "Book A" },
    { id: 2, title: "Book B" }
  ]);
});

// อัปเดตข้อมูลหนังสือ
router.patch('/books/:id', async (req, res) => {
  const { bookname, price, description } = req.body;

  if (!bookname || !price || !description) {
    return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
  }

  try {
    const result = await updateBook(req.params.id, bookname, price, description);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบหนังสือ' });
    }
    res.json({ message: 'อัปเดตหนังสือสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ลบหนังสือ
router.delete('/books/:id', async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบหนังสือ' });
    }
    res.json({ message: 'ลบหนังสือสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
