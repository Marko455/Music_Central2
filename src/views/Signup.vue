<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="signup">
              <v-text-field
                v-model="user.firstName"
                label="Ime:"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.lastName"
                label="Prezime:"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.username"
                label="Korisničko ime:"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email:"
                prepend-icon="mdi-email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Lozinka:"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.confirmPassword"
                label="Potvrdi lozinku"
                prepend-icon="mdi-lock-question"
                type="password"
                required
              ></v-text-field>
              <v-card-actions class="form-actions">
                <v-spacer></v-spacer>
                <v-btn color="secondary" type="submit">Registracija</v-btn>
                <v-btn color="grey darken-1" @click="clear">Odustani</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from '@/firebase.js';
import { collection, addDoc } from "firebase/firestore";

export default {
  name: 'Signup',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    async signup() {
      if (this.user.password !== this.user.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        const firebaseUser = userCredential.user;

        await addDoc(collection(db, "Users"), {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          email: this.user.email,
          uid: firebaseUser.uid
        });

        this.$router.push('/');
      } catch (error) {
        console.error("Error during sign up: ", error);
      }
    },
    clear() {
      this.user = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.create-song-container {
  padding: 20px;
}

.background {
  background-color: rgba(245, 18, 146, 0.816);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
}

.form-card {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
}

.v-text-field,
.v-textarea {
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
