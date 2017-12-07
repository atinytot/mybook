var arr = [
    { id:'books'    , path:'/books'           , menu:'阅读笔记'  , submenu: [
    { id:'b1'       , path:'/books/b1'        , menu:'js高级程序设计' }
  ]}
  , { id:'nodebooks', path:'/nodebooks'       , menu:'学习笔记'  , submenu: [
    { id:'html'     , path:'/nodebooks/html'  , menu:'HTML'           }
  , { id:'css'      , path:'/nodebooks/css'   , menu:'CSS'            }
  , { id:'js'       , path:'/nodebooks/js'    , menu:'JavaScript'     }
  , { id:'vue'      , path:'/nodebooks/vue'   , menu:'Vue'            }
  , { id:'other'    , path:'/nodebooks/other' , menu:'Other'          }
  ]}
  , { id:'article'  , path:'/'                , menu:'编辑笔记'       }
];

var state ={
  headerList: arr,
  keyPath   : 'demo'
}

var getters = {
  getHeaderList: state => state.headerList,
  getKeyPath   : state => state.keyPath
}

var actions = {

}

var mutations = {
  
}

export default {
  state     /*状态*/,
  getters   /*状态*/,
  actions   /*状态*/,
  mutations /*状态*/,
}