<script setup>

import ModalAuth from '/src/components/modals/ModalAuth.vue';
import ModalShoppingCart from '/src/components/modals/ModalShoppingCart.vue';
import { useModal } from '/src/components/composables/useModal.ts';
import { markRaw } from 'vue';
const modal = useModal();

const openModalAuth = () => {
  modal.component.value = markRaw(ModalAuth);
  modal.showModal();
};

const openModalShoppingCart = () => {
  modal.component.value = markRaw(ModalShoppingCart);
  modal.showModal();
};

defineProps({
  totalPrice: Number
})

</script>

<template>
<div class="container">
  <Teleport to="#modal">
          <Transition>
            <component :is="modal.component.value" v-if="modal.show.value" @close="modal.hideModal"/>
          </Transition>
  </Teleport>
		<header class="header">
			<a class="logo" :href="'/'">
				<img src="/src/assets/img/icon/logo.svg" alt="Logo" />
			</a>
			<label class="address">
				<input type="text" class="input input-address" placeholder="Адрес доставки" />
			</label>
			<div class="buttons">
				<span class="user-name"></span>
				<button class="button button-primary button-auth" @click="openModalAuth">
					<span class="button-auth-svg"></span>
					<span class="button-text">Войти</span>
				</button>
				<button class="button button-cart is-open" v-if="totalPrice > 0" id="cart-button" @click="openModalShoppingCart">
					<span class="button-cart-svg"></span>
					<span class="button-text">Корзина</span>
				</button>
				<button class="button button-primary button-out">
					<span class="button-text">Выйти</span>
					<span class="button-out-svg"></span>
				</button>
			</div>
		</header>
	</div>
</template>
