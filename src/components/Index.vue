<template>
  <AccountWidget />
</template>

<script>
  import { inject } from 'vue'
  // import { ethers } from 'ethers'

  import { useAccountStore } from '../stores/account'
  import AccountWidget from './AccountWidget.vue'

  export default {
    setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
    },
    data() {
      return {
        temp: false,
      }
    },
    components: { AccountWidget },
    watch: {},
    methods: {},
  }
</script>

<style scoped></style>
