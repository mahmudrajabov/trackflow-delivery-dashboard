import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Platform from "@/components/Platform";
import WorkflowGallery from "@/components/WorkflowGallery";
import ProductDetail from "@/components/ProductDetail";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Platform />
        <WorkflowGallery />
        <ProductDetail />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}