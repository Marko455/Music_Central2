<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="song-card">
      <v-responsive aspect-ratio="16/9">
        <video :src="song.video" controls @play="incrementViews" class="video"></video>
      </v-responsive>
      <v-card-title class="title">{{ song.title }}</v-card-title>
      <v-card-subtitle class="subtitle">
        <router-link :to="{ name: 'Channel', params: { email: song.artist } }" class="artist-link">{{ song.artist }}</router-link>
      </v-card-subtitle>
      <v-card-text>
        <div><strong>Album:</strong> {{ song.album }}</div>
        <div><strong>Description:</strong> {{ song.description }}</div>
        <div><strong>Likes:</strong> {{ song.likes }}</div>
        <div><strong>Dislikes:</strong> {{ song.dislikes }}</div>
        <div><strong>Views:</strong> {{ song.views }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="playSong(song.id)">Play</v-btn>
        <v-btn color="success" text @click="handleLikeDislike('like')">Like</v-btn>
        <v-btn color="error" text @click="handleLikeDislike('dislike')">Dislike</v-btn>
        <v-btn color="red" text @click="handleDelete">Delete</v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <div class="comments-section">
          <v-textarea
            v-model="newComment"
            label="Add a comment"
            auto-grow
            clearable
          ></v-textarea>
          <v-btn color="primary" text @click="handlePostComment">Post Comment</v-btn>
          <div v-if="comments.length" class="comments-list">
            <div v-for="(comment, index) in comments" :key="index" class="comment">
              <div class="comment-user">{{ comment.user }}</div>
              <div class="comment-text">{{ comment.text }}</div>
              <v-divider></v-divider>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { db } from '@/firebase.js';
import { doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { store } from '@/store.js';

export default {
  name: 'SongCard',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newComment: '',
      comments: [
        { user: 'User1', text: 'Super pjesma!' },
      ]
    };
  },
  computed: {
    user() {
      return store.getUser();
    }
  },
  methods: {
    playSong(songId) {
      console.log(`Playing song with ID: ${songId}`);
      this.incrementViews();
    },
    async incrementViews() {
      try {
        const songRef = doc(db, 'Songs', this.song.id);
        await updateDoc(songRef, {
          views: increment(1)
        });
        this.song.views += 1;
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    },
    async likeSong() {
      try {
        const songRef = doc(db, 'Songs', this.song.id);
        await updateDoc(songRef, {
          likes: increment(1)
        });
        this.song.likes += 1;
      } catch (error) {
        console.error('Error liking song:', error);
      }
    },
    async dislikeSong() {
      try {
        const songRef = doc(db, 'Songs', this.song.id);
        await updateDoc(songRef, {
          dislikes: increment(1)
        });
        this.song.dislikes += 1;
      } catch (error) {
        console.error('Error disliking song:', error);
      }
    },
    handleLikeDislike(action) {
      if (!this.user) {
        alert('Please login for dis/liking and commenting');
        return;
      }
      if (action === 'like') {
        this.likeSong();
      } else if (action === 'dislike') {
        this.dislikeSong();
      }
    },
    handlePostComment() {
      if (!this.user) {
        alert('Please login for dis/liking and commenting');
        return;
      }
      this.postComment();
    },
    postComment() {
      console.log(`Posting comment: ${this.newComment}`);
    },
    handleDelete() {
      if (!this.user) {
        alert('Please login to delete songs');
        return;
      }
      if (this.user.email !== this.song.artist) {
        alert('You can only delete your own songs');
        return;
      }
      this.deleteSong();
    },
    async deleteSong() {
      if (confirm('Are you sure you want to delete this song?')) {
        try {
          await deleteDoc(doc(db, 'Songs', this.song.id));
          alert('Song deleted successfully.');
          this.$emit('songDeleted', this.song.id);
        } catch (error) {
          console.error('Error deleting song:', error);
          alert('Failed to delete the song.');
        }
      }
    }
  }
}
</script>

<style scoped>
.song-card {
  transition: box-shadow 0.3s;
}

.song-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.album {
  font-size: 14px;
  color: #888;
  margin-top: 8px;
}

.video {
  width: 100%;
  height: 100%;
}

.comments-section {
  margin-top: 16px;
}

.comments-list {
  margin-top: 16px;
}

.comment {
  margin-bottom: 16px;
}

.comment-user {
  font-weight: bold;
}

.comment-text {
  margin-top: 4px;
}
</style>

<style scoped>
.artist-link {
  text-decoration: none;
  color: #1976d2;
}
.artist-link:hover {
  text-decoration: underline;
}
</style>
