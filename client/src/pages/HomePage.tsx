import { useNavigate } from 'react-router-dom';

const GAMES = [
  {
    num: '01',
    title: 'Minimum Cost',
    subtitle: 'Task Assignment Problem',
    desc: 'Assign N tasks to N employees minimizing total cost using Hungarian & Greedy algorithms.',
    path: '/minimum-cost',
    accent: '#eab308',
    dim: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.2)',
    algos: ['Hungarian O(n³)', 'Greedy Heuristic'],
    icon: '⬡',
  },
  {
    num: '02',
    title: 'Snake & Ladder',
    subtitle: 'Min Dice Throws Problem',
    desc: 'Find the minimum number of dice throws to reach the last cell on an N×N board.',
    path: '/snake-ladder',
    accent: '#10b981',
    dim: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    algos: ['BFS', 'Dijkstra'],
    icon: '⬢',
  },
  {
    num: '03',
    title: 'Traffic Simulation',
    subtitle: 'Maximum Flow Problem',
    desc: 'Compute maximum vehicle throughput through a 9-node directed traffic network.',
    path: '/traffic',
    accent: '#38bdf8',
    dim: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
    algos: ['Edmonds-Karp', "Dinic's"],
    icon: '⬟',
  },
  {
    num: '04',
    title: "Knight's Tour",
    subtitle: 'Hamiltonian Path Problem',
    desc: "A knight visits every square on an 8×8 or 16×16 chessboard exactly once.",
    path: '/knights-tour',
    accent: '#a855f7',
    dim: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
    algos: ["Warnsdorff's", 'Backtracking'],
    icon: '♞',
  },
  {
    num: '05',
    title: 'Sixteen Queens',
    subtitle: 'N-Queens Puzzle',
    desc: 'Place 8 queens on a 16×16 board so no two queens threaten each other.',
    path: '/queens',
    accent: '#fb7185',
    dim: 'rgba(251,113,133,0.08)',
    border: 'rgba(251,113,133,0.2)',
    algos: ['Sequential', 'Threaded (Workers)'],
    icon: '♛',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '60px', paddingTop: '20px' }}>
        <div className="font-mono-game" style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#5a6480', marginBottom: '16px', textTransform: 'uppercase' }}>
          BSc Hons Computing 25.2 // PDSA Coursework
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.02em', color: '#eef2ff', lineHeight: 1.1, marginBottom: '16px' }}>
          ALGORITHM<br />
          <span style={{ WebkitTextStroke: '1px #a855f7', color: 'transparent' }}>CHALLENGES</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#5a6480', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
          Five interactive games demonstrating classic algorithms with real-time timing comparisons and database persistence.
        </p>
      </div>

      {/* Game Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {GAMES.map((game) => (
          <button
            key={game.num}
            onClick={() => navigate(game.path)}
            style={{
              background: game.dim,
              border: `1px solid ${game.border}`,
              borderRadius: '14px',
              padding: '28px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.borderColor = game.accent + '60';
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${game.accent}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.borderColor = game.border;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* Number */}
            <div className="font-display" style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '40px', fontWeight: 900, color: game.accent + '20', lineHeight: 1 }}>
              {game.num}
            </div>

            {/* Icon */}
            <div style={{ fontSize: '32px', marginBottom: '16px', color: game.accent }}>{game.icon}</div>

            {/* Title */}
            <div className="font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#eef2ff', letterSpacing: '0.05em', marginBottom: '4px' }}>
              {game.title}
            </div>
            <div style={{ fontSize: '11px', color: game.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
              {game.subtitle}
            </div>

            {/* Desc */}
            <p style={{ fontSize: '13px', color: '#5a6480', lineHeight: 1.6, marginBottom: '18px' }}>
              {game.desc}
            </p>

            {/* Algorithms */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {game.algos.map((algo) => (
                <span key={algo} style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: '4px', background: game.accent + '15', color: game.accent, border: `1px solid ${game.accent}30`, letterSpacing: '0.05em' }}>
                  {algo}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ position: 'absolute', bottom: '24px', right: '24px', color: game.accent, fontSize: '18px', opacity: 0.6 }}>→</div>
          </button>
        ))}
      </div>

      {/* Stats strip */}
      <div style={{ display: 'flex', gap: '0', marginTop: '48px', border: '1px solid #1e2236', borderRadius: '12px', overflow: 'hidden' }}>
        {[
          { label: 'Games', value: '5' },
          { label: 'Algorithms', value: '10' },
          { label: 'Board Types', value: '3' },
          { label: 'Algorithm Approaches', value: '2x' },
        ].map((stat, i, arr) => (
          <div key={stat.label} style={{ flex: 1, padding: '20px', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid #1e2236' : 'none', background: '#0e1018' }}>
            <div className="font-display num-display" style={{ fontSize: '28px', fontWeight: 900, color: '#eef2ff', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: '#5a6480', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
