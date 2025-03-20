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

  // There is a bug here, if the content is scrolled down and textarea expands, the scroll possition on the messages box does not update,
  // ideally we would want to emit an event to the parent component to scroll to the bottom of the messages box (if it was at the bottom)
  // if (!textarea) return
  // textarea.style.height = 'auto'
  // const minHeight = 36
  // const maxHeight = 76
  // const newHeight = Math.max(minHeight, Math.min(maxHeight, textarea.scrollHeight))
  // textarea.style.height = `${newHeight}px`
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
