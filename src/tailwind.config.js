// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        ink: '#0a0a0b',
        glass: 'rgba(255,255,255,0.08)'
      },
      boxShadow: {
        'glass': '0 10px 40px rgba(0,0,0,0.25)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  }
};
