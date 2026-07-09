import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    try {
        const { password } = req.body || {};
        if (password && password === process.env.ADMIN_PASSWORD) {
            return res.status(200).json({ ok: true });
        }
        return res.status(401).json({ ok: false, error: 'Mot de passe incorrect' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}