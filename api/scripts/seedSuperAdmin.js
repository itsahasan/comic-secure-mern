const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/user.model');

dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

async function seedSuperAdmin() {
  await connectDB();

  const email = process.env.SEED_SUPER_ADMIN_EMAIL;
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing SEED_SUPER_ADMIN_EMAIL or SEED_SUPER_ADMIN_PASSWORD in .env');
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Super admin already exists');
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 12);
  await User.create({
    username: 'superadmin',
    email,
    password: hash,
    role: 'super_admin',
  });

  console.log('Super admin created');
  process.exit(0);
}

seedSuperAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
