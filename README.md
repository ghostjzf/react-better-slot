# react-better-slot

组件参照 Vue 中插槽的功能，基于 React 实现。

### 使用

```
npm install react-better-slot
```

```
import React from "react";
import {withSlot, Slot} from "react-better-slot";


function AppLayout() {
    return (
        <div class="container">
            <header>
                <Slot name="header">如果没有传具名Slot的内容显示此内容</Slot>
            </header>
            <main>
                <Slot></Slot>
            </main>
            <footer>
                <Slot name="footer"></Slot>
            </footer>
        </div>
    )
}

export default withSlot(AppLayout);
```

```
import AppLayout from "./AppLayout";

<AppLayout>
    <h3 slot="header">这是标题</h3>
    <div>这是默认Slot显示的部分</div>
    <p slot="footer">这是页尾</p>
</AppLayout>
```

```
最终效果

<div class="container">
    <header>
        <h3 slot="header">这是标题</h3>
    </header>
    <main>
        <div>这是默认Slot显示的部分</div>
    </main>
    <footer>
        <p slot="footer">这是页尾</p>
    </footer>
</div>
```

**注意：该组件只会搜集第一个匹配到的没有指定 slot="xxxx"默认 slot 模板, 如果存在多个除第一个将会被忽略并且给出 warning 提示**
