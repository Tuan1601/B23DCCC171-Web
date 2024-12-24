const Subject = require('../models/Subject');

const subjectController = {
    getAllSubjects: async (req, res) => {
        try {
            const subjects = await Subject.getAll();
            res.status(200).json(subjects);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'Error fetching subjects', error: error.message });
        }
    }
};


module.exports = subjectController;
