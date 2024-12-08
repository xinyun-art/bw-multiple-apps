## typeof

`typeof`操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。

### 基本用法

假如我们在定义类型之前已经有了对象`obj`，就可以用`typeof`来定义一个类型。
```ts
const p = {
  name: 'CJ',
  age: 18
};

type Person = typeof p;

// 等同于
type Person = {
  name: string;
  age: number;
}
```

### 从嵌套对象获取类型

```ts
const p = {
  name: 'CJ',
  age: 18,
  address: {
    city: 'SH'
  }
};

type Person = typeof p;

// 相当于
type Person = {
  name: string;
  age: number;
  address: {
    city: string;
  };
};
```

### 从数组获取类型

假如我们有一个字符串数组，可以把数组的所有元素组合成一个新的类型：
```ts
const data = ['hello', 'world'] as const;
type Greeting = typeof data[number];

// type Greeting = "hello" | "world"
```

> as const 是 TypeScript 3.4 中新增的一个特性，具体的可以看[这里](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

甚至我们可以从对象数组中获取我们想要的类型：
```ts
export const locales = [
  {
    locale: 'se',
    language: 'Swedish'
  },
  {
    locale: 'en',
    language: 'English'
  }
] as const;

type Locale = typeof locales[number]['locale'];

// type Locale = "se" | "en"
```

## keyof

`keyof`操作符接受一个对象类型作为参数，返回该对象属性名组成的`字面量联合类型`。

### 基本用法

一个最基本的`keyof`用法如下，我们通过`keyof Person`得到一个`PersonKeys`类型，它是一个联合字面量类型，包含了`Person`所有的属性。所以我们在对类型为`PersonKeys`的变量赋值时，只能赋值为`'name'`或者`'age'`。
```ts
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person;

const key1: PersonKeys = 'name';
const key2: PersonKeys = 'age';
// Type '"addr"' is not assignable to type 'keyof Person'.
const key3: PersonKeys = 'addr';
```

在一些高级类型中经常会用到`keyof any`, 这又是什么？鼠标放上去看看就知道了
```ts
type KeysOfAnyType = keyof any // 等价于：type KeysOfAnyType = string | number | symbol
```
可以看到 `keyof any` 返回的是一个联合类型：`string | number | symbol`，结合前文说到 `keyof` 是为了取得对象的`key`值组成的联合类型，那么`key`值有可能是什么类型呢？自然就是`string | number | symbol`。

该关键字一般会和 `extends` 关键字结合使用，对对象属性的类型做限定，比如 `K extends keyof any` 就代表 `K` 的类型一定是 `keyof any` 所返回的联合类型的子类，如果输入不符合限定，那么自然也就不能作为对象的属性，类型系统就会报错。

因此，`keyof any` 表示了对象`key`值可能的取值类型。

>注意点：遇到 **索引签名** 时，`typeof` 会直接返回其类型
```ts
type Dog = {  [y:number]: number  };
type dog = keyof Dog;  //type dog = number
​
type Doggy = {  [y:string]: boolean };
type doggy = keyof Doggy; //type doggy = string | number
​
type Doggy = {  [y:string]: unknown, [x:number]: boolean};
type doggy = keyof Doggy; //type doggy = string | number
```

可以看到索引类型为`string`时，`keyof` 返回的类型是 `string | number`, 这是因为`JavaScript`的对象属性键会被默认转换为字符串。

### 与泛型一起使用

我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 `obj` 上不存在的属性。所以我们在两个类型之间建立一个约束：
```ts
export const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

const person = {
  name: 'CJ',
  age: 18
};

console.log(getProperty(person, 'name'));
// Argument of type '"addr"' is not assignable to parameter of type '"name" | "age"'.
console.log(getProperty(person, 'addr'));
```
`keyof T`返回T的联合字面量类型，`extends`用来对`K`进行约束，表示K为联合字面量类型中的一个。
由于我们使用了类型约束，这样我们在调用`getProperty`的时候，第二个参数`key`就必须为第一个参数`obj`中的属性。在尝试传入不存在的`addr`属性时 TypeScript 就会报错。

### 与映射类型一起使用

`keyof`运算符的另一个常见用途是映射类型，通过遍历键将现有类型转换为新类型。

下面是如何使用`OptionsFlags`映射类型转换`FeatureFlags`类型的示例。
```ts
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};
// use the OptionsFlags
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// 相当于
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// };
```
在这个例子中，`OptionFlags`被定义为类型参数为T的一个泛型，`[Property in keyof T]`表示T所有属性名的迭代，方括号是索引签名语法。所以，`OptionFlags`包含`T`类型的所有属性，并将它们的值重新映射为`boolean`型。

### 与条件映射类型一起使用

在上一个例子中，我们把所有属性都映射成了`boolean`型。我们还可以更进一步，使用条件类型来进行类型映射。

在下面的例子中，我们只映射非函数属性为`boolean`型。
```ts
type OptionsFlags<T> = {
  [Property in keyof T]: T[Property] extends Function ? T[Property] : boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
  userManagement: string;
  resetPassword: string;
};

type FeatureOptions = OptionsFlags<Features>;
// 相当于
// type FeatureOptions = {
//   darkMode: () => void;
//   newUserProfile: () => void;
//   userManagement: boolean;
//   resetPassword: boolean;
// };
```

### 与 utility types 一起使用

`TypeScript` 内置了一些映射类型，叫做`utility types`。`Record`就是其中之一，为了理解`Record`类型如何工作，我们来看一下它的定义：
```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```
这里，`K`是一个可以被赋值给`keyof any`的类型，也就是说，它可以是一个字符串、数字、符号或者联合类型。`T`是任意类型。`[P in K]`: `T`表示将`K`中的每个属性名映射到类型`T`上，从而得到一个新的类型。

可以看到，`Record`只是将所有属性映射为T类型之后返回的一个新类型。所以我们可以很容易通过`Record`实现上面映射类型中的例子。
```ts
type FeatureOptions = Record<keyof FeatureFlags, boolean>; 
```

另外一个常见的用到`keyof`的类型是`Pick`。它允许从一个对象类型中选择一个或多个属性，并创建一个新类型。
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

## in

`in`的右侧一般会跟一个 **联合类型**，使用`in`操作符可以对该联合类型进行迭代。 其作用类似JS中的`for...in`或者`for...of`。可用于数组和对象的构造。

### 基本用法

例1：
```ts
type Animals = 'pig' | 'cat' | 'dog'
​
type animals = {
  [key in Animals]: string
}
```
等价于：
```ts
type animals = {
  pig: string; //第一次迭代
  cat: string; //第二次迭代
  dog: string; //第三次迭代
}
```

例2：
```ts
type Roles = "tester" | "developer" | "manager";
const staffCount: { [k in Roles]: number } = {
  tester: 100,
  developer: 200,
  manager: 300,
};
```
等价于：
```ts
type Roles = {
  tester: number,
  developer: number,
  manager: number,
}
const staffCount: Roles = {
  tester: 100,
  developer: 200,
  manager: 300,
};
```

### 类型操作实战

#### Partial

`Partial`：将某个类型里的属性全部变为可选项

思路是通过泛型传入待处理类型，先用`keyof`取到所给类型所有属性组成的字面量联合类型，然后使用`in`进行遍历，同时结合`?`操作符，将每个属性变成可选的
```ts
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```
`[P in keyof T]`这段代码表示遍历T中的每一个属性,那么`T[P]`就是每个属性所对应的值，可以简单理解为前者取的是键`key`，后者取的是值`value`。

#### Required

`Required`：和Partial的作用相反，是为了将某个类型里的属性全部变为必选的
```ts
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 }; // b是可选的，因此缺少这个属性也可以
 
const obj2: Required<Props> = { a: 5 };  // 通过Required将属性变为必选的，等号右边对象缺少这个属性，因此赋值失败
//Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

源码
```ts
type Partial<T> = {
    [P in keyof T]-?: T[P]
}
```
对应的 `-？`代表着去掉可选，与之对应的还有 `+？`，两者正好相反。
