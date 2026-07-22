import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'

export const alt = 'Jay Kamble - Full Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #111111)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Decorative Glowing Orb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(153,0,255,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 'bold', letterSpacing: '-0.02em', marginBottom: '16px', background: 'linear-gradient(to right, #ffffff, #a3a3a3)', backgroundClip: 'text', color: 'transparent' }}>
            {siteConfig.creator}
          </div>
          <div style={{ fontSize: 32, color: '#888888', marginBottom: '32px' }}>
            Full Stack Developer & AI Engineer
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            {siteConfig.keywords.slice(0, 4).map((keyword) => (
              <div key={keyword} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '18px', color: '#dddddd' }}>
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
