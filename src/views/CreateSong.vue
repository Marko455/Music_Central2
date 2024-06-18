<template>
  <v-container class="create-song-container">
    <div class="background">
      <h1 class="form-title">Publish a new song!</h1>
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
            <v-file-input
              label="Upload MP4 file"
              prepend-icon="mdi-file-video"
              accept=".mp4"
              v-model="file"
              required
            ></v-file-input>
            <v-textarea
              v-model="song.description"
              label="Description:"
              rows="3"
              auto-grow
              prepend-icon="mdi-text"
            ></v-textarea>
            <v-card-actions class="form-actions">
              <v-spacer></v-spacer>
              <v-btn :loading="loading" color="primary" type="submit">Publish</v-btn>
              <v-btn color="grey darken-1" @click="clearForm">Clear</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { db, auth, storage } from '@/firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  name: 'CreateSong',
  data() {
    return {
      song: {
        album: '',
        genre: '',
        title: '',
        video: '',
        description: '',
        likes: 0,
        dislikes: 0,
        views: 0,
        releaseDate: Date.now(),
        artist: '',
      },
      file: null,
      userEmail: '',
      loading: false
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = '';
      }
    });
  },
  methods: {
    async submitForm() {
      if (!this.file) {
        alert("Please select a file to upload.");
        return;
      }

      this.loading = true;
      this.song.artist = this.userEmail;

      try {
        const fileUrl = await this.uploadFile(this.file);
        this.song.video = fileUrl;

        await addDoc(collection(db, "Songs"), this.song);
        this.$router.push('/');
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        this.loading = false;
      }
    },
    async uploadFile(file) {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `songs/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
          }, 
          (error) => {
            reject(error);
          }, 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    },
    clearForm() {
      this.song = {
        album: '',
        genre: '',
        title: '',
        video: '',
        description: '',
        likes: 0,
        dislikes: 0,
        views: 0,
        releaseDate: Date.now(),
        artist: ''
      };
      this.file = null;
    }
  }
}
</script>

<style scoped>
.create-song-container {
  padding: 20px;
}

.background {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-card {
  padding: 20px;
}

.form-actions {
  margin-top: 20px;
}
</style>
