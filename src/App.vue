<template>
  <div class="flex">
    <div class="sidebar flex flex-col h-screen px-2 py-8 overflow-y-auto bg-teal">
      <img src="./assets/logonew.png" class="mx-1 my-3" style="width: 150px">

      <div class="flex flex-col justify-between mt-1">
        <aside>
          <ul>
            <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
              <router-link to="/" class="text-white no-underline">Home</router-link>
            </li>
            <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
              <router-link to="/inventory" class="text-white no-underline">Inventory</router-link>
            </li>
            <li class="my-1 hover:bg-dark-teal hover:rounded py-1 px-2">
              <router-link to="/invoice" class="text-white no-underline">Invoice</router-link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
    <div class="w-full p-3 m-8">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
