import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from '@/data/mock-products';
import { ContactDrawer } from '@/components/contact/ContactDrawer';
import { cn } from '@/lib/utils';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isPamm = product.id === 'pamm-institutional';
  const renderPrice = () => {
    if (product.isUpcoming) {
      return (
        <span className="text-2xl md:text-4xl font-black text-gray-600 tracking-tighter whitespace-nowrap overflow-hidden">
          即将发布
        </span>
      );
    }
    if (isPamm) {
      return (
        <span className="text-2xl md:text-4xl font-black text-primary tracking-tighter drop-shadow-[0_0_12px_rgba(0,255,136,0.4)] whitespace-nowrap overflow-hidden">
          机构方案价
        </span>
      );
    }
    return (
      <div className="flex items-baseline gap-1 md:gap-2 overflow-hidden whitespace-nowrap">
        <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">
          ${product.price}
        </span>
        <span className="text-gray-500 text-[9px] md:text-xs font-bold uppercase tracking-widest">/ 终身授权</span>
      </div>
    );
  };
  return (
    <>
      <Card className={cn(
        "group relative flex flex-col w-full overflow-hidden transition-all duration-300 rounded-[2rem] md:rounded-[2.5rem]",
        !product.isUpcoming
          ? "border-white/10 bg-[#0f0f0f] hover:border-primary/40 hover:shadow-glow"
          : "border-white/5 bg-[#121212] opacity-75",
        product.isRecommended && "border-primary/20 ring-1 ring-primary/20"
      )}>
        <div className={cn(
          "absolute top-0 inset-x-0 h-1 z-20",
          !product.isUpcoming ? "bg-primary" : "bg-primary/20"
        )} />
        <CardHeader className="p-6 md:p-10 pb-2 md:pb-4">
          <div className="flex justify-between items-start mb-4 md:mb-6 gap-4">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-black text-base md:text-xl text-white mb-1 leading-tight line-clamp-2 min-h-[3rem] md:min-h-[4rem]">
                {product.chineseName}
              </h3>
              <p className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">
                {product.name}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 md:gap-2 shrink-0 max-w-[100px]">
              {product.isRecommended && (
                <Badge className="bg-primary text-black font-black px-1.5 py-0.5 text-[8px] md:text-[10px] shadow-glow whitespace-nowrap">
                  推荐
                </Badge>
              )}
              <Badge variant="outline" className="border-white/10 text-primary text-[8px] md:text-[10px] font-bold uppercase tracking-tighter bg-white/5 whitespace-nowrap">
                {product.profitRate}
              </Badge>
            </div>
          </div>
          <div className="pt-0">
            {renderPrice()}
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-10 pt-0 flex-1">
          <p className="text-xs md:text-sm text-gray-400 mb-6 md:mb-8 leading-relaxed font-medium line-clamp-2 md:line-clamp-3">
            {product.description}
          </p>
          <ul className="space-y-2 md:space-y-3">
            {product.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 md:gap-3 text-[11px] md:text-xs text-gray-300 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0 mt-0.5" />
                <span className="font-medium truncate">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="p-6 md:p-10 pt-0">
          {!product.isUpcoming ? (
            isPamm ? (
              <Button
                onClick={() => setIsDrawerOpen(true)}
                className="w-full h-12 md:h-14 btn-gradient text-black font-black rounded-xl text-sm md:text-base gap-2"
              >
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5" /> 申请操作
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full h-12 md:h-14 bg-white/5 border-white/10 text-white font-bold hover:bg-white/10 rounded-xl text-sm md:text-base group/btn">
                <Link to={`/product/${product.id}`} className="flex items-center justify-center">
                  查看战绩 <ArrowUpRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
                </Link>
              </Button>
            )
          ) : (
            <Button disabled className="w-full h-12 md:h-14 bg-white/5 text-gray-600 border-white/5 font-bold rounded-xl text-xs md:text-sm uppercase tracking-widest">
              COMING SOON
            </Button>
          )}
        </CardFooter>
      </Card>
      <ContactDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}