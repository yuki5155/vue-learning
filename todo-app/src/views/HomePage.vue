<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>TODOアプリへようこそ</h1>
      <p>タスク管理を簡単に行えるシンプルなTODOアプリです。</p>
    </div>
    
    <div class="features-section">
      <h2>機能一覧</h2>
      <div class="feature-cards">
        <FeatureCard 
          icon="✓" 
          title="タスク管理" 
          description="タスクの追加、削除、状態管理が簡単に行えます。"
          link-to="/todo"
          link-text="TODOリストへ"
        />
        
        <FeatureCard 
          icon="👤" 
          title="ユーザー設定" 
          description="アカウント情報や設定を管理できます。"
          link-to="/mypage"
          link-text="マイページへ"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FeatureCard from '@/components/FeatureCard.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    FeatureCard
  }
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
</style> 