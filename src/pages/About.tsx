import React from 'react';
import { Target, Heart, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Accuracy First',
      description: 'We prioritize real-world Indian road accuracy over theoretical calculations.',
      bg: '#FDF0ED',
      color: '#D8472B',
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature is designed with Indian daily commuters and road conditions in mind.',
      bg: '#FEF8EA',
      color: '#C98109',
    },
    {
      icon: Globe,
      title: 'Local Context',
      description: 'Understanding flyovers, monsoon underpass flooding, and multimodal transit.',
      bg: '#EAF4F3',
      color: '#1F6F6B',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6EFE3] text-[#14121F] flex flex-col paper-grain">
      <Navigation />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-[#14121F] font-display tracking-tight">
            Navigation Built for Indian Ground Realities
          </h1>
          <p className="text-sm sm:text-base text-[#524C61] max-w-2xl mx-auto leading-relaxed">
            Traditional map platforms assume uniform asphalt quality and ignore potholes, lighting dark patches, and waterlogging. Naksha is built to reflect real street conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFDF9] border-[1.5px] border-[#14121F] shadow-[3px_3px_0_#14121F] p-6 rounded-2xl text-center space-y-3"
              >
                <div
                  className="w-11 h-11 rounded-xl border-[1.2px] border-[#14121F] flex items-center justify-center mx-auto shadow-[1.5px_1.5px_0_#14121F]"
                  style={{ backgroundColor: val.bg, color: val.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#14121F]">{val.title}</h3>
                <p className="text-xs text-[#524C61] leading-relaxed">{val.description}</p>
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
