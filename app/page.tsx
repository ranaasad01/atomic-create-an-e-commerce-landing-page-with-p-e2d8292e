"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ArrowRight, ShoppingBag, Truck, RotateCcw, Shield, Sparkles, ChevronRight, Heart, Eye } from 'lucide-react';
import { brand, products, categories, type Product, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Margot Ellison",
    location: "London, UK",
    rating: 5,
    text: "The Arc Floor Lamp transformed my living room completely. The quality is exceptional and the packaging was beautiful. Lumière has become my go-to for everything home.",
    product: "Arc Floor Lamp",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQHYCvctcW1yaA/profile-displayphoto-scale_200_200/B4EZmdIcnjGUAY-/0/1759277862071?e=2147483647&v=beta&t=edJfzA3ZNoyn13uHnSeYyTFFh4qDD1TKNSfKdZOgnz4",
  },
  {
    id: 2,
    name: "Soren Vidal",
    location: "Copenhagen, DK",
    rating: 5,
    text: "I ordered the Linen Cloud Sofa after seeing it in a design magazine. It arrived in perfect condition and is even more beautiful in person. Worth every penny.",
    product: "Linen Cloud Sofa",
    avatar: "https://images.squarespace-cdn.com/content/v1/5e93afbd8dcb6c5cbc7c1e89/1586821140388-3R19E7C1TDYQ1VV9K6F7/headhots-soren-site-BARAK.jpg",
  },
  {
    id: 3,
    name: "Aiko Tanaka",
    location: "Tokyo, JP",
    rating: 5,
    text: "The Wabi-Sabi Ceramic Vase is exactly what I was looking for. Each piece truly is unique. I ordered three and they all have their own character. Stunning.",
    product: "Wabi-Sabi Ceramic Vase",
    avatar: "https://i.redd.it/joc4uvudpnf91.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary white-glove delivery on all orders over £200. Careful handling, every time.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not in love? Return any item within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "2-Year Guarantee",
    description: "Every piece is backed by our craftsmanship guarantee. Quality you can count on.",
  },
  {
    icon: Sparkles,
    title: "Curated Selection",
    description: "Each product is hand-selected by our design team for quality, beauty, and longevity.",
  },
];

