export const getObjects = async () => {
    try {
        const response = await fetch("http://localhost:3080/objects")
        if (!response.ok) {
            throw new Error(`Http error: ${response.status}`)
        }
        const data = await response.json();
        return data
    } catch (e) {
        console.log("Failed to get data! Error:" + e)
    }
};