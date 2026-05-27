import { Colors } from "../theme/theme";

const WEBFLOW_API_BASE = "https://api.webflow.com/v2";
const API_TOKEN =
  "29016d5a178dedb40069de08806c6fffff03d75132e9ef00ebc3443105ea2404";
const SITE_ID = "69e8d70daa8225ba341a79ad";

const COLLECTIONS = {
  PRODUCTS: "69e8e3d0ec3be75168ebecd2",
  CATEGORIES: "69e8e3d0ec3be75168ebecd1",
  ARTICLES: "6a02c1d3d260765318d62d01",
  LOCATIONS: "6a0c049f1b24eef3d4e7e4fb",
  STROMEN: "6a0c0c1b5d0406506d49ade8",
  STUDIEKEUZES: "6a02c23125967f34c4df5fd3",
};

const fetchWebflow = async (collectionId) => {
  try {
    const response = await fetch(
      `${WEBFLOW_API_BASE}/collections/${collectionId}/items`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "accept-version": "2.0.0",
        },
      },
    );
    const json = await response.json();
    return json.items || [];
  } catch (error) {
    console.error(`Error fetching collection ${collectionId}:`, error);
    throw error;
  }
};

const getCampusColor = (name, apiColor) => {
  if (apiColor && apiColor !== "") return apiColor;

  const campusKey = name
    .toLowerCase()
    .replace(/\s/g, "")
    .replace("beemden", "Beemden"); // Handle camelCase for deBeemden

  return Colors.campus[campusKey] || Colors.primary;
};

// Mock data to fulfill requirements if API fails or is not configured
const MOCK_DATA = {
  products: Array.from({ length: 12 }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Berthout Product ${i + 1}`,
    price: Math.floor(Math.random() * 50) + 10,
    category: i % 2 === 0 ? "Kledij" : "Schoolbenodigdheden",
    image: `https://picsum.photos/seed/prod${i}/400/300`,
    description: "Dit is een kwaliteitsvol product van het Berthoutinstituut.",
    rating: (Math.random() * 2 + 3).toFixed(1),
    isNew: i < 3,
    isSale: i > 8,
  })),
  news: Array.from({ length: 8 }, (_, i) => ({
    id: `news-${i + 1}`,
    title: `Nieuwsbericht ${i + 1}`,
    excerpt: "Lees hier alles over de laatste ontwikkelingen op onze campus.",
    content: "Volledige tekst van het nieuwsbericht...",
    category: i % 2 === 0 ? "Event" : "Info",
    date: new Date().toLocaleDateString(),
    image: `https://picsum.photos/seed/news${i}/400/300`,
  })),
  campuses: [
    {
      id: "botaniek",
      name: "Botaniek",
      color: "#e85597",
      image: "https://picsum.photos/seed/bot/400/300",
    },
    {
      id: "caputsteen",
      name: "Caputsteen",
      color: "#1f62a9",
      image: "https://picsum.photos/seed/cap/400/300",
    },
    {
      id: "de-beemden",
      name: "De Beemden",
      color: "#1cafc9",
      image: "https://picsum.photos/seed/bee/400/300",
    },
    {
      id: "basisverpleegkunde",
      name: "Basisverpleegkunde",
      color: "#e85597",
      image: "https://picsum.photos/seed/ver/400/300",
    },
    {
      id: "nekkerspoel",
      name: "Nekkerspoel",
      color: "#c6c334",
      image: "https://picsum.photos/seed/nek/400/300",
    },
    {
      id: "pitzemburg",
      name: "Pitzemburg",
      color: "#a6398a",
      image: "https://picsum.photos/seed/pit/400/300",
    },
    {
      id: "stassart",
      name: "Stassart",
      color: "#f5a528",
      image: "https://picsum.photos/seed/sta/400/300",
    },
    {
      id: "zandpoort",
      name: "Zandpoort",
      color: "#e4352d",
      image: "https://picsum.photos/seed/zan/400/300",
    },
  ],
  stromen: [
    "Technologie",
    "Zorg",
    "Economie",
    "Talen",
    "Sport",
    "Kunst",
    "Wetenschappen",
  ],
  studiekeuzes: [
    {
      id: "1",
      name: "Informatica",
      interests: ["Technologie", "Wetenschappen"],
    },
    { id: "2", name: "Verpleegkunde", interests: ["Zorg", "Wetenschappen"] },
    { id: "3", name: "Bedrijfskunde", interests: ["Economie", "Talen"] },
    { id: "4", name: "Lichamelijke Opvoeding", interests: ["Sport"] },
    {
      id: "5",
      name: "Grafische Vormgeving",
      interests: ["Kunst", "Technologie"],
    },
    { id: "6", name: "Talen & Literatuur", interests: ["Talen", "Kunst"] },
  ],
};

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

