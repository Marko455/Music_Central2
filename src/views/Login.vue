<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="loginForm">
              <v-text-field
                v-model="email"
                label="Email:"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password:"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="login">Login</v-btn>
            <v-btn color="grey darken-1" text @click="clear">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '@/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { store } from '@/store.js';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const fetchUserDetails = async (uid) => {
      try {
        const userDocRef = doc(db, 'Users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          return userDoc.data();
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
        return null;
      }
    };

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        const userDetails = await fetchUserDetails(user.uid);

        if (userDetails) {
          store.setUser({
            uid: user.uid,
            ...userDetails,
          });
        }

        router.push('/');
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    };

    const clear = () => {
      email.value = '';
      password.value = '';
      router.push('/');
    };

    return {
      email,
      password,
      login,
      clear,
    };
  },
};
</script>

<style scoped>
</style>
