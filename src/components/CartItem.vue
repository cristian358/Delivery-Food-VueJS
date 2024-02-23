<script setup>
const emit = defineEmits(['onClickRemove', 'addToCart'])

defineProps({
  id: Number,
  title: String,
  price: Number,
  numberOfAddedProducts: Number
})
</script>

<template>
  <div class="food-row">
					<span class="food-name">{{title}}</span>
					<strong class="food-price">{{price * numberOfAddedProducts}} ₽</strong>
					<div class="food-counter">
						<button class="counter-button" @click="emit('onClickRemove')">-</button>
						<span class="counter">{{numberOfAddedProducts}}</span>
						<button class="counter-button" @click="emit('addToCart')" >+</button>
					</div>
		</div>
</template>
