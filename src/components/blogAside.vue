<template>
 	<aside>
		<el-row class="tac">
		  <h2>
		  	{{ $title }}
		  </h2>
		  <el-col>
		    <el-menu
		      :default-active="$bookId"
		      class="el-menu-vertical-demo"
		      text-color="#444"
		      active-text-color="#409EFF">
		      <el-menu-item v-for=" b in books" :key="b.id" :index="b.id"
		      				@click="_change(b)">
		        <i class="el-icon-document"></i>
		        <span slot="title">{{ b.title }}</span>
		      </el-menu-item>
		    </el-menu>
		  </el-col>
		</el-row>
	</aside>
</template>

<script>
export default {
	props:{
		books:{
			type: Array,
			default: []
		}
	},
  	methods: {
      _change: function(item){
      	this.$emit('mulu',item);
      }
    },
    computed:{
    	$title : function(){
			return this.$route.query.menu;
    	},
    	$bookId: function(){
    		return this.books.length && this.books[0].id || '';
    	}
    }
}
</script>

<style scoped>
aside{
	width: 240px;
	height: 100%;
	overflow-y: auto;
}
.tac,
.tac .el-col,
.tac .el-menu{
	height: 100%;
}

.tac {
  padding-top: 50px;
  box-sizing: border-box;
}

.tac h2{
	position: fixed;
	width: 198px;
	top: 50px;
	line-height: 49px;
	font-size: 18px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-indent: 25px;
	border-bottom: 1px solid rgb(240,240,240);
}

.tac .el-menu{
	border-right: 0;
}


</style>
