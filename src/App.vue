<template>
  <v-app>
    <!-- App bar with collapse button -->
    <v-app-bar app color="#c945d7ac" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="toolbar-title">Music Central</v-toolbar-title>
      <v-spacer></v-spacer>
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
      drawer: false // Initially, sidebar is hidden
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
