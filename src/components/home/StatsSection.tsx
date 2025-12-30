import React from 'react';
import { Link } from 'react-router-dom';
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { ArrowUpRight } from 'lucide-react';
export function StatsSection() {
  const proProduct = MOCK_PRODUCTS.find(p => p.id === 'ea-v3-pro');
  const chartData = proProduct?.performance || [];
  const safeChartData = chartData.length > 0 ? chartData : [{ time: 'N/A', equity: 0, backtest: 0, volume: 0 }];
  const chartConfig = {
    equity: { label: "实盘 (Equity)", color: "hsl(var(--primary))" },
    backtest: { label: "回测 (Backtest)", color: "#ef4444" },
    volume: { label: "成交量 (Volume)", color: "rgba(0, 255, 136, 0.1)" }
  };
  return (
    <section className="py-12 md:py-20 bg-[#0a0a0a] border-y border-white/5 relative">
      <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-1 space-y-6 md:space-y-10 text-center lg:text-left">
            <Badge variant="outline" className="text-primary border-primary bg-primary/5 px-3 py-1 text-xs md:text-sm font-bold">实盘战绩追踪 (LIVE USD)</Badge>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              卓越盈利能力 <br /> <span className="text-gradient">经得起市场验证</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">
              EAforex 旗舰策略 V3 Pro 展示了超群的稳定性。我们秉持透明原则，公开实盘战绩、回测表现及成交量分析。
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-8 pt-2 md:pt-4">
              <div className="p-5 md:p-8 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-2xl md:text-4xl font-black text-primary">机构级</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] mt-2 md:mt-3 font-bold leading-none">盈利能力表现</p>
              </div>
              <div className="p-5 md:p-8 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-2xl md:text-4xl font-black text-white">$10.5k</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] mt-2 md:mt-3 font-bold leading-none">账户净值 (USD)</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Card className="bg-[#121212] border-white/5 shadow-2xl overflow-hidden rounded-3xl md:rounded-[2.5rem]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 md:p-10 pb-4 md:pb-6">
                <div className="space-y-1 md:space-y-2 text-left">
                  <CardTitle className="text-xl md:text-2xl font-black text-white">V3 Pro 实盘战绩</CardTitle>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">EQUITY VS 回测 VS 成交量</p>
                </div>
                <Badge className="bg-primary text-black font-black px-3 py-1 text-[10px] md:text-xs">实时数据</Badge>
              </CardHeader>
              <CardContent className="p-6 md:p-10 pt-0">
                <ChartContainer config={chartConfig}>
                  <ComposedChart
                      data={safeChartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="statsEquityGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00ff88" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.05} />
                      <XAxis
                        dataKey="time"
                        stroke="#666"
                        fontSize={11}
                        fontWeight="bold"
                        tickLine={false}
                        axisLine={false}
                        dy={15}
                      />
                      <YAxis
                        stroke="#666"
                        fontSize={11}
                        fontWeight="bold"
                        tickLine={false}
                        axisLine={false}
                        width={45}
                        tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          borderColor: '#333',
                          borderRadius: '12px',
                          color: '#fff',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                        itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                      />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      />
                      <Bar
                        dataKey="volume"
                        name="成交量"
                        fill="#00ff88"
                        opacity={0.1}
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                      />
                      <Area
                        type="monotone"
                        dataKey="equity"
                        name="实盘"
                        stroke="none"
                        fillOpacity={1}
                        fill="url(#statsEquityGrad)"
                      />
                      <Line
                        type="monotone"
                        dataKey="equity"
                        name="实盘"
                        stroke="#00ff88"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#00ff88', strokeWidth: 2, stroke: '#121212' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="backtest"
                        name="回测"
                        stroke="#ef4444"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </ComposedChart>
                  </ChartContainer>
              </CardContent>
              <CardFooter className="p-6 md:p-10 pt-0">
                <Button asChild size="lg" className="w-full h-16 md:h-20 text-lg md:text-2xl font-black btn-gradient rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-primary/20 group/btn">
                  <Link to="/product/ea-v3-pro">
                    查看 V3 Pro 详细战绩 <ArrowUpRight className="ml-3 w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}