// 引入js资源
import count from "./js/count";
import sum from "./js/sum";

// 想要webpack打包资源, 必须引入资源
import "./css/index.css";

console.log(count(1, 3));
console.log(sum(1,2,3,4));