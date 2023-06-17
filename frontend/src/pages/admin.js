/* eslint-disable react/no-array-index-key */
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { getData } from "../utils/network";
import {useNavigate} from "react-router-dom"

const Admin = () => {
    const [orders, setOrders] = useState(null);
    const navigate = useNavigate()

    const [user, setUser] = useState();

    const getUserData = async () => {
        const { user } = await getData('/users/one')

        setUser(user)
    }



    const recordsTableHead = [
        "#",
        "Товары",
        "Количество",
        "Общая стоимость",
        "Контактная информация",
        "Статус оплаты",
    ];

    const getOrdersList = async () => {
        const { success, orders: ordersList } = await getData("/orders/list");
        if (!success) {
            return alert("Error");
        }

        return setOrders(ordersList);
    };

    if (user && user.role !== "admin") {
        navigate("/")
    }

    useEffect(() => {
        getUserData()
        getOrdersList();
    }, []);

    return (
        <Container className="my-3">
            <Table
                responsive="sm"
                bordered
                hover
                striped
                title="Заказы"
                style={{ backgroundColor: "white", borderRadius: 5 }}
            >
                {orders ? (
                    <>
                        <thead>
                            <tr>
                                <th colSpan={12}>Заказы</th>
                            </tr>
                            <tr>
                                {recordsTableHead.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td align="center">{index + 1}</td>

                                    <td>
                                        {Array.isArray(order.product_name) ? order.product_name.map((product_name, index) =>
                                            <p>
                                                {product_name}
                                            </p>
                                        ) : order.product_name}
                                    </td>
                                    <td>
                                        {Array.isArray(order.amount) ? order.amount.map((amount, index) =>
                                            <p>
                                                {amount}
                                            </p>
                                        ) : order.amount}
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(order.total_price)}
                                    </td>
                                    <td>
                                        Имя: {order.client_name}
                                    </td>
                                    <td align="center">
                                    {order.status === "succeeded" ? "Оплачен" :
                                     "Не оплачен"
                                    }
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <h1 className="d-flex justify-content-center">Таблица с заказами пуста</h1>
                )}
            </Table>

        </Container>
    );
};

export default Admin;
