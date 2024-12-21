const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// CV sections routes
app.use('/api/personalInfo', require('./routes/personnalInfoRoutes'));
app.use('/api/softSkills', require('./routes/softSkillRoutes'));
app.use('/api/hardSkills', require('./routes/hardSkillRoutes'));
app.use('/api/workExperience', require('./routes/workExperienceRoutes'));
app.use('/api/education', require('./routes/projectRoutes'));
app.use('/api/projects', require('./routes/educationRoutes')); 
app.use('/api/certifications', require('./routes/certificationRoutes'));
app.use('/api/languages', require('./routes/languageRoutes')); 

// Default route
app.get('/', (req, res) => {
    res.send('CV Generator API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
