import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem('user')) || null,
})

export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: localStorage.getItem('isAuthenticated') === 'true',
})

export const companyState = atom({
  key: 'companyState',
  default: JSON.parse(localStorage.getItem('company')) || null,
})