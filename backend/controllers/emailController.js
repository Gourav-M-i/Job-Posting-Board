const nodemailer = require('nodemailer');

// Send job alerts via email
exports.sendJobAlerts = async (req, res) => {
    const { jobTitle, jobDescription, candidates } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidates.join(','),
        subject: `Job Alert: ${jobTitle}`,
        html: `<p>Dear Candidate,</p>
           <p>We are pleased to inform you about a job opportunity:</p>
           <p><strong>${jobTitle}</strong></p>
           <p>${jobDescription}</p>
           <p>Best Regards,</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send emails' });
    }
};
