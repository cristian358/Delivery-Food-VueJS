<script setup>
import { ref, onMounted, reactive, watch, } from 'vue'
import axios from 'axios'
import {useRoute} from "vue-router";
import CardListPartner from '../components/CardListPartner.vue'
import { inject } from 'vue'
import debounce from 'lodash.debounce'

const partnerFoods = ref([])
const { cart, addToCart, removeFromCart } = inject('cart')
const route = useRoute();

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()

})

const onClickAddPlus = (item) => {
  addToCart(item)
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.searchQuery = `*${filters.searchQuery}*`
    }

   const { data } = await axios.get(`/api/partners/${route.params.name}`, {
    params
   });

    partnerFoods.value = {
      name: data.partners[0].name,
      price: data.partners[0].price,
      kitchen: data.partners[0].kitchen,
      stars: data.partners[0].stars,
      products: data.partners[0].products.map((obj) => ({
      ...obj,
      isAdded: false,
      numberOfAddedProducts: 0
    }))
    }
   
  } catch (err) {
    console.log(err)
  }
}
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
    numberOfAddedProducts: 0
  }))
})
watch(filters, fetchItems)
</script>

<template>
 	<main class="main">
		<div class="container">
			<section class="menu">
				<div class="section-heading">
					<h2 class="section-title restaurant-title">{{partnerFoods.name}}</h2>
					<div class="card-info">
						<div class="rating">
							{{partnerFoods.stars}}
						</div>
						<div class="price">От {{partnerFoods.price}} ₽</div>
						<div class="category">{{partnerFoods.kitchen}}</div>
					</div>
          <label class="search">
						<input  @input="onChangeSearchInput" type="text" class="input input-search" placeholder="Поиск блюд и их компонентов" />
					</label>
          <div class="custom-select">
            
          <select @change="onChangeSelect" class="input">
        <option value="name">Сортиовать</option>
        <option value="-price">По цене (дешевые)</option>
        <option value="price">По цене (дорогие)</option>
      </select>
      </div>
					<!-- /.card-info -->
				</div>
   
  <CardListPartner :items="partnerFoods.products"  @add-to-cart="onClickAddPlus"/>
      </section>
    </div>
    </main>
</template>
