export type NavLink = {
  label: string;
  href: string;
};

export type BrandConstants = {
  name: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const brand: BrandConstants = {
  name: "Lumière",
  tagline: "Curated for the discerning.",
  ctaLabel: "Shop Now",
  ctaHref: "#products",
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
};

export type Category = {
  id: string;
  label: string;
};

export const categories: Category[] = [
  { id: "all", label: "All Products" },
  { id: "lighting", label: "Lighting" },
  { id: "furniture", label: "Furniture" },
  { id: "decor", label: "Decor" },
  { id: "textiles", label: "Textiles" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Arc Floor Lamp",
    category: "lighting",
    price: 349,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 124,
    image: "https://s7d9.scene7.com/is/image/NationalBusinessFurniture/LTS-226282_Black_Lifestyle?hei=750&wid=750",
    badge: "Sale",
    description: "Sculptural brass arc lamp with a linen shade. Adjustable height for any living space.",
  },
  {
    id: 2,
    name: "Linen Cloud Sofa",
    category: "furniture",
    price: 1890,
    rating: 4.9,
    reviewCount: 87,
    image: "https://images.thdstatic.com/productImages/341c4519-e643-4e65-b6f4-4a0a7a33209e/svn/white-magic-home-sectional-sofas-mh-121we-sct-s4-64_600.jpg",
    badge: "Bestseller",
    description: "Deep-seated modular sofa in natural linen. Sink-in comfort with a clean silhouette.",
  },
  {
    id: 3,
    name: "Travertine Side Table",
    category: "furniture",
    price: 520,
    rating: 4.7,
    reviewCount: 63,
    image: "https://www.mcgeeandco.com/cdn/shop/files/TravertineSideTable-MFRN1532-NAT-OS-MAIN-T.jpg?v=1697647458",
    description: "Solid travertine stone table with a matte finish. A timeless accent for any room.",
  },
  {
    id: 4,
    name: "Wabi-Sabi Ceramic Vase",
    category: "decor",
    price: 98,
    originalPrice: 120,
    rating: 4.6,
    reviewCount: 211,
    image: "https://m.media-amazon.com/images/I/61gB0gX5+BL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    description: "Hand-thrown stoneware vase with a reactive glaze. Each piece is uniquely imperfect.",
  },
  {
    id: 5,
    name: "Merino Throw Blanket",
    category: "textiles",
    price: 185,
    rating: 4.9,
    reviewCount: 302,
    image: "https://www.roughlinen.com/cdn/shop/files/Wool_throw_grey_2_2000x.jpg?v=1767634500",
    badge: "New",
    description: "100% merino wool throw in a herringbone weave. Warm, lightweight, and buttery soft.",
  },
  {
    id: 6,
    name: "Pendant Globe Light",
    category: "lighting",
    price: 210,
    rating: 4.5,
    reviewCount: 78,
    image: "https://cdn.media.amplience.net/i/shadesoflight/PE18153.0.PE18153SB.jpg",
    description: "Mouth-blown glass globe with an aged brass fitting. Warm 2700K Edison bulb included.",
  },
  {
    id: 7,
    name: "Boucle Accent Chair",
    category: "furniture",
    price: 740,
    originalPrice: 890,
    rating: 4.8,
    reviewCount: 145,
    image: "https://modway.com/cdn/shop/files/EEI-6996-RIV_7.jpg?v=1733884435&width=3840",
    badge: "Sale",
    description: "Curved boucle upholstered chair on solid oak legs. A sculptural statement piece.",
  },
  {
    id: 8,
    name: "Linen Cushion Set",
    category: "textiles",
    price: 75,
    rating: 4.4,
    reviewCount: 189,
    image: "https://entertheloft.com/cdn/shop/products/DSC03672.jpg?v=1654779903&width=1445",
    description: "Set of two stonewashed linen cushion covers in natural tones. Zipper closure.",
  },
];