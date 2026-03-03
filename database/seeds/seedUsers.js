import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../backend/.env') });

await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');

const UserSchema = new mongoose.Schema({ name: String, email: String, password: String, isAdmin: Boolean });
const User = mongoose.model('User', UserSchema);

const users = [
    { name: 'Admin User', email: 'admin@newsly.com', password: await bcrypt.hash('admin123', 10), isAdmin: true },
    { name: 'Demo Student', email: 'demo@newsly.com', password: await bcrypt.hash('demo123', 10), isAdmin: false },
];

await User.deleteMany({});
await User.insertMany(users);
console.log('✅ Demo users seeded:');
console.log('  admin@newsly.com / admin123');
console.log('  demo@newsly.com  / demo123');

await mongoose.disconnect();
process.exit(0);
