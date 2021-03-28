import { IconButton, useColorMode } from 'theme-ui'

const ColorSwitcher = (props) => {
  const [mode, setMode] = useColorMode()
  return (
    <IconButton
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      sx={{
        color: 'primary',
        cursor: 'pointer',
        marginTop: '-2.5px',
        borderRadius: 'circle',
        transition: 'box-shadow .125s ease-in-out',
      }}
      {...props}
    >
      <svg viewBox="0 0 32 32" width={14} height={14} fill={mode === 'dark' ? "#999" : "#fff"}>
        <circle
          cx={16}
          cy={16}
          r={14}
          fill="none"
          stroke={mode === 'dark' ? "#999" : "#fff"}
          strokeWidth={4}
        />
        <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
      </svg>
    </IconButton>
  )
}

export default ColorSwitcher
