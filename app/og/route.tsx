import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Jay Kamble — Full Stack Developer'
  const desc = searchParams.get('desc') || 'Building high-performance Next.js, React & AI SaaS applications.'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#a855f7', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            JK
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a1a1aa' }}>
            jaykamble009.in
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10, maxWidth: '900px' }}>
          <div style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', background: 'linear-gradient(to right, #ffffff, #a1a1aa)', backgroundClip: 'text', color: 'transparent' }}>
            {title}
          </div>
          <div style={{ fontSize: '24px', color: '#71717a', lineHeight: '1.4' }}>
            {desc}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', zIndex: 10 }}>
          <div style={{ fontSize: '20px', color: '#a855f7', fontWeight: '600' }}>
            Full Stack Developer • AI SaaS Engineer
          </div>
          <div style={{ fontSize: '18px', color: '#71717a' }}>
            Chhatrapati Sambhajinagar, MH, India
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
