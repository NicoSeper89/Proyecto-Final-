const express = require("express");

/* export const f = {};
 */
const mercadopago = require("mercadopago");

mercadopago.configure({
	access_token: "TEST-3705955665092617-092117-68b6617138b1d100ce1f79b25e556585-111259691",
});

const premiumController = async (req, res) => {
	try {
		let preference = {
			items: [
				{
					title: "Premium publication",
					quantity: 1,
					unit_price: 200,
				},
			],
			back_urls: {
				failure: "https://localhost:3000/PaymentFail",
				pending: "https://localhost:3000/PaymentFail",
				success: "https://localhost:3000/PaymentOk",
			},
			auto_return: "approved",
		};
		const response = await mercadopago.preferences.create(preference);
		const preferenceId = response.body.init_point
		res.redirect(preferenceId);
	} catch (error) {
		throw Error("Payment error");
	}
};

module.exports = { premiumController };