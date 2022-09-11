<template>
  <div class="grid">
    <h1>Inventory</h1>
    <button
      v-if="!showAddItem"
      class="bg-dark-green rounded px-2 py-1 drop-shadow"
      @click="showAddItem = true"
    >
      New Item
    </button>
    <h3 v-if="showAddItem" class="flex-grow">Add Item</h3>
    <Transition>
      <div v-if="showAddItem" class="flex flex-row">
        <img v-if="!newItemImage" 
          src="./../assets/upload-image.png"
          :style="{ 'height': '120px', 'width': '120px' }"
          class="rounded-full border-2 border-dark-green m-3"

        />
        <div>
          <form class="my-1">
            <div>Item Name:</div>
            <input type="text" class="bg-white border-2 border-dark-green text-black rounded px-2 py-1" placeholder="Name" /><br/>
            <div>Item Description:</div>
            <input type="text" class="bg-white border-2 border-dark-green text-black rounded px-2 py-1" placeholder="Description" />
          </form>
          <button @click="showAddItem = false">Cancel</button>
          <button
            class="bg-dark-green rounded px-2 py-1 drop-shadow"
            @click="addItem"
          >
            Add
          </button>
        </div>
        <div class="flex-grow">

        </div>
    </div>
    </Transition>
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
            <button
              class="bg-dark-green rounded px-2 py-1 drop-shadow"
              @click="decreaseCounter(item.id)"
            >
              -
            </button>
            <input
              class="mx-2 text-center"
              style="width: 50px"
              type="number"
              :value="item.quantity"
              step="1"
              @input="updateCounter($event, item.id)"
            />
            <button
              class="bg-dark-green rounded px-2 py-1 drop-shadow"
              @click="increaseCounter(item.id)"
            >
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

  import { useAccountStore } from '../stores/account'

  import ImageComponent from './ImageComponent.vue'

  export default {
    setup() {
      const store = useAccountStore()
      const getWalletSigner = inject('getWalletSigner')
      return { store, getWalletSigner }
    },
    data() {
      return {
        newItemImage: '',
        inventory: [
          { id: 1, name: 'test', description: 'hello', quantity: 66 },
          { id: 2, name: 'test 2', description: 'hello', quantity: 24 },
          { id: 3, name: 'test 3', description: 'hello', quantity: 87 },
        ],
        showAddItem: false,
      }
    },
    components: {ImageComponent},
    watch: {},
    methods: {
      increaseCounter: function (itemID) {
        const objIndex = this.inventory.findIndex((obj) => obj.id == itemID)
        if (objIndex == null) return
        const newObj = { ...this.inventory[objIndex] }
        newObj.quantity += 1
        this.inventory.splice(objIndex, 1, newObj)
      },
      decreaseCounter: function (itemID) {
        const objIndex = this.inventory.findIndex((obj) => obj.id == itemID)
        if (objIndex == null) return
        const newObj = { ...this.inventory[objIndex] }
        newObj.quantity -= 1
        if (newObj.quantity < 0) return
        this.inventory.splice(objIndex, 1, newObj)
      },
      updateCounter: function (event, itemID) {
        const value = parseInt(event.target.value)
        if(value < 0) return
        const objIndex = this.inventory.findIndex((obj) => obj.id == itemID)
        if (objIndex == null) return
        const newObj = { ...this.inventory[objIndex] }
        newObj.quantity = value
        this.inventory.splice(objIndex, 1, newObj)
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
