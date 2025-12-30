import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactDrawer } from '@/components/contact/ContactDrawer';
import { motion } from 'framer-motion';
export function ContactSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <section className="py-12 md:py-40 relative overflow-hidden bg-[#040404]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-20">
          <div className="space-y-6 md:space-y-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]"
            >
              <Sparkles className="w-4 h-4" /> 量化新时代
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="text-4xl md:text-8xl lg:text-9xl font-display font-black leading-[0.85] text-white tracking-tighter"
            >
              开启实盘 <br />
              <span className="text-gradient">验证之旅</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              className="text-base md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              我们的客服顾问将为您提供一对一的安装指导、风险评估与实盘战绩验证。在开启量化之路前，您可以访问我们的科普中心了解更多。
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <Button
              onClick={() => setIsDrawerOpen(true)}
              className="relative w-full h-20 md:h-28 text-2xl md:text-4xl font-black btn-gradient rounded-[2rem] shadow-glow flex gap-4 md:gap-6 items-center justify-center transition-all hover:scale-[1.03]"
            >
              <MessageSquare className="w-8 h-8 md:w-12 md:h-12" />
              立即联系客服
            </Button>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-12 md:pt-20 border-t border-white/5 w-full max-w-5xl">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-black text-white">100%</p>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">实盘验证</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-black text-white">24/7</p>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">全天候运行</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-black text-white">MT4/5</p>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">多平台支持</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shadow-glow-primary" />
                <p className="text-3xl md:text-4xl font-black text-white">ACTIVE</p>
              </div>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">客服在线</p>
            </div>
          </div>
        </div>
      </div>
      <ContactDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </section>
  );
}