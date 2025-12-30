import React, { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductFilters } from '@/components/shop/ProductFilters';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilterStore } from '@/store/use-filter-store';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export function ShopPage() {
  const priceMax = useFilterStore(s => s.priceRange[1]);
  const maxDrawdown = useFilterStore(s => s.maxDrawdown);
  const selectedRisks = useFilterStore(useShallow(s => s.selectedRisks));
  const selectedPlatforms = useFilterStore(useShallow(s => s.selectedPlatforms));
  const selectedStrategies = useFilterStore(useShallow(s => s.selectedStrategies));
  const selectedPairs = useFilterStore(useShallow(s => s.selectedPairs));
  const resetFilters = useFilterStore(s => s.resetFilters);
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (product.price > priceMax) return false;
      const ddValue = parseFloat(product.maxDrawdown.replace('%', '')) || 0;
      if (ddValue > maxDrawdown) return false;
      if (selectedRisks.length > 0 && !selectedRisks.includes(product.risk)) return false;
      if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(product.platform)) return false;
      if (selectedStrategies.length > 0 && !selectedStrategies.includes(product.strategy)) return false;
      if (selectedPairs.length > 0) {
        const hasMatchingPair = product.pairs.some(p => selectedPairs.includes(p));
        if (!hasMatchingPair) return false;
      }
      return true;
    });
  }, [priceMax, maxDrawdown, selectedRisks, selectedPlatforms, selectedStrategies, selectedPairs]);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
          <header className="mb-12 md:mb-16 space-y-4 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">交易算法市场</h1>
              <p className="text-gray-400 text-lg max-w-2xl font-medium">
                发现经过实盘验证的高性能外汇 EA。所有产品均为正向授权，即时交付。
              </p>
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 font-bold gap-2 text-white">
                    <Filter className="w-4 h-4" /> 筛选条件
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#0a0a0a] border-white/10 text-white w-[300px]">
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-white">筛选产品</SheetTitle>
                  </SheetHeader>
                  <ProductFilters />
                </SheetContent>
              </Sheet>
            </div>
          </header>
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <ProductFilters />
              </div>
            </aside>
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                  <p className="text-gray-500 font-medium">没有找到匹配条件的算法策略。</p>
                  <Button variant="link" className="text-primary mt-2" onClick={resetFilters}>
                    重置所有筛选器
                  </Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}