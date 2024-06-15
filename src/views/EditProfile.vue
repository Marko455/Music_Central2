<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Edit Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateProfile">
              <v-text-field
                label="Username"
                v-model="userProfile.username"
                required
              ></v-text-field>
              <v-text-field
                label="First Name"
                v-model="userProfile.firstname"
                required
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="userProfile.lastname"
                required
              ></v-text-field>
              <v-textarea
                label="About"
                v-model="userProfile.about"
                auto-grow
              ></v-textarea>
              <v-btn type="submit" color="primary">Save Changes</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.js';
import { store } from '@/store.js';

export default {
  name: 'EditProfile',
  data() {
    return {
      userProfile: {
        username: '',
        firstname: '',
        lastname: '',
        about: ''
      },
      userId: null,
      userEmail: null
    };
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userId = user.id;
        this.userEmail = user.email;
        await this.fetchUserProfile();
      } else {
        store.setUser(null);
        this.$router.push('/login');
      }
    });
  },
  methods: {
    async fetchUserProfile() {
      try {
        const userDocRef = doc(db, 'Users', this.userEmail);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          this.userProfile = userDoc.data();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    },
    async updateProfile() {
      try {
        const userDocRef = doc(db, 'Users', this.userEmail);
        await updateDoc(userDocRef, {
          username: this.userProfile.username,
          firstname: this.userProfile.firstname,
          lastname: this.userProfile.lastname,
          about: this.userProfile.about
        });
        alert('Profile updated successfully.');
      } catch (error) {
        console.error("Error updating profile:", error);
        alert('Failed to update profile.');
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
.v-btn {
  margin-top: 20px;
}
</style>
