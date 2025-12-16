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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Data-Driven Intelligence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your ML model analyzes comprehensive road data to deliver precise routing decisions 
            based on real Indian road conditions.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.title} className="hover-lift text-center">
                <CardContent className="p-6">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${insight.color}`} />
                  <h3 className="text-3xl font-bold mb-1">{insight.value}</h3>
                  <p className="text-sm text-muted-foreground">{insight.subtitle}</p>
                  <p className="font-medium mt-2">{insight.title}</p>
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