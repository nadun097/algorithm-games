const ACCENT = '#10b981';

interface Props {
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}

export default function BoardSizeInput({ value, onChange, disabled }: Props) {
  const sizes = [6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <div style={{ fontSize: '11px', color: '#5a6480', marginBottom: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>BOARD SIZE (N×N)</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => !disabled && onChange(s)}
            disabled={disabled}
            style={{
              width: '40px', height: '40px', borderRadius: '8px',
              background: value === s ? `${ACCENT}20` : '#141720',
              border: `1px solid ${value === s ? ACCENT + '60' : '#1e2236'}`,
              color: value === s ? ACCENT : '#5a6480',
              fontSize: '13px', fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
              fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
