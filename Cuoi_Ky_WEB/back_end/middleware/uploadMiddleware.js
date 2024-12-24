const fs = require('fs');
const path = require('path');
const multer = require('multer'); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir); 
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
        'application/x-zip-compressed', 
        'application/vnd.rar' 
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed: PDF, DOC, DOCX, PPT, PPTX, ZIP, RAR.'));
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } 
});

module.exports = upload;
