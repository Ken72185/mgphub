export default async function handler(req, res) {
    const { endpoint } = req.query;

    // Tarik URL utama dari Vercel Environment Variables
    const API_BASE_URL = process.env.MOTOGP_API_URL;

    if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        
        // Kirim datanya balik ke index.html
        res.status(200).json(data);
    } catch (error) {
        console.error("Vercel Serverless Error:", error);
        res.status(500).json({ error: 'Failed to fetch data from original API' });
    }
}
