# StreamFlix

A modern Netflix-inspired movie streaming web app built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### 1. Netflix-Style Top 10/Trending Section
- Displays a visually striking "Trending Now" or "Top 10" row on the homepage.
- Each movie/series poster is overlaid with a large, semi-transparent number (1-10) in the background, just like Netflix.
- Responsive, horizontal scrollable layout for easy browsing.
- Easily customizable for any category (Trending, Top 10, etc).

### 2. Netflix-Like Custom Video Player
- Modern, immersive video player UI inspired by Netflix.
- Features:
  - Big center play button overlay when paused
  - Skip 10 seconds forward/backward buttons
  - Volume slider and mute/unmute
  - Fullscreen toggle
  - Show/hide controls on mouse move (auto-hide after 3s)
  - Keyboard shortcuts: Space (play/pause), Left/Right (seek), F (fullscreen), M (mute)
  - Buffering/loading spinner
  - Responsive and mobile-friendly
  - Movie title display in the control bar

### 3. Movie Listing & Pagination
- Paginated movie grid with clean, responsive cards
- Consistent Netflix-style header on all pages
- Category browsing and genre filtering
- Search with live results and pagination

### 4. Movie Details & Play Page
- Detailed movie info with poster, year, duration, genres, and description
- List of available sources/links for playback
- Integrated custom video player

### 5. Categories Section
- Browse movies by genre/category
- Horizontal scrollable list of categories on homepage
- Dedicated category pages with filtered movie grids

### 6. Search Functionality
- Search movies by title or description
- Results page with pagination and result count
- Search bar in the header, query persists in URL

## 🛠️ Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- MySQL (with a simple query wrapper)

## 📂 Project Structure
- `src/app/` — App routes (pages)
- `src/components/` — Reusable UI components (Header, MovieGrid, CustomVideoPlayer, etc)
- `src/lib/db.ts` — Database functions

## 📝 Setup & Usage
1. Clone the repo
2. Install dependencies: `npm install`
3. Set up your `.env` for MySQL connection
4. Run the dev server: `npm run dev`

## 💡 Customization
- To change the Top 10/Trending section, edit `src/components/MovieGrid.tsx` and the homepage.
- To add more player features, edit `src/components/CustomVideoPlayer.tsx`.
- To add or edit categories, update `src/components/CategoriesRow.tsx` or make it dynamic from the database.

---

**Enjoy your Netflix-inspired streaming experience!**