<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  time_of_delivery: Number,
  stars: Number,
  kitchen: String,
  products: String,
  isAdded: Boolean,
  onClickAdd: Function,
  numberOfAddedProducts: Number
})

</script>
<template>
  
  	<a @click="onClickAdd" :href="'partners/' + products.split('.')[0]" class="card card-restaurant">
						<img :src="'/src/assets/' + imageUrl" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">{{ title }}</h3>
								<span class="card-tag tag">{{ time_of_delivery }} мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
									{{stars}}
								</div>
								<div class="price">От {{price}} ₽</div>
								<div class="category">{{kitchen}}</div>
							</div>
							<!-- /.card-info -->
						</div>
						<!-- /.card-text -->
					</a>
  
</template>
