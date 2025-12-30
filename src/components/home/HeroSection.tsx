import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
export function HeroSection() {
  const features = [
    {
      icon: Zap,
      label: "极速执行",
      description: "低延迟直接顶级 ECN 经纪商",
      color: "text-yellow-400"
    },
    {
      icon: ShieldCheck,
      label: "严格风险控制",
      description: "动态止损 + AI 风险控制引擎 24/7",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      label: "实时统计",
      description: "Myfxbook 同步 + 自定义图表",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      label: "全天候运行",
      description: "VPS 部署 + 规避极端行情模式",
      color: "text-purple-400"
    }
  ];
  return (
    <section className="relative pt-12 pb-12 md:pt-40 md:pb-40 overflow-hidden bg-[#040404]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
         <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0066ff]/5 rounded-full blur-[140px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6 md:space-y-10"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-bold text-primary bg-primary/5 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary animate-pulse mr-2 md:mr-3" />
            EAforex v2.0 神经网络算法正式发布
          </div>
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-balance leading-none md:leading-[0.9] text-white">
              智能算法引擎 <br />
              <span className="text-gradient">交易革命</span>
            </h1>
            <div className="hidden lg:block absolute -right-16 -top-16 opacity-20 rotate-12">
              <Logo size={120} className="drop-shadow-[0_0_30px_rgba(0,255,136,0.4)]" />
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-400 text-pretty font-medium leading-tight md:leading-relaxed">
            基于神经网络高级交易逻辑，EAforex 为全球专业交易者提供 <span className="text-white">稳健高效、低回撤</span> 自动化交易机器人。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 md:pt-8">
            <Button asChild size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-bold rounded-xl btn-gradient shadow-glow">
              <Link to="/shop">探索所有策略 <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-bold rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md transition-all">
              <a href="#performance">查看战绩</a>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-10 pt-16 md:pt-28 max-w-6xl mx-auto">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center gap-3 md:gap-5 p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors h-full group"
              >
                <div className={cn("p-4 md:p-5 bg-black/40 rounded-xl md:rounded-2xl shadow-glow-primary", item.color)}>
                  {React.createElement(item.icon, { className: "w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-400" })}
                </div>
                <div className="space-y-2 md:space-y-3">
                  <span className="text-sm md:text-base font-bold tracking-widest uppercase text-gray-200 block">{item.label}</span>
                  <p className="text-xs md:text-sm text-gray-400 font-medium text-center leading-tight max-w-[180px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}