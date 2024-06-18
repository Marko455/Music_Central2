<template>
  <v-container class="home-container">
    <div class="background">
      <h1 class="welcome-text">Welcome to Music Central!</h1>

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary">
      </v-progress-circular>

      <!-- Lista pjesama -->
      <v-row v-else class="songs-row">
        <song-card
          v-for="song in songs"
          :key="song.id"
          :song="song"
          class="song-card"
        />
      </v-row>

      <!-- Plus botun -->
      <v-btn 
        v-if="user" 
        class="fab" 
        color="primary" 
        dark 
        fab 
        @click="createNewContent">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>
<script>
import SongCard from '@/components/SongCard.vue';
import { db } from '@/firebase.js';
import { collection, getDocs } from "firebase/firestore";
import { auth } from '@/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'Home',
  components: {
    SongCard
  },
  data() {
    return {
      songs: [],
      loading: true,
      user: null
    };
  },
  async mounted() {
    try {
      const songsCollection = collection(db, "Songs");
      const querySnapshot = await getDocs(songsCollection);

      this.songs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.loading = false;
    } catch (error) {
      console.error("Error fetching songs:", error);
      this.loading = false;
    }

    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    createNewContent() {
      this.$router.push('/create');
    }
  }
}
</script>
<style scoped>
.home-container {
  padding: 20px;
}

.background {
  background-color: rgba(245, 18, 146, 0.816);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome-text {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
}

.songs-row {
  justify-content: center;
}

.song-card {
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.song-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.fab {
  position: fixed;
  bottom: 50px;
  right: 24px;
  z-index: 1000;
  width: 70px;
  height: 70px;
}

.fab v-icon {
  font-size: 36px;
}
</style>
