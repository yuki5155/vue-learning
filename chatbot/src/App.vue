<template>
  <div class="app-container">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/chat">Chat</router-link> |
        <router-link to="/mypage">MyPage</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  margin-bottom: 2rem;
}

nav {
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  font-weight: bold;
  padding: 0.5rem 1rem;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  flex: 1;
  width: 100%;
}
</style> 