<template>
  <div class="flex">
    <div
      class="sidebar flex flex-col h-screen px-2 py-8 overflow-y-auto bg-teal"
    >
      <img src="./assets/logonew.png" class="mx-1 my-3" style="width: 150px" />
      <div class="mt-4">
        <AccountWidget />
      </div>
      <Transition>
        <div
          v-if="erpStore.ownedERP"
          class="flex flex-col justify-between mt-6"
        >
          <aside>
            <ul>
              <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
                <router-link to="/" class="text-white no-underline"
                  >Home</router-link
                >
              </li>
              <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
                <router-link to="/inventory" class="text-white no-underline"
                  >Inventory</router-link
                >
              </li>
              <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
                <router-link to="/invoice" class="text-white no-underline"
                  >Invoice</router-link
                >
              </li>
              <!-- <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
              <router-link to="/invoice" class="text-white no-underline">About</router-link>
            </li> -->
            </ul>
          </aside>
        </div>
      </Transition>
    </div>
    <div class="w-full p-3 px-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AccountWidget from './components/AccountWidget.vue'
  import { useERPStore } from './stores/erp'

  export default {
    setup() {
      const erpStore = useERPStore()
      return { erpStore }
    },
    components: { AccountWidget },
  }
</script>
