<template>
  <h1>Items</h1>
</template>

<script>
  import { inject } from 'vue'
  // import { ethers } from 'ethers'

  import { useAccountStore } from '../stores/account'

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
    components: {},
    watch: {},
    methods: {},
  }
</script>

<style scoped></style>
