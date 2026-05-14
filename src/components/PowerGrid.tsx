import React from 'react';
import * as LucideIcons from 'lucide-react';
import { POWER_NODES } from '../constants';
import { motion } from 'motion/react';

export const PowerGrid = () => {
  return (
    <div className="relative w-full h-full bg-slate-900/50 rounded-xl border border-brand-accent/10 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      
      {/* Connections (Static lines for demo) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" className="animate-[dash_10s_linear_infinite]" />
        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
        <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
      </svg>

      {/* Nodes */}
      {POWER_NODES.map((node) => {
        const Icon = (LucideIcons as any)[node.icon];
        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className="absolute group"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 border border-brand-accent/50 rounded shadow-[0_0_10px_rgba(245,158,11,0.2)] cursor-pointer overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-brand-accent/5 group-hover:bg-brand-accent/20 transition-colors" />
              <Icon size={18} className="text-brand-accent relative z-10" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 bg-slate-900 border border-brand-accent/30 p-2 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20 shadow-2xl">
              <p className="text-brand-accent font-black text-[9px] uppercase tracking-widest">{node.name}</p>
              <p className="text-[8px] text-slate-400 mt-1 leading-tight">{node.effect}</p>
            </div>
          </motion.div>
        );
      })}
      
      {/* Central Node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-brand-accent/10 border-2 border-brand-accent rounded-full flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <LucideIcons.Cpu size={24} className="text-brand-accent" />
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
};
