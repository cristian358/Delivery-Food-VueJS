<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  description: String,
  isAdded: Boolean,
  onClickAdd: Function,
  numberOfAddedProducts: Number
})

</script>
<template>
  	<div class="card">

						<img :src="'/src/assets/' + imageUrl" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">{{title}}</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">{{description}}
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button @click="onClickAdd" class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">{{price}} ₽</strong>
							</div>
						</div>
						<!-- /.card-text -->
					</div>
  
</template>
