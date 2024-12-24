import React, { useState, useEffect } from "react";
import { getAllDocuments } from "../../services/api";
import Sidebar from "../Dashboard/Sidebar";
import "../../styles/documents.scss";

const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [searchQueryTitle, setSearchQueryTitle] = useState("");
  const [searchQuerySubject, setSearchQuerySubject] = useState("");
  const [sortedDocuments, setSortedDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10; // Số tài liệu trên mỗi trang

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data } = await getAllDocuments();
      setDocuments(data);
      setSortedDocuments(data);
    };
    fetchDocuments();
  }, []);

  const handleSearchByTitle = () => {
    const filteredDocuments = documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchQueryTitle.toLowerCase())
    );
    setSortedDocuments(filteredDocuments);
    setCurrentPage(1); // Reset trang hiện tại
  };

  const handleSearchBySubject = () => {
    const filteredDocuments = documents.filter((doc) =>
      doc.subject_name.toLowerCase().includes(searchQuerySubject.toLowerCase())
    );
    setSortedDocuments(filteredDocuments);
    setCurrentPage(1); // Reset trang hiện tại
  };

  const handleSortBySubject = () => {
    const sorted = [...sortedDocuments].sort((a, b) =>
      a.subject_name.localeCompare(b.subject_name)
    );
    setSortedDocuments(sorted);
  };

  // Tính toán tài liệu hiện tại
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = sortedDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  // Tạo nút phân trang
  const totalPages = Math.ceil(sortedDocuments.length / documentsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="documents">
      <Sidebar />
      <div className="main-content">
        <h1>Danh sách tài liệu</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên tài liệu"
            value={searchQueryTitle}
            onChange={(e) => setSearchQueryTitle(e.target.value)}
          />
          <button onClick={handleSearchByTitle}>Tìm kiếm</button>

          <input
            type="text"
            placeholder="Tìm kiếm theo môn học"
            value={searchQuerySubject}
            onChange={(e) => setSearchQuerySubject(e.target.value)}
          />
          <button onClick={handleSearchBySubject}>Tìm kiếm</button>

          <button onClick={handleSortBySubject}>Sắp xếp theo môn học</button>
        </div>

        <table className="documents-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên tài liệu</th>
              <th>Môn học</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc, index) => (
              <tr key={doc.id}>
                <td>{indexOfFirstDocument + index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.subject_name}</td>
                <td>{doc.is_approved ? "Đã duyệt" : "Chưa duyệt"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;
