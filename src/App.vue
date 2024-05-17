<template>
  <v-app>
    <!-- App bar with collapse button -->
    <v-app-bar app color="#c945d7ac" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="toolbar-title">Music Central</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <!-- Search bar -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="search-bar"
      ></v-text-field>
      
      <v-btn to="/" text class="toolbar-button">Home</v-btn>
      <v-btn to="/login" text class="toolbar-button">Login</v-btn>
      <v-btn to="/signup" text class="toolbar-button">Signup</v-btn>
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
export default {
  name: 'App',
  data() {
    return {
      drawer: false, // Initially, sidebar is hidden
      search: '' // Search query
    }
  },
  watch: {
    search(newQuery) {
      // Handle search query changes (e.g., fetch search results)
      console.log('Search query:', newQuery);
    }
  }
}
</script>

<style scoped>
/* App bar styling */
.toolbar-title {
  font-size: 24px;
}

.toolbar-button {
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.toolbar-button:hover,
.toolbar-button:focus {
  background-color: #ff69b4; /* Change to a lighter pink color on hover/focus */
  color: #fff; /* Change to white color on hover/focus */
}

/* Search bar styling */
.search-bar {
  max-width: 300px;
  margin-right: 330px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.search-bar .v-input__control {
  color: rgb(34, 173, 220);
}

.search-bar .v-input__control .v-field__input {
  color: white;
}

.search-bar .v-input__control .v-field__details {
  display: none;
}

.search-bar .v-input__control .v-label {
  color: rgba(255, 255, 255, 0.7);
}

.search-bar .v-input__control .v-input__append-inner .v-icon {
  color: white;
}

.search-bar:hover,
.search-bar:focus-within {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Sidebar styling */
.sidebar-button {
  font-weight: bold;
}

/* Footer styling */
.footer {
  background-color: #c945d7ac;
  color: #fff;
  text-align: center;
  padding: 11px 0;
}

.footer-text {
  font-size: 14px;
}
</style>

