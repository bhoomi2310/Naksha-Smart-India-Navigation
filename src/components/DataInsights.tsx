import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, TrendingUp, MapPin, Shield, Brain, Sparkles, Cpu, Droplets } from 'lucide-react';
import MLModelDemo from './MLModelDemo';

const DataInsights = () => {
  const insights = [
    {
      title: 'Indian Road Dataset',
      value: '1,200+',
      subtitle: 'Segments across Indian Metros',
      icon: MapPin,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      title: 'Road Condition ML Features',
      value: '627',
      subtitle: 'Parameters from SIH models',
      icon: Brain,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      title: 'RQI Model Accuracy',
      value: '91.4%',
      subtitle: 'XGBoost Pothole Prediction',
      icon: TrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: 'Monsoon Hazard Alerts',
      value: '100%',
      subtitle: 'Live Open-Meteo Integration',
      icon: Droplets,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    }
  ];

  return (
    <section className="py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs mb-2">
          AI & Telemetry Architecture
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          How Naksha Predicts Indian Road Quality
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Combining OSM geospatial layers, Poisson regression for pothole clusters, and live Open-Meteo weather telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div 
              key={insight.title} 
              className="bg-zinc-900/80 border border-white/10 p-5 rounded-3xl text-center shadow-xl hover:border-orange-500/40 transition-all hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-2xl ${insight.color} border flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-white mb-0.5">{insight.value}</div>
              <div className="text-xs font-bold text-zinc-200">{insight.title}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">{insight.subtitle}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DataInsights;