const loginAccess = require("../dataAccess/loginAccess.js");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { update } = require("./inquiriesServices.js");
const { UTF16 } = require("mysql/lib/protocol/constants/charsets.js");
require('dotenv').config(); // Load environment variables from .env file

class loginService {

    async getByUserId(userId, password) {
        try {
            const validationResult = await loginAccess.getByUserId(userId, password);
            if (validationResult.success)   
{
    const userWithoutPassword = validationResult.user.toObject();
delete userWithoutPassword.passwordHash;
  validationResult.user=userWithoutPassword;
  console.log(validationResult);
  return validationResult;
}

            else {
                throw new Error(validationResult.message)
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }


    async getPsw(userId) {
        try {
            const email = await loginAccess.getEmail(userId);
            const newPassword = this.generatePassword();
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const newPasswordSchema = {
                password: hashedPassword,
                expireDate: new Date(new Date().getTime() + 10 * 60 * 1000),
                valid: "true",
                failedAttempts: 0
            }
            await loginAccess.updatePassword(userId, newPasswordSchema);
            await this.sendEmail(email, newPassword);
            return { status: 200, message: 'Password reset successful. Check your email for the new password.' };
        } catch (err) {
            console.error('Error resetting password:', err);
            if (err.message === 'User not found') {
                return { status: 404, message: err.message };
            } else if (err.message === 'Failed to send email') {
                return { status: 500, message: 'Failed to send email with new password' };
            }
            return { status: 500, message: 'Internal Server Error' };
        }

    }

    generatePassword() {
        const digits = '0123456789';
        let password = '';
        for (let i = 0; i < 6; i++) {
            password += digits[Math.floor(Math.random() * digits.length)];
        }
        return password;
    }

    async sendEmail(toEmail, newPassword) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Your one-time password for entering Dr. Salomon's clinic website",
            text: `Hello,\n Your one time password is: ${newPassword}\n
            Please note that the password is valid for 10 minutes only.\n`
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}

module.exports = new loginService(loginAccess);