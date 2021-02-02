// do a const for each user model
//const User = require('../models/user');
const {sendEmail} = require('../setEmail');


//exports.recover = async (req, res) => {
//    try {
//        const { email } = req.body;

        //const user = await Database.findOne({ email });

        //if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

        // send email
        let subject = "Password change request";
//        let to = user.email;
//        let from = process.env.FROM_EMAIL;
//        let link = "http://" + req.headers.host + "/api/resetPWRD/" + user.email;
//        let html = `<p>Hi ${user.firstname} ${user.lastname}</p>
//                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
//                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

//        await sendEmail({to, from, subject, html});

//        res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
//    } catch (error) {
//        res.status(500).json({message: error.message})
//    }
//};
