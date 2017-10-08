/**
 * validate checks the validity of the supplied Password and phone Number
 * @method validate
 *
 * @param  {string} userPassword user's Password
 * @param  {string} phone user's Password
 *
 * @return {string} result of validity test
 *
 */
const validate = (userPassword, phone) => {
  let validity;
  if (/^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z])(?!.*\s).{8,}$/.test(userPassword) &&
   !isNaN(phone)) {
    if (phone.length !== 11) {
      validity = 'Invalid Phone Number';
    } else {
      validity = 'valid';
    }
  } else {
    validity = 'Password Must Contain Alphabets, Numbers, Special Characters and Must be Longer than 8';
  }
  return validity;
};

export default validate;
