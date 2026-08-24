const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Resolve the token to the seeded database user
    let user;
    if (token === 'demo_session_token_std' || token.startsWith('token_student_')) {
      user = await User.findOne({ role: 'student' });
    } else if (token.startsWith('token_recruiter_')) {
      user = await User.findOne({ role: 'recruiter' });
    } else if (token.startsWith('token_admin_')) {
      user = await User.findOne({ role: 'admin' });
    } else {
      // Default fallback
      user = await User.findOne();
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found in database. Please run the seed script to create the database records.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Auth middleware error', error: error.message });
  }
};

module.exports = authMiddleware;
