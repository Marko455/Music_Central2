<template>
  <v-container>
    <v-row class="channel-header">
      <v-col cols="12" sm="3">
        <v-avatar size="120" class="mb-3">
          <v-img src="https://via.placeholder.com/150"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="9">
        <h2 class="display-1">{{ channelProfile.username }}</h2>
        <p class="subtitle-1">{{ channelProfile.email }}</p>
        <div class="subscriber-count">
          <v-icon color="red">mdi-account-multiple</v-icon>
          <span>{{ channelProfile.subscribers }} Subscribers</span>
        </div>
        <v-btn v-if="user && !isSubscribed" @click="subscribe" color="primary">
          Subscribe
        </v-btn>
        <v-btn v-if="user && isSubscribed" @click="unsubscribe" color="secondary">
          Unsubscribe
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-3">
          <v-card-title>About</v-card-title>
          <v-card-text>{{ channelProfile.about }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ channelProfile.username }}'s Music Videos</v-card-title>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="song in userVideos" :key="song.id">
              <SongCard :song="song"></SongCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar for showing messages -->
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="success">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.js';
import { store } from '@/store.js';
import SongCard from '@/components/SongCard.vue';

export default {
  name: 'Channel',
  components: {
    SongCard
  },
  data() {
    return {
      channelProfile: {
        username: '',
        email: '',
        about: '',
        subscribers: 0
      },
      user: null,
      isSubscribed: false,
      userVideos: [],
      snackbar: false,
      snackbarMessage: '',
      snackbarTimeout: 3000
    };
  },
  created() {
    this.fetchChannelProfile();
    onAuthStateChanged(auth, (user) => {
      this.user = user ? user.email : null;
      if (this.user) {
        this.checkSubscription();
      }
    });
  },
  methods: {
    async fetchChannelProfile() {
      try {
        const userEmail = this.$route.params.email;
        const usersCollection = collection(db, 'Users');
        const q = query(usersCollection, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          this.channelProfile = {
            username: userData.username || '',
            email: userData.email || '',
            about: userData.about || 'No information provided.',
            subscribers: userData.subscribers || 0
          };
          this.channelProfileId = userDoc.id;
          await this.fetchUserSongs(userEmail);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
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
    async checkSubscription() {
      try {
        const subscriptionsRef = collection(db, 'Subscriptions');
        const q = query(subscriptionsRef, where('subscriber', '==', this.user), where('subscribedTo', '==', this.channelProfile.email));
        const querySnapshot = await getDocs(q);
        this.isSubscribed = !querySnapshot.empty;
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    },
    async subscribe() {
      if (this.isSubscribed) return;
      try {
        const channelDocRef = doc(db, 'Users', this.channelProfileId);
        const newSubscriberCount = this.channelProfile.subscribers + 1;
        await updateDoc(channelDocRef, {
          subscribers: newSubscriberCount
        });
        this.channelProfile.subscribers = newSubscriberCount;
        this.isSubscribed = true;

        await setDoc(doc(db, 'Subscriptions', `${this.user}_${this.channelProfile.email}`), {
          subscriber: this.user,
          subscribedTo: this.channelProfile.email
        });

        this.snackbarMessage = 'Subscribed';
        this.snackbar = true;

      } catch (error) {
        console.error("Error subscribing to user:", error);
      }
    },
    async unsubscribe() {
      if (!this.isSubscribed || this.channelProfile.subscribers <= 0) return;
      try {
        const channelDocRef = doc(db, 'Users', this.channelProfileId);
        const newSubscriberCount = Math.max(this.channelProfile.subscribers - 1, 0);
        await updateDoc(channelDocRef, {
          subscribers: newSubscriberCount
        });
        this.channelProfile.subscribers = newSubscriberCount;
        this.isSubscribed = false;

        await deleteDoc(doc(db, 'Subscriptions', `${this.user}_${this.channelProfile.email}`));

      } catch (error) {
        console.error("Error unsubscribing from user:", error);
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

.v-btn {
  margin-top: 10px;
}
</style>
