"use server";

export async function submitOrder(orderData: any) {
    const url = process.env.ORDER_SCRIPT_URL;

    if (!url) {
        console.error("DEBUG: ORDER_SCRIPT_URL is MISSING.");
        return { success: false, error: "Missing ORDER_SCRIPT_URL in Vercel settings" };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(orderData),
            redirect: 'follow',
            cache: 'no-store'
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: `Google Script Error: ${response.status}` };
        }
    } catch (error: any) {
        console.error("DEBUG: Fetch error:", error);
        return { success: false, error: error.message || "Network Error" };
    }
}

export async function submitContact(contactData: { name: string; email: string; message: string }) {
    const url = process.env.CONTACT_SCRIPT_URL;

    if (!url) {
        console.error("DEBUG: CONTACT_SCRIPT_URL is MISSING.");
        return { success: false, error: "Missing CONTACT_SCRIPT_URL in Vercel settings" };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(contactData),
            redirect: 'follow',
            cache: 'no-store'
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: `Google Script Error: ${response.status}` };
        }
    } catch (error: any) {
        console.error("DEBUG: Fetch error:", error);
        return { success: false, error: error.message || "Network Error" };
    }
}
