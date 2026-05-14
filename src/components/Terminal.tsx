import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Send } from 'lucide-react';

interface LogEntry {
  type: 'input' | 'output' | 'error';
  content: string;
}

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'output', content: '>>> CHRONO-FORGE TERMINAL v1.0.4' },
    { type: 'output', content: '>>> CONNECTED TO AETHERNET PORT 443' },
    { type: 'output', content: '>>> Type "help" for a list of commands.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const args = cmd.toLowerCase().split(' ');
    const command = args[0];

    let response = '';
    let type: 'output' | 'error' = 'output';

    switch (command) {
      case 'help':
        response = 'Available commands: timeline list, glitch list, player lookup [name], clear';
        break;
      case 'clear':
        setLogs([]);
        return;
      case 'timeline':
        if (args[1] === 'list') {
          response = 'ACTIVE TIMELINES:\nID: 1 | Name: Primary | Status: STABLE\nID: 2 | Name: Glitch-9 | Status: UNSTABLE';
        } else {
          response = 'Usage: timeline [list|alter]';
        }
        break;
      case 'glitch':
        if (args[1] === 'list') {
          response = 'ACTIVE GLITCHES:\n- Duplication (7d CD)\n- Echo Phase (READY)';
        } else {
          response = 'Usage: glitch [list|trigger]';
        }
        break;
      default:
        response = `Unknown command: ${command}`;
        type = 'error';
    }

    setLogs(prev => [...prev, { type, content: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLogs(prev => [...prev, { type: 'input', content: input }]);
    handleCommand(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-full font-mono text-[10px] bg-transparent">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 custom-scrollbar pr-2">
        {logs.map((log, i) => (
          <div key={i} className={`
            ${log.type === 'input' ? 'text-slate-500' : ''}
            ${log.type === 'error' ? 'text-rose-500' : ''}
            ${log.type === 'output' ? 'text-brand-secondary underline-offset-2' : ''}
          `}>
            {log.type === 'input' && <span className="mr-2 font-black text-brand-accent italic">FORGER:</span>}
            <pre className="whitespace-pre-wrap leading-relaxed">
              {log.type === 'output' && <span className="text-brand-accent font-black mr-2">SYSTEM:</span>}
              {log.content}
            </pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-black/40 border border-slate-800 py-1.5 pl-3 pr-10 rounded text-slate-300 focus:outline-none focus:border-brand-accent/50 transition-colors placeholder:text-slate-700"
          placeholder="ENTER_COMMAND_OR_QUERY..."
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-accent/50 hover:text-brand-accent transition-colors cursor-pointer">
          <Send size={12} />
        </button>
      </form>
    </div>
  );
};
