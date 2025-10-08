"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";

function ElegantShape({
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    color = "rgba(255,255,255,0.08)",
    position,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            style={{
                position: 'absolute',
                ...position,
            }}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${color}, transparent)`,
                        filter: 'blur(1px)',
                        opacity: 0.6,
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    children,
    router,
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#030303'
        }}>
            {/* Background gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(244, 63, 94, 0.05) 0%, transparent 50%)',
                filter: 'blur(60px)'
            }} />

            {/* Floating shapes */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
                <ElegantShape
                    delay={0.3}
                    width={800}
                    height={200}
                    rotate={-15}
                    color="rgba(99, 102, 241, 0.4)"
                    position={{ left: '-20%', top: '10%' }}
                />

                <ElegantShape
                    delay={0.5}
                    width={600}
                    height={150}
                    rotate={20}
                    color="rgba(6, 182, 212, 0.3)"
                    position={{ right: '-15%', top: '60%' }}
                />

                <ElegantShape
                    delay={0.4}
                    width={700}
                    height={180}
                    rotate={10}
                    color="rgba(245, 158, 11, 0.3)"
                    position={{ left: '-10%', bottom: '10%' }}
                />

                <ElegantShape
                    delay={0.6}
                    width={500}
                    height={120}
                    rotate={-25}
                    color="rgba(139, 92, 246, 0.3)"
                    position={{ right: '-10%', top: '20%' }}
                />

                <ElegantShape
                    delay={0.7}
                    width={400}
                    height={100}
                    rotate={15}
                    color="rgba(244, 63, 94, 0.3)"
                    position={{ left: '60%', top: '5%' }}
                />
            </div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ maxWidth: '768px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            marginBottom: '48px'
                        }}
                    >
                        <Circle style={{ width: '8px', height: '8px', fill: 'rgba(244, 63, 94, 0.8)' }} />
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            fontWeight: 'bold',
                            marginBottom: '32px',
                            letterSpacing: '-0.025em',
                            lineHeight: '1.1'
                        }}>
                            <span style={{
                                background: 'linear-gradient(to bottom, white, rgba(255,255,255,0.8))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {title1}
                            </span>
                            {title2 && (
                                <>
                                    <br />
                                    <span style={{
                                        background: 'linear-gradient(to right, rgb(165, 180, 252), rgba(255,255,255,0.9), rgb(252, 165, 165))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        {title2}
                                    </span>
                                </>
                            )}
                        </h1>
                    </motion.div>

                    {!children && (
                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                color: 'rgba(255,255,255,0.4)',
                                marginBottom: '32px',
                                lineHeight: '1.6',
                                fontWeight: '300',
                                letterSpacing: '0.025em',
                                maxWidth: '672px',
                                margin: '0 auto 32px auto',
                                padding: '0 16px'
                            }}>
                                Join the world's first AI-driven reskilling platform.<br/>
                                Transform from vulnerable to future-proof with personalized learning paths,<br/>
                                blockchain certifications, and guaranteed job placement.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center', marginTop: '32px' }}>
                                <button 
                                    onClick={() => router?.push('/register')}
                                    style={{
                                        padding: '12px 32px',
                                        background: 'linear-gradient(to right, rgb(99, 102, 241), rgb(244, 63, 94))',
                                        color: 'white',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontSize: '16px'
                                    }}
                                >
                                    Get Started
                                </button>
                                <button 
                                    onClick={() => router?.push('/demo')}
                                    style={{
                                        padding: '12px 32px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: 'white',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontSize: '16px'
                                    }}
                                >
                                    Demo
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Overlay gradient - smooth transition to features */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(3,3,3,0.8) 0%, transparent 40%, transparent 60%, #030303 100%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
}

export { HeroGeometric };