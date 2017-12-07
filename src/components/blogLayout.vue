<template>
 	<div class="header">
		<div class="box">
			<figure>
				<img src="../assets/logo.png" height="50" width="100" alt="">
			</figure>
			<el-menu 
			  :default-active="$path"
			  class="el-menu-demo menu"
			  mode="horizontal"
			  background-color="#545c64"
			  text-color="#fff"
			  active-text-color="#409EFF">
			  <template  v-for="m in menus">
			  	  <el-menu-item v-if="!m.submenu" :index="m.path"
			  	  			  	@click="$router.push(m.path)">{{ m.menu }}</el-menu-item>
				  <el-submenu  v-else :index="m.path">
				    <template slot="title"  class="submenu">{{ m.menu }} </template>
				    <el-menu-item  v-for="item in m.submenu" :key="item.id" 
				    			   :index="item.path" @click="_handleSelect(item)">
				    	{{item.menu}}
				    </el-menu-item>
				  </el-submenu>
			  </template >
			</el-menu>
		</div>
 	</div>
</template>

<script>
export default {
  data(){
    return{
    	menus : []
    }
  },
  methods: {
	_handleSelect(item) {
		this.$router.push({path:item.path,query:{menu:item.menu,pid:item.id}});
	}
  },
  mounted: function(){
  	this.menus = this.$store.getters.getHeaderList;
  },
  computed:{
  	$path: function(){
  		var path = this.$route.path.split('/');
	  		path =  path.length == 2 &&  path[1] && '/'+path[1]
	  			 || path.length == 2 && !path[1] && '/'
	  			 || path.length >= 3 && '/'+path[1]+'/'+path[2];
  		return path;
  	}
  }

}
</script>

<style>
.header{
	position: fixed;
	width: 100%;
	left: 0; top: 0;
	z-index: 3;
  	background-color: #545C64;
}

.header .box{
	min-width: 1140px;
	width: 1140px;
	margin: 0 auto;
	height: 50px;
	display: -webkit-flex;  /*chrome*/
  	display: -moz-flex;     /*火狐*/
  	display: -ms-flex;      /*IE*/
  	display: -o-flex;       /*欧朋*/
  	display: flex;          /*标准*/
  	-webkit-justify-content: space-between;
  	justify-content: space-between;
}

.header .box > figure{
	width: 240px; 
	height: 50px;
}

.header .box > figure img{
	position: relative;
	top: 2px; left: 20px;
}

.header .menu{
  height: 50px;
}

.header .menu > li{
	height: 50px;
	line-height: 50px;
}

.header .el-submenu__title{
	height: 50px !important; 
	line-height: 50px !important; 
}

.header .el-menu--horizontal .el-submenu>.el-menu{
	z-index: 3;
	top: 50px;
}

.header .el-submenu .el-menu-item{
	min-width: 100%;
}

</style>
