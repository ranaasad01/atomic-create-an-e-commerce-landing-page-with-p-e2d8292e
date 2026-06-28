"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail, ArrowRight } from 'lucide-react';
import { brand, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Lighting", href: "#products" },
    { label: "Furniture", href: "#products" },
    { label: "Decor", href: "#products" },
    { label: "Textiles", href: "#products" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Sustainability", href: "#about" },
    { label: "Press", href: "#about" },
    { label: "Careers", href: "#contact" },
  ],
  support: [
    { label: "FAQ", href: "#contact" },
    { label: "Shipping & Returns", href: "#contact" },
    { label: "Track Order", href: "#contact" },
    { label: "Contact Us", href: "#contact" },
  ],
};

const socials = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1">
                Stay in the loop
              </p>
              <h3 className="text-xl font-semibold text-white">
                New arrivals, exclusive offers, and design inspiration.
              </h3>
            </motion.div>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-500 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-playfair text-2xl font-bold text-white">
                {brand.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              {brand.tagline} We source and curate premium home goods from independent makers around the world.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {brand.name} Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}