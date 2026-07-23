import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function checkAuth(req) {
    const password = req.headers['x-admin-password'];
    return password && password === process.env.ADMIN_PASSWORD;
}

export default async function handler(req, res) {
    if (!checkAuth(req)) {
        return res.status(401).json({ error: 'Non autorisé' });
    }

    try {
        if (req.method === 'GET') {
            const result = await pool.query('SELECT * FROM produits ORDER BY name');
            return res.status(200).json(result.rows);
        }

        if (req.method === 'POST') {
            const p = req.body;
            if (!p.id || !p.name || !p.price) {
                return res.status(400).json({ error: 'id, name et price sont obligatoires' });
            }
            await pool.query(
                `INSERT INTO produits (id, name, category, category_display, price, rating, reviews_count, image, description, features, specs, featured, in_stock)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
                [
                    p.id, p.name, p.category || '', p.category_display || '',
                    p.price, p.rating || 0, p.reviews_count || 0, p.image || '',
                    p.description || '', JSON.stringify(p.features || []),
                    JSON.stringify(p.specs || {}), !!p.featured, p.in_stock !== undefined ? !!p.in_stock : true
                ]
            );
            return res.status(201).json({ ok: true });
        }

        if (req.method === 'PUT') {
            const p = req.body;
            if (!p.id) {
                return res.status(400).json({ error: 'id obligatoire' });
            }
            await pool.query(
                `UPDATE produits SET
           name=$2, category=$3, category_display=$4, price=$5,
           rating=$6, reviews_count=$7, image=$8, description=$9,
           features=$10, specs=$11, featured=$12, in_stock=$13
         WHERE id=$1`,
                [
                    p.id, p.name, p.category || '', p.category_display || '',
                    p.price, p.rating || 0, p.reviews_count || 0, p.image || '',
                    p.description || '', JSON.stringify(p.features || []),
                    JSON.stringify(p.specs || {}), !!p.featured, p.in_stock !== undefined ? !!p.in_stock : true
                ]
            );
            return res.status(200).json({ ok: true });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'id obligatoire' });
            }
            await pool.query('DELETE FROM produits WHERE id=$1', [id]);
            return res.status(200).json({ ok: true });
        }

        return res.status(405).json({ error: 'Méthode non autorisée' });
    } catch (err) {
        console.error('Erreur admin-products:', err);
        return res.status(500).json({ error: err.message });
    }
}