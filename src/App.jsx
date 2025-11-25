import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, RefreshCcw, Percent, DollarSign, MapPin, ChevronDown, Languages } from 'lucide-react';

// --- Mock Shadcn UI Components ---
// 為了在單一檔案模擬 shadcn/ui 的風格，我們將這些組件封裝在這裡

const Card = ({ className, children }) => (
  <div className={`rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ className, children }) => (
  <p className={`text-sm text-slate-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ className, children }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Label = ({ className, children, htmlFor }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 ${className}`}>
    {children}
  </label>
);

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
  const variants = {
    default: "bg-blue-600 text-slate-50 hover:bg-blue-600/90",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Select = ({ value, onChange, options, className }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
    >
      {options}
    </select>
    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "border-transparent bg-blue-600 text-slate-50 hover:bg-blue-600/80",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    outline: "text-slate-950 border-slate-200",
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${variants[variant]}`}>
      {children}
    </div>
  );
};

const Separator = ({ className }) => (
  <div className={`shrink-0 bg-slate-200 h-[1px] w-full ${className}`} />
);

// --- Application Logic ---

// 翻譯字典
const TRANSLATIONS = {
  zh: {
    title: "折扣計算機",
    desc: "支援折上折與多國稅率計算",
    originalPrice: "商品原價 (標籤價格)",
    discounts: "折扣優惠",
    addDiscount: "新增折扣",
    percentTitle: "百分比折扣",
    amountTitle: "固定金額折扣",
    percentPlaceholder: "例如: 20 (即8折)",
    amountPlaceholder: "例如: 50 (減50元)",
    regionTax: "地區稅率",
    customRegion: "自訂稅率 (Custom)",
    customRate: "自訂稅率 (%)",
    currentTax: "目前稅制",
    currentRate: "目前稅率",
    reset: "重置",
    langSwitch: "English",
    summaryOriginal: "商品原價",
    summaryDiscount: "總折扣",
    summaryPreTax: "稅前價格",
    summaryTax: "預估稅金",
    summaryFinal: "最終價格",
    canadaGroup: "加拿大 Canada",
    otherGroup: "其他",
    placeHolderPrice: "0.00"
  },
  en: {
    title: "Discount Calculator",
    desc: "Supports stacked discounts & multi-region tax",
    originalPrice: "Original Price (Tag Price)",
    discounts: "Discounts",
    addDiscount: "Add Discount",
    percentTitle: "Percentage Off",
    amountTitle: "Fixed Amount Off",
    percentPlaceholder: "e.g., 20 (20% off)",
    amountPlaceholder: "e.g., 50 ($50 off)",
    regionTax: "Region Tax Rate",
    customRegion: "Custom Rate",
    customRate: "Custom Tax Rate (%)",
    currentTax: "Tax System",
    currentRate: "Current Rate",
    reset: "Reset",
    langSwitch: "中文",
    summaryOriginal: "Original Price",
    summaryDiscount: "Total Discount",
    summaryPreTax: "Price Before Tax",
    summaryTax: "Estimated Tax",
    summaryFinal: "Final Price",
    canadaGroup: "Canada",
    otherGroup: "Other",
    placeHolderPrice: "0.00"
  }
};

