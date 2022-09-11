<template>
  <div class="grid">
    <h1>Inventory</h1>
    <button
      v-if="!showAddItem"
      class="bg-teal rounded px-2 py-1 drop-shadow"
      @click="showAddItem = true"
    >
      New Item
    </button>
    <Transition name="fade">
      <AddItem v-if="showAddItem" @closeAdd="closeAdd"></AddItem>
    </Transition>
    <table v-if="!showAddItem" class="table-fixed mt-6">
      <thead>
        <tr>
          <th></th>
          <th class="text-start">Name</th>
          <th class="text-start">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory">
          <td>
            <img
              v-if="item.image"
              :src="item.image"
              :style="{ 'height': '50px', 'width': '50px' }"
              class="cursor-pointer rounded-full border-2 border-teal"
            />
          </td>
          <td>
            <span v-if="item.name">{{item.id}}. {{ item.name }}</span>
            <span v-if="!item.name">...</span>
          </td>
          <td>
            <span v-if="item.quantity">{{ item.quantity }}</span>
            <span v-if="!item.quantity">0</span>
          </td>
          <td colspan="3">
            <button
              class="bg-teal rounded px-2 py-1 drop-shadow"
              :disabled="item.modify < 1"
              @click="decreaseCounter(item.id)"
            >
              -
            </button>
            <input
              class="mx-2 text-center"
              style="width: 50px"
              type="number"
              :value="item.modify"
              step="1"
              @input="updateCounter($event, item.modify)"
            />
            <button
              class="bg-teal rounded px-2 py-1 drop-shadow"
              @click="increaseCounter(item.id)"
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      v-if="!showAddItem"
      class="bg-teal rounded px-2 py-1 drop-shadow mt-1"
      @click="saveInventory"
    >
      Commit Inventory
    </button>
  </div>
</template>

<script>
  import { inject } from 'vue'
  import { ethers } from 'ethers'

  import { useAccountStore } from '../stores/account'
  import { useERPStore } from '../stores/erp'
  import erpArtifact from '../../artifacts/contracts/web3RPCore.sol/Web3RPCore.json'

  import AddItem from './AddItem.vue'

  export default {
    setup() {
      const accountStore = useAccountStore()
      const erpStore = useERPStore()
      const getWalletSigner = inject('getWalletSigner')
      const getIPFS = inject('getIPFS')
      return { accountStore, erpStore, getWalletSigner, getIPFS }
    },
    mounted() {
      this.refreshInventory()
    },
    data() {
      return {
        newItemImage: '',
        inventory: [],
        showAddItem: false,
      }
    },
    components: {AddItem},
    watch: {},
    methods: {
      refreshInventory: async function() {
        const erpContract = new ethers.Contract(
            this.erpStore.ownedERP,
            erpArtifact.abi,
            this.getWalletSigner(),
        )
        const filter = await erpContract.filters.ItemCreated(
          null,
          null,
        )
        const events = await erpContract.queryFilter(filter)
        const inventory = []
        for (const e of events) {
          fetch(this.getIPFS(e.args.uri))
          .then(a => a.json())
          .then(b => this.setMetadataInfo(e.args.tokenId, b))
          const balance = (await erpContract.balanceOf(this.erpStore.ownedERP, e.args.tokenId)).toNumber()
          const formatted = {
            id: e.args.tokenId,
            quantity: balance,
            modify: 0,
          }
          inventory.push(formatted)
        }
        this.inventory = inventory
      },
      setMetadataInfo: async function (tokenId, metadata) {
        const item = this.inventory.find(i => i.id == tokenId)
        item.name = metadata.name
        item.description = metadata.description
        item.image = metadata.image
      },
      increaseCounter: function (itemID) {
        const objIndex = this.inventory.find((obj) => obj.id == itemID)
        objIndex.modify++
      },
      decreaseCounter: function (itemID) {
        const objIndex = this.inventory.find((obj) => obj.id == itemID)
        objIndex.modify--
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
      saveInventory: async function () {
        const ids = []
        const amounts = []
        this.inventory.filter(i => i.modify > 0).forEach(element => {
          ids.push(element.id)
          amounts.push(element.modify)
        })
        const erpContract = new ethers.Contract(
            this.erpStore.ownedERP,
            erpArtifact.abi,
            this.getWalletSigner(),
        )
        const transaction = await erpContract.mintBatchInventory(ids, amounts)
        await transaction.wait()
        this.refreshInventory()
      },
      closeAdd: function () {
        this.showAddItem = false
      }
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
