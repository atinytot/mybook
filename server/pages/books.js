var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var BooksSchema = new Schema({         
	id  		: { type: String },   //主键 
    menu  		: {type: String	 },   //菜单
    pid  		: { type: String },   //分类
    title  		: { type: String },   //标题
    text        : { type: String },	  //文章
    createDate 	: { type: Date   },   //创建时间
    updateDate 	: { type: Date   }    //更新时间
});

module.exports =  mongoose.model('books',BooksSchema);