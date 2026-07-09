const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const seedController = require('./controllers/seedController');

dotenv.config();

const start = async () => {
  try {
    await connectDB();

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@spaceexplorer.local').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const adminFirstName = process.env.ADMIN_NAME || 'Admin';
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (!existingAdmin) {
      const existingUser = await User.findOne({ email: adminEmail });
      if (existingUser) {
        existingUser.role = 'admin';
        await existingUser.save();
        console.log(`Admin privileges granted to existing user: ${adminEmail}`);
      } else {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
          firstName: adminFirstName,
          lastName: 'User',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
        });
        console.log(`Admin user created: ${adminEmail}`);
        console.log(`Admin password: ${adminPassword}`);
      }
    } else {
      console.log(`Admin user already exists: ${existingAdmin.email}`);
    }

    const req = { body: {} };
    const res = {
      status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json(payload) {
        console.log('Seed result:', payload);
        return payload;
      },
    };

    await seedController.seedDatabase(req, res);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

start();
