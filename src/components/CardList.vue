<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToCart'])
</script>

<template>
 <div class="cards cards-restaurants">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :imageUrl="item.image"
      :price="item.price"
      :time_of_delivery="item.time_of_delivery"
      :stars="item.stars"
      :kitchen="item.kitchen"
      :products="item.products"
      :onClickAdd="() => emit('addToCart', item)"
      :isAdded="item.isAdded"
      :numberOfAddedProducts="item.numberOfAddedProducts"
    />
				
					<!-- /.card -->
				</div>
</template>
