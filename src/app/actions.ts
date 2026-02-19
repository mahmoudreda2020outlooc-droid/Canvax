"use server";

export async function submitOrder(orderData: any) {
    const url = process.env.ORDER_SCRIPT_URL;

    if (!url) {
        console.error("ORDER_SCRIPT_URL is MISSING.");
        return { success: false };
    }

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(orderData),
            redirect: 'follow',
            cache: 'no-store'
        });
        return { success: true };
    } catch (error: any) {
        console.error("Fetch error during order submission:", error);
        return { success: false };
    }
}

export async function submitContact(contactData: { name: string; email: string; message: string }) {
    const url = process.env.CONTACT_SCRIPT_URL;

    if (!url) {
        console.error("CONTACT_SCRIPT_URL is MISSING.");
        return { success: false };
    }

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(contactData),
            redirect: 'follow',
            cache: 'no-store'
        });
        return { success: true };
    } catch (error: any) {
        console.error("Fetch error during contact submission:", error);
        return { success: false };
    }
}
