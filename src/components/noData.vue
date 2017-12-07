<template>
 	<div class="nodata">
 		<figure>
 			<img src="../assets/timg.jpg" height="189" width="225" alt="图片">
 		</figure>
 		<p>
 			<span>{{msgs.tip}}</span>
 			<router-link v-if="msgs.link" :to="msgs.link">
 				GO =>
 			</router-link>
 		</p>
 	</div>
</template>

<script>
export default {
	props:{
		msgs:{
			type: Object,
			default: {
				tip  : '',
				link : ''
			}
		}
	}
}
</script>

<style scoped>
.nodata{
	width: 100%; height: 100%;
}
figure{
	margin: 100px 0 20px;
}
figure,p{
	text-align: center;
}
p span{
	color: #333;
	font-size: 14px;
	margin-right: 10px;
}
p a{
	color: #555;
	font-weight: bold;
}
</style>
