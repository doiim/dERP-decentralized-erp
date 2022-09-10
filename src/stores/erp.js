import { defineStore } from 'pinia'

export const useERPStore = defineStore('erp', {
  state: () => {
    return { ownedERP: '' }
  },
  actions: {
    setERP(address) {
      this.ownedERP = address
    },
    clearERP() {
      this.ownedERP = ''
    },
  },
})
