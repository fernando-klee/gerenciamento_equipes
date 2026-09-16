interface colorsProps {
  general: {
    primary: string
    second: string
    third: string
  }
  fonts: {
    primary: string
    second: string
    third: string
  }
  header: {
    background: string
  }
  sidebar: {
    background: string
  }
}

const colors = {
  general: {
    primary: '#f7f7f7',
    second: '#fff',
    third: '#cb0349'
  },
  fonts: {
    primary: '#717692',
    second: '#fff',
    third: '#35435e'
  },
  header: {
    background: 'transparent'
  },
  sidebar: {
    background: 'linear-gradient(to bottom, #4f4b4b, black);'
  }
} as colorsProps

export default colors