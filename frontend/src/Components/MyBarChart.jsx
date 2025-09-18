import {
    // ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
  
  import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
  
  const chartConfig = {
    desktop: { label: "Desktop", color: "var(--color-desktop)" },
    mobile: { label: "Mobile", color: "var(--color-mobile)" }
  };
  
  const data = [
    { name: 'Jan', desktop: 4000, mobile: 2400 },
    { name: 'Feb', desktop: 3000, mobile: 1398 },
    // more data...
  ];
  
  function MyBarChart() {
    return (
      <ChartContainer config={chartConfig}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Bar dataKey="desktop" fill="var(--color-desktop)" />
          <Bar dataKey="mobile" fill="var(--color-mobile)" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    );
  }
  
  export default MyBarChart;