import React, { Component } from 'react';

function getDisplayName(component) {
    return component.displayName || component.name || 'component';
}

export const SlotContext = React.createContext({
    requestAddOnRenderer: () => {}
});

const withSlot = WrappedComponent => {
    return class extends Component {
        static displayName = `SlotProvider(${getDisplayName(WrappedComponent)})`;

        // 用于缓存每个slot的内容
        addOnRenderers = {};

        requestAddOnRenderer: any = name => {
            if (!this.addOnRenderers[name]) {
                return undefined;
            }

            return () => this.addOnRenderers[name];
        };

        render() {
            const { children, ...restProps } = this.props;

            if (children) {
                // 以k-v的方式缓存slot的内容
                const childrenList = React.Children.toArray(children);
                let nameChecked: any[] = [];

                childrenList.forEach((item: any) => {
                    const slotName = item.props.slot || '$$default';

                    // 确保内容唯一性
                    if (nameChecked.findIndex(item => item === slotName) !== -1) {
                        console.warn(`Slot(${slotName}), only expected to receive a single $$default slot child`);
                    } else {
                        this.addOnRenderers[slotName] = item;

                        nameChecked.push(slotName);
                    }
                });
            }

            return (
                <SlotContext.Provider value={{ requestAddOnRenderer: this.requestAddOnRenderer }}>
                    <WrappedComponent {...restProps} />
                </SlotContext.Provider>
            );
        }
    };
};

export default withSlot;
