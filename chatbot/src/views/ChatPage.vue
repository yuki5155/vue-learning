<template>
  <div class="chat-page">
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>スレッド一覧</h2>
        <button @click="createNewThread" class="new-thread-btn">
          + 新規スレッド
        </button>
      </div>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
      <div v-else-if="threads.length === 0" class="empty-state">
        <p>スレッドがありません。</p>
        <p>新しいスレッドを作成してください。</p>
      </div>
      <div v-else class="thread-list">
        <div
          v-for="thread in threads"
          :key="thread.id"
          :class="['thread-item', { active: currentThreadId === thread.id }]"
          @click="selectThread(thread.id)"
        >
          <div class="thread-item-inner">
            <div class="thread-title">{{ thread.title }}</div>
            <div class="thread-meta">
              <span class="thread-date">{{ formatDate(thread.updatedAt) }}</span>
              <span class="thread-messages">{{ thread.messages.length }}メッセージ</span>
            </div>
          </div>
          <div class="thread-actions">
            <button 
              @click.stop="toggleThreadActive(thread.id)"
              :class="['toggle-btn', thread.isActive ? 'active' : 'inactive']"
              :title="thread.isActive ? '無効化' : '有効化'"
            >
              {{ thread.isActive ? '有効' : '無効' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-container">
      <div v-if="!currentThread" class="no-thread-selected">
        <h2>スレッドを選択するか、新しいスレッドを作成してください</h2>
      </div>
      <div v-else class="chat-area">
        <div class="chat-header">
          <h2>{{ currentThread.title }}</h2>
          <div v-if="!currentThread.isActive" class="inactive-badge">無効化済み</div>
        </div>
        <div :class="['messages', { 'inactive-thread': !currentThread.isActive }]">
          <div v-if="currentThread.messages.length === 0" class="empty-messages">
            <p>メッセージがありません。</p>
            <p>最初のメッセージを送信してください。</p>
          </div>
          <div 
            v-for="message in currentThread.messages" 
            :key="message.id"
            :class="['message', message.sender]"
          >
            <div class="message-content">
              <div class="message-text">{{ message.text }}</div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>
        <div class="message-input">
          <form @submit.prevent="sendMessage">
            <input 
              v-model="newMessage" 
              placeholder="メッセージを入力..." 
              :disabled="!currentThread || !currentThread.isActive"
            />
            <button type="submit" :disabled="!newMessage || !currentThread || !currentThread.isActive">送信</button>
          </form>
          <div v-if="currentThread && !currentThread.isActive" class="inactive-thread-notice">
            このスレッドは無効化されています。メッセージを送信するには、スレッドを有効化してください。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ChatPage',
  
  setup() {
    const store = useStore();
    const newMessage = ref('');
    const newThreadTitle = ref('');
    
    // ストアからのデータ取得
    const threads = computed(() => store.getters['chat/allThreads']);
    const currentThreadId = computed(() => store.state.chat.currentThreadId);
    const currentThread = computed(() => store.getters['chat/currentThread']);
    const loading = computed(() => store.state.chat.loading);
    
    // ページ読み込み時にスレッドをロード
    onMounted(() => {
      store.dispatch('chat/loadThreads');
    });
    
    // 新規スレッド作成
    const createNewThread = () => {
      const title = prompt('新しいスレッドのタイトルを入力してください:', `新しいスレッド ${threads.value.length + 1}`);
      if (title) {
        store.dispatch('chat/createThread', title);
      }
    };
    
    // スレッド選択
    const selectThread = (threadId: number) => {
      store.dispatch('chat/setCurrentThread', threadId);
    };
    
    // メッセージ送信
    const sendMessage = () => {
      if (newMessage.value && currentThreadId.value) {
        store.dispatch('chat/sendMessage', newMessage.value);
        newMessage.value = '';
      }
    };
    
    // スレッドの有効/無効を切り替え
    const toggleThreadActive = (threadId: number) => {
      store.dispatch('chat/toggleThread', threadId);
    };
    
    // 日付フォーマット
    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ja-JP');
    };
    
    // 時刻フォーマット
    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    };
    
    return {
      threads,
      currentThreadId,
      currentThread,
      loading,
      newMessage,
      createNewThread,
      selectThread,
      sendMessage,
      toggleThreadActive,
      formatDate,
      formatTime
    };
  }
});
</script>

<style scoped>
.chat-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 150px);
  min-height: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.sidebar {
  width: 300px;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-header h2 {
  color: #333;
  font-weight: bold;
}

.new-thread-btn {
  background-color: #42b983;
  color: white;
  border: none;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
}

.thread-list {
  flex: 1;
  overflow-y: auto;
}

.thread-item {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thread-item:hover {
  background-color: #e6e6e6;
}

.thread-item.active {
  background-color: rgba(66, 185, 131, 0.1);
  border-left: 4px solid #42b983;
}

.thread-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.thread-meta {
  font-size: 0.8rem;
  color: #444;
  display: flex;
  justify-content: space-between;
}

.toggle-btn {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.toggle-btn.active {
  background-color: #42b983;
  color: white;
}

.toggle-btn.inactive {
  background-color: #999;
  color: white;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.no-thread-selected {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #333;
  text-align: center;
  padding: 2rem;
}

.no-thread-selected h2 {
  color: #333;
  font-weight: bold;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inactive-badge {
  background-color: #e74c3c;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.messages.inactive-thread {
  background-color: rgba(231, 76, 60, 0.05);
  position: relative;
}

.messages.inactive-thread::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(240, 240, 240, 0.5);
  pointer-events: none;
}

.message {
  max-width: 80%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 10px;
  position: relative;
}

.message.user {
  align-self: flex-end;
  background-color: #42b983;
  color: white;
}

.message.bot {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
}

.message-text {
  margin-bottom: 0.3rem;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: right;
}

.message-input {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
}

.message-input form {
  display: flex;
}

.message-input input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.message-input button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.message-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.inactive-thread-notice {
  margin-top: 0.5rem;
  color: #e74c3c;
  font-size: 0.8rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #fadbd8;
  border-radius: 4px;
}

.loading, .empty-state, .empty-messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #666;
  text-align: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #42b983;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.chat-area {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style> 