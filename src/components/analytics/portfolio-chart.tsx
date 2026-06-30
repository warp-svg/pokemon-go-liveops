"use client";

import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioChartProps {
  data: Array<{ category: string; released: number; remaining: number }>;
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Runway by content category</CardDescription>
        <CardTitle>Remaining content inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#1f2937" vertical={false} />
              <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="released" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="remaining" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
