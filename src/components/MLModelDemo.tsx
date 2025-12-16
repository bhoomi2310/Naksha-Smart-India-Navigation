import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Cpu, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MLModelDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Mock ML model predictions based on your notebook structure
  const mockPrediction = {
    potholes_per_km: 2.3,
    travel_time_per_km: 145, // seconds
    road_condition_score: 7.2,
    safety_rating: 8.1,
    traffic_density: 'medium',
    surface_type: 'asphalt',
    lighting_quality: 'good',
    drainage_issue: false,
    model_confidence: 0.87
  };

  const simulateMLAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate API call to backend with ML model
    setTimeout(() => {
      setResults(mockPrediction);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            ML Model Integration Demo
          </CardTitle>
          <CardDescription>
            This demonstrates how your XGBoost model predicts road conditions for intelligent routing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              To integrate your ML model, you'll need to connect to Supabase for backend functionality.
              Your model can run as an Edge Function to predict road conditions in real-time.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed">
              <CardContent className="p-4 text-center">
                <Database className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Road Data</p>
                <p className="text-xs text-muted-foreground">Dwarka dataset with 627 features</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-dashed">
              <CardContent className="p-4 text-center">
                <Cpu className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">XGBoost Model</p>
                <p className="text-xs text-muted-foreground">Two-stage Poisson regression</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-dashed">
              <CardContent className="p-4 text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Route Optimization</p>
                <p className="text-xs text-muted-foreground">6 intelligent route types</p>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            onClick={simulateMLAnalysis}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Road Conditions...' : 'Simulate ML Prediction'}
          </Button>
          
          {results && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Model Predictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Potholes per km</p>
                    <p className="text-2xl font-bold text-warning">{results.potholes_per_km}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Travel time per km</p>
                    <p className="text-2xl font-bold text-primary">{results.travel_time_per_km}s</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    Road Score: {results.road_condition_score}/10
                  </Badge>
                  <Badge variant="outline">
                    Safety: {results.safety_rating}/10
                  </Badge>
                  <Badge variant="outline">
                    Surface: {results.surface_type}
                  </Badge>
                  <Badge variant="outline">
                    Lighting: {results.lighting_quality}
                  </Badge>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Model Confidence: {Math.round(results.model_confidence * 100)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MLModelDemo;