/**
 * Naksha Design Tokens
 * Direction: "Ink, paper and marigold"
 * Human-crafted Indian aesthetic inspired by print, paper, and truck-art finishes.
 */

export const nakshaTokens = {
  colors: {
    // Canvas & Paper
    paper: '#F6EFE3',
    paperLight: '#FFFDF9',
    paperCard: '#FAF5EC',
    paperBorder: '#E6DCCB',
    paperMuted: '#EDE4D5',

    // Ink & Indigo Typography
    ink: '#14121F',
    inkLight: '#231F33',
    inkMuted: '#524C61',
    inkSubtle: '#787287',

    // Primary & Accent Brand Tones
    marigold: '#F2A31B',
    marigoldLight: '#FBD47D',
    marigoldDark: '#C98109',
    
    vermilion: '#D8472B',
    vermilionLight: '#EA6349',
    vermilionDark: '#B8341B',

    teal: '#1F6F6B',
    tealLight: '#2F8E8A',
    tealDark: '#144B48',

    // Profile Accents (Ink, Paper & Truck Art palette)
    profiles: {
      fastest: {
        accent: '#D8472B', // Vermilion
        bg: '#FDF0ED',
        border: '#F4BAAD',
      },
      safest: {
        accent: '#1F6F6B', // Muted Teal
        bg: '#EAF4F3',
        border: '#9DCBC8',
      },
      scenic: {
        accent: '#C98109', // Deep Marigold
        bg: '#FEF8EA',
        border: '#F8D88F',
      },
      eco: {
        accent: '#2E7D32', // Forest Olive
        bg: '#EEF6EE',
        border: '#B3DBB5',
      },
      transit: {
        accent: '#1961A3', // Indigo Blue
        bg: '#EEF5FC',
        border: '#ABCFF3',
      },
      floodFree: {
        accent: '#8C4300', // Terracotta Ochre
        bg: '#FAF0E6',
        border: '#DEC0A0',
      },
    },
  },

  borders: {
    ink: '1.5px solid #14121F',
    inkThick: '2px solid #14121F',
    paperSubtle: '1px solid #E6DCCB',
  },

  shadows: {
    hardSm: '2px 2px 0 #14121F',
    hard: '3px 3px 0 #14121F',
    hardLg: '4px 4px 0 #14121F',
    hardXl: '6px 6px 0 #14121F',
    hardMarigold: '4px 4px 0 #F2A31B',
    hardVermilion: '4px 4px 0 #D8472B',
    hardHover: '5px 5px 0 #14121F',
  },

  fonts: {
    display: "'Fraunces', 'Instrument Serif', Georgia, serif",
    sans: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    devanagari: "'Tiro Devanagari Hindi', 'Hind', serif",
  },
} as const;

export default nakshaTokens;
