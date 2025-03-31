import { query } from "../db.js";

// ดึงข้อมูลหนังสือทั้งหมด
export const getBooks = async () => {
  return await query("SELECT book_id, bookname, price, description FROM book");
};

// เพิ่มหนังสือใหม่
export const createBook = async (bookname, price, description) => {
  return await query(
    "INSERT INTO book ( bookname, price, description) VALUES ( ?, ?, ?)",
    [ bookname, price, description]
  );
};

// อัปเดตข้อมูลหนังสือ
export const updateBook = async (book_id, bookname, price, description) => {
  return await query(
    "UPDATE book SET bookname = ?, price = ?, description = ? WHERE book_id = ?",
    [bookname, price, description, book_id]
  );
};

// ลบหนังสือ
export const deleteBook = async (book_id) => {
  return await query("DELETE FROM book WHERE book_id = ?", [book_id]);
};

export const getData = async () => {
  try {
    const results = await query('SELECT book_id, bookname, price, description FROM book');
    return results;
  } catch (err) {
    throw err;
  }
};