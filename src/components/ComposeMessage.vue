<script setup lang="ts">
const { modelValue } = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'submit'): void
}>()

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit')
}

const handleInputChange = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  emit('update:modelValue', textarea?.value)
}
</script>

<!-- This is compose section -->
<template>
  <form class="compose-message" @submit="handleSubmit">
    <textarea
      class="compose-message_textarea"
      placeholder="Type your message here..."
      :value="modelValue"
      @input="(event) => handleInputChange(event)"
      @keydown.enter.exact="handleSubmit"
      rows="1"
    >
    </textarea>
    <button class="compose-message_button"><v-icon name="ri-send-plane-fill" /></button>
  </form>
</template>

<style scoped>
.compose-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
}

.compose-message_textarea {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  overflow-y: auto;
  line-height: 22px;
  field-sizing: content;
  max-height: 76px;
}

.compose-message_button {
  width: 60px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
}
</style>
