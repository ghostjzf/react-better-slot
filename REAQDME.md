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

export default AppLayout;
```

```
import AppLayout from "./AppLayout";

<AppLayout>
    <h3 slot="header">这是标题</h3>
    <div>这是默认Slot显示的部分</div>
    <p slot="footer">这是页尾</p>
</AppLayout>
```
