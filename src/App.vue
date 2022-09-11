<template>
  <div class="flex">
    <div class="sidebar flex flex-col h-screen px-2 py-8 overflow-y-auto border-r">
      <h3 class="normal-case">web3RP</h3>
      <div class="mt-4">
        <AccountWidget />
      </div>
      <Transition>
      <div v-if="erpStore.ownedERP" class="flex flex-col justify-between mt-6">
        <aside>
          <ul>
            <li class="my-1">
              <router-link to="/inventory">Inventory</router-link>
            </li>
            <li class="my-1">
              <router-link to="/invoice">Invoice</router-link>
            </li>
            <li class="my-1">
              <router-link to="/invoice">About</router-link>
            </li>
          </ul>
        </aside>
      </div>
      </Transition>
    </div>
    <div class="w-full p-3 m-8 bg-white">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script >
  import AccountWidget from './components/AccountWidget.vue'
  import { useERPStore } from './stores/erp'

  export default {
    setup() {
      const erpStore = useERPStore()
      return { erpStore }
    },
    components: {AccountWidget}
  }

</script>
