<template>
  <div class="mypage-container">
    <h1>マイページ</h1>
    
    <div class="user-profile">
      <div class="profile-header">
        <div class="avatar">
          <span>{{ userInitials }}</span>
        </div>
        <div class="user-info">
          <h2>{{ userName }}</h2>
          <p class="user-email">{{ userEmail }}</p>
          <p class="member-since">登録日: {{ formatDate(memberSince) }}</p>
        </div>
      </div>
      
      <div class="stats-section">
        <div class="stat-card">
          <h3>5</h3>
          <p>未完了のタスク</p>
        </div>
        <div class="stat-card">
          <h3>10</h3>
          <p>完了したタスク</p>
        </div>
        <div class="stat-card">
          <h3>15</h3>
          <p>合計タスク</p>
        </div>
      </div>
    </div>
    
    <div class="settings-section">
      <h2>設定</h2>
      
      <div class="setting-item">
        <label>
          <span>通知</span>
          <input type="checkbox" v-model="notificationsEnabled" @change="updateSettings">
        </label>
      </div>
      
      <div class="setting-item">
        <label>
          <span>テーマ</span>
          <select v-model="theme" @change="updateSettings">
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
            <option value="system">システム設定に合わせる</option>
          </select>
        </label>
      </div>
      
      <div class="setting-item">
        <label>
          <span>言語</span>
          <select v-model="language" @change="updateSettings">
            <option value="ja">日本語</option>
            <option value="en">英語</option>
          </select>
        </label>
      </div>
    </div>
    
    <div class="action-buttons">
      <router-link to="/" class="btn secondary">ホームに戻る</router-link>
      <router-link to="/todo" class="btn primary">TODOリストへ</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'MyPage',
  
  setup() {
    // ユーザー情報（実際にはサーバーから取得またはストアから取得）
    const userName = ref('山田 太郎');
    const userEmail = ref('taro.yamada@example.com');
    const memberSince = ref(new Date('2023-01-15'));
    
    // 設定
    const notificationsEnabled = ref(true);
    const theme = ref('light');
    const language = ref('ja');
    
    // ユーザーのイニシャルを取得
    const userInitials = computed(() => {
      if (!userName.value) return '';
      return userName.value
        .split(' ')
        .map(name => name.charAt(0))
        .join('');
    });
    
    // 日付のフォーマット
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    
    // 設定の更新
    const updateSettings = () => {
      console.log('設定を更新しました:', {
        notificationsEnabled: notificationsEnabled.value,
        theme: theme.value,
        language: language.value
      });
      // 実際にはここでサーバーに設定を保存する処理を行う
    };
    
    return {
      userName,
      userEmail,
      memberSince,
      userInitials,
      notificationsEnabled,
      theme,
      language,
      formatDate,
      updateSettings
    };
  }
});
</script>

<style scoped>
.mypage-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.user-profile {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 1.5rem;
}

.user-info h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.user-email {
  color: #666;
  margin: 0 0 0.5rem 0;
}

.member-since {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}

.stats-section {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stat-card {
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-card h3 {
  font-size: 2rem;
  color: #4caf50;
  margin: 0 0 0.5rem 0;
}

.stat-card p {
  color: #666;
  margin: 0;
}

.settings-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.settings-section h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
}

.setting-item {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.setting-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.setting-item label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-item span {
  font-weight: bold;
  color: #333;
}

.setting-item select, .setting-item input[type="checkbox"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn {
  flex: 1;
  display: inline-block;
  padding: 0.8rem 1.5rem;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn.primary {
  background-color: #4caf50;
  color: white;
}

.btn.primary:hover {
  background-color: #45a049;
}

.btn.secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn.secondary:hover {
  background-color: #e5e5e5;
}
</style> 