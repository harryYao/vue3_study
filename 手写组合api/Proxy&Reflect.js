// 代理(Proxy)

// 什么是‘代理’ 呢？代理：就是调用new 创建一个和目标（traget）对象一直的虚拟化对象，
// 然该代理中就可以拦截JavaScript引擎内部目标的底层对象的操作；
// 这些底层操作被拦截后会触发响应特定操作的陷阱函数

// 来看个简单的案例

(function() {
  const target = {};
  const proxy = new Proxy(target, {});
  proxy.name = 'proxy';
  console.log(proxy.name); // proxy
  console.log(target.name); // proxy

  target.name = 'target';
  console.log(proxy.name); // target
  console.log(target.name); // target
})()



// 反射(Reflect)

// 那反射又是什么呢？反射：它提供了一个Reflect对象API;
// 该对像中的方法默认特性与底层的操作对应；
// 而每一个代理陷阱会对应一个命名和参数都相同的Reflect方法
// （其实就是每个代理陷阱都会对应一个Reflect api接口供覆写JavaScript底层操作）


// 接下来使用set陷阱来验证一下对象属性赋值操作（如为对象新增属性，要求必须赋值为int）

(function() {
  const target = {
    name :'target'
  };
  const proxy = new Proxy(target,{
    set(trapTarget,key,value,receiver){
      //忽略不希望受到影响的已有属性
      if(!trapTarget.hasOwnProperty(key)){
        if(isNaN(key)){
          throw new TypeError("属性必须是数字哟，亲！");
        }
      }
      // 添加属性
      return Reflect.set(trapTarget,key,value,receiver);
    }
  });

  // 添加一个新属性
  proxy.count = 1;
  console.log(proxy.count); // 1
  console.log(target.count); // 1

  // 由于目标已有name属性，so 如上第一个if不成立(赋值成功)
  proxy.name= "proxy";
  console.log(proxy.name); // proxy
  console.log(target.name); // proxy

  // 新建一个属性同时赋值一个非int 值，第一个if成立，第二个if验证isNaN(key) = true 即抛出异常
  proxy.anotherName = "proxy";
})()



// 使用get 陷阱验证对象结构

// 在JavaScript中调用一个对象不存在的属性不会报错，反而使用undefined代替被读取属性的值
// 而喝多时候会带来意想不到的bug，现在我们可以使用get陷阱来验证该问题

(function(){
  const target = {};
  console.log(target.name); // undefined

  const proxy = new Proxy(target,{
		get(trapTarget,key,receiver){
			//忽略不希望受到影响的已有属性
			if(!(key in receiver)){
				throw new TypeError("sorry 亲！ 你找的 "+key+" 属性不存在。！")
			}
			// 添加属性
			return Reflect.get(trapTarget,key,receiver);
		}
	});
	// 添加一个属性，
	proxy.name= "proxy";
	console.log(proxy.name); // proxy

	// 读取一个不存在的属性  直接会抛出异常
	console.log(proxy.nme);
})()



// 五、函数代理apply和construct陷阱
// 使用这个两个陷阱来验证函数调用时的参数的正确性

(function() {
  // 参数求和
  function sum (...values){
    return values.reduce((previous,current) => previous + current, 0);
  }

  const sumProxy = new Proxy(sum,{
    apply:function(trapTarget,thisArg,argumentList){
      argumentList.forEach(arg => {
        if(typeof arg !== "number"){
          throw new TypeError("所有参数必须是数字，亲！");
        }
      });
      return Reflect.apply(trapTarget,thisArg,argumentList);
    },
    // 防止使用new 关键字调用
    construct:function(trapTarget, argumentList){
      throw new TypeError("亲，你不能这么干，该函数不能通过new调用。");
    }
  });

  // 测试哈
  console.log(sumProxy(1,2,3,4)); // 10

  // 传入一个非数字的属性值试试 【直接抛出异常】 
  console.log(sumProxy(1,"2",3,4)); // 10

  // 同样使用new调用 【直接抛出异常】 
  const result = new sumProxy();
})



// blog
// https://www.cnblogs.com/dengxiaoning/p/11681242.html