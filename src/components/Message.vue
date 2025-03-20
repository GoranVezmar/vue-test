<script setup lang="ts">
import type { Message } from '@/types/chat'

defineProps<{
  message: Message
  isCurrentUser: boolean
}>()
</script>

<!-- This is message entry -->
<template>
  <div class="message" :class="{ 'message--current-user': isCurrentUser }">
    <div class="message_thumbnail">
      <img :src="message.from.thumbnail" alt="User thumbnail" class="message_thumbnail-image" />
      <div class="message_thumbnail-tooltip">{{ message.from.firstName }}</div>
    </div>
    <div class="message_body">
      {{ message.message }}
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 8px 16px;
}

.message_thumbnail {
  position: relative;
}

.message_thumbnail-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: block;
}

.message_thumbnail-tooltip {
  position: absolute;
  z-index: 2;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -8px);
  padding: 6px 12px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s,
    visibility 0.2s;
}

.message_thumbnail-image:hover + .message_thumbnail-tooltip {
  opacity: 1;
  visibility: visible;
}

.message_body {
  background-color: rgb(179, 179, 179);
  padding: 8px;
  border-radius: 8px;
  max-width: 60%;
}

.message--current-user {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.message--current-user .message_body {
  background-color: rgb(128, 171, 228);
}
</style>
