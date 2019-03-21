###vue
1. .native主要是给自定义的组件添加原生事件；在router-link中触发点击事件@click.native。
2. vuex刷新页面会造成数据丢失，可以使用localStorage缓存起来。
3. 插槽slot，插槽怎样显示由父组件决定。但是插槽显示的位置却由子组件自身决定，槽写在组件模板的什么位置，父组件传过来的模板将来就显示在什么位置。
4. .sync:当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。
5. $nextTick:Vue异步执行DOM更新，为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用Vue.nextTick(callback)
6. MutationObserver是HTML5中的新API，是个用来监视DOM变动的接口：</br>
	var mo = new MutationObserver(callback)  
    var domTarget = 你想要监听的dom节点  
	mo.observe(domTarget, {</br>
	      characterData: true //说明监听文本内容的修改。</br>
	})
