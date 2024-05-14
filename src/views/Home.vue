<template>
  <v-container class="home-container">
    <div class="background">
      <h1 class="welcome-text">Dobrodošli na Music Central!</h1>

      <!-- Songs list -->
      <v-row class="songs-row">
        <song-card
          v-for="song in songs"
          :key="song.id"
          :song="song"
          class="song-card"
        />
      </v-row>
      <!--<ul>
        <li v-for"doc in posts">{{ doc.description }}</li>
      </ul>-->
    </div>
  </v-container>
</template>

<script>
import SongCard from '@/components/SongCard.vue';
import { db } from '@/firebase.js'; // importanje firebase baze
import { collection, getDocs } from "firebase/firestore"; // importanje kolekcije
export default {
  name: 'Home',
  components: {
    SongCard
  },
  data() {
    return {
      posts: [],
      songs: [
        {
          id: 1,
          title: 'Song Title 1',
          artist: 'Artist Name 1',
          album: 'Album Title 1',
          video: 'https://www.example.com/song1.mp4'
        },
        {
          id: 2,
          title: 'Song Title 2',
          artist: 'Artist Name 2',
          album: 'Album Title 2',
          video: 'https://www.example.com/song2.mp4'
        },
        {
          id: 3,
          title: 'Song Title 3',
          artist: 'Artist Name 3',
          album: 'Album Title 3',
          video: 'https://www.example.com/song3.mp4'
        }
      ]
    };
  },
  async mounted(){
    const posts_collection = collection(db, "posts");
    const query = await getDocs(posts_collection);

    query.forEach((doc)=> {
      const id = doc.id;
      const data = doc.data;
      console.log(data);

      this.posts.push(data);
    })
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
</style>


  