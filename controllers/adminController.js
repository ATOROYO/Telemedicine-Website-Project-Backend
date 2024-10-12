exports.getAdminDashboard = (req, res) => {
  res.send('Welcome to the Admin Dashboard');
};

exports.addDoctor = (req, res) => {
  // Call doctorController's addDoctor function
  doctorController.addDoctor(req, res);
};
