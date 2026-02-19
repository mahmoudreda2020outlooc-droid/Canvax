"use server";

export async function submitOrder(orderData: any) {
    const url = process.env.ORDER_SCRIPT_URL;
    if (!url) {
        console.error("ORDER_SCRIPT_URL is not defined in environment variables");
        return { success: false, error: "Configuration error" };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-Type': 'application/json'
            },
            // Google Apps Script can sometimes be slow or require redirects
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Server action order submission failed:", error);
        return { success: false, error: "Failed to submit order" };
    }
}

export async function submitContact(contactData: { name: string; email: string; message: string }) {
    const url = process.env.CONTACT_SCRIPT_URL;
    if (!url) {
        console.error("CONTACT_SCRIPT_URL is not defined in environment variables");
        return { success: false, error: "Configuration error" };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Server action contact submission failed:", error);
        return { success: false, error: "Failed to submit message" };
    }
}
