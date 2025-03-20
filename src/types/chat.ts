export type User = {
  id: number
  firstName: string
  lastName: string
  thumbnail: string
}

export type Message = {
  id: number | string
  from: User
  message: string
  date: string
}
