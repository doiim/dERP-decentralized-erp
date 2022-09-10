<template>
  <div class="grid">
    <h1>Inventory</h1>
    <button class="bg-dark-green rounded px-2 py-1 drop-shadow grow">
      New Item
    </button>
    <table class="table-fixed mt-6">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PIC</td>
          <td>Hello</td>
          <td>World</td>
          <td colspan="3">
            <button
              class="bg-dark-green rounded px-2 py-1 drop-shadow grow"
            >
              -
            </button>
            <input
              class="mx-2 text-center"
              style="width: 50px"
              type="number"
              value="66"
              step="1"
            />
            <button
              class="bg-dark-green rounded px-2 py-1 drop-shadow grow"
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="bg-dark-green rounded px-2 py-1 drop-shadow grow mt-1">
      Save Inventory
    </button>
  </div>
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
        test: false,
      }
    },
    components: {},
    watch: {},
    methods: {},
  }
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
