import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { put } from '@vercel/blob';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const password = req.headers['x-admin-password'];
    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Non autorisé' });
    }

    try {
        const filename = req.headers['x-filename'] || `image-${Date.now()}.jpg`;

        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        if (buffer.length === 0) {
            return res.status(400).json({ error: 'Aucune image reçue' });
        }

        const blob = await put(filename, buffer, {
            access: 'public',
            addRandomSuffix: true
        });

        res.status(200).json({ url: blob.url });
    } catch (err) {
        console.error('Erreur upload:', err);
        res.status(500).json({ error: err.message });
    }
}