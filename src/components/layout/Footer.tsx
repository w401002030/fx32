import React, { useState } from 'react';
import { ShieldCheck, Lock, Phone, MessageSquare, ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import { ContactDrawer } from '@/components/contact/ContactDrawer';
export function Footer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const myfxbookUrl = "https://www.myfxbook.com/zh/members/RobotForexProEA/eurostable-ea-lite/10995603";
  return (
    <footer className="bg-[#040404] text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 text-white">
              <Logo size={40} />
              <span className="text-3xl font-black font-display tracking-tighter">EAforex</span>
            </div>
            <p className="text-lg leading-relaxed text-gray-400 font-medium max-w-xl mx-auto lg:mx-0">
              为全球机构级量化交易者提供顶级量化交易解决方案。我们专注于高频交易、趋势追踪与智能风险管理，助力机构与个人投资者实现资产稳健增长。
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8">
                <a
                  href={myfxbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-primary transition-colors cursor-pointer group"
                >
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Myfxbook 实盘验证</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-primary transition-colors cursor-pointer">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>256位加密保护</span>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-3 pt-6 border-t border-white/5">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-primary transition-colors group text-left"
                >
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-mono tracking-tight">+86 18666888095 (微信电话号码)</span>
                </button>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-primary transition-colors group text-left"
                >
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-mono tracking-tight">(719)524-8014 (国际业务热线)</span>
                </button>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-primary transition-colors group text-left"
                >
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-mono tracking-tight">hhh673351805@gmail.com (官方邮箱)</span>
                </button>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/10 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> 立即咨询专业顾问
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem]">
            <p className="font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 text-sm">
              <ShieldCheck className="w-5 h-5 text-primary" /> 风险提示 (Risk Disclosure)
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-gray-500 font-medium">
              <p>
                外汇交易与差价合约 (CFDs) 具有高度风险，可能不适合所有投资者。交易这些工具可能导致您损失部分或全部初始投资。在决定交易 EAforex 平台提供的的产品之前，您应仔细考虑您的投资目标、经验水平和风险偏好。
              </p>
              <p>
                以往业绩不代表未来表现。任何因使用我们的产品而导致的交易损失概不负责。任何自动化交易软件或 EA 的使用都不保证盈利。请仅使用您能够承担损失的资金进行投资。
              </p>
              <p>
                我们承诺保护您的隐私与客户安全，所有咨询信息均受严格保密协议保护。
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] md:text-xs font-bold py-1 px-4 text-gray-400">
              MT4/MT5 多平台支持
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] md:text-xs font-bold py-1 px-4 text-gray-400">
              24/7 专属客服咨询
            </Badge>
          </div>
          <p className="text-[11px] md:text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} EAforex 智能量化交易。版权所有。
          </p>
        </div>
      </div>
      <ContactDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </footer>
  );
}