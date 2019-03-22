###Lodash

1. _.chunk(array,size):将一个数组分割成多个size长度的区块，不足则剩余部分组成一个区块。（新数组）
2. _.compact(array):去除一个数组中的假值（undefined，null，false，''，0，NaN）。（新数组）
3. _.concat(array,[values]):将array与任何数组或值连接在一起（新数组）
4. _.difference(array,array1):从array中将array1中有的值过滤掉。（新数组）
5. _.differenceBy(array, [values], [iteratee=_.identity])同上，不过首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值。（新数组）
6. _.drop(array, n)去除array前面的n个元素，默认值为1。
7. _.dropRight(array,n)去除array尾部的n个元素。默认值为1。
8. _.dropRightWhile(array, [predicate=_.identity])去除array中从 predicate 返回假值开始到尾部的部分（从右侧开始）。predicate 会传入3个参数： (value, index, array)。
9. _.dropWhile(array, [predicate=_.identity])去除array中从起点开始到 predicate 返回假值结束部分。
10. _.fill(array, value, [start=0], [end=array.length])使用 value 值来填充（替换） array，从start位置开始（默认0）, 到end位置结束（但不包含end位置）。（原数组）
11. _.findIndex(array, [predicate=_.identity], [fromIndex=0])该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。