import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Target, Users, Lightbulb, Heart, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';

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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Naksha</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing navigation in India with real-world data and intelligent routing.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                Naksha was born from a simple frustration: existing navigation apps don't understand 
                Indian roads. They assume perfect conditions, ignore potholes, and miss the cultural 
                richness of our cities.
              </p>
              <p className="mb-6">
                We decided to build something different - a navigation system that understands the 
                reality of Indian roads. From potholes in Delhi to traffic patterns in Mumbai, 
                from monsoon flooding to festival routes, Naksha considers it all.
              </p>
              <p>
                Our mission is to make every journey in India safer, more efficient, and more enjoyable 
                by providing navigation that truly understands our unique context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Naksha.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover-lift text-center">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Why Naksha is the navigation app India has been waiting for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Real Ground Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We don't just use satellite imagery. Our team physically surveys roads, 
                  measuring potholes, traffic patterns, and safety conditions to provide 
                  accurate, real-world navigation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Indian Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  From understanding monsoon impact on roads to knowing which routes are 
                  safer during festivals, Naksha is built with deep knowledge of Indian 
                  road culture and conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Multiple Route Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Not just the fastest route - choose from safest, cheapest, most scenic, 
                  eco-friendly, or most popular routes based on what matters to you at 
                  that moment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  AI-Powered Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our machine learning models are trained specifically on Indian road 
                  conditions, providing predictions and recommendations that actually 
                  work in our unique environment.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate group of engineers, designers, and researchers working to improve navigation in India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="px-6 py-3 text-base">
              📧 contact@naksha.app
            </Badge>
            <Badge className="px-6 py-3 text-base">
              🐦 @nakshaapp
            </Badge>
            <Badge className="px-6 py-3 text-base">
              📱 +91 98765 43210
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;