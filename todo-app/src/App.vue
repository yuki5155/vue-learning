<template>
  <div>
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <router-link to="/">TODOアプリ</router-link>
        </div>
        <ul class="nav-links">
          <li><router-link to="/">ホーム</router-link></li>
          <li><router-link to="/todo">TODOリスト</router-link></li>
          <li><router-link to="/mypage">マイページ</router-link></li>
        </ul>
      </div>
    </nav>
    
    <main>
      <router-view />
    </main>
    
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2023 TODOアプリ. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  color: #333;
  line-height: 1.6;
}

.navbar {
  background-color: #4caf50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #e6e6e6;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid white;
}

main {
  min-height: calc(100vh - 120px);
  padding: 2rem 0;
}

.footer {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  
  .logo {
    margin-bottom: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: space-around;
  }
  
  .nav-links li {
    margin: 0;
  }
}
</style> 