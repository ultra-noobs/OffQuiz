require("dotenv").config();

const twilio = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const sendSms = (numbers, body) => {
  const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
  const bindings = numbers.map((number) => {
    return JSON.stringify({ binding_type: "sms", address: number });
  });
  service.notifications
    .create({
      toBinding: bindings,
      body: body,
    })
    .then((notification) => {
      console.log("Message Successfully Sent.");
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = { sendSms };
