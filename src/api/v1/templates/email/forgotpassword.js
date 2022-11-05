module.exports.sendCode = {
    subject: "Forgot Password",
    body: (code) => {
        return `<p>Your reset password code is ${code}</p>`;
    }
};