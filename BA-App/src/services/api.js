const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const API_TOKEN = 'YOUR_WEBFLOW_API_TOKEN'; // To be provided by user or use env

// Mock data to fulfill requirements if API fails or is not configured
const MOCK_DATA = {
  products: Array.from({ length: 12 }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Berthout Product ${i + 1}`,
    price: Math.floor(Math.random() * 50) + 10,
    category: i % 2 === 0 ? 'Kledij' : 'Schoolbenodigdheden',
    image: `https://picsum.photos/seed/prod${i}/400/300`,
    description: 'Dit is een kwaliteitsvol product van het Berthoutinstituut.',
    rating: (Math.random() * 2 + 3).toFixed(1),
    isNew: i < 3,
    isSale: i > 8,
  })),
  news: Array.from({ length: 8 }, (_, i) => ({
    id: `news-${i + 1}`,
    title: `Nieuwsbericht ${i + 1}`,
    excerpt: 'Lees hier alles over de laatste ontwikkelingen op onze campus.',
    content: 'Volledige tekst van het nieuwsbericht...',
    category: i % 2 === 0 ? 'Event' : 'Info',
    date: new Date().toLocaleDateString(),
    image: `https://picsum.photos/seed/news${i}/400/300`,
  })),
  campuses: [
    { id: 'botaniek', name: 'Botaniek', color: '#e85597', image: 'https://picsum.photos/seed/bot/400/300' },
    { id: 'caputsteen', name: 'Caputsteen', color: '#1f62a9', image: 'https://picsum.photos/seed/cap/400/300' },
    { id: 'de-beemden', name: 'De Beemden', color: '#1cafc9', image: 'https://picsum.photos/seed/bee/400/300' },
    { id: 'basisverpleegkunde', name: 'Basisverpleegkunde', color: '#e85597', image: 'https://picsum.photos/seed/ver/400/300' },
    { id: 'nekkerspoel', name: 'Nekkerspoel', color: '#c6c334', image: 'https://picsum.photos/seed/nek/400/300' },
    { id: 'pitzemburg', name: 'Pitzemburg', color: '#a6398a', image: 'https://picsum.photos/seed/pit/400/300' },
    { id: 'stassart', name: 'Stassart', color: '#f5a528', image: 'https://picsum.photos/seed/sta/400/300' },
    { id: 'zandpoort', name: 'Zandpoort', color: '#e4352d', image: 'https://picsum.photos/seed/zan/400/300' },
  ],
};

export const fetchProducts = async () => {
  try {
    // In a real app: const response = await fetch(`${WEBFLOW_API_BASE}/collections/ID/items`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    // const json = await response.json();
    // return json.items;
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_DATA.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchNews = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_DATA.news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchCampuses = async () => {
    return MOCK_DATA.campuses;
};
