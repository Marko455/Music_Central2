<template>
    <v-container>
      <v-row class="channel-header">
        <v-col cols="12" sm="3">
          <v-avatar size="120" class="mb-3">
            <v-img :src="channelProfile.avatarUrl || 'https://via.placeholder.com/150'"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="9">
          <h2 class="display-1">{{ channelProfile.username }}</h2>
          <p class="subtitle-1">{{ channelProfile.email }}</p>
          <div class="subscription-buttons">
            <v-btn color="primary" @click="handleSubscribe">Subscribe</v-btn>
            <v-btn color="error" @click="handleUnsubscribe">Unsubscribe</v-btn>
          </div>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-3">
            <v-card-title>{{ channelProfile.firstname }}</v-card-title>
            <v-card-subtitle>First Name</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-3">
            <v-card-title>{{ channelProfile.lastname }}</v-card-title>
            <v-card-subtitle>Last Name</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ channelProfile.username }}'s Songs</v-card-title>
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="song in userSongs" :key="song.id">
                <SongCard :song="song"></SongCard>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '@/firebase.js';
  import SongCard from '@/components/SongCard.vue';
  
  export default {
    name: 'Channel',
    components: {
      SongCard,
    },
    data() {
      return {
        channelProfile: {
          username: '',
          email: '',
          firstname: '',
          lastname: '',
          avatarUrl: ''
        },
        userSongs: []
      };
    },
    async created() {
      const userEmail = this.$route.params.email;
      await this.fetchChannelProfile(userEmail);
      await this.fetchUserSongs(userEmail);
    },
    methods: {
      async fetchChannelProfile(email) {
        try {
          const usersCollection = collection(db, 'Users');
          const q = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            this.channelProfile = {
              username: userDoc.data().username || '',
              email: userDoc.data().email || email,
              firstname: userDoc.data().firstname || '',
              lastname: userDoc.data().lastname || '',
              avatarUrl: userDoc.data().avatarUrl || ''
            };
          }
        } catch (error) {
          console.error("Error fetching channel profile:", error);
        }
      },
      async fetchUserSongs(email) {
        try {
          const songsCollection = collection(db, 'Songs');
          const q = query(songsCollection, where('artist', '==', email));
          const querySnapshot = await getDocs(q);
          this.userSongs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        } catch (error) {
          console.error("Error fetching user songs:", error);
        }
      }
    }
  }
  </script>
<style scoped>
.channel-header {
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
.channel-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subscription-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.v-card {
  margin-top: 20px;
}

.v-card-title {
  background-color: #f5f5f5;
  color: #424242;
  padding: 16px;
}
</style>