import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Globe, Smartphone, Zap, Server, ShieldCheck } from 'lucide-react';

export const TechStack = () => {
  const technologies = [
    {
      category: 'Frontend',
      icon: Globe,
      items: ['React 18', 'TypeScript', 'Vite', 'Leaflet Interactive Maps', 'Tailwind CSS'],
      color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
    },
    {
      category: 'Backend Engine',
      icon: Server,
      items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Security', 'Axios'],
      color: 'bg-orange-500/10 border-orange-500/30 text-orange-400'
    },
    {
      category: 'Database',
      icon: Database,
      items: ['PostgreSQL', 'node-postgres (pg)', 'Spatial PostGIS', 'Supabase SQL'],
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    },
    {
      category: 'Native Mobile SDK',
      icon: Smartphone,
      items: ['Android SDK (Kotlin)', 'Jetpack Compose', 'Coroutines', 'OkHttp Client'],
      color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    },
    {
      category: 'Routing & AI Telemetry',
      icon: Brain,
      items: ['OSRM Driving Engine', 'Nominatim Geocoding', 'Open-Meteo Weather', 'Poisson RQI Model'],
      color: 'bg-purple-500/10 border-purple-500/30 text-purple-400'
    },
    {
      category: 'Safety & Audio',
      icon: ShieldCheck,
      items: ['Web Speech API Voice HUD', 'Crowdsourced Hazards', 'Streetlight Safety Index'],
      color: 'bg-amber-500/10 border-amber-500/30 text-amber-400'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs mb-2">
            Engineering Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Core Tech Stack: React • Node.js • PostgreSQL
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl mx-auto">
            Naksha combines React & Leaflet for real-time interactive mapping, Node.js Express for routing services, and PostgreSQL for trip telemetry, user authentication, and road hazard persistence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div 
                key={tech.category} 
                className="bg-zinc-900/80 border border-white/10 p-6 rounded-3xl shadow-xl hover:border-orange-500/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">{tech.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span 
                      key={item} 
                      className={`text-xs px-2.5 py-1 rounded-xl border font-medium ${tech.color}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;