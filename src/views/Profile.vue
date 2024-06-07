<template>
  <v-container>
    <!-- Profile Header -->
    <v-row class="profile-header">
      <v-col cols="12" sm="3">
        <v-avatar size="120" class="mb-3">
          <v-img src="https://via.placeholder.com/150"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="9">
        <h2 class="display-1">{{ userProfile.username }}</h2>
        <p class="subtitle-1">{{ userProfile.email }}</p>
      </v-col>
    </v-row>

    <!-- Profile Details -->
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

    <!-- User-Created Music Videos Table -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>User-Created Music Videos</v-card-title>
          <v-data-table
            :headers="headers"
            :items="userVideos"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Favorite Music Videos Table -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Favorite Music Videos</v-card-title>
          <v-data-table
            :headers="headers"
            :items="favoriteVideos"
            class="elevation-1"
          ></v-data-table>
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

export default {
  name: 'MyProfile',
  data() {
    return {
      userProfile: {
        username: '',
        email: '',
        firstname: '',
        lastname: ''
      },
      headers: [
        { text: 'Video Title', value: 'title' },
        { text: 'Artist', value: 'artist' },
        { text: 'Date Added', value: 'dateAdded' }
      ],
      userVideos: [
        { title: 'Sunset Chill', artist: 'DJ Calm', dateAdded: '2024-01-01' },
        { title: 'Morning Rise', artist: 'Early Bird', dateAdded: '2024-02-15' }
      ],
      favoriteVideos: [
        { title: 'Night Drive', artist: 'The Lonely Streets', dateAdded: '2023-12-11' },
        { title: 'Beach Waves', artist: 'Ocean Sounds', dateAdded: '2023-12-20' }
      ]
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
            lastname: userDoc.lastname || ''
          };
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
</style>
