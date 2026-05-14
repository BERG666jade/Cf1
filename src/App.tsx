import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { 
  Package, 
  Activity, 
  Terminal as TerminalIcon,
  Zap, 
  Globe,
  Settings,
  Database,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPONENTS, Faction } from './constants';
import { CharacterModel } from './components/CharacterModel';
import { Terminal } from './components/Terminal';
import { PowerGrid } from './components/PowerGrid';

export default function App() {
  const [activeTab, setActiveTab] = useState<'FORGE' | 'GRID' | 'TERMINAL' | 'MARKET'>('FORGE');
  const [selectedFaction, setSelectedFaction] = useState<Faction>('Synthesizers');
  const [equipped, setEquipped] = useState<Record<string, string>>({
    'Torso': 'grav-matrix',
    'Right Arm': 'plasma-gauntlet',
    'Legs': 'repulsor-soles',
    'Head': 'omni-visor'
  });

  const stats = {
    energy: 2400,
    maxEnergy: 2400,
    sync: 80,
    balance: "12,450.82"
  };

  return (
    <div className="h-screen flex flex-col bg-brand-bg text-slate-200 overflow-hidden font-sans selection:bg-brand-accent/30 relative">
      <div className="absolute inset-0 scanline pointer-events-none z-50 opacity-20" />
      
      {/* Top Global Bar */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-brand-border bg-brand-surface shadow-lg z-40">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent italic">Aetheris</span>
            <span className="text-xl font-black tracking-tighter leading-none glitch-text">CHRONO-FORGE</span>
          </div>
          <nav className="hidden md:flex gap-6 text-xs font-black uppercase tracking-widest text-slate-500">
            {['World', 'Character', 'Economy', 'Social'].map(link => (
              <a key={link} href="#" onClick={(e) => { e.preventDefault(); if(link === 'Economy') setActiveTab('MARKET'); if(link === 'Character') setActiveTab('FORGE'); }} className={`hover:text-white transition-colors pb-1 border-b-2 ${((link === 'Character' && activeTab === 'FORGE') || (link === 'Economy' && activeTab === 'MARKET')) ? 'border-brand-accent text-white' : 'border-transparent'}`}>
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6 bg-slate-900/50 px-4 py-1.5 rounded-lg border border-slate-800">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-500 uppercase tracking-tighter font-bold">Aurum Balance</span>
            <span className="text-brand-accent font-mono font-bold leading-tight">{stats.balance}</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-200">FORGER_JADE</div>
              <div className="text-[9px] text-brand-secondary font-bold uppercase tracking-tighter overflow-hidden whitespace-nowrap max-w-[80px]">{selectedFaction}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-accent to-amber-200 border-2 border-slate-800 ring-1 ring-brand-accent/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"></div>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Rail: Social & Events */}
        <aside className="w-80 flex flex-col gap-4">
          <div className="flex-1 flex flex-col hud-panel p-4">
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <TerminalIcon size={12} className="text-brand-secondary" />
                Sector Chat
              </h3>
              <span className="text-[9px] bg-sky-900/40 text-brand-secondary px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">1,204 ONLINE</span>
            </div>
            <div className="flex-1 overflow-hidden">
               <Terminal />
            </div>
          </div>

          <div className="h-48 bg-gradient-to-br from-brand-accent/10 to-transparent hud-panel p-4 border-brand-accent/20">
            <h3 className="text-[10px] font-black uppercase text-brand-accent mb-3 italic tracking-widest">Emergent Events</h3>
            <div className="space-y-3">
              <div className="bg-black/20 p-2 rounded border border-brand-accent/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-brand-accent uppercase">Glitch Storm</span>
                  <span className="text-[8px] text-slate-500 font-mono italic font-bold">ACTIVE</span>
                </div>
                <div className="text-[9px] text-slate-400 mb-1.5">Region: Sector 0xC-FRACTURE</div>
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-brand-accent" 
                  />
                </div>
              </div>
              <div className="bg-black/20 p-2 rounded border border-slate-800">
                <div className="text-[10px] font-bold text-slate-300 uppercase italic">Caravan Defense</div>
                <div className="text-[9px] text-slate-500 font-mono mt-1 opacity-70">Status: In Progress - [04:12] rem.</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Character/World Preview */}
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex-1 hud-panel relative bg-gradient-to-b from-slate-900 to-[#05060a] border-slate-800 overflow-hidden group">
            {/* HUD Overlays */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-1 opacity-70">Current Location</div>
              <div className="text-2xl font-black text-white tracking-tighter uppercase glitch-text">The Iron Canyons</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-[9px] text-brand-secondary uppercase tracking-tight font-black opacity-80">PVP ENABLED // 100% RESOURCE MULTIPLIER</span>
              </div>
            </div>

            <div className="absolute top-6 right-6 w-32 h-32 rounded border border-slate-800 bg-slate-900/80 p-1 z-10 backdrop-blur-sm pointer-events-none">
              <div className="w-full h-full bg-[#05060a]/80 relative rounded overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                 <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-brand-secondary rounded-full opacity-40" />
                 <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-rose-500 rounded-full opacity-40" />
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
              </div>
            </div>

            {/* Character Viewport */}
            <div className="absolute inset-0 z-0">
               <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0.5, 4]} />
                <Environment preset="city" />
                <ambientLight intensity={0.4} />
                <Suspense fallback={null}>
                  <CharacterModel parts={equipped} />
                </Suspense>
                <OrbitControls 
                  enablePan={false} 
                  minPolarAngle={Math.PI / 4} 
                  maxPolarAngle={Math.PI / 1.5}
                />
                <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              </Canvas>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
              <button className="px-6 py-2.5 bg-brand-accent text-black font-black text-[11px] uppercase rounded shadow-xl shadow-brand-accent/20 hover:scale-105 active:scale-95 transition-all tracking-widest cursor-pointer">Rotate View</button>
              <button className="px-6 py-2.5 bg-slate-800/80 text-white font-black text-[11px] uppercase rounded border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all tracking-widest backdrop-blur-sm cursor-pointer">Modify Look</button>
            </div>
          </div>

          <div className="h-48 flex gap-4">
             <div className="flex-1 hud-panel p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                   <Zap size={14} className="text-brand-accent" />
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Neural Synergies</h3>
                </div>
                <div className="flex-1 overflow-hidden relative">
                   {activeTab === 'GRID' ? <PowerGrid /> : (
                     <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/5 bg-slate-900/20 rounded group cursor-pointer hover:bg-slate-900/40 transition-colors" onClick={() => setActiveTab('GRID')}>
                        <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-brand-accent transition-colors uppercase tracking-widest">Connect_Neural_Grid</span>
                        <span className="text-[8px] font-mono text-slate-700 mt-1 uppercase tracking-tighter">Status: Standby</span>
                     </div>
                   )}
                </div>
             </div>
             <div className="w-80 hud-panel p-4">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                   <Activity size={14} className="text-brand-secondary" />
                   <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Biometrics</h3>
                </div>
                <div className="space-y-5">
                   <MiniStat label="CORE_STABILITY" value={92} color="secondary" />
                   <MiniStat label="AETHER_CONDUIT" value={78} color="accent" />
                </div>
             </div>
          </div>
        </section>

        {/* Right Rail: Inventory & Economy */}
        <aside className="w-80 flex flex-col gap-4">
          <div className="hud-panel p-4 bg-gradient-to-br from-slate-900/50 to-transparent">
            <h3 className="text-[10px] font-black uppercase text-brand-secondary mb-4 flex items-center gap-2 tracking-widest italic">
              <span className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              Market Dynamics
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Iron Ore', price: '-12.4%', up: false },
                { name: 'Mana Shards', price: '+4.1%', up: true },
                { name: 'Plasma Cells', price: 'STABLE', up: null }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-0.5 mr-1 font-bold">
                   <span className="text-[10px] text-slate-400 uppercase tracking-tight font-black">{item.name}</span>
                   <span className={`text-[10px] font-mono ${item.up === true ? 'text-emerald-400' : item.up === false ? 'text-rose-400' : 'text-slate-100'}`}>
                    {item.price}
                   </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 py-2 border border-slate-700 rounded text-[9px] font-black uppercase hover:bg-slate-800 transition-colors tracking-[.2em] cursor-pointer" onClick={() => setActiveTab('MARKET')}>Economy Console</button>
          </div>

          <div className="flex-1 hud-panel p-4 flex flex-col min-h-0 bg-slate-900/60">
             <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
               <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                 <Package size={14} />
                 Inventory
               </h3>
               <span className="text-[9px] font-mono text-slate-500 font-bold">42/100 KG</span>
             </div>
             
             <div className="grid grid-cols-4 gap-2 mb-4 overflow-y-auto custom-scrollbar pr-1">
                {COMPONENTS.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => setEquipped(prev => ({ ...prev, [item.slot]: item.id }))}
                    className={`aspect-square rounded border flex flex-col items-center justify-center cursor-pointer transition-all ${
                      equipped[item.slot] === item.id 
                      ? 'bg-brand-accent/20 border-brand-accent text-brand-accent shadow-[inset_0_0_12px_rgba(245,158,11,0.15)] ring-1 ring-brand-accent/20' 
                      : 'bg-slate-900/80 border-slate-800 text-slate-600 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-[8px] font-black uppercase tracking-tighter leading-none">{item.name.slice(0, 3)}</span>
                    {item.rarity === 'Legendary' && <div className="w-1 h-1 bg-brand-accent rounded-full mt-1" />}
                  </div>
                ))}
                {[...Array(12)].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square bg-black/40 rounded border border-white/5 opacity-30 shadow-inner" />
                ))}
             </div>

             <div className="mt-auto pt-4 border-t border-white/5">
                <div className="text-[9px] text-slate-500 uppercase flex justify-between font-black tracking-[.2em] mb-1.5 italic">
                  <span>Cargo Load</span>
                  <span className="text-slate-300 font-mono">42%</span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden p-[1px] border border-white/5">
                  <div className="h-full bg-slate-500 w-[42%] shadow-[0_0_10px_rgba(255,255,255,0.15)] rounded-full" />
                </div>
             </div>
          </div>
        </aside>
      </main>

      {/* Bottom Interface / Action Bar */}
      <footer className="h-20 bg-brand-surface border-t border-brand-border flex items-center px-6 gap-10 z-40">
        <div className="flex-1 flex justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <div key={num} className={`w-12 h-12 rounded-lg border flex flex-col items-center justify-center transition-all group cursor-pointer ${num === 3 ? 'bg-brand-accent/20 border-brand-accent shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'}`}>
              <span className={`font-black text-sm leading-none ${num === 3 ? 'text-brand-accent' : 'text-slate-600 group-hover:text-slate-400'}`}>{num}</span>
              {num === 3 ? (
                <span className="text-[7px] text-brand-accent/80 font-black tracking-widest mt-0.5">HEAL</span>
              ) : (
                <div className="w-1 h-1 bg-slate-700 rounded-full mt-1 group-hover:bg-slate-500" />
              )}
            </div>
          ))}
        </div>
        
        <div className="w-80 flex flex-col gap-1 pl-10 border-l border-slate-800">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] italic mb-0.5">
            <span className="text-rose-500">Vitals</span>
            <span className="text-slate-400 font-mono italic">2,400 / 2,400</span>
          </div>
          <div className="w-full h-3.5 bg-black rounded border border-slate-800 overflow-hidden p-[2px]">
            <div className="h-full bg-rose-600 w-full shadow-[0_0_15px_rgba(225,29,72,0.5)] rounded-sm" />
          </div>
          <div className="w-full h-2 bg-black rounded border border-slate-800 overflow-hidden p-[1px]">
            <div className="h-full bg-brand-secondary w-[80%] shadow-[0_0_10px_rgba(34,211,238,0.4)] rounded-sm opacity-60" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: 'accent' | 'secondary' }) {
  const accentColor = color === 'accent' ? 'text-brand-accent' : 'text-brand-secondary';
  const barColor = color === 'accent' ? 'bg-brand-accent' : 'bg-brand-secondary';
  
  return (
    <div className="flex flex-col gap-1.5">
       <div className="flex justify-between items-center px-1">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate max-w-[100px]">{label}</span>
          <span className={`text-[10px] font-mono font-black ${accentColor}`}>{value}%</span>
       </div>
       <div className="w-full h-1.5 bg-black rounded-full overflow-hidden p-[1px] border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${barColor} shadow-[0_0_5px_rgba(0,0,0,0.5)] rounded-full`} 
          />
       </div>
    </div>
  );
}

function StatBadge({ label, value, color }: { label: string; value: number; color: 'cyan' | 'purple' }) {
  const accentClass = color === 'cyan' ? 'text-brand-cyan' : 'text-brand-purple';
  const bgClass = color === 'cyan' ? 'bg-brand-cyan/20' : 'bg-brand-purple/20';
  const borderClass = color === 'cyan' ? 'border-brand-cyan/20' : 'border-brand-purple/20';

  return (
    <div className={`px-4 py-1.5 rounded border flex flex-col ${bgClass} ${borderClass}`}>
      <span className="text-[8px] uppercase font-bold tracking-widest text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-base font-black ${accentClass}`}>{value}%</span>
        <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            className={`h-full ${color === 'cyan' ? 'bg-brand-cyan' : 'bg-brand-purple'}`} 
          />
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, active, onClick, label }: { icon: any; active: boolean; onClick: () => void; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative group flex flex-col items-center gap-1 transition-all ${
        active ? 'text-brand-cyan' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[9px] font-bold uppercase tracking-tighter active:scale-95">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-cyan rounded-r shadow-[0_0_10px_rgba(0,242,255,0.8)]"
        />
      )}
    </button>
  );
}

