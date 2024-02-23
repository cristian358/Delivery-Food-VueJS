<script setup>
defineProps({
  totalPrice: Number
})

</script>

<template>
<footer class="footer">
		<div class="container">
			<div class="footer-block">
        <a class="logo" :href="'/'">
				<img src="/src/assets/img/icon/logo.svg" alt="logo" class="logo footer-logo" />
      </a>
				<nav class="footer-nav">
					<a href="#" class="footer-link">Ресторанам </a>
					<a href="#" class="footer-link">Курьерам</a>
					<a href="#" class="footer-link">Пресс-центр</a>
					<a href="#" class="footer-link">Контакты</a>
				</nav>
				<div class="social-links">
					<a href="#" class="social-link"><img src="/src/assets/img/social/instagram.svg" alt="instagram" /></a>
					<a href="#" class="social-link"><img src="/src/assets/img/social/fb.svg" alt="facebook" /></a>
					<a href="#" class="social-link"><img src="/src/assets/img/social/vk.svg" alt="vk" /></a>
				</div>
				<!-- /.social-links -->
			</div>
			<!-- /.footer-block -->
		</div>
	</footer>
</template>
