require("dotenv").config();

const checkout = async (order) => {
    try {
        const response = await fetch("https://api.yookassa.ru/v3/payments", {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " +
                    btoa(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_API_KEY}`),
                "Content-Type": "application/json",
                "Idempotence-Key": order.id,
            },
            body: JSON.stringify({
                amount: {
                    value: order.total_price,
                    currency: "RUB",
                },
                capture: true,
                confirmation: {
                    type: "redirect",
                    // return_url: "http://localhost:3000",
                    return_url: "https://book.bubucode.ru",
                },
                description: `Заказ №${order.number}`,
            }),
        });

        const body = await response.json();

        return body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = checkout;
