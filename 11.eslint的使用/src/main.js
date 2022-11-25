// 引入js资源
import count from "./js/count";
import sum from "./js/sum";

// 想要webpack打包资源, 必须引入资源
import "./css/index.css";
// 引入iconfont.css
import './css/iconfont.css'

// 引入less
import "./less/index.less"
// 引入sass和scss
import "./sass/index.sass"
import "./sass/index.scss"
// 引入stylus
import "./stylus/index.styl"



console.log(count(1, 3));
console.log(sum(1,2,3,4));