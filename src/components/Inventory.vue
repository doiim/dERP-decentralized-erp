<template>
  <div class="grid">
    <h1>Inventory</h1>
    <button
      class="bg-dark-green rounded px-2 py-1 drop-shadow"
      @click="showAddItem = true"
    >
      New Item
    </button>
    <div v-if="showAddItem">
      <h2>Add new item</h2>
      <form class="my-1">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Description" />
      </form>
      <button @click="showAddItem = false">Cancel</button>
      <button
        class="bg-dark-green rounded px-2 py-1 drop-shadow"
        @click="addItem"
      >
        Add
      </button>
    </div>
    <table class="table-fixed mt-6">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory">
          <td>PIC</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td colspan="3">
            <button class="bg-dark-green rounded px-2 py-1 drop-shadow"  @click="decreaseCounter(item.id)">
              -
            </button>
            <input
              class="mx-2 text-center"
              style="width: 50px"
              type="number"
              :value="item.quantity"
              step="1"
            />
            <button class="bg-dark-green rounded px-2 py-1 drop-shadow" @click="increaseCounter(item.id)">
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="bg-dark-green rounded px-2 py-1 drop-shadow mt-1"
      @click="saveInventory"
    >
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
        inventory: [
          { id: 1, name: 'test', description: 'hello', quantity: 66 },
          { id: 2, name: 'test 2', description: 'hello', quantity: 24 },
          { id: 3, name: 'test 3', description: 'hello', quantity: 87 },
        ],
        showAddItem: false,
      }
    },
    components: {},
    watch: {},
    methods: {
      increaseCounter: function (itemID) {
        const objIndex = this.inventory.findIndex((obj => obj.id == itemID));
        if (objIndex == null) return
        const newObj = {...this.inventory[objIndex]};
        newObj.quantity += 1
        this.inventory.splice(objIndex, 1, newObj);
      },
      decreaseCounter: function (itemID) {
        const objIndex = this.inventory.findIndex((obj => obj.id == itemID));
        if (objIndex == null) return
        const newObj = {...this.inventory[objIndex]};
        newObj.quantity -= 1
        this.inventory.splice(objIndex, 1, newObj);
      },
      addItem: async function () {
        console.log('addItem')
      },
      saveInventory: async function () {
        console.log('saveInventory', this.inventory)
      },
    },
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
