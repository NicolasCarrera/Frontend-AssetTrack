import { atom } from 'recoil'

export const alertUserManagementPage = atom({
    key: 'alertUserManagementPage',
    default: { title: '', message: [] },
})