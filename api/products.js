import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
    try {
        const result = await pool.query('SELECT * FROM produits');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erreur base de données:', err);
        res.status(500).json({
            error: err.message || 'Erreur inconnue',
            code: err.code || null,
            hasUrl: !!process.env.DATABASE_URL
        });
    }
}