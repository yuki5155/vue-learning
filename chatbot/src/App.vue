<template>
  <div class="app-container">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/chat">Chat</router-link> |
        <router-link to="/mypage">MyPage</router-link>
        
        <div class="auth-buttons">
          <template v-if="isAuthenticated">
            <span class="welcome-text">ようこそ、{{ currentUser?.username }}さん</span>
            <button @click="logout" class="auth-button logout-button">ログアウト</button>
          </template>
          <template v-else>
            <button @click="showLoginForm = true" class="auth-button login-button">ログイン</button>
          </template>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>

    <!-- ログインモーダル -->
    <div v-if="showLoginForm" class="login-modal">
      <div class="login-modal-content">
        <h2>ログイン</h2>
        <div class="form-group">
          <label for="username">ユーザー名:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">パスワード:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="login-modal-buttons">
          <button @click="login" class="login-button">ログイン</button>
          <button @click="showLoginForm = false" class="cancel-button">キャンセル</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const showLoginForm = ref(false);
    const username = ref('');
    const password = ref('');

    // 認証状態を取得
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
    const currentUser = computed(() => store.getters['auth/currentUser']);

    // ページロード時に認証状態をチェック
    onMounted(() => {
      store.dispatch('auth/checkAuth');
    });

    // ログイン処理
    const login = () => {
      if (username.value) {
        store.dispatch('auth/login', username.value);
        showLoginForm.value = false;
        username.value = '';
        password.value = '';
      }
    };

    // ログアウト処理
    const logout = () => {
      store.dispatch('auth/logout');
    };

    return {
      showLoginForm,
      username,
      password,
      isAuthenticated,
      currentUser,
      login,
      logout
    };
  }
});
</script>

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
  justify-content: space-between;
  align-items: center;
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

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.login-button {
  background-color: #42b983;
  color: white;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
}

.welcome-text {
  margin-right: 1rem;
  font-weight: bold;
}

/* ログインモーダルのスタイル */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.login-modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style> 