export const fetchProducts = async () => {
  try {
    const items = await fetchWebflow(COLLECTIONS.PRODUCTS);

    if (!items || items.length === 0) {
      return MOCK_DATA.products;
    }

    return items.map((item) => {
      // Robust price extraction: try various common slugs and case variations
      let rawPrice =
        item.fieldData.price ??
        item.fieldData.Price ??
        item.fieldData.prijs ??
        item.fieldData.Prijs ??
        item.price ??
        item.Price ??
        0;

      if (typeof rawPrice === "string") {
        rawPrice =
          parseFloat(rawPrice.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
      }

      return {
        id: item.id,
        name: item.fieldData.name,
        price: Number(rawPrice),
        category: item.fieldData.category || "Algemeen",
        image:
          item.fieldData.image?.url ||
          item.fieldData["main-image"]?.url ||
          item.fieldData["product-image"]?.url ||
          `https://picsum.photos/seed/${item.id}/400/300`,
        description:
          item.fieldData.description || item.fieldData.beschrijving || "",
        rating: item.fieldData.rating || 5,
        isNew: item.fieldData["is-new"] || item.fieldData.nieuw || false,
        isSale: item.fieldData["is-sale"] || item.fieldData.promotie || false,
      };
    });
  } catch (error) {
    console.warn("Falling back to mock products due to API error:", error);
    return MOCK_DATA.products;
  }
};

export const fetchNews = async () => {
  try {
    const items = await fetchWebflow(COLLECTIONS.ARTICLES);

    if (!items || items.length === 0) {
      return MOCK_DATA.news;
    }

    return items.map((item) => {
      const fullContent =
        item.fieldData["article-text"] ||
        item.fieldData["post-body"] ||
        item.fieldData.content ||
        "";

      return {
        id: item.id,
        title: item.fieldData.name,
        excerpt:
          item.fieldData.summary ||
          item.fieldData.excerpt ||
          stripHtml(fullContent).substring(0, 100) + "...",
        content: fullContent,
        category: item.fieldData.category || "Nieuws",
        date: item.fieldData["published-on"]
          ? new Date(item.fieldData["published-on"]).toLocaleDateString()
          : new Date().toLocaleDateString(),
        image:
          item.fieldData["article-image"]?.url ||
          item.fieldData["main-image"]?.url ||
          `https://picsum.photos/seed/${item.id}/400/300`,
      };
    });
  } catch (error) {
    console.warn("Falling back to mock news due to API error:", error);
    return MOCK_DATA.news;
  }
};

export const fetchCampuses = async () => {
  try {
    const items = await fetchWebflow(COLLECTIONS.LOCATIONS);

    if (!items || items.length === 0) {
      return MOCK_DATA.campuses;
    }

    return items.map((item) => ({
      id: item.id,
      name: item.fieldData.name,
      color: getCampusColor(item.fieldData.name, item.fieldData.color),
      image:
        item.fieldData.image?.url ||
        `https://picsum.photos/seed/${item.id}/400/300`,
    }));
  } catch (error) {
    console.warn("Falling back to mock campuses due to API error:", error);
    return MOCK_DATA.campuses;
  }
};

export const fetchCategories = async () => {
  try {
    const items = await fetchWebflow(COLLECTIONS.CATEGORIES);
    if (!items || items.length === 0)
      return ["Alles", "Kledij", "Schoolbenodigdheden"];
    return ["Alles", ...items.map((item) => item.fieldData.name)];
  } catch (error) {
    console.warn("Falling back to mock categories:", error);
    return ["Alles", "Kledij", "Schoolbenodigdheden"];
  }
};

export const fetchStromen = async () => {
  try {
    const items = await fetchWebflow(COLLECTIONS.STROMEN);
    if (!items || items.length === 0) return MOCK_DATA.stromen;
    return items.map((item) => item.fieldData.name);
  } catch (error) {
    console.warn("Falling back to mock stromen:", error);
    return MOCK_DATA.stromen;
  }
};

export const fetchStudiekeuzes = async () => {
  try {
    const items = await fetchWebflow(COLLECTIONS.STUDIEKEUZES);
    if (!items || items.length === 0) return MOCK_DATA.studiekeuzes;
    return items.map((item) => ({
      id: item.id,
      name: item.fieldData.name,
      interests: item.fieldData.interests
        ? item.fieldData.interests.split(",")
        : [],
    }));
  } catch (error) {
    console.warn("Falling back to mock studiekeuzes:", error);
    return MOCK_DATA.studiekeuzes;
  }
};
