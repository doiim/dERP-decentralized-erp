<template>
  <div class="text-center" v-if="!accountStore.account">
    <h2 class="my-6" style="font-weight: 900; margin-top: 200px">
      Imagine a ERP, or Enterprise Resource Planning, without the "E"
    </h2>
    <!-- <p class="text-center py-1 ">
      I mean, replace the profit-oriented centralized organization for a DAO
      taking care of it.
    </p>

    <p class="text-center py-1">
      And isn't it the case that web 3.0 describes the decentralized world we
      may be able to build upon for the next generations of our full-immersive
      digital society?
    </p>
    <p class="text-center py-3 font-bold text-md">Therefore... welcome to web3RP!</p> -->

    <!-- <p class="text-center py-1">
      Forget about Microsoft / SAP / Oracle selling atrocious Dynamics /
      Business ByDesign / Fusion licenses for thousands of dollars per user a
      year.
    </p>

    <p class="text-center py-1">
      Get a real helper to streamline your business of any size or kind as fast
      as a couple of clicks...
    </p>

    <p class="text-center py-1">
      Decentralized Resource Planning application for people to nurture their
      work routine.
    </p> -->
  </div>

  <div
    class="my-4"
    style="margin-top: 200px"
    v-if="!waiting && accountStore.account && !erpStore.ownedERP"
  >
    <CustomButton @click="deployERP"> Deploy Your Own web3RP </CustomButton>
  </div>
  <div v-if="!waiting && accountStore.account && erpStore.ownedERP" class="text-center" style="margin-top: 200px">
    <h1 class="mb-0">Your ERP is already deployed!</h1>
    <p class="text-center">@{{ erpStore.ownedERP }}</p>
  </div>

  <div style="position: fixed; bottom: 50px; right 50px;">
    <img src="../assets/doiim.png" alt="" style="width: 120px">
    <p class="text-sm ">We design, build and maintain a range of projects, from proof of concept and the minimum viable product to scaling</p>
    <a class="text-sm mt-1" href="https://doiim.com">doiim.com</a>
  </div>

</template>

<script>
  import { inject } from 'vue'
  import { ethers } from 'ethers'
  import party from 'party-js'
  import { useAccountStore } from '../stores/account'
  import { useERPStore } from '../stores/erp'
  import AccountWidget from './AccountWidget.vue'
  import CustomButton from './CustomButton.vue'

  import localhostAddresses from '../../deploys/localhost.json'
  import mumbaiAddresses from '../../deploys/mumbai.json'
  import erpFactoryArtifact from '../../artifacts/contracts/web3RPFactory.sol/Web3RPFactory.json'

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
        wasDeployed: false,
        waiting: false,
      }
    },
    components: { AccountWidget, CustomButton },
    watch: {
      // Whenever account changes, this function will run
      async 'accountStore.account'(account) {
        if (account) {
          this.refreshERP()
        }
      },
    },
    methods: {
      async refreshERP() {
        const erpContract = new ethers.Contract(
          this.accountStore.network == "80001" ? mumbaiAddresses.web3rp : localhostAddresses.web3rp,
          erpFactoryArtifact.abi,
          this.getWalletSigner(),
        )
        this.waiting = true
        const filter = await erpContract.filters.ERPDeployed(
          this.getWalletAccount(),
          null,
        )
        const events = await erpContract.queryFilter(filter)
        if (events.length > 0) {
          // console.log(events[0].args.erp)
          this.erpStore.setERP(events[0].args.erp)
          if (this.wasDeployed) {
            party.confetti(document.body, {
              count: party.variation.range(200, 400),
            })
          }
        }
        this.waiting = false
        return
      },
      async deployERP() {
        // The Contract object
        const erpContract = new ethers.Contract(
          this.accountStore.network == "80001" ? mumbaiAddresses.web3rp : localhostAddresses.web3rp,
          erpFactoryArtifact.abi,
          this.getWalletSigner(),
        )
        const transaction = await erpContract.deployERP()
        this.waiting = true
        this.wasDeployed = true
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
