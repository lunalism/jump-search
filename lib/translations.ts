type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'de' | 'es' | 'it';
type IconName = 'Mail' | 'Newspaper' | 'Map' | 'NotebookPen' | 'Users';

type TranslationType = {
    [key in Locale]: {
        profile: string;
        logout: string;
        login: string;
        inputPlaceholder: string;
        quickLinks: Array<{
            text: string;
            icon: IconName;
        }>;
        recommendations: {
            title: string;
            items: string[];
            descriptions: string[];
        };
    }
};

// Lucide React 아이콘 이름을 문자열로 저장, 동적 임포트는 컴포넌트에서 처리
export const translations: TranslationType = {
    ko: {
        profile: '프로필',
        logout: '로그아웃',
        login: '로그인',
        inputPlaceholder: '검색어를 입력하세요 (예: 서울 맛집, IT 뉴스)...',
        quickLinks: [
            { text: '메일', icon: 'Mail' },
            { text: '뉴스', icon: 'Newspaper' },
            { text: '지도', icon: 'Map' },
            { text: '블로그', icon: 'NotebookPen' },
            { text: '커뮤니티', icon: 'Users' },
        ],
        recommendations: {
            title: '추천',
            items: ['서울 여행 가이드', 'IT 트렌드 2025', '요리 레시피'],
            descriptions: [
                '서울의 주요 명소를 소개합니다.',
                '2025년 IT 업계 동향을 확인하세요.',
                '간단한 요리법을 배워보세요.',
            ],
        },
    },
    en: {
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        inputPlaceholder: 'Search... (e.g., Seoul food, IT news)',
        quickLinks: [
            { text: 'Mails', icon: 'Mail' },
            { text: 'Newspaper', icon: 'Newspaper' },
            { text: 'Map', icon: 'Map' },
            { text: 'NotebookPen', icon: 'NotebookPen' },
            { text: 'Users', icon: 'Users' },
        ],
        recommendations: {
            title: 'Recommendations',
            items: ['Seoul Travel Guide', 'IT Trends 2025', 'Cooking Recipes'],
            descriptions: [
                'Explore major attractions in Seoul.',
                'Check out IT industry trends for 2025.',
                'Learn simple cooking recipes.',
            ],
        },
    },
    ja: {
        profile: 'プロフィール',
        logout: 'ログアウト',
        login: 'ログイン',
        inputPlaceholder: '検索語を入力してください (例: ソウル レストラン、IT ニュース)...',
        quickLinks: [
            { text: 'メール', icon: 'Mail' },
            { text: '新聞', icon: 'Newspaper' },
            { text: '地図', icon: 'Map' },
            { text: 'ブログ', icon: 'NotebookPen' },
            { text: 'コミュニティ', icon: 'Users' },
        ],
        recommendations: {
            title: 'おすすめ',
            items: ['ソウル旅行ガイド', 'ITトレンド2025', '料理レシピ'],
            descriptions: [
                'ソウルの主要な観光地を紹介します。',
                '2025年のIT業界の動向を確認してください。',
                '簡単な料理法を学びましょう。',
            ],
        },
    },
    zh: {
        profile: '个人资料',
        logout: '退出登录',
        login: '登录',
        inputPlaceholder: '输入搜索词 (如: 首尔美食、IT新闻)...',
        quickLinks: [
            { text: '邮件', icon: 'Mail' },
            { text: '新闻', icon: 'Newspaper' },
            { text: '地图', icon: 'Map' },
            { text: '博客', icon: 'NotebookPen' },
            { text: '社区', icon: 'Users' },
        ],
        recommendations: {
            title: '推荐',
            items: ['首尔旅行指南', 'IT趋势2025', '烹饪食谱'],
            descriptions: [
                '介绍首尔的主要景点。',
                '查看2025年IT行业趋势。',
                '学习简单的烹饪食谱。',
            ],
        },
    },
    fr: {
        profile: 'Profil',
        logout: 'Déconnexion',
        login: 'Connexion',
        inputPlaceholder: 'Rechercher... (ex. : cuisine de Séoul, actualités IT)',
        quickLinks: [
            { text: 'Courriels', icon: 'Mail' },
            { text: 'Journal', icon: 'Newspaper' },
            { text: 'Carte', icon: 'Map' },
            { text: 'Carnet', icon: 'NotebookPen' },
            { text: 'Communauté', icon: 'Users' },
        ],
        recommendations: {
            title: 'Recommandations',
            items: ['Guide de voyage à Séoul', 'Tendances IT 2025', 'Recettes de cuisine'],
            descriptions: [
                'Découvrez les principales attractions de Séoul.',
                'Consultez les tendances de l\'industrie IT pour 2025.',
                'Apprenez des recettes de cuisine simples.',
            ],
        },
    },
    de: {
        profile: 'Profil',
        logout: 'Abmelden',
        login: 'Anmelden',
        inputPlaceholder: 'Suchbegriff eingeben (z. B. Seoul Essen, IT Nachrichten)...',
        quickLinks: [
            { text: 'E-Mails', icon: 'Mail' },
            { text: 'Zeitung', icon: 'Newspaper' },
            { text: 'Karte', icon: 'Map' },
            { text: 'Notizbuch', icon: 'NotebookPen' },
            { text: 'Community', icon: 'Users' },
        ],
        recommendations: {
            title: 'Empfehlungen',
            items: ['Seoul Reiseführer', 'IT-Trends 2025', 'Kochrezepte'],
            descriptions: [
                'Entdecken Sie die wichtigsten Sehenswürdigkeiten in Seoul.',
                'Informieren Sie sich über IT-Branchentrends für 2025.',
                'Lernen Sie einfache Kochrezepte.',
            ],
        },
    },
    es: {
        profile: 'Perfil',
        logout: 'Cerrar sesión',
        login: 'Iniciar sesión',
        inputPlaceholder: 'Buscar... (ej. comida de Seúl, noticias de TI)',
        quickLinks: [
            { text: 'Correos', icon: 'Mail' },
            { text: 'Periódico', icon: 'Newspaper' },
            { text: 'Mapa', icon: 'Map' },
            { text: 'Cuaderno', icon: 'NotebookPen' },
            { text: 'Comunidad', icon: 'Users' },
        ],
        recommendations: {
            title: 'Recomendaciones',
            items: ['Guía de viaje a Seúl', 'Tendencias de TI 2025', 'Recetas de cocina'],
            descriptions: [
                'Explora las principales atracciones de Seúl.',
                'Consulta las tendencias de la industria TI para 2025.',
                'Aprende recetas de cocina simples.',
            ],
        },
    },
    it: {
        profile: 'Profilo',
        logout: 'Disconnessione',
        login: 'Accesso',
        inputPlaceholder: 'Cerca... (es. cibo di Seoul, notizie IT)',
        quickLinks: [
            { text: 'Email', icon: 'Mail' },
            { text: 'Giornale', icon: 'Newspaper' },
            { text: 'Mappa', icon: 'Map' },
            { text: 'Taccuino', icon: 'NotebookPen' },
            { text: 'Comunità', icon: 'Users' },
        ],
        recommendations: {
            title: 'Raccomandazioni',
            items: ['Guida di viaggio a Seoul', 'Tendenze IT 2025', 'Ricette di cucina'],
            descriptions: [
                'Esplora le principali attrazioni di Seoul.',
                'Scopri le tendenze del settore IT per il 2025.',
                'Impara semplici ricette di cucina.',
            ],
        },
    },
};