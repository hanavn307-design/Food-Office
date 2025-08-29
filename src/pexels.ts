// src/pexels.ts
type PexelsPhoto = {
  src: { original: string; large: string; landscape: string; medium: string };
  url: string;
  photographer: string;
};

const API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_PEXELS_API_KEY) ||
  (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_PEXELS_API_KEY as string)) ||
  "";

const API = "https://api.pexels.com/v1/search";

const queryOverrides: Record<string, string> = {
  "Cơm tấm": "Cơm tấm sườn bì chả",
  "Bún bò": "Bún bò Huế",
  "Phở bò": "Phở bò Việt Nam",
  "Bánh mì": "Bánh mì thịt Việt Nam",
  "Bún chả": "Bún chả Hà Nội",
  "Hủ tiếu": "Hủ tiếu Nam Vang",
  "Bánh canh": "Bánh canh cua",
  "Gỏi cuốn": "Gỏi cuốn tôm thịt",
  "Bún riêu": "Bún riêu cua",
  "Bánh bèo": "Bánh bèo Huế",
  // ... thêm overrides nếu cần theo đúng danh sách 30 món của dự án
};

function queriesFor(dish: string) {
  const first = queryOverrides[dish] || dish;
  return [
    `${first} món Việt`,
    `${first} Vietnamese dish`,
    `${first} food`
  ];
}

async function searchOnce(q: string): Promise<PexelsPhoto | null> {
  const url =
    `${API}?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape&locale=vi-VN`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.photos?.[0] ?? null;
}

export async function findBestPhoto(dish: string): Promise<PexelsPhoto | null> {
  if (!API_KEY) return null;
  for (const q of queriesFor(dish)) {
    const photo = await searchOnce(q);
    if (photo) return photo;
  }
  return null;
}

// ---- Cache layer in LocalStorage
const CACHE_KEY = "pexelsImageMap_v1";
type ImageMap = Record<string, { src: string; alt: string; credit?: string }>;
let imageMap: ImageMap = {};
if (typeof window !== "undefined") {
  try { imageMap = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch {}
}

export async function getImageForDish(dish: string) {
  if (imageMap[dish]) return imageMap[dish];

  const photo = await findBestPhoto(dish);
  if (photo) {
    const entry = {
      src: photo.src.landscape || photo.src.large,
      alt: dish,
      credit: photo.photographer ? `${photo.photographer} / Pexels` : "Pexels",
    };
    imageMap[dish] = entry;
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(imageMap)); } catch {}
    return entry;
  }
  return { src: "/fallback.jpg", alt: dish };
}
