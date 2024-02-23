<script setup>
import axios from 'axios'
import { ref, computed, inject } from 'vue'

import CartItemList from '../CartItemList.vue'

defineProps({
  totalPrice: Number
})

const { cart, totalPrice } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

</script>

<template>
	<div class="modal modal-cart is-open">
		<div class="modal-dialog">
			<div class="modal-header">
				<h3 class="modal-title">Корзина</h3>
				<button class="close" @click="$emit('close')">&times;</button>
			</div>
			<!-- /.modal-header -->
			<div class="modal-body">

    	 <CartItemList />
				<!-- /.foods-row -->
			</div>
			<!-- /.modal-body -->
			<div class="modal-footer">
				<span class="modal-pricetag">{{totalPrice}} ₽</span>
				<div class="footer-buttons">
					<button class="button button-primary">Оформить заказ</button>
					<button class="button clear-cart" @click="$emit('close')">Отмена</button>
				</div>
			</div>
			<!-- /.modal-footer -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
