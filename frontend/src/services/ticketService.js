const API_URL = "http:/localhost:5153/api/ticket";

export async function createTicket(ticketData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type":  "application/json"
        },
        body: JSON.stringify(ticketData)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No se pudo registrar el ticket.");
    }

    return await response.json();
}