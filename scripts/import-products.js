import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const PRODUCTS = [
    {
        id: "smart-str-345m",
        name: "Réfrigérateur Double Porte Smart STR-345M",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 159000,
        rating: 4.8,
        reviewsCount: 27,
        image: "images/products/IMG-20250722-WA0005.jpg",
        description: "Réfrigérateur double porte Smart Technology STR-345M avec technologie No Frost. Design moderne en gris acier, idéal pour les familles. Tropicalisé pour le climat chaud de Dakar.",
        features: ["Double porte avec congélateur en haut", "Technologie No Frost (zéro givre)", "Tropicalisé pour le climat chaud (classe T)", "Éclairage LED intérieur", "Design inox gris anthracite"],
        specs: { "Modèle": "STR-345M", "Marque": "Smart Technology", "Type de froid": "No Frost", "Classe climatique": "T (Tropicalisé)", "Couleur": "Gris inox", "Garantie": "1 An" },
        featured: true
    },
    {
        id: "smart-stcb-270m",
        name: "Réfrigérateur Combiné Smart STCB-270M",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 139000,
        rating: 4.7,
        reviewsCount: 19,
        image: "images/products/IMG-20250722-WA0007.jpg",
        description: "Réfrigérateur combiné Smart Technology STCB-270M avec congélateur en bas. Parfait pour les foyers sénégalais grâce à sa robustesse et son efficacité énergétique.",
        features: ["Combiné : réfrigérateur haut + congélateur bas", "Froid ventilé intégral", "Étagères en verre trempé", "Grand bac à légumes", "Tropicalisé pour les hautes températures"],
        specs: { "Modèle": "STCB-270M", "Marque": "Smart Technology", "Type": "Combiné (congélateur bas)", "Couleur": "Gris anthracite", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "smart-stcb-303m",
        name: "Réfrigérateur Combiné Smart STCB-303M",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 175000,
        rating: 4.6,
        reviewsCount: 14,
        image: "images/products/IMG-20250722-WA0021.jpg",
        description: "Réfrigérateur combiné Smart Technology STCB-303M. Spacieux et économique, idéal pour stocker fruits, légumes et surgelés au quotidien.",
        features: ["Grande capacité combinée", "Congélateur bas avec tiroirs", "Froid ventilé No Frost", "Économie d'énergie classe A+", "Faible niveau sonore"],
        specs: { "Modèle": "STCB-303M", "Marque": "Smart Technology", "Type": "Combiné", "Couleur": "Gris inox", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "smart-stcb-459wm",
        name: "Réfrigérateur Combiné Smart STCB-459WM avec Fontaine",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 199000,
        rating: 4.9,
        reviewsCount: 31,
        image: "images/products/IMG-20250722-WA0022.jpg",
        description: "Réfrigérateur combiné haut de gamme Smart STCB-459WM avec distributeur d'eau intégré. La fraîcheur à portée de main, sans ouvrir la porte !",
        features: ["Distributeur d'eau fraîche intégré", "Grande capacité 459 Litres", "Froid No Frost intégral", "Écran digital de température", "Design premium gris anthracite"],
        specs: { "Modèle": "STCB-459WM", "Marque": "Smart Technology", "Capacité": "459 Litres", "Fonctionnalité": "Distributeur eau", "Couleur": "Gris anthracite", "Garantie": "1 An" },
        featured: true
    },
    {
        id: "smart-stcb-557nfm",
        name: "Réfrigérateur Combiné Smart STCB-557NFM",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 325000,
        rating: 4.8,
        reviewsCount: 22,
        image: "images/products/IMG-20250722-WA0023.jpg",
        description: "Grand réfrigérateur combiné Smart STCB-557NFM avec congélateur bas multi-tiroirs. Idéal pour les grandes familles avec un espace de stockage exceptionnel.",
        features: ["Très grande capacité 557 Litres", "Congélateur bas avec 4 tiroirs séparés", "Technologie No Frost", "Éclairage LED intérieur", "Classe énergétique A+"],
        specs: { "Modèle": "STCB-557NFM", "Marque": "Smart Technology", "Capacité": "557 Litres", "Type congélateur": "Multi-tiroirs", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "smart-str-160h",
        name: "Réfrigérateur Double Porte Smart STR-160H",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 109000,
        rating: 4.5,
        reviewsCount: 18,
        image: "images/products/IMG-20250722-WA0017.jpg",
        description: "Réfrigérateur Smart STR-160H compact et économique. Parfait pour les petits foyers et studios. Faible consommation et prix accessible.",
        features: ["Double porte compacte", "Congélateur en haut", "Économique en électricité", "Bacs à légumes spacieux", "Finition inox argenté"],
        specs: { "Modèle": "STR-160H", "Marque": "Smart Technology", "Capacité": "160 Litres", "Couleur": "Inox argenté", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "smart-stcb-155h",
        name: "Réfrigérateur Combiné Smart STCB-155H",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 119000,
        rating: 4.4,
        reviewsCount: 12,
        image: "images/products/IMG-20250728-WA0015.jpg",
        description: "Réfrigérateur combiné Smart STCB-155H : l'entrée de gamme idéale pour commencer. Compact, économe et fiable pour un usage quotidien.",
        features: ["Combiné compact", "Congélateur en haut", "Gaz réfrigérant écologique", "Facile à entretenir", "Design gris moderne"],
        specs: { "Modèle": "STCB-155H", "Marque": "Smart Technology", "Type": "Combiné compact", "Couleur": "Gris", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "roch-rfr-325db-h",
        name: "Réfrigérateur Combiné Roch RFR-325DB-H 325L",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 279000,
        rating: 4.8,
        reviewsCount: 35,
        image: "images/products/IMG-20250728-WA0010.jpg",
        description: "Réfrigérateur combiné Roch RFR-325DB-H fabriqué en Turquie. 4 tiroirs, 325 litres de capacité. Classe énergétique A++, idéal pour toute la famille.",
        features: ["325 Litres – 4 tiroirs spacieux", "Fabriqué en Turquie (qualité européenne)", "Classe énergétique A++", "Froid ventilé No Frost", "Silencieux et économique"],
        specs: { "Modèle": "RFR-325DB-H", "Marque": "Roch", "Capacité": "325 Litres", "Tiroirs": "4", "Classe énergétique": "A++", "Garantie": "2 Ans" },
        featured: true
    },
    {
        id: "roch-rfr-160b-b",
        name: "Réfrigérateur Combiné Roch RFR-160B-B 160L",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 159000,
        rating: 4.6,
        reviewsCount: 28,
        image: "images/products/IMG-20250728-WA0011.jpg",
        description: "Réfrigérateur combiné Roch 160 litres avec 3 tiroirs. Compresseur fiable 12 ans de garantie. Nature Fresh pour conserver vos aliments plus longtemps.",
        features: ["160 Litres – 3 tiroirs", "Garantie compresseur 12 ans", "Technologie Nature Fresh", "Refroidissement 4 dimensions", "Design inox élégant"],
        specs: { "Modèle": "RFR-160B-B", "Marque": "Roch", "Capacité": "160 Litres", "Compresseur": "Garantie 12 ans", "Technologie": "Nature Fresh", "Garantie": "1 An + compresseur" },
        featured: false
    },
    {
        id: "roch-rfr-290bd-b",
        name: "Réfrigérateur Combiné Roch RFR-290BD-B avec Fontaine",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 245000,
        rating: 4.9,
        reviewsCount: 41,
        image: "images/products/IMG-20250728-WA0014.jpg",
        description: "Réfrigérateur Roch 290 litres avec distributeur d'eau intégré (fontaine). 4 tiroirs, technologie Nature Fresh. Le meilleur rapport qualité/prix de la gamme Roch.",
        features: ["290 Litres – 4 tiroirs", "Fontaine d'eau fraîche intégrée", "Technologie Nature Fresh", "Compresseur durable et silencieux", "Finition inox brossé"],
        specs: { "Modèle": "RFR-290BD-B", "Marque": "Roch", "Capacité": "290 Litres", "Fonctionnalité": "Fontaine eau intégrée", "Tiroirs": "4", "Garantie": "2 Ans" },
        featured: true
    },
    {
        id: "smart-stcdv-890",
        name: "Vitrine Réfrigérée Smart STCDV-890",
        category: "refrigerators",
        categoryDisplay: "Réfrigérateurs",
        price: 320000,
        rating: 4.7,
        reviewsCount: 16,
        image: "images/products/IMG-20250722-WA0012.jpg",
        description: "Vitrine réfrigérée professionnelle Smart STCDV-890 avec porte vitrée et éclairage LED. Idéale pour boutiques, restaurants et épiceries à Dakar.",
        features: ["Porte vitrée transparente", "Éclairage LED intérieur", "Étagères réglables en verre", "Compresseur silencieux professionnel", "Capacité de stockage commerciale"],
        specs: { "Modèle": "STCDV-890", "Marque": "Smart Technology", "Usage": "Professionnel / Commercial", "Type": "Vitrine réfrigérée", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "smart-cong-coffre-petit",
        name: "Congélateur Coffre Smart Technology 100L",
        category: "freezers",
        categoryDisplay: "Congélateurs",
        price: 129000,
        rating: 4.6,
        reviewsCount: 22,
        image: "images/products/IMG-20250728-WA0008.jpg",
        description: "Congélateur coffre compact Smart Technology avec technologie Fast Cooling. Idéal pour les petits foyers. Couvercle double avec vitrages pour un accès facile.",
        features: ["Technologie Fast Cooling (refroidissement rapide)", "Couvercle isolant haute performance", "Panier de rangement suspendu", "Tropicalisé pour le climat chaud", "Réglage de température mécanique"],
        specs: { "Marque": "Smart Technology", "Type": "Coffre horizontal", "Capacité": "~100 Litres", "Classe climatique": "T (Tropicalisé)", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "smart-cong-coffre-grand",
        name: "Congélateur Coffre Smart Technology Grand Modèle",
        category: "freezers",
        categoryDisplay: "Congélateurs",
        price: 195000,
        rating: 4.8,
        reviewsCount: 29,
        image: "images/products/IMG-20250728-WA0016.jpg",
        description: "Grand congélateur coffre Smart Technology avec double vitre intérieure et panier de rangement. Capacité généreuse pour stocker viandes, poissons et surgelés en grande quantité.",
        features: ["Grande capacité pour familles nombreuses", "Double vitrage intérieur", "Panier de rangement amovible", "Serrure de sécurité à clé", "Isolation thermique renforcée (autonomie coupure 36h)"],
        specs: { "Marque": "Smart Technology", "Type": "Coffre horizontal grand modèle", "Isolation": "36h sans courant", "Classe climatique": "T (Tropicalisé)", "Garantie": "1 An" },
        featured: true
    },
    {
        id: "smart-stmls-8h",
        name: "Machine à Laver Smart STMLS-8H Semi-automatique 8kg",
        category: "washing_machines",
        categoryDisplay: "Machines à Laver",
        price: 89000,
        rating: 4.7,
        reviewsCount: 43,
        image: "images/products/IMG-20250722-WA0009.jpg",
        description: "Machine à laver semi-automatique Smart STMLS-8H à double cuve. Lavage cyclonique puissant et essorage efficace. La solution idéale pour un linge propre à Dakar.",
        features: ["Lavage cyclonique puissant", "Double cuve (lavage + essorage séparés)", "Capacité 8 kg en lavage", "Facile d'utilisation et d'entretien", "Résistante et durable"],
        specs: { "Modèle": "STMLS-8H", "Marque": "Smart Technology", "Capacité": "8 kg", "Type": "Semi-automatique double cuve", "Garantie": "1 An" },
        featured: true
    },
    {
        id: "smart-stmls-7h",
        name: "Machine à Laver Smart STMLS-7H Semi-automatique 7kg",
        category: "washing_machines",
        categoryDisplay: "Machines à Laver",
        price: 69000,
        rating: 4.5,
        reviewsCount: 31,
        image: "images/products/IMG-20250722-WA0011.jpg",
        description: "Machine à laver semi-automatique Smart STMLS-7H, 7 kg. Compacte et économique, parfaite pour les petits foyers. Couvercle transparent pour surveiller le linge.",
        features: ["Capacité 7 kg", "Couvercle transparent bleu", "Double cuve efficace", "Consommation d'eau optimisée", "Programmes simplifiés"],
        specs: { "Modèle": "STMLS-7H", "Marque": "Smart Technology", "Capacité": "7 kg", "Type": "Semi-automatique double cuve", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "roch-rwm-80si-h",
        name: "Machine à Laver Roch RWM-80SI-H Inverter 8kg",
        category: "washing_machines",
        categoryDisplay: "Machines à Laver",
        price: 195000,
        rating: 4.9,
        reviewsCount: 38,
        image: "images/products/IMG-20250728-WA0012.jpg",
        description: "Machine à laver frontale Roch RWM-80SI-H Inverter 8kg, 1400 tr/min. Moteur Inverter garanti 10 ans. Classe A+++, lavage rapide en 15 min. La référence en machines à laver à Dakar.",
        features: ["Moteur Inverter garanti 10 ans", "Classe énergétique A+++", "Lavage rapide Quick Wash 15 min", "1400 tours/minute", "Programmes : Coton, Jean, Synthétique, Laine, Délicat"],
        specs: { "Modèle": "RWM-80SI-H", "Marque": "Roch", "Capacité": "8 kg", "Vitesse essorage": "1400 RPM", "Classe": "A+++", "Garantie": "2 Ans (moteur 10 ans)" },
        featured: true
    },
    {
        id: "roch-rsf-1804-d",
        name: "Ventilateur sur Pied Roch RSF-1804-D 18 Pouces",
        category: "ventilateurs",
        categoryDisplay: "Ventilateurs",
        price: 29000,
        rating: 4.8,
        reviewsCount: 57,
        image: "images/products/IMG-20250728-WA0013.jpg",
        description: "Ventilateur sur pied Roch RSF-1804-D 18 pouces avec design premium noir et or. Puissant, silencieux et élégant. 3 vitesses avec oscillation automatique.",
        features: ["Design premium noir & or", "18 pouces de diamètre pour un brassage maximal", "3 vitesses avec oscillation auto", "Hauteur réglable", "Panneau de commande intégré sur le pied"],
        specs: { "Modèle": "RSF-1804-D", "Marque": "Roch", "Taille": "18 pouces", "Vitesses": "3", "Couleur": "Noir / Or", "Garantie": "1 An" },
        featured: true
    },
    {
        id: "enduro-micro-ondes",
        name: "Micro-ondes Enduro 20L Noir",
        category: "accessories",
        categoryDisplay: "Électroménager Cuisine",
        price: 45000,
        rating: 4.5,
        reviewsCount: 24,
        image: "images/products/WhatsApp Image 2026-05-03 at 11.48.32.jpeg",
        description: "Micro-ondes Enduro 20 litres en finition noire élégante. Puissance réglable, minuterie précise et fonction décongélation. Idéal pour réchauffer et cuisiner rapidement.",
        features: ["Capacité 20 litres", "Puissance réglable (plusieurs niveaux)", "Minuterie jusqu'à 30 minutes", "Fonction décongélation", "Porte à charnière solide avec poignée"],
        specs: { "Marque": "Enduro", "Capacité": "20 Litres", "Puissance": "700 W", "Couleur": "Noir", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "enduro-fer-vapeur",
        name: "Fer à Repasser Vapeur Enduro",
        category: "bouilliores",
        categoryDisplay: "Accessoires",
        price: 15000,
        rating: 4.6,
        reviewsCount: 36,
        image: "images/products/WhatsApp Image 2026-05-03 at 11.48.32 (1).jpeg",
        description: "Fer à repasser vapeur Enduro avec semelle céramique anti-adhérente. Léger, puissant et ergonomique. Parfait pour repasser tous types de tissus en douceur.",
        features: ["Semelle céramique anti-adhérente", "Vapeur continue puissante", "Débit vapeur réglable", "Poignée ergonomique antidérapante", "Arrêt automatique de sécurité"],
        specs: { "Marque": "Enduro", "Semelle": "Céramique", "Puissance": "2200 W", "Couleur": "Noir / Gris", "Garantie": "1 An" },
        featured: false
    },
    {
        id: "enduro-bouilloire",
        name: "Bouilloire Enduro Électrique Noire",
        category: "bouilliores",
        categoryDisplay: "Accessoires",
        price: 15000,
        rating: 4.7,
        reviewsCount: 44,
        image: "images/products/WhatsApp Image 2026-05-03 at 13.11.37.jpeg",
        description: "Bouilloire électrique Enduro en acier inoxydable noir avec indicateur de niveau d'eau. Ébullition rapide et arrêt automatique. Design moderne pour votre cuisine.",
        features: ["Corps en acier inoxydable", "Indicateur de niveau d'eau visible", "Arrêt automatique à ébullition", "Base rotative 360°", "Poignée isolée thermiquement"],
        specs: { "Marque": "Enduro", "Capacité": "1.7 Litres", "Puissance": "2200 W", "Couleur": "Noir inox", "Garantie": "1 An" },
        featured: false
    }
];

async function importProducts() {
    try {
        console.log("Suppression des anciennes télévisions de la base de données...");
        await pool.query("DELETE FROM produits WHERE category = 'televisions'");
    } catch (err) {
        console.error("Erreur lors de la suppression des télévisions :", err.message);
    }

    console.log(`Import de ${PRODUCTS.length} produits...`);
    let success = 0;
    let errors = 0;

    for (const p of PRODUCTS) {
        try {
            await pool.query(
                `INSERT INTO produits (id, name, category, category_display, price, rating, reviews_count, image, description, features, specs, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           category = EXCLUDED.category,
           category_display = EXCLUDED.category_display,
           price = EXCLUDED.price,
           rating = EXCLUDED.rating,
           reviews_count = EXCLUDED.reviews_count,
           image = EXCLUDED.image,
           description = EXCLUDED.description,
           features = EXCLUDED.features,
           specs = EXCLUDED.specs,
           featured = EXCLUDED.featured`,
                [
                    p.id, p.name, p.category, p.categoryDisplay, p.price, p.rating,
                    p.reviewsCount, p.image, p.description,
                    JSON.stringify(p.features), JSON.stringify(p.specs), p.featured
                ]
            );
            console.log(`✓ ${p.name}`);
            success++;
        } catch (err) {
            console.error(`✗ Erreur pour ${p.name}:`, err.message);
            errors++;
        }
    }

    console.log(`\nTerminé : ${success} produits importés, ${errors} erreurs.`);
    await pool.end();
}

importProducts();