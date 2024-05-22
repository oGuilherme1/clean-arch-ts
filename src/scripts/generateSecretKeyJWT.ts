import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const envPath = path.resolve(__dirname, '../../.env');

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const keyName = 'SECRET_KEY_JWT';
const SECRET_KEY = crypto.randomBytes(32).toString('hex');

const keyValue = `${keyName}=${SECRET_KEY}`;

if (envContent.includes(keyName)) {
  const regex = new RegExp(`${keyName}=.+`);
  envContent = envContent.replace(regex, keyValue);
} else {
  envContent += `\n${keyValue}\n`;
}

fs.writeFileSync(envPath, envContent);

console.log(`Key ${keyName} generated and saved in the .env file: ${SECRET_KEY}`);
