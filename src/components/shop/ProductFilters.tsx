import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useFilterStore } from '@/store/use-filter-store';
import { RotateCcw, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ProductFilters() {
  const priceRange = useFilterStore(useShallow(s => s.priceRange));
  const maxDrawdown = useFilterStore(s => s.maxDrawdown);
  const selectedRisks = useFilterStore(useShallow(s => s.selectedRisks));
  const selectedPlatforms = useFilterStore(useShallow(s => s.selectedPlatforms));
  const selectedStrategies = useFilterStore(useShallow(s => s.selectedStrategies));
  const selectedPairs = useFilterStore(useShallow(s => s.selectedPairs));
  const setPriceRange = useFilterStore(s => s.setPriceRange);
  const setMaxDrawdown = useFilterStore(s => s.setMaxDrawdown);
  const toggleRisk = useFilterStore(s => s.toggleRisk);
  const togglePlatform = useFilterStore(s => s.togglePlatform);
  const toggleStrategy = useFilterStore(s => s.toggleStrategy);
  const togglePair = useFilterStore(s => s.togglePair);
  const resetFilters = useFilterStore(s => s.resetFilters);
  const filterItemClass = "border-white/5";
  const labelClass = "text-sm font-medium text-gray-400 group-hover:text-white transition-colors cursor-pointer leading-none py-1";
  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-black text-white">条件筛选</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-8 text-[10px] font-black uppercase tracking-widest gap-1 text-gray-500 hover:text-red-400 hover:bg-red-400/5 px-2"
        >
          <RotateCcw className="w-3 h-3" /> 重置
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["price", "drawdown", "risk", "platform", "strategy", "pairs"]} className="w-full space-y-2">
        <AccordionItem value="price" className={filterItemClass}>
          <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline text-white">
            价格范围: ${priceRange[0]} - $${priceRange[1]}
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-8 px-1">
            <Slider
              value={priceRange}
              max={2000}
              step={100}
              onValueChange={setPriceRange}
              className="mb-8"
            />
            <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <span>$0</span>
              <span>$2,000+</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="drawdown" className={filterItemClass}>
          <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline text-white">
            最大回撤: {maxDrawdown}%
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-8 px-1">
            <Slider
              value={[maxDrawdown]}
              min={1}
              max={15}
              step={0.5}
              onValueChange={(val) => setMaxDrawdown(val[0])}
              className="mb-8"
            />
            <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <span>1% (严格)</span>
              <span>15%+</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="risk" className={filterItemClass}>
          <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline text-white">风险等级</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-1 pb-4">
            {['Low', 'Medium', 'High'].map((level) => (
              <div key={level} className="flex items-center space-x-3 group">
                <Checkbox
                  id={`risk-${level}`}
                  checked={selectedRisks.includes(level)}
                  onCheckedChange={() => toggleRisk(level)}
                  className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor={`risk-${level}`} className={labelClass}>
                  {level === 'Low' ? '低风险 (Low)' : level === 'Medium' ? '中等风险 (Medium)' : '高风险 (High)'}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pairs" className={filterItemClass}>
          <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline text-white">货币对 / 品种</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-1 pb-4">
            {['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD'].map((pair) => (
              <div key={pair} className="flex items-center space-x-3 group">
                <Checkbox
                  id={`pair-${pair}`}
                  checked={selectedPairs.includes(pair)}
                  onCheckedChange={() => togglePair(pair)}
                  className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor={`pair-${pair}`} className={labelClass}>
                  {pair}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="platform" className={filterItemClass}>
          <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline text-white">交易平台</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-1 pb-4">
            {['MT4', 'MT5', 'Both'].map((plat) => (
              <div key={plat} className="flex items-center space-x-3 group">
                <Checkbox
                  id={`plat-${plat}`}
                  checked={selectedPlatforms.includes(plat)}
                  onCheckedChange={() => togglePlatform(plat)}
                  className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor={`plat-${plat}`} className={labelClass}>
                  {plat === 'Both' ? 'MT4 & MT5 (通用)' : plat}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="strategy" className={cn(filterItemClass, "border-b-0")}>
          <AccordionTrigger className="text-sm font-bold py-4 hover:no-underline text-white">核心策略</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-1 pb-4">
            {['Scalping', 'Trend', 'Martingale', 'Hedging'].map((strat) => (
              <div key={strat} className="flex items-center space-x-3 group">
                <Checkbox
                  id={`strat-${strat}`}
                  checked={selectedStrategies.includes(strat)}
                  onCheckedChange={() => toggleStrategy(strat)}
                  className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor={`strat-${strat}`} className={labelClass}>
                  {strat === 'Scalping' ? '极速头皮 (Scalping)' :
                   strat === 'Trend' ? '趋势追踪 (Trend)' :
                   strat === 'Martingale' ? '马丁格尔 (Martingale)' : '对冲保护 (Hedging)'}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}