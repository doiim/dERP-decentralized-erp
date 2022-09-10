<template>
  <div class="flex items-center justify-center">
    <button
      v-if="store.account == ''"
      class="button-account"
      @click="connectAccount"
    >
      Connect Your Wallet
    </button>
    <!-- <button v-if="store.account != ''" class="button-account">
      {{ store.account.substring(0, 6) }}...{{
        store.account.substring(store.account.length - 4, store.account.length)
      }}
    </button> -->
    <div>
      <p v-if="store.account != ''">
        Hello there <strong>{{ store.account }}</strong
        >!
      </p>
      <button
        v-if="store.account != ''"
        class="button-account mt-1 px-2 py-1"
        @click="disconnectAccount"
      >
        disconnect
      </button>
    </div>
  </div>
</template>

<script>
  import { inject } from 'vue'
  import { useAccountStore } from '../stores/account'

  export default {
    setup() {
      const store = useAccountStore()
      const connectWallet = inject('connectWallet')
      const getWalletAccount = inject('getWalletAccount')
      const disconnectWallet = inject('disconnectWallet')
      return { store, connectWallet, disconnectWallet, getWalletAccount }
    },
    methods: {
      connectAccount: async function (event) {
        const { provider, signer, account } = await this.connectWallet()
        provider.on('accountsChanged', async () => {
          this.store.setAccount(
            this.getWalletAccount(),
            (await provider.getNetwork()).chainId,
          )
        })
        this.store.setAccount(
          account,
          parseInt((await provider.getNetwork()).chainId),
        )
      },
      disconnectAccount: async function (event) {
        await this.disconnectWallet()
        this.store.unsetAccount()
      },
    },
  }
</script>
