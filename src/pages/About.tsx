import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Target, Lightbulb, Heart, Globe, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';
import tajMahalImage from '@/assets/taj-mahal.png';

const About = () => {
  const team = [
    {
      name: 'Development Team',
      role: 'Full Stack & ML Engineers',
      description: 'Building the future of Indian navigation'
    },
    {
      name: 'Data Collection Team',
      role: 'Field Researchers',
      description: 'Gathering real-world road condition data'
    },
    {
      name: 'Design Team',
      role: 'UX/UI Designers',
      description: 'Creating intuitive user experiences'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy First',
      description: 'We prioritize real-world accuracy over theoretical optimization.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature is designed with Indian road users in mind.'
    },
    {
      icon: Globe,
      title: 'Local Context',
      description: 'Understanding Indian road culture and conditions deeply.'
    }
  ];

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden relative">
      {/* Full Page Background - Using Taj Mahal as default (can be changed) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${tajMahalImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="heading-section mb-6 text-white drop-shadow-2xl font-extrabold">About Naksha</h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto font-light drop-shadow-lg">
              Revolutionizing navigation in India with real-world data and intelligent routing.
            </p>
          </div>
        </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">Our Story</h2>
            <div className="prose prose-lg mx-auto text-white/90">
              <p className="mb-6 text-lg">
                Naksha was born from a simple frustration: existing navigation apps don't understand 
                Indian roads. They assume perfect conditions, ignore potholes, and miss the cultural 
                richness of our cities.
              </p>
              <p className="mb-6 text-lg">
                We decided to build something different - a navigation system that understands the 
                reality of Indian roads. From potholes in Delhi to traffic patterns in Mumbai, 
                from monsoon flooding to festival routes, Naksha considers it all.
              </p>
              <p className="text-lg">
                Our mission is to make every journey in India safer, more efficient, and more enjoyable 
                by providing navigation that truly understands our unique context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">Our Values</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              The principles that guide everything we do at Naksha.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover-lift text-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">What Makes Us Different</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Why Naksha is the navigation app India has been waiting for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Real Ground Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  We don't just use satellite imagery. Our team physically surveys roads, 
                  measuring potholes, traffic patterns, and safety conditions to provide 
                  accurate, real-world navigation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Lightbulb className="w-5 h-5 text-orange-500" />
                  Indian Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  From understanding monsoon impact on roads to knowing which routes are 
                  safer during festivals, Naksha is built with deep knowledge of Indian 
                  road culture and conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Users className="w-5 h-5 text-orange-500" />
                  Multiple Route Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  Not just the fastest route - choose from safest, cheapest, most scenic, 
                  eco-friendly, or most popular routes based on what matters to you at 
                  that moment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-orange-200 dark:border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Target className="w-5 h-5 text-orange-500" />
                  AI-Powered Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  Our machine learning models are trained specifically on Indian road 
                  conditions, providing predictions and recommendations that actually 
                  work in our unique environment.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default About;