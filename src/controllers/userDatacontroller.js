const SoftSkills = require("../models/softSkillModel");
const HardSkills = require("../models/hardSkillModel");
const WorkExperience = require("../models/workExperienceModel");
const Certification = require("../models/certificationModel");
const Education = require("../models/educationModel");
const Languages= require("../models/languagesModel");
const PersonnalInfo = require("../models/personalInfoModel");
const Projects = require("../models/projectModel");
// Add other models as needed

exports.getUserData = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch all related user data
        const [softSkills, hardSkills, workExperience, certification, education, language, personnalinfo, project] = await Promise.all([
            SoftSkills.find({ userId }),
            HardSkills.find({ userId }),
            WorkExperience.find({ userId }),
            Certification.find({userId}),
            Education.find({userId}),
            Languages.find({userId}),
            PersonnalInfo.find({userId}),
            Projects.find({userId})

        ]);

        res.json({
            softSkills,
            hardSkills,
            workExperience,
            certification, 
            education, 
            language, 
            personnalinfo, 
            project
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
};
