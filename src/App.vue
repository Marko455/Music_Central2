<template>
  <v-app>
    <!-- App collapse bar-->
    <v-app-bar app color="#c945d7ac" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <router-link to="/" class="toolbar-title-link">
        <v-toolbar-title class="toolbar-title">Music Central</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-if="user" text class="toolbar-button">{{ user.displayName || user.email }}</v-btn>
      <v-btn v-else to="/login" text class="toolbar-button">Login</v-btn>
      <v-btn to="/signup" text class="toolbar-button">Signup</v-btn>
      <v-btn v-if="user" text class="toolbar-button" @click="logout">Logout</v-btn>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-btn to="/profile" text class="sidebar-button">Moj profil</v-btn>
      <v-btn to="#" text class="sidebar-button">Popularne pjesme</v-btn>
      <v-btn to="#" text class="sidebar-button">Popularni bandovi</v-btn>
      <v-btn to="#" text class="sidebar-button">Povijest</v-btn>
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app class="footer" color="light-black">
      <span class="footer-text">&copy; 2024 Music Central</span>
    </v-footer>
  </v-app>
</template>

<script>
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase.js';
import { store } from '@/store.js';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      user: store.user,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.setUser(user);
        this.user = user;
      } else {
        store.setUser(null);
        this.user = null;
      }
    });
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        store.setUser(null);
        this.user = null;
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
};
</script>

<style scoped>
.toolbar-title {
  font-size: 24px;
  cursor: pointer;
}

.toolbar-title-link {
  text-decoration: none;
  color: inherit;
}

.toolbar-button {
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.toolbar-button:hover,
.toolbar-button:focus {
  background-color: #ff69b4;
  color: #fff;
}

.sidebar-button {
  font-weight: bold;
}

.footer {
  background-color: #c945d7ac;
  color: #fff;
  text-align: center;
  padding: 11px 0;
}

.footer-text {
  font-size: 14px;
}

.search-bar {
  max-width: 300px;
  margin-right: 330px;
  transition: box-shadow 0.3s;
}

.search-bar .v-text-field__slot::before {
  border-bottom: none;
}

.search-bar .v-input__control {
  border: 1px solid #c945d7ac;
  border-radius: 4px;
}

.search-bar .v-input__control:hover,
.search-bar .v-input__control:focus-within {
  box-shadow: 0 0 10px #c945d7ac;
}
</style>
