import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Message, User } from '@/types/chat'
import { conversation, currentUser } from '@/const/data'
import { v4 as uuidv4 } from 'uuid'

// Here I will simulate backend that temporarily stores messages and exposes 3 methods/endpoints: "getConversation", "me", and ""sendReply.
const fakeBackend = {
  messages: JSON.parse(conversation) as Message[],
  currentUser: JSON.parse(currentUser) as User,
  getConversation: () =>
    new Promise<Message[]>((resolve) => {
      setTimeout(() => resolve(fakeBackend.messages), 0)
    }),
  me: () =>
    new Promise<User>((resolve) => {
      setTimeout(() => resolve(fakeBackend.currentUser), 0)
    }),
  addMessageToConversation: (message: Message) =>
    new Promise<Message>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) {
          return reject(new Error('Failed to add message to conversation'))
        } else {
          fakeBackend.messages.push(message)
          resolve(message)
        }
      }, 500)
    }),
}

// There is no loading state, since I am not simulating any network delay for initial load
export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const currentUser = ref<User | null>(null)
  // Generally I would not do something like this, I think message should stay and get icon that would allow user to retry sending the message,
  // but it was stated liek this by the assignment
  const failedMessage = ref<string>('')

  const getConversation = async () => {
    console.log('getConversation')
    messages.value = await fakeBackend.getConversation()
  }

  const me = async () => {
    currentUser.value = await fakeBackend.me()
  }

  const sendReply = async (message: string) => {
    failedMessage.value = ''

    const newMessage = {
      id: uuidv4(),
      from: currentUser.value!,
      message,
      date: new Date().toISOString(),
    }

    const newMessages = [...messages.value, newMessage]
    messages.value = newMessages

    try {
      await fakeBackend.addMessageToConversation(newMessage)
    } catch (err) {
      failedMessage.value = message
      messages.value = messages.value.filter((m) => m.id !== newMessage.id)
    }
  }

  const initialize = async () => {
    await Promise.all([getConversation(), me()])
  }

  return { messages, currentUser, getConversation, me, initialize, sendReply, failedMessage }
})
