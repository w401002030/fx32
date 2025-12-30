import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/home/ContactSection';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ChartContainer } from "@/components/ui/chart";
import {
  ShieldCheck,
  ChevronLeft,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Calculator
} from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
export function ProductDetailsPage() {
  const { id } = useParams();
  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === id), [id]);
  const [balance, setBalance] = useState<number>(10000);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    if (product) {
      document.title = `${product.chineseName} - 实盘战绩分析 | EAforex`;
    }
  }, [product]);
  const monthlyProfit = useMemo(() => {
    if (!product) return 0;
    const profitMultiplier = product.id === 'pamm-institutional' ? 0.35 : 0.208;
    return Math.round(balance * profitMultiplier);
  }, [balance, product]);
  const chartConfig = {
    equity: { label: "实盘 (Equity)", color: "hsl(var(--primary))" },
    backtest: { label: "回测 (Backtest)", color: "#ef4444" },
    volume: { label: "成交量 (Volume)", color: "rgba(0, 255, 136, 0.1)" }
  };
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-[#040404] px-4">
          <div className="text-center space-y-8 max-w-md">
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black text-white">未找到该产品</h1>
            <Button asChild size="lg" className="btn-gradient w-full font-bold h-14">
              <Link to="/shop">返回市场 <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  const handleConsultClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const isV3Pro = product.id === 'ea-v3-pro';
  const myfxbookUrl = "https://www.myfxbook.com/zh/members/RobotForexProEA/eurostable-ea-lite/10995603";
  const isPamm = product.id === 'pamm-institutional';
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 bg-[#040404] py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-primary mb-8 md:mb-12 transition-colors uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4 mr-1" /> 返回市场
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-8 space-y-12 md:space-y-20">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-primary text-primary bg-primary/5 text-xs font-bold px-3 py-1">{product.chineseName}</Badge>
                  <Badge className="bg-white/10 text-white font-bold text-xs px-3 py-1">{product.strategy}</Badge>
                </div>
                <h1 className="text-4xl md:text-8xl font-display font-black text-white leading-none tracking-tighter">
                  {product.chineseName}
                </h1>
                <p className="text-lg md:text-2xl text-gray-400 leading-relaxed max-w-4xl font-medium">
                  {product.description} EAforex 核心算法采用了神经网络驱动的动态风控逻辑，确保在极端行情下的资产安全。
                </p>
              </div>
              {!product.isUpcoming && product.performance.length > 0 && (
                <div className="space-y-10">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4 text-white">
                    <BarChart3 className="w-8 h-8 text-primary" /> 实盘战绩曲线
                  </h2>
                  <div className="p-6 md:p-10 border border-white/5 rounded-[2.5rem] bg-[#0a0a0a]">
                    <ChartContainer config={chartConfig}>
                      <ComposedChart data={product.performance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="detailEquityGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00ff88" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.03} />
                        <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} width={45} tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                        <Bar dataKey="volume" name="成交量" fill="#00ff88" opacity={0.05} barSize={24} radius={[4, 4, 0, 0]} />
                        <Area type="monotone" dataKey="equity" name="实盘" stroke="none" fill="url(#detailEquityGrad)" />
                        <Line type="monotone" dataKey="equity" name="实盘" stroke="#00ff88" strokeWidth={4} dot={{ r: 4, fill: '#00ff88' }} />
                        <Line type="monotone" dataKey="backtest" name="回测" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 6" dot={false} />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {!product.isUpcoming && !isPamm && (
                  <div className="p-8 border border-white/10 rounded-[2.5rem] bg-[#0d0d0d] shadow-glow space-y-8">
                    <div className="flex items-center gap-3 text-white">
                      <Calculator className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-black">收益预估工具</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">USD 本金</label>
                          <span className="font-mono font-bold text-white">${balance.toLocaleString()}</span>
                        </div>
                        <Slider
                          value={[balance]}
                          min={1000}
                          max={100000}
                          step={1000}
                          onValueChange={(val) => setBalance(val[0])}
                        />
                      </div>
                      <div className="pt-6 border-t border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">预估收益</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-primary drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                            ${monthlyProfit.toLocaleString()}
                          </span>
                          <span className="text-gray-500 font-bold text-sm">/ 月</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-8 border border-primary/20 rounded-[2.5rem] bg-[#121212] shadow-glow-lg flex flex-col items-center text-center">
                  <h2 className="text-2xl font-black text-white mb-6">咨询授权详情</h2>
                  <p className="text-gray-400 font-medium mb-10 text-sm leading-relaxed">
                    获得最新的月度收益报告、实盘成交明细及参数配置建议。
                  </p>
                  <div className="w-full space-y-4">
                    {isV3Pro && !product.isUpcoming && (
                      <Button asChild variant="outline" className="w-full h-14 bg-primary/5 border-primary/40 text-primary rounded-xl hover:bg-primary/10 transition-all gap-2 border-dashed">
                        <a href={myfxbookUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" /> Myfxbook 实盘验证
                        </a>
                      </Button>
                    )}
                    {!product.isUpcoming ? (
                      <Button onClick={handleConsultClick} className="w-full h-16 text-xl font-black btn-gradient rounded-xl shadow-xl gap-2">
                        <MessageSquare className="w-6 h-6" /> 立即咨询客服
                      </Button>
                    ) : (
                      <Button disabled className="w-full h-16 bg-white/5 text-gray-500 border-white/5 rounded-xl text-lg font-bold">即将公开</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact" className="scroll-mt-32">
          <ContactSection />
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}