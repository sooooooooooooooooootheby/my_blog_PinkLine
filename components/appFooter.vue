<template>
	<div class="appFooter">
		<div class="content">
			<div class="top">
				<div class="topLeft">
					<img src="/logo_small.webp" alt="logo" class="logo" />
					<ul>
						<li>
							<a href="https://github.com/sooooooooooooooooootheby/">
								<Icon class="icon" name="uim:github" />
							</a>
						</li>
						<li>
							<a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener" title="开往-友链接力">
								<Icon class="icon" name="material-symbols:train-rounded" />
							</a>
						</li>
					</ul>
				</div>
				<div class="topRight">
					<ul class="list">
						<li class="item">
							<NuxtLink to="/"> about </NuxtLink>
						</li>
						<li class="item">
							<NuxtLink to="/article"> article </NuxtLink>
						</li>
					</ul>
					<ul class="list">
						<li class="item">
							<NuxtLink to="/wish_target"> wish & target </NuxtLink>
						</li>
						<li class="item out">
							<NuxtLink to="https://github.com/sooooooooooooooooootheby/sooooooooooooooooootheby/issues/new" target="_blank"> message board <Icon class="icon" name="icon-park-twotone:take-off-one" /> </NuxtLink>
						</li>
					</ul>
				</div>
			</div>
			<div class="bottom">
				<div class="bottomLeft">
					<p class="copyright">Copyright ©2024.sooooooooooooooooootheby All rights reserved</p>
					<p class="icp">桂公网安备45031202000367 | 桂ICP备2024039878</p>
				</div>
				<div class="bottomRight"></div>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import url("~/assets/css/components/appFooter.scss");
</style>
