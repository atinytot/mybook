<template>
	<page v-loading="loading">
		<no-data :msgs="msgs" v-if="!books.length"></no-data>

		<template v-if="books.length">
			<blog-aside :books="books" @mulu="_getMulu"></blog-aside>
			<section class="cflex" v-show="item">
				<header class="flex">
					<div>
						<time v-show="$createDate">创建时间: {{ $createDate }}</time>
						<time v-show="$updateDate">更新时间: {{ $updateDate }}</time>
					</div>
					<div>
						<el-button icon="el-icon-edit" size="mini"  @click="_toArticle"></el-button>
						<el-button disabled icon="el-icon-delete" size="mini" 
								   @click="_deleteArticle"></el-button>
					</div>
				</header>
				<article v-html="$conent"></article>	
			</section>
		</template>
	</page>
</template>

<script>
import BlogAside  from '../components/blogAside'
import NoData  	  from '../components/noData'
import marked from 'marked' 
export default {
	data(){
		return{
			books 	: [],
			loading : false,
			id   	: '',
			item 	: null,
			msgs	: {tip:'暂无数据,速去添加',link:'/'}
		}
	},
	components:{
		BlogAside,
		NoData
	},
	activated: function(){
		this._getArticle(this.$route.query.pid);
	},
	beforeRouteUpdate:function(to, from, next){
		this._getArticle(to.query.pid);
		next();
	},
	methods:{
		_getMulu:function(item){
			this.item = item;
			this.id   = item.id;
		},
		_toArticle: function(){
			var obj ={
				id  : this.item.id,
				menu: this.item.menu
			}
			this.$router.push({path:'/', query:obj });
		},
		_deleteArticle:function(){
			// loading加载
        	this.loading = true;
        
        	// 发送删除请求
			this.$http.get('/deleteNodeBooks',{params:{id:this.id}})
			.then((res)=>{
				this.loading = false;
				this._getArticle(this.$route.query.pid);
				this.item = null;
            	res.body.ok && this.$notify({type:'success', message: '删除成功', offset: 100});
			},(err)=>{
				this.loading = false;
            	this.$notify({type:'error', message: err, offset: 100});
			});
		},
		_getArticle:function(pid){
			// loading加载
        	this.loading = true;

        	// 发送请求
			this.$http.get('/allNodebooks',{params:{pid:pid}})
			.then((res)=>{
				this.loading = false;
				if(!res.body.ok) return;
				this.books   = res.body.data || [];
				this.id      = res.body.data.length &&  res.body.data[0].id || '';
			},(err)=>{
				this.loading = false;
              	this.$notify({type:'error', message: err, offset: 100});
			});
		},
		_setDate:function(date){
			var d = new Date(date);
			    d = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
			    	 +' '+d.getHours()+':'
			    	 +(d.getMinutes()<10 && '0'+d.getMinutes() || d.getMinutes());
			return d;    	 
		}
	},
	computed:{
		$conent:function(){
			if(this.books.length){
				for(var i=0; i<this.books.length; i++){
					if(this.id == this.books[i].id ){
						return marked(this.books[i].text);
					}
				}
			}
		},
		$createDate:function(){
			return this.item && this._setDate(this.item.createDate) || '';
		},
		$updateDate:function(){
			return this.item && this._setDate(this.item.updateDate) || '';
		}
	}
}
</script>

<style scoped>
header{
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid rgb(240,240,240);
	-webkit-justify-content: space-between;
  	justify-content: space-between;
}
header time{
	font-size: 14px;
	color: #999;
	margin-right: 20px;
}
article{
	display: block;
	height: 100%;
	padding: 10px 5px 70px 5px;
	box-sizing: border-box;
	overflow-y: auto;
}
</style>
