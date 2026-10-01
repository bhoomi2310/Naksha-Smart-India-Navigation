import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Target, Lightbulb, Heart, Globe, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Accuracy First',
      description: 'We prioritize real-world Indian road accuracy over theoretical calculations.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature is designed with Indian daily commuters and road conditions in mind.'
    },
    {
      icon: Globe,
      title: 'Local Context',
      description: 'Understanding flyovers, monsoon underpass flooding, and multimodal transit.'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="text-center space-y-3">
          <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs">
            About Naksha
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Navigation Built for Indian Ground Realities
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Traditional map platforms assume uniform asphalt quality and ignore potholes, lighting dark patches, and waterlogging. Naksha is built to reflect real street conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm text-white">{val.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;