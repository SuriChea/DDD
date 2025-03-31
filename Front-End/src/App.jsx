import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

function BookList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, [data]); 

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then(() => {
        setData(data.filter((book) => book.book_id !== id));
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  return (
    <div>
      <h1>Book List</h1>
      <div className="center-container">
        <button onClick={() => navigate("/add")} style={{ marginBottom: "10px" }}>
          Add
        </button>
      </div>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((book) => (
              <tr key={book.book_id}>
                <td>{book.bookname}</td>
                <td>${book.price}</td>
                <td>{book.description}</td>
                <td>
                  <button onClick={() => handleDelete(book.book_id)} style={{ margin: "5px" }}>
                    Delete
                  </button>
                  <button onClick={() => navigate(`/edit/${book.book_id}`)} style={{ margin: "5px" }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No books found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function AddBook() {
  const [newBook, setNewBook] = useState({
    bookname: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!newBook.bookname || !newBook.price || !newBook.description) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    axios
      .post("http://localhost:8000/books", newBook)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล"));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // จัดให้อยู่กลางแนวนอน
        alignItems: "center", // จัดให้อยู่กลางแนวตั้ง
        height: "100vh", // ให้พื้นที่ครอบคลุมทั้งหน้าจอ
        textAlign: "center", // จัดข้อความให้อยู่กลาง
      }}
    >
      <div style={{ width: "400px" }}>
        <h1>Add Book</h1>

        <input
          type="text"
          placeholder="Book Name"
          value={newBook.bookname}
          onChange={(e) => setNewBook({ ...newBook, bookname: e.target.value })}
          style={{
            marginBottom: "10px",
            display: "block",
            width: "100%", // ขยายให้เต็มความกว้าง
            padding: "10px", // เพิ่มพื้นที่ภายใน
            fontSize: "16px", // ขยายขนาดตัวอักษร
            boxSizing: "border-box", // ทำให้ขนาดช่อง input คำนวณรวมกับ padding
          }}
        />

        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          style={{
            marginBottom: "10px",
            display: "block",
            width: "100%", // ขยายให้เต็มความกว้าง
            padding: "10px", // เพิ่มพื้นที่ภายใน
            fontSize: "16px", // ขยายขนาดตัวอักษร
            boxSizing: "border-box", // ทำให้ขนาดช่อง input คำนวณรวมกับ padding
          }}
        />

        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
          style={{
            marginBottom: "10px",
            display: "block",
            width: "100%", // ขยายให้เต็มความกว้าง
            padding: "10px", // เพิ่มพื้นที่ภายใน
            fontSize: "16px", // ขยายขนาดตัวอักษร
            boxSizing: "border-box", // ทำให้ขนาดช่อง input คำนวณรวมกับ padding
          }}
        />

        <button
          onClick={handleAdd}
          style={{
            marginRight: "10px",
            padding: "10px 20px", // ขยายปุ่มให้ใหญ่ขึ้น
            fontSize: "16px", // ขยายขนาดตัวอักษร
            cursor: "pointer", // ทำให้ปุ่มคลิกได้
            width: "100%", // ทำให้ปุ่มขยายเต็มความกว้าง
          }}
        >
          Add Book
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px", // ขยายปุ่มให้ใหญ่ขึ้น
            fontSize: "16px", // ขยายขนาดตัวอักษร
            cursor: "pointer", // ทำให้ปุ่มคลิกได้
            width: "100%", // ทำให้ปุ่มขยายเต็มความกว้าง
            marginTop: "10px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function EditBook() {
  const { id } = useParams();
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setEditingBook(response.data);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]); // Keep id in the dependency array to reload when id changes

  if (!editingBook) return <p>Loading...</p>;

  const handleSaveEdit = () => {
    if (
      !editingBook.bookname ||
      !editingBook.price ||
      !editingBook.description
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    axios
      .patch(`http://localhost:8000/books/${id}`, editingBook)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล"));
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <input
        type="text"
        value={editingBook.bookname}
        onChange={(e) =>
          setEditingBook({ ...editingBook, bookname: e.target.value })
        }
      />
      <input
        type="number"
        value={editingBook.price}
        onChange={(e) =>
          setEditingBook({ ...editingBook, price: e.target.value })
        }
      />
      <textarea
        value={editingBook.description}
        onChange={(e) =>
          setEditingBook({ ...editingBook, description: e.target.value })
        }
      />
      <button onClick={handleSaveEdit}>Save Changes</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Book</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
