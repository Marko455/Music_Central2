<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="song-card">
      <v-responsive aspect-ratio="16/9">
        <video :src="song.url" controls @play="incrementViews"></video>
      </v-responsive>
      <v-card-title class="title">{{ song.title }}</v-card-title>
      <v-card-subtitle class="subtitle">{{ song.artist }}</v-card-subtitle>
      <v-card-text>
        <div><strong>Album:</strong> {{ song.album }}</div>
        <div><strong>Length:</strong> {{ song.length }} minutes</div>
        <div><strong>Description:</strong> {{ song.description }}</div>
        <div><strong>Likes:</strong> {{ song.likes }}</div>
        <div><strong>Dislikes:</strong> {{ song.dislikes }}</div>
        <div><strong>Views:</strong> {{ song.views }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="playSong(song.id)">Play</v-btn>
        <v-btn color="success" text @click="likeSong">Like</v-btn>
        <v-btn color="error" text @click="dislikeSong">Dislike</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { db } from '@/firebase.js';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { store } from '@/store.js';

export default {
  name: 'SongCard',
  props: {
    song: {
      type: Object,
      required: true
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
      if (!store.getUser()) {
        alert('Please log in to like songs.');
        return;
      }
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
      if (!store.getUser()) {
        alert('Please log in to dislike songs.');
        return;
      }
      try {
        const songRef = doc(db, 'Songs', this.song.id);
        await updateDoc(songRef, {
          dislikes: increment(1)
        });
        this.song.dislikes += 1;
      } catch (error) {
        console.error('Error disliking song:', error);
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
}
</style>
