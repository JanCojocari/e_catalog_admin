export const addUser = async (clientData) => {
    try {
        const response = await fetch("http://localhost:3080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientData)
        })


        if (!response.ok) {
            throw new Error(`Http error: ${response.status}`)
        }
        const data = await response.json();
        return data
    } catch (e) {
        console.log("Failed to add user! Error:" + e)
    }
}