import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, GraduationCap } from 'lucide-react';
const KNOWLEDGE_ITEMS = [
  {
    q: "外汇交易是什么？",
    a: "外汇交易 (Forex) 是指同时买入一种货币并卖出另一种货币的行为。外汇市场是全球最大且流动性最强的金融市场，每天成交额超过 6 万亿美元。交易者通过预测汇率波动来赚取差价。"
  },
  {
    q: "杠杆交易的原理是什么？",
    a: "杠杆允许交易者以极小的保证金控制极大的头寸。例如，1:100 的杠杆意味着您只需要 1,000 美元保证金即可操作 100,000 美元的头寸。杠杆在放大收益的同时，也同比例放大亏损风险。"
  },
  {
    q: "如何科学计算交易手数 (Lot Sizing)？",
    a: "交易手数应基于您的账户余额和风险承受能力。通用的\"1%风险原则\"是指单笔交易的预期亏损不应超过账户余额的 1%。通过设置止损点数向后推算手数是量化交易的核心风控步骤。"
  },
  {
    q: "MT4 与 MT5 平台有什么深度区别？",
    a: "MT4 是最经典的平台，生态极其丰富，适合大多数外汇 EA。MT5 则是升级版本，支持更多的时间周期、资产类别（股票/期货）以及更强大的多线程策略回测，是未来量化交易的主流选择。"
  },
  {
    q: "什么是点差与滑点？",
    a: "点差 (Spread) 是卖出价与买入价之间的差额，也是交易的主要成本。滑点 (Slippage) 是指挂单的执行价格与请求价格不一致的情况下，通常发生在市场剧烈波动及流动性不足时。"
  },
  {
    q: "经纪商选择的避坑指南？",
    a: "优先选择拥有顶级监管牌照（如 FCA、ASIC）的经纪商。确保其提供 ECN 或 STP 执行模式，避免对赌盘（Market Maker）。同时注意出入金的便捷性与网络延迟稳定性。"
  },
  {
    q: "什么是智能交易系统 (EA)？",
    a: "EA (Expert Advisor) 是指在交易平台下运行的自动化交易脚本。它根据预设的历史数据模型与逻辑自动执行交易，消除了人为情绪干扰，可以实现 24 小时全天候监控市场。"
  },
  {
    q: "回测 (Backtesting) 的重要性？",
    a: "回测是指将交易策略应用在历史数据以验证效果。虽然以往业绩不代表未来，但高质量的回测能帮助优化风险参数，并确保逻辑在不同市场周期（震荡/趋势）下的稳定性。"
  },
  {
    q: "为什么必须使用 VPS 运行 EA？",
    a: "VPS (虚拟专用服务器) 提供 24/7 的稳定性与电力。EA 需要实时监控价格，家庭网络波动或电脑关机都会导致 EA 停止工作。使用 VPS 能显著降低网络延迟，提升成交效率。"
  },
  {
    q: "什么是止损 (Stop Loss) 在量化交易的地位？",
    a: "止损是量化交易的生命线。一个优秀的 EA 必须具备明确的硬止损或逻辑止损。没有止损的策略本质上是在进行一场胜率极低且风险无限的博弈。"
  },
  {
    q: "模拟盘与实盘心理压力的差异？",
    a: "模拟盘没有金钱压力，用户往往能严格执行纪律。但在实盘中，恐惧和贪婪会严重影响决策。EA 的核心优势就在于将实盘操作\"模拟化\"，让机器代替人类执行冰冷的规则。"
  },
  {
    q: "什么是强制平仓与爆仓 (Margin Call)？",
    a: "当账户可用保证金不足以维持亏损头寸时，经纪商会强制关闭部分或全部订单。爆仓意味着账户资产清零。通过低杠杆严格控持仓量可以有效避免此类风险。"
  },
  {
    q: "EA 参数优化 (Optimization) 的正确姿势？",
    a: "优化应基于大样本数据，且应避免\"过度拟合\"。过度拟合的参数在历史曲线上很完美，但面临未来未知行情时表现极差。应寻求在广泛参数范围内表现稳健的\"参数孤岛\"。"
  },
  {
    q: "周末持仓风险与行情跳空 (Weekend Gaps)？",
    a: "周末市场关闭，但重大国际事件可能导致周一开盘价格与周五收盘价格出现断层。这可能跳过止损直接造成超额亏损。稳健的 EA 通常会提供周末平仓选项。"
  },
  {
    q: "交易心理中的\"赌徒谬误\"？",
    a: "许多投资者认为\"已经跌了这么久，一定会涨回来\"，这在量化中是极其危险的思维。EAforex 推荐的算法遵循概率分布，不参与任何基于直觉或情绪的预测。"
  },
  {
    q: "什么是夏普比率 (Sharpe Ratio)？",
    a: "夏普比率衡量的是每承受一单位总风险所产生的超额回报。比率越高，说明策略的回报质量越高，波动越平滑。它是评估机构级 EA 表现的重要指标。"
  },
  {
    q: "如何确保 EA 安装环境正确？",
    a: "安装前需确保 DLL 导入权限已开启，且交易终端的\"自动交易\"按钮显示为绿色。同时检查 EA 是否有加载限制（如特定的货币对或时间周期）。"
  },
  {
    q: "什么是 ECN 账户与超低延迟优势？",
    a: "ECN 账户直接连接顶级流动性提供商，点差通常极低甚至为零，仅收取少量手续费。对于高频或超短线 EA 来说，ECN 环境是确保策略不失效的先决条件。"
  },
  {
    q: "\"黑天鹅\"事件下的风控策略？",
    a: "如瑞士法郎脱钩等极端事件，普通风控可能失效。EAforex 核心算法内置最大点差过滤、新闻避让系统以及灾难性停损保护，最大限度保护资金安全。"
  },
  {
    q: "新手量化入门的三个阶段？",
    a: "第一阶段：理论学习与模拟测试；第二阶段：小额美金账户 (Cent Account) 实盘验证；第三阶段：基于成功记录逐步加大标准账户的配置规模。"
  },
  {
    q: "马丁格尔策略与其风险本质？",
    a: "马丁格尔策略在亏损后加倍下单预期翻本。虽然短期曲线极其平滑，但长期面临\"黑天鹅\"时有账户归零的风险。EAforex 平台上的产品坚持非马丁格尔的稳健执行逻辑。"
  },
  {
    q: "跟单系统 (Copy Trading)？",
    a: "跟单系统允许用户直接镜像顶级交易者的操作。优点是简单易用，缺点是受限于跟单延迟、点差差异以及对信号源的盲目信任。自主运行 EAforex 成功 EA 通常更具可控力。"
  }
];
export function KnowledgePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "科普中心 - 掌握量化交易核心知识 | EAforex";
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-20 md:py-32 lg:py-40 max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                  <GraduationCap className="w-4 h-4" /> 投资者教育中心
                </div>
                <h1 className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter leading-tight">
                  掌握量化交易知识
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
                  在开启 EAforex 自动化交易之旅之前，建立稳固的金融基础是每一位成功投资者的必经之路。
                </p>
              </div>
              <div className="flex items-center gap-4 text-white pb-6 border-b border-white/5">
                <BookOpen className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">量化核心知识库 ({KNOWLEDGE_ITEMS.length})</h2>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {KNOWLEDGE_ITEMS.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border border-white/5 bg-white/[0.02] rounded-3xl overflow-hidden px-6 md:px-10 transition-all hover:bg-white/[0.04] hover:border-white/10"
                  >
                    <AccordionTrigger className="text-lg md:text-xl font-bold text-white py-8 hover:no-underline text-left leading-tight group">
                      <span className="flex-1">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 text-base md:text-lg leading-relaxed pb-8 font-medium">
                      <div className="pt-2">
                        {item.a}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}