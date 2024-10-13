//Code for my middlewares
exports.ensureAuthenticated = (req, res, next) => {
  if (req.session.patient) {
    return next();
  } else {
    res.status(401).json({ message: 'Please log in to access this resource' });
  }
};

// After a successful login
req.session.user = {
  id: user.id,
  email: user.email,
  role: user.role, // This should be 'admin' or 'patient'
};
