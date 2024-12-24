const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.getAll();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách tài liệu', details: error.message });
    }
};
