import { LucideIcon } from 'lucide-react';

export type Faction = 'Purists' | 'Synthesizers' | 'Anarchists';

export interface Component {
  id: string;
  name: string;
  type: 'Cybernetic' | 'Bio-Engineered' | 'Energy';
  slot: 'Torso' | 'Right Arm' | 'Left Arm' | 'Legs' | 'Head' | 'Internal';
  effect: string;
  material: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Glitch';
}

export interface PowerNode {
  id: string;
  name: string;
  effect: string;
  icon: string; // Lucide icon name
  x: number;
  y: number;
}

export interface PlayerStats {
  level: number;
  energy: number;
  gravityManipulation: number;
  movementSpeed: number;
  plasmaDamage: number;
}

export const COMPONENTS: Component[] = [
  {
    id: 'grav-matrix',
    name: 'Gravitic Core Matrix',
    type: 'Cybernetic',
    slot: 'Torso',
    effect: '+40% Gravity Manipulation, Singularity Anchor',
    material: 'Void-Infused Platinum',
    rarity: 'Rare',
  },
  {
    id: 'plasma-gauntlet',
    name: 'Plasma-Caster Gauntlet',
    type: 'Cybernetic',
    slot: 'Right Arm',
    effect: 'Superheated Bolt (AoE plasma explosion)',
    material: 'Solar Flare Alloy',
    rarity: 'Rare',
  },
  {
    id: 'phase-blade',
    name: 'Phase Blade',
    type: 'Energy',
    slot: 'Left Arm',
    effect: 'Dimensional Slash (leaves reality glitches)',
    material: 'Quantum Shard',
    rarity: 'Legendary',
  },
  {
    id: 'temporal-disruptor',
    name: 'Temporal Disruptor',
    type: 'Energy',
    slot: 'Left Arm',
    effect: 'Chrono-Lash (rewinds enemy actions)',
    material: 'Fractured Chrono-Crystal',
    rarity: 'Rare',
  },
  {
    id: 'repulsor-soles',
    name: 'Repulsor-Soles',
    type: 'Cybernetic',
    slot: 'Legs',
    effect: 'Warping Kick, +25% Move Speed',
    material: 'Anti-Grav Gel',
    rarity: 'Common',
  },
  {
    id: 'leap-boots',
    name: 'Quantum Leap Boots',
    type: 'Energy',
    slot: 'Legs',
    effect: 'Fracture Jump (unpredictable dash)',
    material: 'Aether Spark',
    rarity: 'Legendary',
  },
  {
    id: 'omni-visor',
    name: 'Omni-Sensor Visor',
    type: 'Cybernetic',
    slot: 'Head',
    effect: 'Tactical Scan (reveals enemies)',
    material: 'Quantum Lens',
    rarity: 'Common',
  },
  {
    id: 'oracle-eye',
    name: 'Oracle Eye',
    type: 'Energy',
    slot: 'Head',
    effect: 'Fate Scan (predicts enemy moves)',
    material: 'Oracle Alloy',
    rarity: 'Glitch',
  },
  {
    id: 'aether-spleen',
    name: 'Aetheric Spleen',
    type: 'Bio-Engineered',
    slot: 'Internal',
    effect: '+30% Energy Regen, Aether Surge',
    material: 'Living Aether',
    rarity: 'Legendary',
  },
];

export const POWER_NODES: PowerNode[] = [
  { id: 'gravity-amp', name: 'Gravity Amplifier', effect: '+20% Gravity', icon: 'MoveVertical', x: 20, y: 20 },
  { id: 'flux-node', name: 'Temporal Flux Node', effect: '-15% Energy Cost', icon: 'Zap', x: 80, y: 20 },
  { id: 'plasma-cat', name: 'Plasma Catalyst', effect: '+15% Plasma Damage', icon: 'Flame', x: 50, y: 50 },
  { id: 'kinetic-red', name: 'Kinetic Redistributor', effect: '+10% Movement', icon: 'ArrowUpRight', x: 20, y: 80 },
  { id: 'aether-con', name: 'Aetheric Conduit', effect: '+10% Energy Regen', icon: 'Activity', x: 80, y: 80 },
];
