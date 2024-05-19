<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="song-card">
      <v-responsive aspect-ratio="16/9">
        <video :src="song.url" controls></video>
      </v-responsive>
      <v-card-title class="title">{{ song.title }}</v-card-title>
      <v-card-subtitle class="subtitle">{{ song.artist }}</v-card-subtitle>
      <v-card-text>
        <div><strong>Album:</strong> {{ song.album }}</div>
        <div><strong>Length:</strong> {{ song.length }} minutes</div>
        <div><strong>Description:</strong> {{ song.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="playSong(song.id)">Play</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
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
