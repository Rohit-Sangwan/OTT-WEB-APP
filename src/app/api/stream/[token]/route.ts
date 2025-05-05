import { NextRequest, NextResponse } from 'next/server'
import { getMoviePlayLinks } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    // Decode the token to get the movie ID and link ID
    const [movieId, linkId] = Buffer.from(params.token, 'base64')
      .toString()
      .split(':')
      .map(Number)

    console.log('Stream request:', { movieId, linkId })

    if (!movieId || !linkId) {
      console.error('Invalid token:', params.token)
      return new NextResponse('Invalid token', { status: 400 })
    }

    // Get the play link from the database
    const links = await getMoviePlayLinks(movieId)
    console.log('Found links:', links)
    
    const link = links.find(l => l.id === linkId)
    console.log('Selected link:', link)

    if (!link) {
      console.error('Link not found:', { movieId, linkId })
      return new NextResponse('Link not found', { status: 404 })
    }

    // Get the range header if present
    const range = request.headers.get('range')
    console.log('Range header:', range)
    
    const headers = new Headers()

    // Set CORS headers
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Range, Content-Type')

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers })
    }

    console.log('Fetching video from:', link.url)

    // Fetch the video from the source
    const response = await fetch(link.url, {
      headers: range ? { Range: range } : undefined,
      cache: 'no-store'
    })
    
    console.log('Source response status:', response.status)
    console.log('Source response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      console.error('Source video fetch failed:', {
        status: response.status,
        statusText: response.statusText,
        url: link.url
      })
      return new NextResponse('Failed to fetch video', { 
        status: 502,
        headers
      })
    }

    // Set appropriate headers for streaming
    headers.set('Content-Type', 'video/mp4')
    headers.set('Accept-Ranges', 'bytes')
    
    // Handle range requests
    if (range) {
      const contentRange = response.headers.get('content-range')
      if (contentRange) {
        headers.set('Content-Range', contentRange)
      }
      headers.set('Content-Length', response.headers.get('content-length') || '')
      console.log('Streaming with range:', {
        contentRange,
        contentLength: response.headers.get('content-length')
      })
      return new NextResponse(response.body, {
        status: 206,
        headers
      })
    }

    // For non-range requests, stream the entire file
    console.log('Streaming entire file')
    return new NextResponse(response.body, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Stream error:', error)
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Type'
      }
    })
  }
} 