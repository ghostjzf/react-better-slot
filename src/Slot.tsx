import React, { FC } from 'react';
import { SlotContext } from './withSlot';

const Slot: FC<{
    name?: string;
    children?: any;
}> = ({ name = '$$default', children }) => {
    return (
        <SlotContext.Consumer>
            {(value: any) => {
                const addOnRenderer = value.requestAddOnRenderer(name);

                return (addOnRenderer && addOnRenderer()) || children || null;
            }}
        </SlotContext.Consumer>
    );
};

export default Slot;
