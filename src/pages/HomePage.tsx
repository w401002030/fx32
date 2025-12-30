import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { TrustSection } from '@/components/home/TrustSection';
import { ProductCard } from '@/components/shop/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { Navbar } from '@/components/layout/Navbar';
import { PammSection } from '@/components/home/PammSection';
import { Footer } from '@/components/layout/Footer';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
const REVIEWS = [
  { id: 1, name: "John Smith", role: "全球交易者", content: "V3 Pro 的新闻规避功能非常强大，帮我避免了多次剧烈波动的风险。", rating: 5 },
  { id: 2, name: "Emma Johnson", role: "投资经理", content: "标准版对于新手来说性价比极高，建议配合美金账户开启你的量化之路。", rating: 5 },
  { id: 3, name: "Michael Brown", role: "基金经理", content: "期待旗舰版的发布，我们需要更高级的神经网络风险功能来处理大额头寸。", rating: 5 },
  { id: 4, name: "Sarah Davis", role: "私人投资者", content: "在多品种回测中，EAforex 提供的算法表现远超同类产品，其资产曲线的平滑度令人留下深刻印象。", rating: 5 },
  { id: 5, name: "David Wilson", role: "量化交易者", content: "客服应答速度极快，安装指导非常清晰，这对我们不擅长技术的用户非常友好。", rating: 5 },
  { id: 6, name: "Robert Lee", role: "算法开发专家", content: "这是我见过最专业的 EA 展示平台。数据真实可靠，团队非常专业。", rating: 5 },
];
export function HomePage() {
  const [api, setApi] = useState<CarouselApi>();
  const { hash } = useLocation();
  useEffect(() => {
    document.title = "EAforex - 智能量化交易专家";
  }, []);
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);
  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [api]);
  const eaTierProducts = MOCK_PRODUCTS.filter(p => p.id !== 'pamm-institutional');
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <div id="performance" className="scroll-mt-16">
          <StatsSection />
        </div>
        {/* Strategy Marketplace Section */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-[#040404]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">量化策略市场</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-2xl leading-relaxed font-medium">
                EAforex 为您提供终身授权的量化交易解决方案。所有策略均经过实盘环境严格测试。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {eaTierProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        {/* PAMM Section */}
        <PammSection />
        {/* User Feedback Section */}
        <section className="py-16 md:py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">用户反馈</h2>
              <p className="text-muted-foreground text-base md:text-xl font-medium">来自全球实测用户的真实交易体验</p>
            </div>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-6">
                {REVIEWS.map((review) => (
                  <CarouselItem key={review.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-[#121212] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex gap-1.5 mb-8">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-5 h-5",
                                i < review.rating ? "text-primary fill-primary shadow-glow" : "text-white/10"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-gray-300 text-lg md:text-xl italic mb-10 leading-relaxed font-medium">"{review.content}"</p>
                      </div>
                      <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">{review.name}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none font-black mt-1">{review.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:flex justify-end gap-4 mt-12">
                <CarouselPrevious className="relative inset-0 translate-y-0 h-12 w-12 bg-white/5 border-white/10 text-primary/40 hover:text-primary transition-all" />
                <CarouselNext className="relative inset-0 translate-y-0 h-12 w-12 bg-white/5 border-white/10 text-primary/40 hover:text-primary transition-all" />
              </div>
            </Carousel>
          </div>
        </section>
        {/* CTA Knowledge Section */}
        <section className="py-20 md:py-32 bg-[#040404]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative p-8 md:p-20 rounded-[3rem] bg-primary/10 border border-primary/20 overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px] transition-transform group-hover:scale-150 duration-700" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-10">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                    开启量化新时代
                  </h2>
                  <p className="text-xl md:text-2xl text-primary font-bold">
                    在开启验证之前，建议您访问我们的科普中心
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-16 md:h-20 px-12 md:px-24 text-xl md:text-2xl font-black bg-white/5 border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all group/btn"
                  >
                    <Link to="/knowledge">访问知识科普中心 <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}