<template>
  <div v-if="!waiting"><AccountWidget /></div>
  <div v-if="waiting">wait...</div>
  <div class="my-4" v-if="!waiting && accountStore.account && !erpStore.ownedERP">
    <CustomButton
      @click="deployERP"
    >
      Deploy Your Own web3RP
    </CustomButton>
  </div>
  <div v-if="!waiting && accountStore.account && erpStore.ownedERP">
    Your ERP is deployed at {{erpStore.ownedERP}}
  </div>
</template>

<script>
  import { inject } from 'vue'
  import { ethers } from 'ethers'

  import { useAccountStore } from '../stores/account'
  import { useERPStore } from '../stores/erp'
  import AccountWidget from './AccountWidget.vue'
  import CustomButton from './CustomButton.vue'

  import localhostAddresses from '../../deploys/localhost.json';
  import erpFactoryArtifact from '../../artifacts/contracts/web3RPFactory.sol/Web3RPFactory.json';

  export default {
    setup() {
      const accountStore = useAccountStore()
      const erpStore = useERPStore()
      const getWalletSigner = inject('getWalletSigner')
      const getWalletAccount = inject('getWalletAccount')
      return { accountStore, erpStore, getWalletSigner, getWalletAccount }
    },
    data() {
      return {
        temp: false,
        waiting: false
      }
    },
    components: { AccountWidget, CustomButton},
    watch: {
      // Whenever account changes, this function will run
      async 'accountStore.account'(account) {
        if (account) {
          this.refreshERP()
        }
      }
    },
    methods: {
      async refreshERP() {
        // The Contract object
        const erpContract = new ethers.Contract(
            localhostAddresses.web3rp,
            erpFactoryArtifact.abi,
            this.getWalletSigner()
        );
        this.waiting = true
        const filter = await erpContract.filters.ERPDeployed(this.getWalletAccount(), null)
        const events = await erpContract.queryFilter(filter);
        if (events.length > 0){
          console.log(events[0].args.erp)
          this.erpStore.setERP(events[0].args.erp)
        }
        this.waiting = false
        return
      },
      async deployERP() {
        // The Contract object
        const erpContract = new ethers.Contract(
            localhostAddresses.web3rp,
            erpFactoryArtifact.abi,
            this.getWalletSigner()
        );
        const transaction = await erpContract.deployERP()
        this.waiting = true
        await transaction.wait()
        await this.refreshERP()
        this.waiting = false
        // this.counter = await counterContract.getCount()
        // console.log(await this.store.provider.send('eth_chainId', []))
        return
      },
    },
  }
</script>

<style scoped></style>
