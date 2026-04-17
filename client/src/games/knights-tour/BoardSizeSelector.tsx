const ACCENT = '#a855f7';
interface Props { value: 8 | 16; onChange: (v: 8 | 16) => void; disabled?: boolean; }
export default function BoardSizeSelector({ value, onChange, disabled }: Props) {
  return (
    <div>
      <div style={{ fontSize: '11px', color: '#5a6480', marginBottom: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>BOARD SIZE</div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {([8, 16] as const).map((s) => (
          <button key={s} onClick={() => !disabled && onChange(s)} disabled={disabled} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: value === s ? `${ACCENT}20` : '#141720', border: `1px solid ${value === s ? ACCENT + '60' : '#1e2236'}`, color: value === s ? ACCENT : '#5a6480', fontSize: '14px', fontWeight: 700, cursor: disabled ? 'default' : 'pointer', fontFamily: 'var(--font-display)', transition: 'all 0.2s' }}>
            {s}×{s}
          </button>
        ))}
      </div>
    </div>
  );
}
