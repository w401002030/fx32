import React from 'react';
import { Phone, Copy, ShieldCheck, Clock, Mail } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
interface ContactDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ContactDrawer({ open, onOpenChange }: ContactDrawerProps) {
  const handleCopy = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success("已复制到剪贴板！", {
          description: "您可以直接在邮件或即时通讯工具中粘贴。",
          duration: 3000,
        });
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch (error) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          toast.success("已复制到剪贴板！");
        } else {
          throw new Error("Fallback copy failed");
        }
      } catch (fallbackError) {
        toast.error("复制失败，请手动选择复制。");
      }
    }
  };
  const contacts = [
    {
      icon: Phone,
      label: "专业咨询热线 (CN)",
      subLabel: "微信电话号码",
      value: "+86 18666888095",
      color: "text-primary",
      isNumeric: true
    },
    {
      icon: Phone,
      label: "国际服务热线 (INTL)",
      subLabel: "技术支持",
      value: "(719)524-8014",
      color: "text-primary",
      isNumeric: true
    },
    {
      icon: Mail,
      label: "官方服务邮箱",
      subLabel: "INSTITUTIONAL",
      value: "hhh673351805@gmail.com",
      color: "text-gray-400",
      isNumeric: true
    }
  ];
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-[#0a0a0a] border-white/10 text-white w-full sm:w-[400px] md:w-[450px] max-w-md p-0 overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary shadow-glow z-10" />
        <div className="p-5 md:p-10 space-y-8 md:space-y-10 flex-1 overflow-y-auto scrollbar-hide">
          <SheetHeader className="text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              客服随时在线
            </div>
            <div className="space-y-2">
              <SheetTitle className="text-2xl md:text-4xl font-black tracking-tighter text-white leading-tight">
                联系专业顾问
              </SheetTitle>
              <SheetDescription className="text-gray-400 font-medium text-xs md:text-base leading-relaxed">
                我们的技术团队将为您提供一对一的安装指导与风险评估支持，支持电话与邮件咨询。
              </SheetDescription>
            </div>
          </SheetHeader>
          <div className="space-y-4">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="group p-4 md:p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-500 shadow-xl"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn(
                      "p-2.5 rounded-xl bg-black/60 border border-white/5 group-hover:scale-105 group-hover:shadow-glow transition-all duration-500 shrink-0",
                      contact.color
                    )}>
                      {React.createElement(contact.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-wide uppercase truncate">
                          {contact.label}
                        </span>
                        <span className="text-[8px] md:text-[9px] font-bold text-primary/70 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 uppercase tracking-tighter shrink-0">
                          {contact.subLabel}
                        </span>
                      </div>
                      <p className={cn(
                        "text-base md:text-lg font-black text-white tracking-tight leading-none group-hover:text-primary transition-colors truncate",
                        contact.isNumeric && "font-mono tracking-tighter"
                      )}>
                        {contact.value}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-xl shrink-0 transition-all active:scale-90"
                    onClick={() => handleCopy(contact.value)}
                  >
                    <Copy className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-4 text-sm font-bold text-gray-400 group">
              <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-transform shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <span className="group-hover:text-white transition-colors text-xs md:text-sm">24小时内专业回复承诺</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-400 group">
              <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-transform shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="group-hover:text-white transition-colors text-xs md:text-sm">所有沟通均受严格保密协议保护</span>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 bg-white/[0.02] border-t border-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between text-center">
            <div className="space-y-1 flex-1">
              <p className="text-lg md:text-2xl font-black text-white">100%</p>
              <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-none">实盘验证</p>
            </div>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="space-y-1 flex-1">
              <p className="text-lg md:text-2xl font-black text-white">24/7</p>
              <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-none">全天监控</p>
            </div>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="space-y-1 flex-1">
              <p className="text-lg md:text-2xl font-black text-primary drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">ACTIVE</p>
              <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-none">顾问在线</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}