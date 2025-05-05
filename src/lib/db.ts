import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ott_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows as T
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export async function getMovie(id: number) {
  const movies = await query<any[]>(
    `SELECT 
      id, 
      name as title, 
      description, 
      poster, 
      banner,
      release_date as year,
      runtime as duration,
      genres
    FROM movies 
    WHERE id = ?`,
    [id]
  )
  return movies[0]
}

export async function getMovies(limit = 20, offset = 0) {
  const [movies, totalCount] = await Promise.all([
    query<any[]>(
      'SELECT * FROM movies ORDER BY release_date DESC LIMIT ? OFFSET ?',
      [limit, offset]
    ),
    query<any[]>(
      'SELECT COUNT(*) as total FROM movies'
    )
  ])
  
  return {
    movies,
    total: totalCount[0].total
  }
}

export async function getMoviesByGenre(genre: string, limit = 20, offset = 0) {
  const [movies, totalCount] = await Promise.all([
    query<any[]>(
      'SELECT * FROM movies WHERE genres LIKE ? ORDER BY release_date DESC LIMIT ? OFFSET ?',
      [`%${genre}%`, limit, offset]
    ),
    query<any[]>(
      'SELECT COUNT(*) as total FROM movies WHERE genres LIKE ?',
      [`%${genre}%`]
    )
  ])
  
  return {
    movies,
    total: totalCount[0].total
  }
}

export async function getTrendingMovies(limit = 20) {
  const movies = await query<any[]>(
    'SELECT * FROM movies ORDER BY release_date DESC LIMIT ?',
    [limit]
  )
  return { movies }
}

export async function searchMovies(searchQuery: string, limit = 20, offset = 0) {
  const [movies, totalCount] = await Promise.all([
    query<any[]>(
      'SELECT * FROM movies WHERE name LIKE ? OR description LIKE ? ORDER BY release_date DESC LIMIT ? OFFSET ?',
      [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset]
    ),
    query<any[]>(
      'SELECT COUNT(*) as total FROM movies WHERE name LIKE ? OR description LIKE ?',
      [`%${searchQuery}%`, `%${searchQuery}%`]
    )
  ])
  
  return {
    movies,
    total: totalCount[0].total
  }
}

export async function getMoviePlayLinks(movieId: number) {
  return query<any[]>(
    `SELECT 
      id,
      url,
      name,
      size,
      link_order
    FROM movie_play_links 
    WHERE movie_id = ? 
    ORDER BY link_order`,
    [movieId]
  )
} 