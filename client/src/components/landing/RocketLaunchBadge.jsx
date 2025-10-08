'use client';
import { Box } from '@mui/material';

const RocketLaunchBadge = ({ 
  size = 400, 
  animationSpeed = 1, 
  flameColor = '#ff4500',
  spaceColor = '#1a237e' 
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(ellipse at 20% 30%, #001122, ${spaceColor}, #0d47a1, #000051)`,
        boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.8), inset 20px 20px 40px rgba(255,255,255,0.1), 0 25px 50px rgba(0,0,0,0.6)',
        position: 'relative',
        overflow: 'hidden',
        border: '4px solid rgba(255,255,255,0.3)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent, rgba(0,245,255,0.1), transparent, rgba(255,100,50,0.1), transparent)',
          animation: `frameGlow 8s infinite linear`,
        },
        '@keyframes frameGlow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    >
      {/* Enhanced Twinkling Stars */}
      {[...Array(25)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#ffffff' : '#ffd700',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${5 + Math.random() * 10}px currentColor`,
            animation: `starTwinkle${i} ${1.5 + Math.random() * 2}s infinite ease-in-out`,
            [`@keyframes starTwinkle${i}`]: {
              '0%, 100%': { opacity: 0.2, transform: 'scale(0.5) rotate(0deg)' },
              '50%': { opacity: 1, transform: 'scale(1.8) rotate(180deg)' },
            },
          }}
        />
      ))}

      {/* Enhanced Orbiting Earth */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 25% 25%, #87ceeb, #4fc3f7, #2196f3, #1565c0)',
          animation: `earthOrbit 18s infinite linear`,
          boxShadow: 'inset -12px -12px 25px rgba(0,0,0,0.5), 0 0 30px rgba(33,150,243,0.6)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '15%',
            left: '8%',
            width: '18px',
            height: '12px',
            background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
            borderRadius: '60% 40%',
            animation: `continentShift 10s infinite linear`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '25%',
            right: '15%',
            width: '14px',
            height: '8px',
            background: 'linear-gradient(135deg, #8bc34a, #4caf50)',
            borderRadius: '50% 70%',
            animation: `continentShift 10s infinite linear reverse`,
          },
          '@keyframes earthOrbit': {
            '0%': { transform: 'rotate(0deg) translateX(90px) rotate(0deg)' },
            '100%': { transform: 'rotate(360deg) translateX(90px) rotate(-360deg)' },
          },
          '@keyframes continentShift': {
            '0%': { transform: 'rotate(0deg) scale(1)' },
            '100%': { transform: 'rotate(360deg) scale(1.1)' },
          },
        }}
      />

      {/* Enhanced Main Rocket */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '18%',
          left: '28%',
          width: '24px',
          height: '48px',
          background: 'linear-gradient(180deg, #f5f5f5, #e0e0e0, #9e9e9e, #616161)',
          borderRadius: '12px 12px 0 0',
          animation: `rocketLaunch 7s infinite ease-out`,
          transformOrigin: 'bottom center',
          boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.3), inset -2px 0 4px rgba(0,0,0,0.3)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '18px solid #d32f2f',
            filter: 'drop-shadow(0 0 8px #ff5722)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #1976d2, transparent)',
            borderRadius: '2px',
          },
          '@keyframes rocketLaunch': {
            '0%': { 
              transform: 'translateY(0px) rotate(0deg) scale(1)',
              filter: 'drop-shadow(0 0 5px orange) brightness(1)',
            },
            '15%': {
              transform: 'translateY(-30px) rotate(3deg) scale(1.05)',
              filter: 'drop-shadow(0 8px 16px orange) brightness(1.2)',
            },
            '40%': { 
              transform: 'translateY(-120px) translateX(40px) rotate(12deg) scale(1.1)',
              filter: 'drop-shadow(0 12px 24px red) brightness(1.1)',
            },
            '70%': { 
              transform: 'translateY(-280px) translateX(90px) rotate(20deg) scale(0.7)',
              filter: 'drop-shadow(0 16px 32px blue) brightness(0.9)',
            },
            '100%': { 
              transform: 'translateY(-420px) translateX(160px) rotate(30deg) scale(0.2)',
              opacity: 0,
            },
          },
        }}
      />

      {/* Enhanced Rocket Flames */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '13%',
          left: '30%',
          width: '20px',
          height: '40px',
          background: `radial-gradient(ellipse at 50% 0%, #ffffff, ${flameColor}, #ff6b35, #ffeb3b, transparent)`,
          borderRadius: '0 0 60% 60%',
          animation: `flameFlicker 0.15s infinite alternate, flameLaunch 7s infinite ease-out`,
          transformOrigin: 'top center',
          filter: 'blur(1px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: '10px',
            height: '25px',
            background: 'linear-gradient(180deg, #ffffff, #ffeb3b, transparent)',
            borderRadius: '0 0 50% 50%',
            animation: `innerFlame 0.1s infinite alternate`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '8px',
            background: 'radial-gradient(ellipse, rgba(255,100,0,0.8), transparent)',
            borderRadius: '50%',
            filter: 'blur(2px)',
          },
          '@keyframes flameFlicker': {
            '0%': { transform: 'scaleY(1) scaleX(1) rotate(-2deg)' },
            '100%': { transform: 'scaleY(1.4) scaleX(0.7) rotate(2deg)' },
          },
          '@keyframes innerFlame': {
            '0%': { transform: 'scaleY(0.8) scaleX(1.2)' },
            '100%': { transform: 'scaleY(1.2) scaleX(0.8)' },
          },
          '@keyframes flameLaunch': {
            '0%': { 
              transform: 'translateY(0px) rotate(0deg) scaleY(1)',
              opacity: 1,
            },
            '15%': {
              transform: 'translateY(-30px) rotate(3deg) scaleY(2.5)',
              opacity: 1,
            },
            '40%': { 
              transform: 'translateY(-120px) translateX(40px) rotate(12deg) scaleY(2)',
              opacity: 0.9,
            },
            '70%': { 
              transform: 'translateY(-280px) translateX(90px) rotate(20deg) scaleY(1.2)',
              opacity: 0.6,
            },
            '100%': { 
              transform: 'translateY(-420px) translateX(160px) rotate(30deg) scaleY(0.3)',
              opacity: 0,
            },
          },
        }}
      />

      {/* Enhanced Swirling Smoke */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            bottom: '8%',
            left: `${20 + i * 4}%`,
            width: `${12 + i * 4}px`,
            height: `${12 + i * 4}px`,
            background: `radial-gradient(circle, rgba(255,255,255,${0.9 - i * 0.1}), rgba(200,200,200,${0.6 - i * 0.05}), transparent)`,
            borderRadius: `${40 + i * 10}% ${60 - i * 5}%`,
            animation: `smokeSwirl${i} ${2.5 + i * 0.3}s infinite ease-out ${i * 0.15}s`,
            filter: 'blur(1px)',
            [`@keyframes smokeSwirl${i}`]: {
              '0%': { 
                transform: 'translateY(0px) scale(0.3) rotate(0deg)',
                opacity: 0.9,
              },
              '30%': {
                transform: `translateY(-${30 + i * 15}px) scale(0.8) rotate(${90 + i * 45}deg)`,
                opacity: 0.7,
              },
              '70%': {
                transform: `translateY(-${80 + i * 25}px) scale(1.2) rotate(${180 + i * 90}deg)`,
                opacity: 0.4,
              },
              '100%': { 
                transform: `translateY(-${140 + i * 35}px) scale(2) rotate(${360 + i * 180}deg)`,
                opacity: 0,
              },
            },
          }}
        />
      ))}

      {/* Enhanced Background Rocket with Glowing Trail */}
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          right: '85%',
          width: '12px',
          height: '20px',
          background: 'linear-gradient(135deg, #ffffff, #f5f5f5, #e0e0e0)',
          borderRadius: '6px 6px 2px 2px',
          animation: `fastRocket 5s infinite linear`,
          boxShadow: '0 0 8px rgba(255,255,255,0.8)',
          '&::before': {
            content: '""',
            position: 'absolute',
            right: '-25px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '30px',
            height: '3px',
            background: 'linear-gradient(90deg, #00f5ff, #00bcd4, transparent)',
            borderRadius: '3px',
            boxShadow: '0 0 12px #00f5ff',
            animation: `trailPulse 0.3s infinite alternate`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(0,245,255,0.6), transparent)',
            borderRadius: '1px',
          },
          '@keyframes fastRocket': {
            '0%': { 
              transform: 'translateX(0px) translateY(0px) rotate(15deg)',
              opacity: 0,
            },
            '5%': {
              opacity: 1,
            },
            '95%': {
              opacity: 1,
            },
            '100%': { 
              transform: 'translateX(550px) translateY(-120px) rotate(25deg)',
              opacity: 0,
            },
          },
          '@keyframes trailPulse': {
            '0%': { opacity: 0.6, transform: 'translateY(-50%) scaleX(1)' },
            '100%': { opacity: 1, transform: 'translateY(-50%) scaleX(1.3)' },
          },
        }}
      />

      {/* Enhanced Textured Moon */}
      <Box
        sx={{
          position: 'absolute',
          top: '55%',
          left: '8%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 25% 25%, #fff8e1, #ffd54f, #ffb74d, #ff9800)',
          animation: `moonOrbit 16s infinite linear`,
          boxShadow: 'inset -8px -8px 16px rgba(0,0,0,0.4), 0 0 20px rgba(255,183,77,0.4)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '18%',
            left: '25%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.25)',
            boxShadow: '8px 4px 0 2px rgba(0,0,0,0.15), -4px 8px 0 1px rgba(0,0,0,0.1)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '25%',
            right: '20%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.2)',
          },
          '@keyframes moonOrbit': {
            '0%': { transform: 'rotate(0deg) translateX(70px) rotate(0deg)' },
            '100%': { transform: 'rotate(360deg) translateX(70px) rotate(-360deg)' },
          },
        }}
      />
    </Box>
  );
};

export default RocketLaunchBadge;