<script setup>
import { ref, provide, watch, computed } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price * item.numberOfAddedProducts, 0))

const addToCart = (item) => {
  item.numberOfAddedProducts = item.numberOfAddedProducts + 1
  if (item.numberOfAddedProducts == 1) {
  cart.value.push(item)
  item.isAdded = true
  }
  else {
  }
}

const removeFromCart = (item) => {

  item.numberOfAddedProducts = item.numberOfAddedProducts - 1
  if (item.numberOfAddedProducts == 0) {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
  } else {}
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  totalPrice,
  addToCart,
  removeFromCart
})
</script>

<template>
  <div>
    <Header :total-price="totalPrice"></Header>
      <router-view></router-view>
<Footer></Footer>
  </div>
</template>
