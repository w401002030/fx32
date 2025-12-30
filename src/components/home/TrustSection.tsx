import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, Globe, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
export function TrustSection() {
  const [api, setApi] = useState<CarouselApi>();
  const trusts = [
    { icon: ShieldCheck, label: "Myfxbook 实盘认证" },
    { icon: Globe, label: "全球 50+ 经纪商支持" },
    { icon: Award, label: "2025 最佳量化算法奖" },
    { icon: Zap, label: "超低延迟 HFT 执行" }
  ];
  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [api]);
  return (
    <section className="bg-black py-12 md:py-24 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
            skipSnaps: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {trusts.map((item, idx) => (
              <CarouselItem key={idx} className="pl-4 md:pl-8 basis-full sm:basis-1/2 lg:basis-1/4">
                <div className="flex flex-col items-center text-center gap-4 md:gap-6 group cursor-default">
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:bg-primary/10 group-hover:shadow-glow transition-all duration-400 shrink-0">
                    <item.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-white font-black text-lg md:text-xl tracking-tight leading-tight whitespace-nowrap">
                      {item.label}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 group-hover:bg-primary/10 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shadow-glow-primary" />
                      官方认证
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}