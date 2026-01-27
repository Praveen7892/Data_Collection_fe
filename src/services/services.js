const API_BASE = "http://127.0.0.1:5000/capture";


export const capture = async (data) => {
    console.log(data);
    const payload = data;
    try {
        const res = await fetch(`${API_BASE}/click_capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to Add Plan");

        const data = await res.json();
        return data;
    } catch (e) {
        return e;
    }
};



export const getCaptureImages = async () => {
     
    try {
        const res = await fetch(`${API_BASE}/get_captured_images`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to Add Plan");

        const data = await res.json();
        return data;
    } catch (e) {
        return e;
    }
};

