"use server"


export const generateBlog = async (topic: string): Promise<any> => {
    try {
        const response = await fetch("http://127.0.0.1:8002/generate-blog/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            let message = `Backend request failed (${response.status})`;
            try {
                const errorBody = await response.json();
                if (typeof errorBody?.detail === "string") {
                    message = errorBody.detail;
                }
            } catch {
                // Keep the status-based message when the backend did not return JSON.
            }
            throw new Error(message);
        }
        const result = await response.json()
        return (result);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
