<script setup>
import CardPartner from './CardPartner.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToCart'])
</script>

<template>
  <div class="cards cards-menu">
    <CardPartner
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :imageUrl="item.image"
      :price="item.price"
      :description="item.description"
      :onClickAdd="() => emit('addToCart', item)"
    />
	</div>
</template>
