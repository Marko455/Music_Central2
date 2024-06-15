<template>
  <v-container>
    <v-row class="profile-header">
      <v-col cols="12" sm="3">
        <v-avatar size="120" class="mb-3">
          <v-img src="https://via.placeholder.com/150"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="9">
        <h2 class="display-1">{{ userProfile.username }}</h2>
        <p class="subtitle-1">{{ userProfile.email }}</p>
        <div class="subscriber-count">
          <v-icon color="red">mdi-account-multiple</v-icon>
          <span>{{ userProfile.subscribers }} Subscribers</span>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>{{ userProfile.email }}</v-card-title>
          <v-card-subtitle>Email</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>{{ userProfile.firstname }}</v-card-title>
          <v-card-subtitle>First Name</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title>{{ userProfile.lastname }}</v-card-title>
          <v-card-subtitle>Last Name</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-3">
          <v-card-title>About</v-card-title>
          <v-card-text>{{ userProfile.about }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>User-Created Music Videos</v-card-title>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="song in userVideos" :key="song.id">
              <SongCard :song="song" @songDeleted="removeDeletedSong"></SongCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/firebase.js';
import { store } from '@/store.js';
import SongCard from '@/components/SongCard.vue';

export default {
  name: 'MyProfile',
  components: {
    SongCard
  },
  data() {
    return {
      userProfile: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        about: '',
        subscribers: 0 
      },
      userVideos: []
    };
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await this.fetchUserProfile(user.email);
        if (userDoc) {
          this.userProfile = {
            username: userDoc.username || '',
            email: userDoc.email || user.email,
            firstname: userDoc.firstname || '',
            lastname: userDoc.lastname || '',
            about: userDoc.about || 'No information provided.',
            subscribers: userDoc.subscribers || 0
          };
          await this.fetchUserSongs(user.email);
        }
      } else {
        store.setUser(null);
        this.$router.push('/login');
      }
    });
  },
  methods: {
    async fetchUserProfile(email) {
      try {
        const usersCollection = collection(db, 'Users');
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          return userDoc.data();
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
        return null;
      }
    },
    async fetchUserSongs(email) {
      try {
        const songsCollection = collection(db, 'Songs');
        const q = query(songsCollection, where('artist', '==', email));
        const querySnapshot = await getDocs(q);
        this.userVideos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error("Error fetching user songs:", error);
      }
    },
    removeDeletedSong(songId) {
      this.userVideos = this.userVideos.filter(song => song.id !== songId);
    }
  }
}
</script>
<style scoped>
.profile-header {
  margin-bottom: 20px;
}

.v-card {
  margin-top: 20px;
}

.v-card-title {
  background-color: #f5f5f5;
  color: #424242;
  padding: 16px;
}

.v-card-text {
  padding: 16px;
  color: #666;
}

.subscriber-count {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.subscriber-count v-icon {
  margin-right: 5px;
}

.subscriber-count span {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
