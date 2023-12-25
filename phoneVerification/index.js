// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACb0115576fca4ed5d93bd091740d4de46";
const authToken = "c5611da083ca910715e5add30a49d99b";
const verifySid = "VAf906cdd73f5542641cdb162673f26745";
const client = require("twilio")(accountSid, authToken);

const verifyPhone = {};

verifyPhone.sendOtp = async (phoneNo) => {
  const response = await client.verify.v2
    .services(verifySid)
    .verifications.create({ to: phoneNo, channel: "sms" })
  
  return response;
}

verifyPhone.confirmOtp = async (phoneNo, otp) => {
  const response = await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: phoneNo, code: otp });
  
  return response;
}

const verifyPhone1 = () => {
  client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+919729391936", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
    client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: "+919729391936", code: otpCode })
      .then((verification_check) => console.log(verification_check.status))
      .then(() => readline.close());
    });
  });
}

module.exports = verifyPhone;