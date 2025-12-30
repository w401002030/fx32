export interface PerformanceData {
  time: string;
  equity: number;
  backtest: number;
  volume: number;
  balance?: number;
}
export interface Product {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  price: number;
  risk: 'Low' | 'Medium' | 'High';
  platform: 'MT4' | 'MT5' | 'Both';
  strategy: 'Scalping' | 'Martingale' | 'Trend' | 'Hedging';
  pairs: string[];
  profitRate: string;
  maxDrawdown: string;
  tags: string[];
  image: string;
  performance: PerformanceData[];
  isUpcoming?: boolean;
  isRecommended?: boolean;
  features: string[];
}
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ea-v2-standard',
    name: 'Euro Stable V2.3 Standard',
    chineseName: 'V2.3 标准版',
    description: 'EAforex 核心稳定算法，专门为寻找长期资产稳步增长的个人交易者打造。',
    price: 299,
    risk: 'Low',
    platform: 'MT4',
    strategy: 'Scalping',
    pairs: ['EURUSD', 'GBPUSD'],
    profitRate: '稳健增长',
    maxDrawdown: '4.2%',
    tags: ['CORE', 'STABLE'],
    image: 'https://images.unsplash.com/photo-1611974715853-26dff9f98e84?q=80&w=800&auto=format&fit=crop',
    features: [
      '1个实盘账户永久授权许可',
      '标准策略接口',
      '全天候自动化风控控制系统',
      '核心客户支持响应',
      '永久免费的版本更新'
    ],
    performance: [
      { time: '2024年3月', equity: 1000, backtest: 1000, volume: 5 },
      { time: '2024年6月', equity: 1180, backtest: 1150, volume: 8 },
      { time: '2024年9月', equity: 1350, backtest: 1300, volume: 12 },
      { time: '2024年12月', equity: 1520, backtest: 1480, volume: 15 },
      { time: '2025年4月', equity: 1780, backtest: 1700, volume: 10 },
      { time: '2025年8月', equity: 1950, backtest: 1880, volume: 18 },
      { time: '2025年12月', equity: 2100, backtest: 2020, volume: 14 },
    ],
  },
  {
    id: 'ea-v3-pro',
    name: 'Euro Stable V3 Pro',
    chineseName: 'V3 Pro 专业版',
    description: 'EAforex 升级后的高级新闻规避与智能仓位管理，是专业量化交易者的首选方案。',
    price: 599,
    risk: 'Low',
    platform: 'Both',
    strategy: 'Scalping',
    pairs: ['EURUSD', 'GBPUSD', 'XAUUSD'],
    profitRate: '高效收益',
    maxDrawdown: '5.5%',
    tags: ['ADVANCED', 'NEWS-FILTER'],
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    features: [
      '2个实盘账户永久授权许可',
      'AI 驱动的高级新闻规避系统',
      '多维度参数自定义配置',
      'VIP 专属客服顾问',
      '兼容多平台 (MT4/MT5) 授权'
    ],
    performance: [
      { time: '2024年3月', equity: 1000, backtest: 1000, volume: 12 },
      { time: '2024年6月', equity: 2850, backtest: 2600, volume: 34 },
      { time: '2024年9月', equity: 4920, backtest: 4500, volume: 21 },
      { time: '2024年12月', equity: 6150, backtest: 5800, volume: 48 },
      { time: '2025年4月', equity: 8420, backtest: 7900, volume: 19 },
      { time: '2025年8月', equity: 9480, backtest: 9100, volume: 56 },
      { time: '2025年12月', equity: 10510, backtest: 9980, volume: 31 },
    ],
  },
  {
    id: 'pamm-institutional',
    name: 'PAMM Institutional',
    chineseName: 'PAMM 机构方案',
    description: 'EAforex 专业 PAMM 账户百分比分配管理模式，专为机构级大额资金设计。',
    price: 1999,
    risk: 'Low',
    platform: 'Both',
    strategy: 'Scalping',
    pairs: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'AUDUSD'],
    profitRate: '机构级增长',
    maxDrawdown: '3.5%',
    tags: ['PAMM', 'INSTITUTIONAL'],
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=800&auto=format&fit=crop',
    features: [
      '多账户百分比分配管理 (PAMM)',
      'LMAX/Currenex 机构级流动性对接',
      '自动资产再平衡与风控对冲',
      '实时机构级交易报告生成系统',
      '7/24 专属机构技术支持团队'
    ],
    performance: [
      { time: '2024年Q1', equity: 1000, backtest: 1000, volume: 100 },
      { time: '2024年Q2', equity: 4500, backtest: 4200, volume: 250 },
      { time: '2024年Q3', equity: 8900, backtest: 8500, volume: 400 },
      { time: '2024年Q4', equity: 13500, backtest: 12800, volume: 550 },
      { time: '2025年Q1', equity: 18200, backtest: 17500, volume: 700 },
      { time: '2025年Q2', equity: 22800, backtest: 21500, volume: 850 },
      { time: '2025年Q3', equity: 25400, backtest: 24200, volume: 1000 },
    ],
  },
  {
    id: 'ea-v4-flagship',
    name: 'Euro Stable V4 Flagship',
    chineseName: 'V4 旗舰版',
    description: 'EAforex 采用了深度神经网络驱动的量化交易逻辑，专为机构级大额资金动态执行模型设计。',
    price: 999,
    risk: 'Low',
    platform: 'MT5',
    strategy: 'Scalping',
    pairs: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD'],
    profitRate: '即将公开',
    maxDrawdown: '1.8%',
    tags: ['NEXT-GEN', 'AI-CORE', 'INSTITUTIONAL'],
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800&auto=format&fit=crop',
    isUpcoming: true,
    features: [
      '3个实盘账户永久授权许可',
      '机构级超低延迟执行模型',
      '神经网络动态风险控制引擎',
      '1对1 专属客服定制服务',
      '旗舰版用户专属入门研讨会'
    ],
    performance: [
      { time: '2025年1月', equity: 1000, backtest: 1000, volume: 50 },
      { time: '2025年3月', equity: 1500, backtest: 1450, volume: 75 },
      { time: '2025年6月', equity: 2200, backtest: 2100, volume: 110 },
      { time: '2025年9月', equity: 3100, backtest: 2950, volume: 140 },
      { time: '2025年12月', equity: 4200, backtest: 3900, volume: 180 },
    ],
  }
];