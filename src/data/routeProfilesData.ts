import { Clock, ShieldCheck, Compass, Leaf, Train, AlertTriangle, LucideIcon } from 'lucide-react';

export interface RouteProfileItem {
  id: string;
  title: string;
  shortTitle: string;
  desc: string;
  bestFor: string;
  timeExample: string;
  distanceExample: string;
  icon: LucideIcon;
  accentColor: string;
  bgTint: string;
  borderTint: string;
  tagColor: string;
  stats: {
    stat1: { label: string; value: string };
    stat2: { label: string; value: string };
    stat3: { label: string; value: string };
  };
}

export const ROUTE_PROFILES: RouteProfileItem[] = [
  {
    id: 'fastest',
    title: 'Fastest Route',
    shortTitle: 'Fastest',
    desc: 'Uses elevated flyovers and bypass expressways to skip ground-level traffic signals and bottleneck junctions.',
    bestFor: 'Morning & evening rush',
    timeExample: '32 mins',
    distanceExample: '28.4 km',
    icon: Clock,
    accentColor: '#D8472B', // Vermilion
    bgTint: '#FDF0ED',
    borderTint: '#F4BAAD',
    tagColor: '#B8341B',
    stats: {
      stat1: { label: 'Road Surface', value: 'Expressway' },
      stat2: { label: 'Corridor', value: 'Elevated Flyover' },
      stat3: { label: 'Signals', value: '6 Skipped' },
    },
  },
  {
    id: 'safest',
    title: 'Safest Route',
    shortTitle: 'Safest',
    desc: 'Guides you along well-lit major avenues with verified police booths, continuous streetlights, and active commercial hubs.',
    bestFor: 'Solo travel & night driving',
    timeExample: '35 mins',
    distanceExample: '29.1 km',
    icon: ShieldCheck,
    accentColor: '#1F6F6B', // Muted Teal
    bgTint: '#EAF4F3',
    borderTint: '#9DCBC8',
    tagColor: '#144B48',
    stats: {
      stat1: { label: 'Streetlighting', value: '98% Lit' },
      stat2: { label: 'Police Booths', value: '4 En-Route' },
      stat3: { label: 'CCTV Density', value: 'High' },
    },
  },
  {
    id: 'scenic',
    title: 'Scenic Heritage Route',
    shortTitle: 'Scenic',
    desc: 'Curves through wide tree-lined avenues past iconic heritage landmarks, historic monuments, and peaceful city gardens.',
    bestFor: 'Weekend & calm journeys',
    timeExample: '41 mins',
    distanceExample: '31.2 km',
    icon: Compass,
    accentColor: '#C98109', // Deep Marigold
    bgTint: '#FEF8EA',
    borderTint: '#F8D88F',
    tagColor: '#8C5A06',
    stats: {
      stat1: { label: 'Tree Canopy', value: '82% Shaded' },
      stat2: { label: 'Heritage Sites', value: '5 Landmarks' },
      stat3: { label: 'Honking Index', value: 'Low' },
    },
  },
  {
    id: 'eco',
    title: 'Eco-Saver Route',
    shortTitle: 'Eco-Saver',
    desc: 'Maintains steady cruising speeds with minimal signal stops and gentle inclines to lower petrol consumption and tailpipe smoke.',
    bestFor: 'Daily commute & EV range',
    timeExample: '34 mins',
    distanceExample: '27.8 km',
    icon: Leaf,
    accentColor: '#2E7D32', // Forest Olive
    bgTint: '#EEF6EE',
    borderTint: '#B3DBB5',
    tagColor: '#1B5E20',
    stats: {
      stat1: { label: 'Fuel Saved', value: '~220 ml' },
      stat2: { label: 'Idling Time', value: '65% Less' },
      stat3: { label: 'EV Regen', value: 'Optimal' },
    },
  },
  {
    id: 'transit',
    title: 'Metro + Transit Route',
    shortTitle: 'Metro + Transit',
    desc: 'Connects fast air-conditioned Metro lines with feeder electric buses and official auto rickshaw meter rates to beat street jams.',
    bestFor: 'Monsoon rains & saving money',
    timeExample: '24 mins',
    distanceExample: '26.0 km',
    icon: Train,
    accentColor: '#1961A3', // Indigo
    bgTint: '#EEF5FC',
    borderTint: '#ABCFF3',
    tagColor: '#0E4375',
    stats: {
      stat1: { label: 'Metro Fare', value: '₹45' },
      stat2: { label: 'Traffic Delay', value: 'Zero (Rail)' },
      stat3: { label: 'AC Comfort', value: '100%' },
    },
  },
  {
    id: 'flood-free',
    title: 'Pothole & Flood-Free',
    shortTitle: 'Flood-Free',
    desc: 'Bypasses monsoon waterlogged underpasses, road cave-ins, and severe craters verified in real time by local commuters.',
    bestFor: 'Tyre & suspension safety',
    timeExample: '37 mins',
    distanceExample: '29.6 km',
    icon: AlertTriangle,
    accentColor: '#8C4300', // Terracotta Ochre
    bgTint: '#FAF0E6',
    borderTint: '#DEC0A0',
    tagColor: '#6B3300',
    stats: {
      stat1: { label: 'Potholes', value: '0 En-Route' },
      stat2: { label: 'Waterlogging', value: 'Cleared' },
      stat3: { label: 'Road Quality', value: 'Grade A' },
    },
  },
];

