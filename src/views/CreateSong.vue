<template>
  <v-container class="create-song-container">
    <div class="background">
      <h1 class="form-title">Kreiraj novu pjesmu</h1>
      <v-card class="form-card">
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="song.album"
              label="Album name:"
              prepend-icon="mdi-album"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.artist"
              label="Artist:"
              prepend-icon="mdi-account-music"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.genre"
              label="Genre:"
              prepend-icon="mdi-music"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.title"
              label="Title:"
              prepend-icon="mdi-format-title"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.video"
              label="Song URL:"
              prepend-icon="mdi-link"
              required
            ></v-text-field>
            <v-textarea
              v-model="song.description"
              label="Description:"
              rows="3"
              auto-grow
              prepend-icon="mdi-text"
            ></v-textarea>
            <v-card-actions class="form-actions">
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">Submit</v-btn>
              <v-btn color="grey darken-1" @click="clearForm">Clear</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { db } from '@/firebase.js';
import { collection, addDoc } from "firebase/firestore";

export default {
  name: 'CreateSong',
  data() {
    return {
      song: {
        album: '',
        artist: '',
        genre: '',
        title: '',
        video: '',
        description: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        await addDoc(collection(db, "Songs"), this.song);
        this.$router.push('/');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    clearForm() {
      this.song = {
        album: '',
        artist: '',
        genre: '',
        title: '',
        video: '',
        description: ''
      };
    }
  }
}
</script>
