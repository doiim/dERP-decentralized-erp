<template>
  <div class="flex">
    <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
      <img
        src="./assets/derp_logo.png"
        class="mt-1"
        style="width: 120px"
        alt=""
      />
      <h1 class="normal-case">dERP</h1>

      <div class="flex flex-col justify-between mt-6">
        <aside>
          <ul>
            <li class="my-1">
              <router-link to="/">Home</router-link>
            </li>
            <!-- <li class="my-1">
              <router-link to="/itens">Itens</router-link>
            </li> -->
            <li class="my-1">
              <router-link to="/inventory">Inventory</router-link>
            </li>
            <li class="my-1">
              <router-link to="/recipes">Recipes</router-link>
            </li>
            <li class="my-1">
              <router-link to="/invoice">Invoice</router-link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
    <div class="w-full p-3 m-8 overflow-y-aut bg-white">
      <div class="flex p-40">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
