export default async function handler(req, res) {
    const { endpoint } = req.query;

    const API_URL = process.env.MOTOGP_API_URL;
    const API_KEY = process.env.MOTOGP_API_KEY;

    if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint diperlukan' });
    }

    try {
        // Eksekusi data ke SportDB menggunakan aturan Header dari Docs
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                'X-API-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Nangkep pesan error asli dari SportDB biar gampang di-debug di Vercel Logs
            const errorText = await response.text();
            throw new Error(`SportDB Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Vercel Backend Error:", error.message);
        res.status(500).json({ error: 'Gagal ambil data dari SportDB', detail: error.message });
    }
}
