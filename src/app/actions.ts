"use server";

export async function submitOrder(orderData: any) {
    const url = process.env.ORDER_SCRIPT_URL;
    if (!url) {
        console.error("Order script URL is not defined");
        return { success: false, error: "Configuration error" };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-Type': 'application/json'
            },
            // Note: Google Scripts don't support CORS for direct POST from browser easily, 
            // but from server it's a standard request.
        });

        return { success: true };
    } catch (error) {
        console.error("Server action order submission failed:", error);
        return { success: false, error: "Failed to submit order" };
    }
}

export async function submitContact(contactData: { name: string; email: string; message: string }) {
    const url = process.env.CONTACT_SCRIPT_URL;
    if (!url) {
        console.error("Contact script URL is not defined");
        return { success: false, error: "Configuration error" };
    }

    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Server action contact submission failed:", error);
        return { success: false, error: "Failed to submit message" };
    }
}
