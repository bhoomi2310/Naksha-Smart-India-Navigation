import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Globe, Smartphone, Zap, Code } from 'lucide-react';

const TechStack = () => {
  const technologies = [
    {
      category: 'Frontend',
      icon: Globe,
      items: ['React + TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vite'],
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-700'
    },
    {
      category: 'Mobile',
      icon: Smartphone,
      items: ['Capacitor', 'PWA Support', 'Native APIs', 'Cross-platform'],
      color: 'bg-green-500/10 border-green-500/20 text-green-700'
    },
    {
      category: 'ML & AI',
      icon: Brain,
      items: ['XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'Poisson Regression'],
      color: 'bg-purple-500/10 border-purple-500/20 text-purple-700'
    },
    {
      category: 'Backend',
      icon: Database,
      items: ['Supabase', 'PostgreSQL', 'Edge Functions', 'Real-time APIs'],
      color: 'bg-orange-500/10 border-orange-500/20 text-orange-700'
    },
    {
      category: 'Performance',
      icon: Zap,
      items: ['Edge Computing', 'Real-time Data', 'Caching', 'CDN'],
      color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700'
    },
    {
      category: 'Development',
      icon: Code,
      items: ['TypeScript', 'ESLint', 'Git', 'Hot Reload'],
      color: 'bg-red-500/10 border-red-500/20 text-red-700'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Built with Modern Technology</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Naksha combines cutting-edge ML models with modern web technologies to deliver 
            real-time, intelligent navigation for Indian roads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <Card key={tech.category} className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    {tech.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tech.items.map((item) => (
                      <Badge 
                        key={item} 
                        variant="outline" 
                        className={`text-xs ${tech.color}`}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Your ML Model Integration</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your XGBoost model with 627 features analyzing road conditions, potholes, traffic patterns, 
                and safety metrics will power the intelligent routing decisions in production.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge className="px-4 py-2">Two-stage Poisson Regression</Badge>
                <Badge className="px-4 py-2">627 Feature Engineering</Badge>
                <Badge className="px-4 py-2">Real-time Predictions</Badge>
                <Badge className="px-4 py-2">80%+ Accuracy</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechStack;