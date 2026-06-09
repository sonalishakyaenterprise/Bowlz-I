"use client";

import React from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import MachineSection from "@/components/sections/MachineSection";
import LocationsSection from "@/components/sections/LocationsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

import {
  getAllCategories,
  getAllProducts,
  getAllLocations,
  getPublishedBlogPosts,
} from "@/data/index";

export default function HomePage() {
  const categories = getAllCategories();
  const products   = getAllProducts();
  const locations  = getAllLocations();
  const blogPosts  = getPublishedBlogPosts();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection categories={categories} products={products} />
        <MachineSection />
        <LocationsSection locations={locations} />
        {/* <BlogSection posts={blogPosts} /> */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
