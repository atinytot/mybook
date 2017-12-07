<template>
	<div id="app">
		<blog-layout></blog-layout>
		<article  class="blog flex">
      <keep-alive>
				<router-view/>
      </keep-alive>  
		</article>
	</div>
</template>

<script>
import BlogLayout from './components/blogLayout'

export default {
	components:{
		BlogLayout
	}
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}

html,body,#app{
  height: 100%;
  font-size: 16px;
}

.blog{
	max-width: 1140px;
	height: 100%;
}

#app > article{
  width: 1140px;
  height: 100%;
  margin: 0 auto;
  padding-top: 50px;
  box-sizing: border-box;
}

page,.flex{
  display: -webkit-flex;  /*chrome*/
  display: -moz-flex;     /*火狐*/
  display: -ms-flex;      /*IE*/
  display: -o-flex;       /*欧朋*/
  display: flex;          /*标准*/
}

.cflex{
  -webkit-flex: 1;  /*chrome*/
  -moz-flex: 1;     /*火狐*/
  -ms-flex: 1;      /*IE*/
  -o-flex: 1;       /*欧朋*/
  flex: 1;          /*标准*/
}

page{
  overflow-y: hidden;
  width: 100%;
	height: 100%;
  color: #555;
}

/* 标题字体大小 */
h1{ font-size: 32px;    }
h2{ font-size: 24px;    }
h3{ font-size: 18.72px; }
h4{ font-size: 16px;    }
h5{ font-size: 13.28px; }
h6{ font-size: 12px;    }
h1,h2,h3,h4{
  line-height: 40px;
  margin: 10px 0;
}

/* 列表 */
ul,ol{ padding-left: 20px; }

li,p{
  line-height: 30px;
}

blockquote{
  padding-left: 5px;
  border-left:5px solid #c6d7c6;
}

blockquote p{
  padding-left: 5px;
}

blockquote ol,
blockquote ul{
  margin-left: 5px;
}

em{
  display: inline-block;
  font-style: normal;
  line-height: 24px;
  background-color: #f1dfdf;
  padding: 0 8px;
  border-radius: 5px;
}

pre{
  margin: 5px 0;
  padding: 10px 0 10px 10px;
  border-radius: 5px;
  background-color: #dee3e8;
}

</style>
