const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '.env.local');
let emailUser = 'muhammadrashid786114786@gmail.com';
let emailPass = '';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('EMAIL_USER=')) {
      emailUser = trimmed.replace('EMAIL_USER=', '').trim();
    }
    if (trimmed.startsWith('EMAIL_PASS=')) {
      emailPass = trimmed.replace('EMAIL_PASS=', '').trim();
    }
  });
}

console.log('Testing with User:', emailUser);

if (!emailPass || emailPass.includes('PASTE_YOUR_16_CHAR_APP_PASSWORD_HERE')) {
  console.log('\n❌ ERROR: EMAIL_PASS is not set in .env.local yet.');
  console.log('Please get your 16-character App Password from https://myaccount.google.com/apppasswords and paste it into .env.local');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

async function main() {
  try {
    console.log('Attempting to send test email to:', emailUser, '...');
    const info = await transporter.sendMail({
      from: `"Portfolio Test System" <${emailUser}>`,
      to: emailUser,
      subject: "🎉 Test Email: Automated Portfolio Delivery Working!",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #190B12; color: #FFF1F4; padding: 25px; border-radius: 12px; border: 1px solid #A8325E;">
          <h2 style="color: #F0A6BC;">Assalam-o-Alaikum Muhammad bin Rashid!</h2>
          <p>Mubarak ho! Aapka automated portfolio email system 100% active ho chuka hai.</p>
          <div style="background-color: #451A2D; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0;"><strong>Status:</strong> ✅ Verified & Working</p>
            <p style="margin: 5px 0 0 0;"><strong>Delivered to:</strong> ${emailUser}</p>
          </div>
          <p style="color: #F0A6BC; font-size: 13px;">Ab jab bhi koi client website par form bharega, email seedha aapke inbox mein aaye gi!</p>
        </div>
      `
    });

    console.log('✅ SUCCESS! Email has been delivered.');
    console.log('Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
}

main();
