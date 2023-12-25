const Razorpay = require("razorpay");

const paymentApi = {
  createOrder: async function (options) {
    const instance = new Razorpay({
      key_id: "rzp_test_Ngdj9qSSuorTmD",
      key_secret: "zez6UHQp4NcJLKzrEckEu5PZ",
    });

    const order = await instance.orders.create(options);

    if (order) {
      return { msg: "success", order }
    } else {
      return { msg: "Error while creating the order." }
    }
  }
}

module.exports = paymentApi;