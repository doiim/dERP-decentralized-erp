<template>
    <div
        class="bg-white m-3 rounded-full border-black border-2"
        :style="{ 'height': size + 'px', 'width': size + 'px' }"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            size: Number,
        }
    }
</script>

<style scoped>
    img {
        width: 100%;
        height: 100%;
    }
</style>