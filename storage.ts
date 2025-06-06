import { users, type User, type InsertUser, follows, videos, videoCategories, videoLikes, comments, playlists, playlistVideos } from "../shared/schema";
import { db, pool } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Video methods
  getVideos(category?: string): Promise<any[]>;
  getVideoById(id: number): Promise<any | undefined>;
  likeVideo(userId: number, videoId: number): Promise<boolean>;
  unlikeVideo(userId: number, videoId: number): Promise<boolean>;
  addComment(userId: number, videoId: number, text: string): Promise<any>;
  
  // Playlist methods
  getPlaylists(userId: number): Promise<any[]>;
  getPlaylistById(id: number): Promise<any | undefined>;
  createPlaylist(userId: number, playlistData: any): Promise<any>;
  updatePlaylist(id: number, playlistData: any): Promise<any | undefined>;
  deletePlaylist(id: number): Promise<boolean>;
  addVideoToPlaylist(playlistId: number, videoId: number): Promise<boolean>;
  removeVideoFromPlaylist(playlistId: number, videoId: number): Promise<boolean>;
  
  // Social methods
  followUser(followerId: number, followingId: number): Promise<boolean>;
  unfollowUser(followerId: number, followingId: number): Promise<boolean>;
  getFollowers(userId: number): Promise<any[]>;
  getFollowing(userId: number): Promise<any[]>;
  
  // Watch history
  addToWatchHistory(userId: number, videoId: number, progress: number): Promise<boolean>;
  getWatchHistory(userId: number): Promise<any[]>;
}

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [updated] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  // Video methods
  async getVideos(category?: string): Promise<any[]> {
    if (category && category !== 'all') {
      const videosWithCategories = await db.query.videos.findMany({
        with: {
          categories: {
            where: (categories, { eq }) => eq(categories.category, category as any),
          },
          likes: true,
          qualities: true,
        }
      });
      
      // Only return videos that have the requested category
      return videosWithCategories.filter(video => video.categories.length > 0);
    }
    
    return db.query.videos.findMany({
      with: {
        categories: true,
        qualities: true,
        likes: true
      },
      orderBy: desc(videos.createdAt)
    });
  }

  async getVideoById(id: number): Promise<any | undefined> {
    return db.query.videos.findFirst({
      where: eq(videos.id, id),
      with: {
        categories: true,
        qualities: true,
        likes: true,
        comments: {
          with: {
            user: true
          },
          orderBy: desc(comments.createdAt)
        },
        uploader: true
      }
    });
  }

  async likeVideo(userId: number, videoId: number): Promise<boolean> {
    try {
      const existingLike = await db.query.videoLikes.findFirst({
        where: and(
          eq(videoLikes.userId, userId),
          eq(videoLikes.videoId, videoId)
        )
      });

      if (existingLike) {
        return true; // Already liked
      }

      await db.insert(videoLikes).values({
        userId,
        videoId
      });
      
      return true;
    } catch (error) {
      console.error('Error liking video:', error);
      return false;
    }
  }

  async unlikeVideo(userId: number, videoId: number): Promise<boolean> {
    try {
      await db
        .delete(videoLikes)
        .where(
          and(
            eq(videoLikes.userId, userId),
            eq(videoLikes.videoId, videoId)
          )
        );
      
      return true;
    } catch (error) {
      console.error('Error unliking video:', error);
      return false;
    }
  }

  async addComment(userId: number, videoId: number, text: string): Promise<any> {
    const [comment] = await db
      .insert(comments)
      .values({
        userId,
        videoId,
        text
      })
      .returning();
    
    // Get the user info for the comment
    const commentWithUser = {
      ...comment,
      user: await this.getUser(userId)
    };
    
    return commentWithUser;
  }

  // Playlist methods
  async getPlaylists(userId: number): Promise<any[]> {
    return db.query.playlists.findMany({
      where: eq(playlists.userId, userId),
      with: {
        videos: {
          with: {
            video: true
          }
        }
      },
      orderBy: desc(playlists.updatedAt)
    });
  }

  async getPlaylistById(id: number): Promise<any | undefined> {
    return db.query.playlists.findFirst({
      where: eq(playlists.id, id),
      with: {
        user: true,
        videos: {
          with: {
            video: {
              with: {
                categories: true,
                qualities: true
              }
            }
          },
          orderBy: asc(playlistVideos.order)
        }
      }
    });
  }

  async createPlaylist(userId: number, playlistData: any): Promise<any> {
    const [playlist] = await db
      .insert(playlists)
      .values({
        userId,
        title: playlistData.title,
        description: playlistData.description || null,
        coverImage: playlistData.coverImage || null,
        isPrivate: playlistData.isPrivate || false
      })
      .returning();
    
    return playlist;
  }

  async updatePlaylist(id: number, playlistData: any): Promise<any | undefined> {
    const [updated] = await db
      .update(playlists)
      .set({
        title: playlistData.title,
        description: playlistData.description,
        coverImage: playlistData.coverImage,
        isPrivate: playlistData.isPrivate,
        updatedAt: new Date()
      })
      .where(eq(playlists.id, id))
      .returning();
    
    return updated;
  }

  async deletePlaylist(id: number): Promise<boolean> {
    try {
      await db.delete(playlists).where(eq(playlists.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting playlist:', error);
      return false;
    }
  }

  async addVideoToPlaylist(playlistId: number, videoId: number): Promise<boolean> {
    try {
      // Get current highest order
      const existingVideos = await db
        .select()
        .from(playlistVideos)
        .where(eq(playlistVideos.playlistId, playlistId))
        .orderBy(desc(playlistVideos.order));
      
      const nextOrder = existingVideos.length > 0 
        ? existingVideos[0].order + 1 
        : 0;
      
      await db.insert(playlistVideos).values({
        playlistId,
        videoId,
        order: nextOrder
      });
      
      // Update playlist updatedAt timestamp
      await db
        .update(playlists)
        .set({ updatedAt: new Date() })
        .where(eq(playlists.id, playlistId));
      
      return true;
    } catch (error) {
      console.error('Error adding video to playlist:', error);
      return false;
    }
  }

  async removeVideoFromPlaylist(playlistId: number, videoId: number): Promise<boolean> {
    try {
      await db
        .delete(playlistVideos)
        .where(
          and(
            eq(playlistVideos.playlistId, playlistId),
            eq(playlistVideos.videoId, videoId)
          )
        );
      
      // Update playlist updatedAt timestamp
      await db
        .update(playlists)
        .set({ updatedAt: new Date() })
        .where(eq(playlists.id, playlistId));
      
      return true;
    } catch (error) {
      console.error('Error removing video from playlist:', error);
      return false;
    }
  }

  // Social methods
  async followUser(followerId: number, followingId: number): Promise<boolean> {
    try {
      const existingFollow = await db.query.follows.findFirst({
        where: and(
          eq(follows.followerId, followerId),
          eq(follows.followingId, followingId)
        )
      });

      if (existingFollow) {
        return true; // Already following
      }

      await db.insert(follows).values({
        followerId,
        followingId
      });
      
      return true;
    } catch (error) {
      console.error('Error following user:', error);
      return false;
    }
  }

  async unfollowUser(followerId: number, followingId: number): Promise<boolean> {
    try {
      await db
        .delete(follows)
        .where(
          and(
            eq(follows.followerId, followerId),
            eq(follows.followingId, followingId)
          )
        );
      
      return true;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return false;
    }
  }

  async getFollowers(userId: number): Promise<any[]> {
    const followers = await db.query.follows.findMany({
      where: eq(follows.followingId, userId),
      with: {
        follower: true
      }
    });
    
    return followers.map(follow => follow.follower);
  }

  async getFollowing(userId: number): Promise<any[]> {
    const following = await db.query.follows.findMany({
      where: eq(follows.followerId, userId),
      with: {
        following: true
      }
    });
    
    return following.map(follow => follow.following);
  }

  // Watch history
  async addToWatchHistory(userId: number, videoId: number, progress: number): Promise<boolean> {
    try {
      // Look for existing entry
      const result = await pool.query(
        `SELECT * FROM watch_history WHERE user_id = $1 AND video_id = $2`,
        [userId, videoId]
      );
      
      const existingEntry = result.rows && result.rows.length > 0 ? result.rows[0] : null;
      
      if (existingEntry) {
        // Update existing entry
        await pool.query(
          `UPDATE watch_history 
           SET progress = $1, watched_at = NOW() 
           WHERE user_id = $2 AND video_id = $3`,
          [progress, userId, videoId]
        );
      } else {
        // Insert new entry
        await pool.query(
          `INSERT INTO watch_history (user_id, video_id, progress) 
           VALUES ($1, $2, $3)`,
          [userId, videoId, progress]
        );
      }
      
      return true;
    } catch (error) {
      console.error('Error adding to watch history:', error);
      return false;
    }
  }

  async getWatchHistory(userId: number): Promise<any[]> {
    try {
      const result = await pool.query(
        `SELECT wh.*, v.* 
         FROM watch_history wh
         JOIN videos v ON wh.video_id = v.id
         WHERE wh.user_id = $1
         ORDER BY wh.watched_at DESC`,
        [userId]
      );
      
      return result.rows || [];
    } catch (error) {
      console.error('Error getting watch history:', error);
      return [];
    }
  }
}

// Export a single instance
export const storage = new DatabaseStorage();