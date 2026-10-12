/* =========================================================
   PORTFOLIO UNIQUE
   Chaque étude de cas n'est déclarée qu'une seule fois ici.
   - categories : "ux" (page Design UX/UI) et/ou "graphique"
     (page Design graphique). Un projet peut avoir les deux.
   - featured : true pour l'afficher sur la page d'accueil.
   - Les projets s'affichent du plus récent au plus ancien (year) ;
     à année égale, l'ordre de cette liste est conservé.
   ========================================================= */
const PROJECTS = [
    {
        title: 'Tyropatina',
        year: '2026', 
        href: 'portfolio-tyropatina.html',
        cover: 'resources/tyropatina/cover.png',
        description: "Création d'identité visuelle pour un bar à flan fictif, à la croisée entre tradition et gourmandise.",
        tags: ['Identité visuelle', 'Restauration'],
        categories: ['graphique'],
        featured: true
    },
    {
        title: 'Au Cast-On',
        year: '2026',
        href: 'portfolio-au-cast-on.html',
        cover: 'resources/au-cast-on/cover.png',
        description: "Création d'identité visuelle pour le lancement d'une boutique de laines et salon de thé à Lille.",
        tags: ['Identité visuelle', 'Commerce'],
        categories: ['graphique'],
        featured: true
    },
    {
        title: 'Delgrange Voyages',
        year: '2026',
        href: 'realisations-delgrange.html',
        cover: 'resources/delgrange/delgrange-cover.png',
        description: "Conception d'un MVP dans le cadre du développement d'une nouvelle offre dédiée aux CSE.",
        tags: ['Desktop & Mobile', 'B2B2C', 'Tourisme'],
        categories: ['ux'],
        featured: true
    },
    {
        title: 'Pimpantes',
        year: '2026', 
        href: 'portfolio-pimpantes.html',
        cover: 'resources/pimpantes/cover.png',
        description: "Refonte de site internet et identité visuelle pour un dépôt-vente de luxe à La Madeleine (projet non-officiel).",
        tags: ['Identité visuelle', 'Site internet', 'Mode'],
        categories: ['graphique'],
        featured: true
    },
    {
        title: 'Naomi x Valiuz',
        year: '2025',
        href: 'realisations-naomi.html',
        cover: 'resources/naomi/naomi-cover.png',
        description: "Conception d'un nouveau parcours structurant pour Naomi, la solution B2C de l'alliance Valiuz.",
        tags: ['Mobile', 'B2C', 'Retail media'],
        categories: ['ux'],
        featured: true
    },
    {
        title: 'Inouk Challenge',
        year: '2025',
        href: 'realisations-inouk-v4.html',
        cover: 'resources/inouk-v4/inouk-cover.png',
        description: "Identification des irritants et refonte de l'application mobile en conséquence.",
        tags: ['Mobile', 'B2C', 'Associatif'],
        categories: ['ux'],
        featured: true
    },
    {
        title: 'CUBE',
        year: '2024',
        href: 'realisations-cube.html',
        cover: 'resources/cube/cube-cover.png',
        description: "Refonte d'une page vitrine pour l'une des directions IT de Société Générale.",
        tags: ['Desktop', 'B2E', 'Bancaire'],
        categories: ['ux'],
        featured: true
    }
];

const CATEGORY_LABELS = {
    ux: 'Design UX/UI',
    graphique: 'Design graphique'
};