const collectionFeatures = [
  {
    id: "c1",
    title: "The Warm Light Edit",
    subtitle: "Lighting",
    description:
      "Sculptural lamps and pendants that cast the perfect glow. From brass arcs to mouth-blown glass globes, each piece is a work of art that also happens to illuminate.",
    image: "https://i.ytimg.com/vi/dT6xcgVh3HY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQAGusrBL-QMD0Wjv_qCbQKBbvOw",
    cta: "Explore Lighting",
    href: "#products",
    accent: "bg-amber-50",
  },
  {
    id: "c2",
    title: "Natural Textures",
    subtitle: "Textiles",
    description:
      "Merino throws, stonewashed linen, and hand-loomed cushions in a palette drawn from the natural world. Softness you can see before you even touch it.",
    image: "https://cdn.naturettl.com/wp-content/uploads/2021/06/04103940/10-tips-for-photographing-patterns-and-textures-in-nature-13.jpg",
    cta: "Explore Textiles",
    href: "#products",
    accent: "bg-stone-50",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

const imageScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400 font-medium">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice != null
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
        <motion.img
          variants={imageScale}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3C/svg%3E";
          }}
        />
        {/* Badge */}
        {product.badge != null && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
              product.badge === "Sale"
                ? "bg-rose-500 text-white"
                : product.badge === "New"
                ? "bg-indigo-600 text-white"
                : "bg-slate-900 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setWished((w) => !w)}
            aria-label="Add to wishlist"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5"
          >
            <Heart
              size={14}
              className={wished ? "fill-rose-500 text-rose-500" : "text-slate-500"}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Quick view"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5"
          >
            <Eye size={14} className="text-slate-500" />
          </motion.button>
        </div>
        {/* Add to bag — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors duration-200">
            <ShoppingBag size={15} />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-indigo-500 mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-slate-900 text-[15px] leading-snug mb-1.5">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-base font-bold text-slate-900">
            £{product.price.toLocaleString()}
          </span>
          {product.originalPrice != null && (
            <>
              <span className="text-sm text-slate-400 line-through">
                £{product.originalPrice.toLocaleString()}
              </span>
              {discount != null && (
                <span className="text-xs font-semibold text-rose-500">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [email, setEmail] = useState("");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#faf9f7]">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-indigo-100/40 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.p
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-6"
            >
              <span className="w-6 h-px bg-indigo-400" />
              New Season Collection
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08] text-balance mb-6"
            >
              Objects that
              <br />
              <span className="text-indigo-600 italic">elevate</span> the
              <br />
              everyday.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-500 leading-relaxed max-w-md mb-10 text-pretty"
            >
              Lumière brings together the finest lighting, furniture, and decor
              from independent artisans and design studios. Each piece is chosen
              to last a lifetime.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-colors duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
              >
                Shop the Collection
                <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-800 text-sm font-semibold rounded-full border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
              >
                View Lookbook
              </motion.a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-200 w-full"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white overflow-hidden"
                  >
                    <img
                      src={`/images/avatar-customer-${i}.jpg`}
                      alt={`Customer ${i}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">4.9/5</span> from over 1,200 happy customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative hidden md:grid grid-cols-2 gap-4 h-[560px]"
          >
            <motion.div
              variants={slideInRight}
              className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5"
            >
              <img
                src="https://images.thdstatic.com/productImages/341c4519-e643-4e65-b6f4-4a0a7a33209e/svn/white-magic-home-sectional-sofas-mh-121we-sct-s4-64_600.jpg"
                alt="Linen Cloud Sofa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f1f5f9'/%3E%3C/svg%3E";
                }}
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5"
            >
              <img
                src="https://s7d9.scene7.com/is/image/NationalBusinessFurniture/LTS-226282_Black_Lifestyle?hei=750&wid=750"
                alt="Arc Floor Lamp"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='260' viewBox='0 0 300 260'%3E%3Crect width='300' height='260' fill='%23fef3c7'/%3E%3C/svg%3E";
                }}
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.14)] border border-black/5"
            >
              <img
                src="https://m.media-amazon.com/images/I/61gB0gX5+BL._AC_UF894,1000_QL80_.jpg"
                alt="Wabi-Sabi Ceramic Vase"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='260' viewBox='0 0 300 260'%3E%3Crect width='300' height='260' fill='%23f0fdf4'/%3E%3C/svg%3E";
                }}
              />
            </motion.div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_8px_rgba(0,0,0,0.08),0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                <Sparkles size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">New Arrivals</p>
                <p className="text-[11px] text-slate-500">12 pieces added this week</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <vp.icon size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{vp.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{vp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="bg-[#faf9f7] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-3"
              >
                The Edit
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
              >
                Pieces worth living.
              </motion.h2>
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-slate-500 text-base leading-relaxed max-w-sm text-pretty"
            >
              Every item in our collection is chosen for its craftsmanship,
              material quality, and enduring design.
            </motion.p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat: Category) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {(filtered ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* View all */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300"
            >
              View All Products
              <ChevronRight size={15} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── COLLECTIONS ──────────────────────────────────────────────────── */}
      <section id="collections" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-3"
            >
              Collections
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Curated with intention.
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-8">
            {collectionFeatures.map((col, idx) => (
              <motion.div
                key={col.id}
                variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.10)] ${
                  idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f8fafc'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                {/* Copy */}
                <div
                  className={`flex flex-col justify-center px-10 py-14 md:px-14 ${col.accent}`}
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-4">
                    {col.subtitle}
                  </p>
                  <h3 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5 text-balance">
                    {col.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-8 text-pretty">
                    {col.description}
                  </p>
                  <motion.a
                    href={col.href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="self-start inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-indigo-600 transition-colors duration-300"
                  >
                    {col.cta}
                    <ArrowRight size={14} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-3"
            >
              Customer Stories
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
            >
              Loved by design enthusiasts.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`bg-white rounded-2xl p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] flex flex-col gap-5 ${
                  idx === 1 ? "md:mt-6" : ""
                }`}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm flex-1" style={t.text === "The Wabi-Sabi Ceramic Vase is exactly what I was looking for. Each piece truly is unique. I ordered three and they all have their own character. Stunning." ? { fontSize: "12px" } : (t.text === "I ordered the Linen Cloud Sofa after seeing it in a design magazine. It arrived in perfect condition and is even more beautiful in person. Worth every penny." ? { backgroundColor: "#ca1c1c" } : (t.text === "The Arc Floor Lamp transformed my living room completely. The quality is exceptional and the packaging was beautiful. Lumière has become my go-to for everything home." ? { color: "#f64c13" } : undefined))}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                  <span className="ml-auto text-[11px] font-medium text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_24px_48px_-12px_rgba(0,0,0,0.14)] border border-black/5">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/e2d8292e-878c-4a2f-bf61-da540e0ef0ca/3a69ccdf394548d4b3e5966d5b0fbc7d.png"
                  alt="Lumière studio atelier"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='625' viewBox='0 0 500 625'%3E%3Crect width='500' height='625' fill='%23f8fafc'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 bottom-12 bg-white rounded-2xl px-5 py-4 shadow-[0_4px_8px_rgba(0,0,0,0.08),0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5"
              >
                <p className="text-3xl font-bold text-slate-900 font-playfair">340+</p>
                <p className="text-xs text-slate-500 mt-0.5">Artisan partners worldwide</p>
              </motion.div>
            </motion.div>

            {/* Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col"
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 text-balance"
              >
                Design that respects the maker.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 leading-relaxed mb-5 text-pretty"
              >
                Lumière was founded in 2018 with a single belief: that the objects
                we surround ourselves with should be made well, made to last, and
                made by people who care. We work directly with over 340 independent
                studios and artisans across Europe and Japan.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 leading-relaxed mb-10 text-pretty"
              >
                Every piece in our collection is visited in person by our buying
                team before it reaches you. We ask about materials, process, and
                provenance. If we would not put it in our own homes, it does not
                make the cut.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100"
              >
                {[
                  { stat: "2018", label: "Founded" },
                  { stat: "340+", label: "Artisan partners" },
                  { stat: "98%", label: "Customer satisfaction" },
                ].map((item) => (
                  <motion.div key={item.label} variants={fadeInUp}>
                    <p className="font-playfair text-3xl font-bold text-slate-900 mb-1">
                      {item.stat}
                    </p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative bg-slate-900 py-24 md:py-32 overflow-hidden"
      >
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4"
            >
              Stay Connected
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 text-balance"
            >
              Be first to discover new arrivals.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 leading-relaxed mb-10 text-pretty"
            >
              Join 18,000 design lovers who receive our curated edits, exclusive
              early access, and behind-the-scenes stories from our artisan partners.
            </motion.p>

            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-500 transition-colors duration-200 whitespace-nowrap shadow-[0_4px_14px_rgba(99,102,241,0.4)]"
              >
                Subscribe
              </motion.button>
            </motion.form>

            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-xs mt-4"
            >
              No spam. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}