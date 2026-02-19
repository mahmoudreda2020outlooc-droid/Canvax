"use server";

export async function submitOrder(orderData: any) {
    const url = process.env.ORDER_SCRIPT_URL;

    if (!url) {
        console.error("DEBUG: ORDER_SCRIPT_URL is MISSING in environment variables.");
        return { success: false, error: "Env var missing" };
    }

    console.log(`DEBUG: Attempting to send order to Google Sheets. URL exists.`);

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

        console.log(`DEBUG: Order response status: ${response.status}`);

        if (response.ok) {
            console.log("DEBUG: Order successfully sent to Google Sheets.");
            return { success: true };
        } else {
            const errorText = await response.text();
            console.error(`DEBUG: Google Sheets Error Response: ${errorText}`);
            return { success: false, error: `HTTP ${response.status}` };
        }
    } catch (error) {
        console.error("DEBUG: Fatal error during order submission:", error);
        return { success: false, error: "Network or Server error" };
    }
}

export async function submitContact(contactData: { name: string; email: string; message: string }) {
    const url = process.env.CONTACT_SCRIPT_URL;

    if (!url) {
        console.error("DEBUG: CONTACT_SCRIPT_URL is MISSING in environment variables.");
        return { success: false, error: "Env var missing" };
    }

    console.log(`DEBUG: Attempting to send contact data to Google Sheets. URL exists.`);

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

        console.log(`DEBUG: Contact response status: ${response.status}`);

        if (response.ok) {
            console.log("DEBUG: Contact data successfully sent to Google Sheets.");
            return { success: true };
        } else {
            console.error(`DEBUG: Google Sheets Contact Error: ${response.status}`);
            return { success: false };
        }
    } catch (error) {
        console.error("DEBUG: Fatal error during contact submission:", error);
        return { success: false };
    }
}
