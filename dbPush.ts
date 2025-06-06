import { db, pool } from './db';
import * as schema from '../shared/schema';

// This script will push the schema to the database
// Run with: npx ts-node server/dbPush.ts

console.log('Pushing schema to database...');

const main = async () => {
  try {
    // Push the schema to the database
    console.log('Migrating schema...');
    await pool.query(`
      DO $$ 
      BEGIN
        -- Create enum types if they don't exist
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category') THEN
          CREATE TYPE category AS ENUM ('action', 'comedy', 'drama', 'horror', 'romance', 'sci-fi', 'documentary', 'animation', 'thriller', 'family', 'trending', 'new');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quality') THEN
          CREATE TYPE quality AS ENUM ('4K', 'HD', 'SD');
        END IF;
      END $$;
    `);
    
    console.log('Creating tables...');
    // Create tables
    await pool.query(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar TEXT,
        bio TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      -- Follows table
      CREATE TABLE IF NOT EXISTS follows (
        id SERIAL PRIMARY KEY,
        follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(follower_id, following_id)
      );
      
      -- Videos table
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        thumbnail TEXT NOT NULL,
        video_url TEXT NOT NULL,
        duration TEXT NOT NULL,
        year INTEGER NOT NULL,
        rating TEXT,
        director TEXT,
        actors TEXT,
        featured BOOLEAN DEFAULT FALSE,
        uploader_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      -- Video Categories junction table
      CREATE TABLE IF NOT EXISTS video_categories (
        id SERIAL PRIMARY KEY,
        video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
        category category NOT NULL
      );
      
      -- Video Qualities junction table
      CREATE TABLE IF NOT EXISTS video_qualities (
        id SERIAL PRIMARY KEY,
        video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
        quality quality NOT NULL
      );
      
      -- Video Likes table
      CREATE TABLE IF NOT EXISTS video_likes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, video_id)
      );
      
      -- Comments table
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      -- Watch History table
      CREATE TABLE IF NOT EXISTS watch_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
        progress INTEGER DEFAULT 0,
        watched_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      -- Playlists table
      CREATE TABLE IF NOT EXISTS playlists (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        cover_image TEXT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        is_private BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      -- Playlist Videos junction table
      CREATE TABLE IF NOT EXISTS playlist_videos (
        id SERIAL PRIMARY KEY,
        playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
        video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
        "order" INTEGER DEFAULT 0,
        added_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(playlist_id, video_id)
      );
    `);
    
    console.log('Schema pushed successfully!');
  } catch (error) {
    console.error('Error pushing schema:', error);
    process.exit(1);
  }
};

main();