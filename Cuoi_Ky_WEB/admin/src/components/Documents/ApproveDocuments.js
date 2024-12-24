import React, { useEffect, useState } from "react";
import { getUnapprovedDocuments, approveDocument } from "../../services/api";
import Sidebar from "../Dashboard/Sidebar";
import "../../styles/documents.scss";

const ApproveDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10; 

  useEffect(() => {
    const fetchUnapprovedDocuments = async () => {
      const { data } = await getUnapprovedDocuments();
      setDocuments(data);
    };
    fetchUnapprovedDocuments();
  }, []);

  const handleApprove = async (id, status) => {
    try {
      await approveDocument(id, status);
      setDocuments(documents.filter((doc) => doc.id !== id));
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const totalPages = Math.ceil(documents.length / documentsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="documents">
      <Sidebar />
      <div className="main-content">
        <h1>Phê duyệt tài liệu</h1>
        <table className="documents-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên tài liệu</th>
              <th>Tên file</th>
              <th>Đuôi file</th>
              <th>Môn học</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc, index) => (
              <tr key={doc.id}>
                <td>{indexOfFirstDocument + index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.file_name}</td>
                <td>{doc.file_type}</td>
                <td>{doc.subject_name}</td>
                <td>
                  <button onClick={() => handleApprove(doc.id, "approved")}>
                    Duyệt
                  </button>
                  <button onClick={() => handleApprove(doc.id, "rejected")}>
                    Từ chối
                  </button>
                </td>
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

export default ApproveDocuments;
