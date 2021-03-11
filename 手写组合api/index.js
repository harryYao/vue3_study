/*********************************************
 ***  shallowReactive And reactive
 *********************************************/

// 定义一个reactiveHandler处理对象
const reactiveHandler = {
  // 获取属性值
  get(target, prop) {
    if(prop === '_isReactive') return true;
    const result = Reflect.get(target, prop)
    console.log('拦截了读取数据：', prop, result);
    return result;
  },
  // 修改属性值或者添加属性
  set(target, prop, value) {
    const result = Reflect.set(target, prop, value)
    console.log('拦截了写入数据或者添加属性：', prop, value);
    return result;
  },
  // 删除某个属性
  deleteProperty(target, prop) {
    const result = Reflect.deleteProperty(target, prop)
    console.log('拦截了删除属性：', prop);
    return result;
  }
}


// 定义一个shallowReactive 函数，传入一个目标对象
function shallowReactive(target) {
  if (target && typeof target === 'object') {
    return new Proxy(target, reactiveHandler)
  }
}

// 定义一个reactive 函数
function reactive(target) {
  if (target && typeof target === 'object') {
    // 对数组或对象中所有的数据进行reactive的递归处理
    // 数组
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index]= reactive(item)
      });
    } else {
    // 对象
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key]);
      });
    }
    return new Proxy(target, reactiveHandler)
  }
  return target
}



/*********************************************
 ***  shallowReadonly And readonly
 *********************************************/

// 定义了一个readonlyHandler处理器
const readonlyHandler = {
  get(target, prop) {
    if(prop === '_isReadonly') return true;
    const result = Reflect.get(target, prop);
    console.log('拦截了读取数据：', prop, result);
    return result;
  },
  set(target, prop, value) {
    console.warn('只能读取数据，不能修改！');
    return true;
  },
  deleteProperty(target, prop) {
    console.warn('只能读取数据，不能修改！');
    return true;
  },
}

// 定义一个shallowReadonly 函数
function shallowReadonly(target) {
  if (target && typeof target === 'object') {
    return new Proxy(target, readonlyHandler)
  }
}

// 定义一个readonly 函数
function readonly(target) {
  if (target && typeof target === 'object') {
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index]= readonly(item)
      });
    } else {
    // 对象
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key]);
      });
    }

    return new Proxy(target, readonlyHandler)
  }
  return target
}



/*********************************************
 ***  shallowRef And ref
 *********************************************/

// 定义一个 shallowRef 函数
function shallowRef(target) {
  return {
    _value: target,
    get value() {
      console.log('劫持到了读取数据');
      return this._value;
    },
    set value(val) {
      console.log('劫持到了修改数据，准备更新界面', val);
      this._value = val
    }
  }
}

// 定义一个 shallowRef 函数
function ref(target) {
  target = reactive(target)
  return {
    _isRef: true,
    _value: target,
    get value() {
      console.log('劫持到了读取数据');
      return this._value;
    },
    set value(val) {
      console.log('劫持到了修改数据，准备更新界面', val);
      this._value = val
    }
  }
}

/**
 * 判断obj是否是ref对象
 */
function isRef(obj) {
  return obj && obj._isRef
}

/**
 * 判断obj是否是reactive对象
 */
function isReactive(obj) {
  return obj && obj._isReactive
}

/**
 * 判断obj是否是readonly对象
 */
function isReadonly(obj) {
  return obj && obj._isReadonly
}

/**
 * 判断obj是否是Proxy对象, 即是否是reactive或者readonly
 */
function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj)
}