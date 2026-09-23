// 1. REGISTER ROUTE (Hamesha customer hobe)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Force role to 'customer'
    const newUser = new User({
      phone,
      password, // Note: Production-e bcrypt.hash use kora ucchit
      role: 'customer'
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADMIN LOGIN ROUTE (Only Admin Allowed)
app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    // CHECK ADMIN ROLE HERE
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied: You are not an Admin!" });
    }

    res.json({
      token: "your-jwt-token-here",
      user: { id: user._id, phone: user.phone, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});