<template>
  <input type="file" @change="uploadFile" multiple="multiple" ref="file" />
  <button
    @click="handleSubmit"
    class="bg-dark-green rounded mx-2 px-2 py-1 drop-shadow"
  >
    <span v-if="uploading">Uploading...</span><span v-else>Upload</span>
  </button>
</template>

<script>
  import { Web3Storage } from 'web3.storage'

  export default {
    setup() {
      const storageClient = new Web3Storage({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4MUMyMjNGNkYxODBGZTkyRUM4ODA0MEIzNjc5NjRGMmFjNjI1MTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4MzIxODgyNjQsIm5hbWUiOiJ3ZWIzUlAifQ.ng7M5CrwIDjUNtXuOzsLYLZ_ucMwBUIEV-IRqwccnOk',
      })
      return { storageClient }
    },
    data() {
      return {
        files: [],
        uploading: false,
        uploaded: [],
      }
    },
    components: {},
    watch: {},
    emits: ['filesUploaded'],
    methods: {
      uploadFile: function () {
        this.files = this.$refs.file.files
      },
      handleSubmit: async function () {
        if (!this.files.length || this.uploading) return
        this.uploading = true
        this.uploaded = []
        const cid = await this.storageClient.put(this.files)
        const gateway = 'https://ipfs.eth.aragon.network/ipfs/'
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files.item(i)
          this.uploaded.push(gateway + cid + '/' + file.name)
        }
        this.$emit('filesUploaded', this.uploaded)
        this.uploading = false
      },
    },
  }
</script>

<style scoped></style>
