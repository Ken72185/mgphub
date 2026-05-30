export default async function handler(req, res) {
    const { endpoint } = req.query;

    // Ambil URL dan API Key dari Environment Variable Vercel
    const API_URL = process.env.MOTOGP_API_URL; 
    const API_KEY = process.env.MOTOGP_API_KEY; 

    if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint diperlukan' });
    }

    try {
        // OPSI A: Jika API Key dimasukkan via HEADERS (Standard Industri)
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                'X-API-KEY': API_KEY, // atau 'Authorization': `Bearer ${API_KEY}` sesuai spek SportDB
                'Content-Type': 'application/json'
            }
        });

        // OPSI B: Jika API Key dimasukkan via URL QUERY PARAMETER (Misal: ?key=xxx)
        // Hapus Opsi A di atas, lalu pakai yang ini:
        // const separator = endpoint.includes('?') ? '&' : '?';
        // const response = await fetch(`${API_URL}/${endpoint}${separator}api_key=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Kirim data bersih ke index.html (Tanpa ngebocorin API Key-nya)
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal koneksi ke API utama' });
    }
}
