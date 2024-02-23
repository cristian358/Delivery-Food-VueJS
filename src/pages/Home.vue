<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])
const modalActive = ref(null);


defineEmits(["close-modal"]);
  defineProps({
    modalActive: {
      type: Boolean,
      default: false,
    },
  });

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}


const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const fetchItems = async () => {
  try {
    const params = {}
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get('/api/partnersList', {
      params
    })
    items.value = data.partnersLists.map((obj) => ({
      ...obj,
      isAdded: false
    }))
   
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
 
  	<main class="main">
		<div class="container">
			<section class="container-promo">
				<section class="promo pizza">
					<h1 class="promo-title">Онлайн-сервис <br />доставки еды на дом</h1>
					<p class="promo-text">
						Блюда из любимого ресторана привезет курьер в перчатках, маске и с антисептиком
					</p>
				</section>
				<!-- <section class="promo kebab">
					<h1 class="promo-title">Шашлыки на майские <br> со скидкой 35%</h1>
					<p class="promo-text">
						Закажите шашлыки в любом ресторане до 10 мая и получите скидку по промокоду OMAGAD
					</p>
				</section>
				<section class="promo vegetables">
					<h1 class="promo-title">Скидка 20% на всю еду <br> по промокоду LOVE.JS</h1>
					<p class="promo-text">
						Блюдо из ресторана привезут вместе с двумя подарочными книгами по фронтенду
					</p>
				</section>
				<section class="promo sushi">
					<h1 class="promo-title">Сеты со скидкой до 30% <br> в ресторанах</h1>
					<p class="promo-text">
						Скидки на сеты до 30 мая по промокоду DADADA
					</p>
				</section> -->
			</section>
			<section class="restaurants">
				<div class="section-heading">
					<h2 class="section-title">Рестораны</h2>
					<label class="search">
						<input  @input="onChangeSearchInput" type="text" class="input input-search" placeholder="Поиск блюд и ресторанов" />
					</label>
				</div>
        <CardList :items="items" @add-to-cart="onClickAddPlus" />
				<!-- /.cards -->
			</section>
		</div>
		<!-- /.container -->
	</main>
</template>
