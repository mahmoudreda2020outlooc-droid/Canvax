"use server";

export async function submitOrder(orderData: any) {
    const url = process.env.ORDER_SCRIPT_URL;
    if (!url) {
        console.error("ORDER_SCRIPT_URL is missing");
        return { success: false, error: "Env var missing" };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                // Using text/plain can sometimes help with Google Script POST issues
                'Content-Type': 'text/plain;charset=utf-8'
            },
            redirect: 'follow',
            cache: 'no-store'
        });

        return { success: true };
    } catch (error) {
        console.error("Order submission error:", error);
        return { success: false };
    }
}

export async function submitContact(contactData: { name: string; email: string; message: string }) {
    const url = process.env.CONTACT_SCRIPT_URL;
    if (!url) {
        console.error("CONTACT_SCRIPT_URL is missing");
        return { success: false, error: "Env var missing" };
    }

    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            redirect: 'follow',
            cache: 'no-store'
        });

        return { success: true };
    } catch (error) {
        console.error("Contact submission error:", error);
        return { success: false };
    }
}
