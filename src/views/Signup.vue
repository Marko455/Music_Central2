<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="secondary" dark>
              <v-toolbar-title>Signup form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Korisničko ime:"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <v-text-field
                  label="Email:"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                ></v-text-field>
                <v-text-field
                  label="Lozinka:"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
                <v-text-field
                  label="Potvrdi lozinku"
                  name="confirmPassword"
                  prepend-icon="mdi-lock-question"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" text @click="signup">Registracija</v-btn>
              <v-btn color="grey darken-1" text @click="clear">Odustani</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'Signup',
    methods: {
      signup() {
        // Perform signup logic
        alert('Signup attempt... (implement logic)');
      },
      clear() {
        // Clear form fields
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style>
  /* Add any additional styling here */
  </style>
  