// 加拿大各省稅率資料 (2024) - 增加雙語名稱
const CANADA_TAX_RATES = {
  AB: { nameZh: '亞伯達省 (Alberta)', nameEn: 'Alberta', rate: 5, type: 'GST' },
  BC: { nameZh: '不列顛哥倫比亞省 (British Columbia)', nameEn: 'British Columbia', rate: 12, type: 'GST + PST' },
  MB: { nameZh: '曼尼托巴省 (Manitoba)', nameEn: 'Manitoba', rate: 12, type: 'GST + PST' },
  NB: { nameZh: '新布藍茲維省 (New Brunswick)', nameEn: 'New Brunswick', rate: 15, type: 'HST' },
  NL: { nameZh: '紐芬蘭與拉布拉多省 (Newfoundland)', nameEn: 'Newfoundland and Labrador', rate: 15, type: 'HST' },
  NS: { nameZh: '新斯科細亞省 (Nova Scotia)', nameEn: 'Nova Scotia', rate: 15, type: 'HST' },
  NT: { nameZh: '西北地區 (Northwest Territories)', nameEn: 'Northwest Territories', rate: 5, type: 'GST' },
  NU: { nameZh: '努納福特地區 (Nunavut)', nameEn: 'Nunavut', rate: 5, type: 'GST' },
  ON: { nameZh: '安大略省 (Ontario)', nameEn: 'Ontario', rate: 13, type: 'HST' },
  PE: { nameZh: '愛德華王子島 (PEI)', nameEn: 'Prince Edward Island', rate: 15, type: 'HST' },
  QC: { nameZh: '魁北克省 (Quebec)', nameEn: 'Quebec', rate: 14.975, type: 'GST + QST' },
  SK: { nameZh: '薩斯喀徹溫省 (Saskatchewan)', nameEn: 'Saskatchewan', rate: 11, type: 'GST + PST' },
  YT: { nameZh: '育空地區 (Yukon)', nameEn: 'Yukon', rate: 5, type: 'GST' },
};

