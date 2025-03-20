<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import Message from './Message.vue'
import ComposeMessage from './ComposeMessage.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

const message = ref('')

const chatMessagesRef = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (chatMessagesRef.value) chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
}

onMounted(() => {
  chatStore.initialize().then(() => {
    nextTick(scrollToBottom)
  })
})

watch(() => chatStore.messages, scrollToBottom)
watch(
  () => chatStore.failedMessage,
  () => {
    message.value = chatStore.failedMessage
  },
)

const sendReply = () => {
  if (message.value.trim()) {
    chatStore.sendReply(message.value)
    message.value = ''
  }
  nextTick(scrollToBottom)
}
</script>

<!-- This is conversation area -->
<template>
  <div class="chat">
    <div class="chat_messages" ref="chatMessagesRef">
      <Message
        v-for="message in chatStore.messages"
        :key="message.id"
        :message="message"
        :isCurrentUser="chatStore.currentUser?.id === message.from.id"
      />
    </div>
    <ComposeMessage @submit="sendReply" v-model="message" />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 400px;
  width: 100%;
  height: 100vh;
  border: 2px solid black;
}

.chat_messages {
  overflow-y: auto;
}
</style>
