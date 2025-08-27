const validator = require('validator');

const validateSingnupInput = (req) => {
    const { firstName, lastName, password, email } = req.body;
    if (!firstName) {
        throw new Error('First Name is required.');
    } else if( firstName.length < 2 || firstName.length > 30) {
        throw new Error('First Name must be between 2 and 30 characters.');
    } else if(!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
        throw new Error('First Name and Last Name must contain only alphabetic characters.');
    } else if(!validator.isEmail(email)) {
        throw new Error('Invalid email format.');
    } else if(!validator.isStrongPassword(password)) {
        throw new Error('Please Enter a strong password.');
    }
}

module.exports = {
    validateSingnupInput
};