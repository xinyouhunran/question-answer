###Lodash

1. _.chunk(array,size):将一个数组分割成多个size长度的区块，不足则剩余部分组成一个区块。（新数组）
2. _.compact(array):去除一个数组中的假值（undefined，null，false，''，0，NaN）。（新数组）
3. _.concat(array,[values]):将array与任何数组或值连接在一起（新数组）
4. _.difference(array,array1):从array中将array1中有的值过滤掉。（新数组）
5. _.differenceBy(array, [values], [iteratee=_.identity])同上，不过首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值。（新数组）
6. _.drop(array, n)去除array前面的n个元素，默认值为1。