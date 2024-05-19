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
          <h2 class="display-1">John Doe</h2>
          <p class="subtitle-1">@johndoe</p>
        </v-col>
      </v-row>
  
      <!-- Profile Details -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-3">
            <v-card-title>john.doe@example.com</v-card-title>
            <v-card-subtitle>Email</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-3">
            <v-card-title>12345677</v-card-title>
            <v-card-subtitle>Password</v-card-subtitle>
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
  export default {
    name: 'MyProfile',
    data() {
      return {
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
    }
  }
  </script>
  
  <style scoped>
  
  .v-card {
    margin-top: 20px;
  }
  
  .v-card-title {
    background-color: #f5f5f5;
    color: #424242;
    padding: 16px;
  }
  </style>
  