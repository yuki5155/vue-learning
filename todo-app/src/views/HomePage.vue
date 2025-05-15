<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>TODOアプリへようこそ</h1>
      <p>タスク管理を簡単に行えるシンプルなTODOアプリです。</p>
    </div>
    
    <div class="features-section">
      <h2>機能一覧</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <div class="icon">✓</div>
          <h3>タスク管理</h3>
          <p>タスクの追加、削除、状態管理が簡単に行えます。</p>
          <router-link to="/todo" class="btn">TODOリストへ</router-link>
        </div>
        
        <div class="feature-card">
          <div class="icon">👤</div>
          <h3>ユーザー設定</h3>
          <p>アカウント情報や設定を管理できます。</p>
          <router-link to="/mypage" class="btn">マイページへ</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage'
});
</script>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.welcome-section p {
  font-size: 1.2rem;
  color: #666;
}

.features-section {
  margin-bottom: 3rem;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.feature-cards {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.feature-card {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.feature-card p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}
</style> 