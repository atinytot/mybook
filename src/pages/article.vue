<template>
	<page v-loading="loading">
	   <aside>
	   		<el-form label-position="top" label-width="100px" :model="form">
			  <el-form-item label="归属">
			    <el-select v-model="form.menu" placeholder="请选择分类" >
			      <el-option label="阅读拓展" value="books"></el-option>
			      <el-option label="笔记一刻" value="nodebooks"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="分类">
			     <el-select v-model="form.pid" placeholder="请选择分类" :disabled="!form.menu">
            <el-option v-for="c in $class" :key="c.value" :label="c.menu" :value="c.id"></el-option>
          </el-select>
			  </el-form-item>
			  <el-form-item label="标题">
			    <el-input v-model="form.title"></el-input>
			  </el-form-item>
			  <el-form-item>
          <el-button type="primary":disabled="notSave" @click="_saveArticle" size="small">
              新增
          </el-button>
          <el-button type="primary" @click="_updateArticle" :disabled="!notSave" size="small">
              更新
          </el-button>
			    <el-button type="primary" @click="_resetArticle" :disabled="!notSave" size="small">
              重置
          </el-button>
			  </el-form-item>
			</el-form>
	   </aside>
	   <textarea :value="input" @input="update"></textarea>
	   <div v-html="compiledMarkdown" class="md"></div>
	</page>
</template>

<script>
import marked from 'marked'  
import _      from 'lodash'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export default {
  data () {
    return{
    	input: '',
      notSave: false,
      loading: false,
    	form: {
          menu:  '',
          pid :  '',
          title: ''
        }
    }
  },
  mounted: function(){

  },
  activated(){
    // 检测是否由文章跳转
    var id   = this.$route.query.id;
    var menu = this.$route.query.menu;

    // 请求数据
    if(id){
       // loading加载
      this.loading = true;
      this.notSave = true;
      
      var that = this;
      var url  = (menu=='books') && '/searchBooks' || '/searchNodeBooks';
      this.$http.get(url,{params:{id:id}})
      .then((res)=>{
        this.loading = false;
        if(!res.body.ok) return;

        //赋值数据
        for(var k in this.form){
          this.form[k] = res.body.data[k];
        }
          this.input =  res.body.data.text;
      },(err)=>{
        this.loading = false;
        this.$notify.error(err);
      });
    }
  },
  beforeRouteLeave: function(to, from, next){
    for(var k in this.form){
      this.form[k] = '';
    }
      this.notSave = false;
      this.input   = '';
    next();
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input)
    },
    $class: function(){
      
      //返回数据
      var list = this.$store.getters.getHeaderList;
      for(var i=0; i<list.length; i++){
        if(list[i].id == this.form.menu){
          return list[i].submenu;
        }
      }

    }
  },
  methods: {

      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
      _resetArticle: function(){
          for(var k in this.form){
            this.form[k] = '';
          }
            this.notSave = false;
            this.input   = '';
      },
      _saveArticle: function(){
        // loading加载
        this.loading = true;
        
        // 构建数据
        this.form['createDate'] = new Date();
        this.form['updateDate'] = new Date();
        this.form['id']         = new Date().getTime();
        this.form['text']       = this.input;

        // 保存到数据库
        var url = this.form.menu == 'books' && '/saveBooks' || '/saveNodebooks'
        this.$http.post(url,this.form)
          .then((res)=>{
            this.loading = false;
            res.body.ok && this.$notify({type:'success', message: '保存成功', offset: 100});
          },(err)=>{
            this.loading = false;
            this.$notify({type:'error', message: err, offset: 100});
          });
      },
      _updateArticle : function(){
        // loading加载
        this.loading = true;

        // 构建数据
        var id   = this.$route.query.id;
        var menu = this.$route.query.menu;
        var obj  = {
            id        : id,             
            pid       : this.form.pid,   /*分类*/
            title     : this.form.title, /*标题*/
            text      : this.input,      /*文章*/
            updateDate: new Date()
        }

        // 发送更新请求
        var url  = menu=='books' && '/updateBooks' || '/updateNodebooks';
            this.$http.post(url,obj)
            .then((res)=>{
              this.loading = false;
              res.body.ok && this.$notify({type:'success', message: '更新成功', offset: 100});
            },(err)=>{  
              this.loading = false;
              this.$notify({type:'error', message: err, offset: 100});
            });

      }
  }
}
</script>

<style scoped>

aside{
	width: 300px;
	height: 100%;
}

aside .el-form,
aside .el-form-item,
aside .el-input,
aside .el-select{
	width: 100%;
}

aside .el-input,
aside .el-select{
	padding: 0 5px 0 0;
}


textarea, div {
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
.md{
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
</style>
