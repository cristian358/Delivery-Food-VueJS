<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, totalPrice, removeFromCart,addToCart } = inject('cart')
const emit = defineEmits(['onClickRemove', 'addToCart'])
</script>

<template>

    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.name"
      :price="item.price"
      :numberOfAddedProducts="item.numberOfAddedProducts"
      @on-click-remove="() => removeFromCart(item)"
      @add-to-cart="() => addToCart(item)"
    />

</template>
