export class OrdersApi {
    async getOrders() {
        const response = await fetch('http://localhost:3000/orders');

        return await response.json();
    }

    async createOrder(order) {
        console.log(order);
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            throw new Error("Failed to add new order");
        }

        return await response.json();
    }

    async deleteOrder(id) {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
            method: 'DELETE'
        });
    }
}