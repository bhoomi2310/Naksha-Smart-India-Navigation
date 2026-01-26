import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, TrendingUp, MapPin, Shield, AlertCircle, Users } from 'lucide-react';

const DataInsights = () => {
  const insights = [
    {
      title: 'Dataset Coverage',
      value: '400-800',
      subtitle: 'Road segments in Dwarka',
      icon: MapPin,
      color: 'text-blue-600'
    },
    {
      title: 'Feature Engineering',
      value: '627',
      subtitle: 'ML features extracted',
      icon: BarChart,
      color: 'text-purple-600'
    },
    {
      title: 'Model Accuracy',
      value: '80.6%',
      subtitle: 'R² for pothole prediction',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Safety Factors',
      value: '15+',
      subtitle: 'Safety parameters tracked',
      icon: Shield,
      color: 'text-orange-600'
    }
  ];


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="heading-section mb-3 text-white drop-shadow-lg font-bold">How It Works</h2>
          <p className="text-white/90 max-w-2xl mx-auto font-light">
            Real-time analysis of road conditions for smarter routing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.title} className="text-center border-orange-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-5">
                  <Icon className={`w-7 h-7 mx-auto mb-2 ${insight.color}`} />
                  <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{insight.value}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{insight.subtitle}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{insight.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DataInsights;