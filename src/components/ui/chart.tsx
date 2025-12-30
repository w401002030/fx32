import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
const ChartContext = React.createContext<{
  config: Record<string, { label?: React.ReactNode; color?: string; icon?: React.ComponentType<any> }>
} | null>(null)
function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}
export function ChartContainer({
  id,
  className,
  config,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: Record<string, { label?: React.ReactNode; color?: string; icon?: React.ComponentType<any> }>
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const chartId = React.useId()
  const containerId = id || `chart-${chartId.replace(/:/g, "")}`
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let isMounted = true;
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (!containerRef.current || !isMounted) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.floor(rect.width);
      const newHeight = Math.floor(rect.height);
      if (newWidth > 0 && newHeight > 0) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    };
    // Initial measure after a tick to ensure layout is ready
    const timeout = setTimeout(updateDimensions, 0);
    const resizeObserver = new ResizeObserver((entries) => {
      if (!isMounted) return;
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        const h = Math.floor(entry.contentRect.height);
        if (w > 0 && h > 0) {
          setDimensions({ width: w, height: h });
        }
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      isMounted = false;
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        id={containerId}
        ref={containerRef}
        className={cn(
          "h-[400px] md:h-[500px] w-full min-w-[300px] relative overflow-visible p-4 text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={containerId} config={config} />
        {dimensions.width === 0 ? (
          <div className="w-full h-full bg-white/[0.02] border border-white/5 animate-pulse rounded-[1.5rem] flex items-center justify-center">
            <div className="h-4 w-24 bg-white/10 rounded-full" />
          </div>
        ) : React.isValidElement(children) ? (
          React.cloneElement(children as React.ReactElement<any>, {
            width: dimensions.width,
            height: dimensions.height
          })
        ) : null}
      </div>
    </ChartContext.Provider>
  )
}
const ChartStyle = React.memo(({ id, config }: { id: string; config: Record<string, { label?: React.ReactNode; color?: string; icon?: React.ComponentType<any> }> }) => {
  const cssString = React.useMemo(() => {
    return Object.entries(config)
      .map(([key, value]) => {
        return value.color
          ? `#${id} { --color-${key}: ${value.color}; }`
          : null
      })
      .filter(Boolean)
      .join("\n")
  }, [id, config])
  if (!cssString) return null;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: cssString,
      }}
    />
  )
})
export const ChartTooltip = RechartsPrimitive.Tooltip
export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (props, ref) => {
    const {
      className,
      color,
      active,
      payload,
      label,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      labelFormatter,
      labelClassName,
      formatter,
      nameKey,
      labelKey,
    } = props as any
    const { config } = useChart()
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null;
      const [item] = payload
      const dataKey = item.dataKey || item.name
      const key = `${labelKey || dataKey || "value"}`
      const itemConfig = config[key]
      const value =
        !labelKey && typeof label === "string"
          ? config[label]?.label || label
          : itemConfig?.label || label
      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }
      if (!value) return null;
      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [label, labelFormatter, payload, hideLabel, labelClassName, labelKey, config])
    if (!active || !payload?.length) return null;
    const nestLabel = payload.length === 1 && indicator !== "dot"
    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl px-2.5 py-1.5 text-xs shadow-2xl z-50",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item: any, index: number) => {
            const dataKey = item.dataKey || item.name
            const key = `${nameKey || dataKey || "value"}`
            const itemConfig = config[key]
            const indicatorColor = color || item.payload?.fill || item.color
            return (
              <div
                key={item.dataKey || index}
                className={cn(
                  "flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-l-2 border-dashed bg-transparent": indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className="font-mono font-bold text-white ml-4">
                          {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"
export const ChartLegend = RechartsPrimitive.Legend
export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[]
    verticalAlign?: "top" | "bottom"
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, hideIcon = false, payload, verticalAlign, nameKey }, ref) => {
  const { config } = useChart()
  if (!payload || !Array.isArray(payload) || payload.length === 0) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-2",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const dataKey = item.dataKey || item.value
        const key = `${nameKey || dataKey || "value"}`
        const itemConfig = config[key]
        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
              {itemConfig?.label || item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"