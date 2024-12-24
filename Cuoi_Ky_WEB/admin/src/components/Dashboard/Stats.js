import React from 'react';
import '../../styles/dashboard.scss';

const Stats = ({ stats }) => {
  return (
    <div className="stats">
      <div className="stat">
        <h3>Tài liệu</h3>
        <p>{stats.totalDocuments}</p>
      </div>
      <div className="stat">
        <h3>Người dùng</h3>
        <p>{stats.totalUsers}</p>
      </div>
      <div className="stat">
        <h3>Môn học</h3>
        <p>{stats.totalSubjects}</p>
      </div>
      <div className="stat">
        <h3>File đã duyệt</h3>
        <p>{stats.approvedDocuments}</p>
      </div>
      <div className="stat">
        <h3>File chưa duyệt</h3>
        <p>{stats.unapprovedDocuments}</p>
      </div>
    </div>
  );
};

export default Stats;
