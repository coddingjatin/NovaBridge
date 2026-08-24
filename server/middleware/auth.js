const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Determine role from token
    let role = 'student';
    if (token.startsWith('token_recruiter_')) role = 'recruiter';
    else if (token.startsWith('token_admin_')) role = 'admin';

    // Find user by role, or auto-create if missing (handles fresh DB deployments)
    let user = await User.findOne({ role });

    if (!user) {
      // Auto-create a default user for this role so fresh deployments work without manual seeding
      const defaults = {
        student:   { name: 'Demo Student',   email: 'student@novabridge.demo',   role: 'student' },
        recruiter: { name: 'Demo Recruiter', email: 'recruiter@novabridge.demo', role: 'recruiter' },
        admin:     { name: 'Demo Admin',     email: 'admin@novabridge.demo',     role: 'admin' },
      };
      user = await User.create(defaults[role]);
      console.log(`Auto-created ${role} user in DB:`, user.email);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({ success: false, message: 'Auth middleware error', error: error.message });
  }
};

module.exports = authMiddleware;
