import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Layers, LineChart, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactDrawer } from '@/components/contact/ContactDrawer';
import { cn } from '@/lib/utils';
export function PammSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const stats = [
    { label: "最大回撤", value: "3.5%", icon: ShieldCheck },
    { label: "执行架构", value: "ECN/STP", icon: Server },
    { label: "资产增长", value: "25k+", icon: LineChart },
    { label: "账户管理", value: "PAMM/MAM", icon: Layers }
  ];
  return (
    <section className="bg-black py-12 md:py-24 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-[#0d0d0d] border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden p-6 md:p-16 lg:p-24 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
              <div className="space-y-6 md:space-y-10">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-primary border-primary/40 bg-primary/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden">
                    INSTITUTIONAL GRADE
                  </Badge>
                  <h2 className="text-3xl md:text-7xl font-display font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter">
                    PAMM <br />
                    <span className="text-gradient">机构级方案</span>
                  </h2>
                </div>
                <p className="text-base md:text-2xl text-gray-400 font-medium leading-relaxed max-w-xl">
                  EAforex 为专业资管管理人与资管机构量身定制。基于 LMAX/Currenex 的极速流动性对接，实现多账户自动化同步执行与动态风险对冲。
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 group/stat hover:bg-white/[0.05] transition-colors overflow-hidden flex flex-col justify-center min-w-0"
                    >
                      <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-primary mb-1 shrink-0" />
                      <p className={cn(
                        "text-sm md:text-3xl font-black text-white tracking-tight truncate line-clamp-1 whitespace-nowrap",
                        stat.value.includes('/') && "font-mono"
                      )}>
                        {stat.value}
                      </p>
                      <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest truncate line-clamp-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 md:pt-6">
                  <Button
                    onClick={() => setIsDrawerOpen(true)}
                    size="lg"
                    className="w-full sm:w-auto h-14 md:h-20 px-8 md:px-16 text-lg md:text-2xl font-black btn-gradient rounded-xl md:rounded-2xl shadow-xl shadow-primary/20 gap-3 md:gap-4"
                  >
                    <MessageSquare className="w-5 h-5 md:w-8 md:h-8" /> 申请 PAMM 合作
                  </Button>
                </div>
              </div>
              <div className="relative hidden sm:block">
                <div className="aspect-[4/5] md:aspect-square bg-gradient-to-br from-primary/10 to-transparent rounded-[2rem] border border-white/5 overflow-hidden flex flex-col p-6 md:p-12 shadow-inner">
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">Equity Growth</p>
                      <p className="text-2xl md:text-4xl font-black text-white">$25,400.00</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 flex items-end gap-1 md:gap-2">
                    {[40, 65, 55, 85, 75, 95, 80, 100].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                        className="flex-1 bg-primary/20 rounded-t-sm md:rounded-t-lg group/bar relative"
                      >
                        <div className="absolute top-0 inset-x-0 h-0.5 md:h-1 bg-primary shadow-glow opacity-50" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5 grid grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sharpe Ratio</p>
                      <p className="text-lg md:text-xl font-black text-white">3.12</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Drawdown</p>
                      <p className="text-lg md:text-xl font-black text-primary">3.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </section>
  );
}