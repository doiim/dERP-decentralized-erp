<template>
    <div>
        <h3 class="flex-grow">Add Item</h3>
        <div class="flex flex-row">
            <input type="file" @change="uploadImage" multiple="multiple" ref="file" :style="{ 'display' : 'none'}" />
            <img v-if="!newItemImage" 
            src="./../assets/upload-image.png"
            :style="{ 'height': '120px', 'width': '120px' }"
            class="cursor-pointer rounded-full border-2 border-dark-green m-3"
            @click="this.$refs.file.click()"
            />
            <img v-if="newItemImage" 
            :src="newItemImage"
            :style="{ 'height': '120px', 'width': '120px' }"
            class="cursor-pointer rounded-full border-2 border-dark-green m-3"
            @click="this.$refs.file.click()"
            />
            <div class="flex-grow">
            <form class="my-1">
                <div>Item Name:</div>
                <input type="text" @change="event => this.newName = event.target.value" class="bg-white border-2 border-dark-green text-black rounded px-2 py-1 input-add-item" placeholder="Name" /><br/>
                <div>Item Description:</div>
                <input type="text"  @change="event => this.newDescription = event.target.value" class="bg-white border-2 border-dark-green text-black rounded px-2 py-1 input-add-item" placeholder="Description" />
            </form>
            <button @click="closeAdd" class="button-default mr-2">Cancel</button>
            <button
                class='button-default'
                :disabled="waiting || !this.newName "
                @click="addItem"
            >
                Create Item Asset
            </button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
    import { inject } from 'vue'
    import { useERPStore } from '../stores/erp'
    import { ethers } from 'ethers'

    import erpArtifact from '../../artifacts/contracts/web3RPCore.sol/Web3RPCore.json'

    export default {
    setup() {
        const store = useERPStore()
        const addMetadataIPFS = inject('addMetadataIPFS')
        const addFileIPFS = inject('addFileIPFS')
        const getIPFS = inject('getIPFS')
        const getWalletSigner = inject('getWalletSigner')
        return { store, addMetadataIPFS, addFileIPFS, getIPFS, getWalletSigner }
    },
    data() {
        return {
        waiting: false,
        newItemImage: '',
        newName: '',
        newDescription: ''
        }
    },
    components: {},
    watch: {},
    methods: {
        addItem: async function () {
            const itemUri = await this.addMetadataIPFS({
                name: this.newName,
                description: this.newDescription,
                image: this.newItemImage
            });
            const erpContract = new ethers.Contract(
                this.store.ownedERP,
                erpArtifact.abi,
                this.getWalletSigner(),
            )
            const transaction = await erpContract.createItem([],[],itemUri)
            this.waiting = true
            await transaction.wait()
            this.waiting = false
            this.closeAdd()
        },
        uploadImage: async function (event) {
            const uri = await this.addFileIPFS(event.target.files)
            this.newItemImage = await this.getIPFS(uri)
        },
        closeAdd: function() {
            this.$emit('closeAdd');
        }
    }
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
  