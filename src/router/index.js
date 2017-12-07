import Vue 		 from 'vue'
import Router 	 from 'vue-router'

import Books 	 from '@/pages/books'
import NodeBooks from '@/pages/nodebooks'
import Article 	 from '@/pages/article'

Vue.use(Router)

export default new Router({
  routes: [
	{ path: '/'					, name: 'Article'	, component: Article 	}	//书写文章
,	{ path: '/books/:id'		, name: 'Books'		, component: Books 		}	//阅读拓展
,	{ path: '/nodebooks/:id'	, name: 'NodeBooks'	, component: NodeBooks 	}	//笔记一刻
  ]
})