export default function DiscountCalculator() {
  const [lang, setLang] = useState('zh'); // 'zh' or 'en'
  const t = TRANSLATIONS[lang];

  const [originalPrice, setOriginalPrice] = useState('');
  const [discounts, setDiscounts] = useState([
    { id: 1, type: 'percent', value: '' }
  ]);
  const [region, setRegion] = useState('BC');
  const [customTaxRate, setCustomTaxRate] = useState(5);
  const [isCustomRegion, setIsCustomRegion] = useState(false);

  const toggleLanguage = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const addDiscount = () => {
    setDiscounts([
      ...discounts,
      { id: Date.now(), type: 'percent', value: '' }
    ]);
  };

  const removeDiscount = (id) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  const updateDiscount = (id, field, value) => {
    setDiscounts(discounts.map(d => {
      if (d.id === id) {
        return { ...d, [field]: value };
      }
      return d;
    }));
  };

  const handleReset = () => {
    setOriginalPrice('');
    setDiscounts([{ id: Date.now(), type: 'percent', value: '' }]);
  };

  const calculation = useMemo(() => {
    const startPrice = parseFloat(originalPrice) || 0;
    let currentPrice = startPrice;
    let totalDiscountAmount = 0;

    discounts.forEach(d => {
      const val = parseFloat(d.value) || 0;
      let discountAmount = 0;
      if (d.type === 'percent') {
        discountAmount = currentPrice * (val / 100);
      } else {
        discountAmount = val;
      }
      if (discountAmount > currentPrice) {
        discountAmount = currentPrice;
      }
      currentPrice -= discountAmount;
      totalDiscountAmount += discountAmount;
    });

    let taxRate = 0;
    if (isCustomRegion) {
      taxRate = parseFloat(customTaxRate) || 0;
    } else {
      taxRate = CANADA_TAX_RATES[region]?.rate || 0;
    }

    const taxAmount = currentPrice * (taxRate / 100);
    const finalPrice = currentPrice + taxAmount;

    return {
      startPrice,
      priceAfterDiscount: currentPrice,
      totalDiscountAmount,
      taxRate,
      taxAmount,
      finalPrice
    };
  }, [originalPrice, discounts, region, customTaxRate, isCustomRegion]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center items-start font-sans">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="bg-white border-b border-slate-100 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="h-8 px-2 text-xs font-medium"
              >
                <Languages className="w-3.5 h-3.5 mr-1" />
                {t.langSwitch}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleReset} title={t.reset}>
                <RefreshCcw className="w-4 h-4 text-slate-500" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* 原價輸入 */}
          <div className="space-y-2">
            <Label htmlFor="price">{t.originalPrice}</Label>
            <div className="relative">
              {/* 更新：調整圖示位置以配合更大的輸入框 */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <DollarSign className="w-6 h-6" />
              </span>
              {/* 更新：加大輸入框高度 (h-16) 與字體 (text-3xl) */}
              <Input
                id="price"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder={t.placeHolderPrice}
                className="pl-12 h-16 text-3xl font-bold text-slate-800"
              />
            </div>
          </div>

          <Separator />

          {/* ... existing code ... */}
          {/* 折扣區域 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t.discounts}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={addDiscount}
                className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Plus className="w-3 h-3 mr-1" />
                {t.addDiscount}
              </Button>
            </div>

            <div className="space-y-3">
              {discounts.map((discount, index) => (
                <div key={discount.id} className="flex gap-2 items-center group">
                  <div className="flex rounded-md shadow-sm w-full">
                    {/* 類型切換按鈕組 */}
                    <div className="flex -space-x-px">
                      <button
                        onClick={() => updateDiscount(discount.id, 'type', 'percent')}
                        className={`relative inline-flex items-center rounded-l-md border px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 ${discount.type === 'percent'
                            ? 'bg-blue-50 text-blue-600 border-blue-200 z-10'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                          }`}
                        title={t.percentTitle}
                      >
                        <Percent className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateDiscount(discount.id, 'type', 'amount')}
                        className={`relative -ml-px inline-flex items-center rounded-r-md border px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 ${discount.type === 'amount'
                            ? 'bg-blue-50 text-blue-600 border-blue-200 z-10'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                          }`}
                        title={t.amountTitle}
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 折扣數值輸入 */}
                    <Input
                      type="number"
                      value={discount.value}
                      onChange={(e) => updateDiscount(discount.id, 'value', e.target.value)}
                      placeholder={discount.type === 'percent' ? t.percentPlaceholder : t.amountPlaceholder}
                      className="ml-2 flex-1 rounded-md"
                    />
                  </div>

                  {discounts.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDiscount(discount.id)}
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 稅率設定 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <Label>{t.regionTax}</Label>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Select
                value={isCustomRegion ? 'custom' : region}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setIsCustomRegion(true);
                  } else {
                    setIsCustomRegion(false);
                    setRegion(e.target.value);
                  }
                }}
                options={
                  <>
                    <optgroup label={t.canadaGroup}>
                      {Object.entries(CANADA_TAX_RATES).map(([code, info]) => (
                        <option key={code} value={code}>
                          {lang === 'zh' ? info.nameZh : info.nameEn} - {info.rate}%
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={t.otherGroup}>
                      <option value="custom">{t.customRegion}</option>
                    </optgroup>
                  </>
                }
              />

              {isCustomRegion ? (
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                  <Label htmlFor="custom-tax" className="whitespace-nowrap">{t.customRate}</Label>
                  <Input
                    id="custom-tax"
                    type="number"
                    value={customTaxRate}
                    onChange={(e) => setCustomTaxRate(e.target.value)}
                    className="flex-1"
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Badge variant="secondary">{CANADA_TAX_RATES[region].type}</Badge>
                  <span className="text-xs text-slate-500 flex items-center">
                    {t.currentRate} {CANADA_TAX_RATES[region].rate}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* 結果面板 - 改為淡灰色背景 */}
        <div className="bg-slate-100 m-6 mt-0 p-6 rounded-lg text-slate-900 border border-slate-200">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>{t.summaryOriginal}</span>
              <span>{formatCurrency(calculation.startPrice)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>{t.summaryDiscount}</span>
              <span>- {formatCurrency(calculation.totalDiscountAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-300">
              <span>{t.summaryPreTax}</span>
              <span>{formatCurrency(calculation.priceAfterDiscount)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>{t.summaryTax} ({calculation.taxRate}%)</span>
              <span>+ {formatCurrency(calculation.taxAmount)}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-300">
            <div className="flex justify-between items-end">
              <span className="text-slate-600 font-bold pb-1">{t.summaryFinal}</span>
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {formatCurrency(calculation.finalPrice)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
