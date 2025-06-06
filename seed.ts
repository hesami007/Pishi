import { db, pool } from './db';
import * as schema from '../shared/schema';
import bcrypt from 'bcrypt';

// This script will seed the database with initial data
// Run with: npx ts-node server/seed.ts

const main = async () => {
  try {
    console.log('Seeding database...');
    
    // Create demo users
    console.log('Creating users...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    
    const [admin] = await db.insert(schema.users).values({
      username: 'admin',
      email: 'admin@catflix.com',
      password: adminPassword,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'CatFlix administrator and cat video enthusiast'
    }).returning().onConflictDoNothing();
    
    const [user1] = await db.insert(schema.users).values({
      username: 'catfan',
      email: 'catfan@example.com',
      password: userPassword,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Just a cat person who loves cat videos!'
    }).returning().onConflictDoNothing();
    
    // Create videos
    console.log('Creating videos...');
    const videos = [
      {
        title: 'Curious Kittens',
        description: 'Watch these adorable kittens explore their surroundings for the first time.',
        thumbnail: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '10:30',
        year: 2023,
        rating: 'G',
        director: 'Jane Smith',
        cast: 'Fluffy, Mittens, Whiskers',
        featured: true,
        uploaderId: admin?.id
      },
      {
        title: 'Cat Acrobatics',
        description: 'These talented felines show off their impressive acrobatic skills.',
        thumbnail: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '8:45',
        year: 2022,
        rating: 'G',
        director: 'John Doe',
        cast: 'Shadow, Luna, Oscar',
        featured: false,
        uploaderId: admin?.id
      },
      {
        title: 'Cats vs. Laser Pointers',
        description: 'Hilarious compilation of cats chasing laser pointers.',
        thumbnail: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fA%3D%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '12:15',
        year: 2023,
        rating: 'G',
        director: 'Sarah Johnson',
        cast: 'Max, Bella, Lily',
        featured: true,
        uploaderId: user1?.id
      },
      {
        title: 'Sleepy Cats',
        description: 'A compilation of cats snoozing in the most adorable ways.',
        thumbnail: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHw%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '15:00',
        year: 2022,
        rating: 'G',
        director: 'Michael Brown',
        cast: 'Oliver, Leo, Charlie',
        featured: false,
        uploaderId: admin?.id
      },
      {
        title: 'Cat Fails',
        description: 'Even cats have awkward moments. Watch this funny compilation of feline fails.',
        thumbnail: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHw%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '9:20',
        year: 2023,
        rating: 'G',
        director: 'Emily Wilson',
        cast: 'Simba, Milo, Coco',
        featured: true,
        uploaderId: user1?.id
      },
      {
        title: 'Cats in Boxes',
        description: 'If it fits, I sits. Cats showing their love for boxes of all sizes.',
        thumbnail: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhdHxlbnwwfHwwfHw%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '7:55',
        year: 2022,
        rating: 'G',
        director: 'David Miller',
        cast: 'Felix, Jasper, Ruby',
        featured: false,
        uploaderId: admin?.id
      },
      {
        title: 'Cat Bath Time',
        description: 'Most cats hate water, but these brave felines are taking a bath.',
        thumbnail: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '11:40',
        year: 2023,
        rating: 'G',
        director: 'Jessica Taylor',
        cast: 'Luna, Kitty, Smokey',
        featured: false,
        uploaderId: user1?.id
      },
      {
        title: 'Kittens First Snow',
        description: 'Watch these adorable kittens experience snow for the first time.',
        thumbnail: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&w=300&q=80',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: '14:10',
        year: 2022,
        rating: 'G',
        director: 'Robert Clark',
        cast: 'Snowball, Misty, Frost',
        featured: true,
        uploaderId: admin?.id
      }
    ];
    
    // Insert videos
    for (const videoData of videos) {
      const [video] = await db.insert(schema.videos).values(videoData).returning().onConflictDoNothing();
      
      if (video) {
        // Add categories
        const categories = [
          Math.random() > 0.5 ? 'comedy' : 'documentary',
          Math.random() > 0.5 ? 'family' : 'animation'
        ];
        
        // All videos should be in the 'trending' category for the demo
        categories.push('trending');
        
        // Some videos should be in the 'new' category
        if (video.year === 2023) {
          categories.push('new');
        }
        
        for (const category of categories) {
          await db.insert(schema.videoCategories).values({
            videoId: video.id,
            category: category as any
          }).onConflictDoNothing();
        }
        
        // Add qualities
        const qualities = ['HD'];
        if (Math.random() > 0.7) {
          qualities.push('4K');
        }
        if (Math.random() > 0.5) {
          qualities.push('SD');
        }
        
        for (const quality of qualities) {
          await db.insert(schema.videoQualities).values({
            videoId: video.id,
            quality: quality as any
          }).onConflictDoNothing();
        }
      }
    }
    
    // Create some likes
    console.log('Creating likes and comments...');
    if (admin && user1) {
      const allVideos = await db.select().from(schema.videos);
      
      // Admin likes some videos
      for (const video of allVideos) {
        if (Math.random() > 0.5) {
          await db.insert(schema.videoLikes).values({
            userId: admin.id,
            videoId: video.id
          }).onConflictDoNothing();
        }
      }
      
      // User1 likes some videos
      for (const video of allVideos) {
        if (Math.random() > 0.5) {
          await db.insert(schema.videoLikes).values({
            userId: user1.id,
            videoId: video.id
          }).onConflictDoNothing();
        }
      }
      
      // Add some comments
      const commentTexts = [
        'This cat is so cute!',
        'I love this video!',
        'My cat does the same thing!',
        'Adorable kittens, I want one!',
        'That is one talented cat.',
        'Made my day, thanks for sharing!',
        'Cats are the best!',
        'I cannot stop watching this!'
      ];
      
      for (const video of allVideos) {
        // Admin comments
        if (Math.random() > 0.5) {
          const commentText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
          await db.insert(schema.comments).values({
            userId: admin.id,
            videoId: video.id,
            text: commentText
          });
        }
        
        // User1 comments
        if (Math.random() > 0.5) {
          const commentText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
          await db.insert(schema.comments).values({
            userId: user1.id,
            videoId: video.id,
            text: commentText
          });
        }
      }
    }
    
    // Create playlists
    console.log('Creating playlists...');
    if (admin && user1) {
      // Admin playlists
      const [adminPlaylist1] = await db.insert(schema.playlists).values({
        userId: admin.id,
        title: 'My Favorite Cat Videos',
        description: 'A collection of the best cat videos on CatFlix',
        isPrivate: false
      }).returning();
      
      const [adminPlaylist2] = await db.insert(schema.playlists).values({
        userId: admin.id,
        title: 'Funny Cats',
        description: 'Videos that will make you laugh',
        isPrivate: true
      }).returning();
      
      // User1 playlists
      const [userPlaylist1] = await db.insert(schema.playlists).values({
        userId: user1.id,
        title: 'Cute Kittens',
        description: 'The cutest kittens on CatFlix',
        isPrivate: false
      }).returning();
      
      // Add videos to playlists
      const allVideos = await db.select().from(schema.videos);
      
      // Add videos to admin's playlists
      if (adminPlaylist1) {
        let order = 0;
        for (const video of allVideos.slice(0, 4)) {
          await db.insert(schema.playlistVideos).values({
            playlistId: adminPlaylist1.id,
            videoId: video.id,
            order: order++
          }).onConflictDoNothing();
        }
      }
      
      if (adminPlaylist2) {
        let order = 0;
        for (const video of allVideos.slice(4, 6)) {
          await db.insert(schema.playlistVideos).values({
            playlistId: adminPlaylist2.id,
            videoId: video.id,
            order: order++
          }).onConflictDoNothing();
        }
      }
      
      // Add videos to user's playlist
      if (userPlaylist1) {
        let order = 0;
        for (const video of allVideos.slice(2, 5)) {
          await db.insert(schema.playlistVideos).values({
            playlistId: userPlaylist1.id,
            videoId: video.id,
            order: order++
          }).onConflictDoNothing();
        }
      }
      
      // Create follows
      console.log('Creating follows...');
      // User1 follows admin
      await db.insert(schema.follows).values({
        followerId: user1.id,
        followingId: admin.id
      }).onConflictDoNothing();
      
      // Add some watch history
      console.log('Creating watch history...');
      for (const video of allVideos.slice(0, 4)) {
        await pool.query(
          `INSERT INTO watch_history (user_id, video_id, progress) 
           VALUES ($1, $2, $3)
           ON CONFLICT (user_id, video_id) DO UPDATE 
           SET progress = EXCLUDED.progress, watched_at = NOW()`,
          [admin.id, video.id, Math.floor(Math.random() * 100)]
        );
      }
      
      for (const video of allVideos.slice(2, 6)) {
        await pool.query(
          `INSERT INTO watch_history (user_id, video_id, progress) 
           VALUES ($1, $2, $3)
           ON CONFLICT (user_id, video_id) DO UPDATE 
           SET progress = EXCLUDED.progress, watched_at = NOW()`,
          [user1.id, video.id, Math.floor(Math.random() * 100)]
        );
      }
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

main();