<template>
  <h1>Itens</h1>
  <IPFSButton @files-uploaded="filesHaveBeenUploaded"></IPFSButton>
</template>

<script>
  import { inject } from 'vue'
  import IPFSButton from './IPFSButton.vue'
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
    components: { IPFSButton },
    watch: {},
    methods: {
      filesHaveBeenUploaded: function (files) {
        console.log("Uploaded files", files)
      }
    },
  }
</script>

<style scoped></style>
