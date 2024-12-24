const Approval = require('../models/Approval');
const Document = require('../models/Document');

const approvalController = {
    approveDocument: async (req, res) => {
        const { document_id, status, reason } = req.body;
        const approved_by = req.user.id;

        try {
            const updateResult = await Document.updateApprovalStatus(document_id, status);

            if (updateResult[0].affectedRows === 0) {
                return res.status(404).json({ message: 'Document not found or status unchanged' });
            }

            const approval = await Approval.create({ document_id, approved_by, status, reason });

            res.status(200).json({
                message: 'Document approval updated successfully',
                approval: approval[0],
            });
        } catch (error) {
            res.status(500).json({ message: 'Error approving document', error });
        }
    },

    getUnapprovedDocuments: async (req, res) => {
        try {
            const documents = await Document.getUnapproved();
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching unapproved documents', error });
        }
    },
};

module.exports = approvalController;
