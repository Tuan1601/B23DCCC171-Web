const db = require('../config/db'); 
exports.getStats = async (req, res) => {
    try {
        const totalDocumentsResult = await db.query('SELECT COUNT(*) AS totalDocuments FROM documents');
        console.log('Total Documents:', totalDocumentsResult); 
        const totalDocuments = totalDocumentsResult[0][0].totalDocuments;

        const unapprovedDocumentsResult = await db.query('SELECT COUNT(*) AS unapprovedDocuments FROM documents WHERE is_approved = 0');
        console.log('Unapproved Documents:', unapprovedDocumentsResult); 
        const unapprovedDocuments = unapprovedDocumentsResult[0][0].unapprovedDocuments;

        const approvedDocumentsResult = await db.query('SELECT COUNT(*) AS approvedDocuments FROM documents WHERE is_approved = 1');
        console.log('Approved Documents:', approvedDocumentsResult); 
        const approvedDocuments = approvedDocumentsResult[0][0].approvedDocuments;

        const totalUsersResult = await db.query('SELECT COUNT(*) AS totalUsers FROM users');
        console.log('Total Users:', totalUsersResult); 
        const totalUsers = totalUsersResult[0][0].totalUsers;

        const totalSubjectsResult = await db.query('SELECT COUNT(*) AS totalSubjects FROM subjects');
        console.log('Total Subjects:', totalSubjectsResult);
        const totalSubjects = totalSubjectsResult[0][0].totalSubjects;

        res.status(200).json({
            totalDocuments,
            totalUsers,
            totalSubjects,
            approvedDocuments,
            unapprovedDocuments,
        });
    } catch (error) {
        console.error('Error fetching stats:', error); 
        res.status(500).json({ error: 'Lỗi khi lấy thống kê', details: error.message });
    }
}
