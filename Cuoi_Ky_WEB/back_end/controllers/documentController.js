const path = require("path"); // Import module path
const Document = require("../models/Document");
const fs = require('fs');

const documentController = {
  uploadDocument: async (req, res) => {
    const { title, description, subject_id } = req.body;
    const uploaded_by = req.user.id;
    const file = req.file;

    if (!title || !subject_id) {
      return res
        .status(400)
        .json({ message: "Title and Subject ID are required" });
    }
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const file_name = file.filename;
      const file_type = path.extname(file.originalname);
      const [result] = await Document.create({
        title,
        description: description || "", 
        file_name,
        file_type,
        subject_id,
        uploaded_by,
      });

      res
        .status(200)
        .json({ message: "Document uploaded successfully", result });
    } catch (error) {
      console.error("Error uploading document:", error);
      res.status(500).json({ message: "Error uploading document", error });
    }
  },

  getAllDocuments: async (req, res) => {
    try {
      const documents = await Document.getAll();
      res.status(200).json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error); 
      res.status(500).json({ message: "Error fetching documents", error });
    }
  },

  getDocumentsBySubject: async (req, res) => {
    const { subject_id } = req.params;
    try {
      const documents = await Document.getBySubject(subject_id);
      res.status(200).json(documents);
    } catch (error) {
      console.error("Error fetching documents by subject:", error); 
      res
        .status(500)
        .json({ message: "Error fetching documents by subject", error });
    }
  },
  downloadDocument: async (req, res) => {
    const { id } = req.params;
  
    try {
      const [document] = await db.query("SELECT * FROM documents WHERE id = ?", [
        id,
      ]);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const filePath = path.resolve(__dirname, "../uploads", document.file_name);
      if (fs.existsSync(filePath)) {
        return res.download(filePath); 
      } else {
        return res.status(404).json({ message: "File not found on server" });
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      res.status(500).json({ message: "Error downloading document", error });
    }
  }
};


module.exports = documentController;