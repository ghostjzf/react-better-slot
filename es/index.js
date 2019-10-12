import React, { Component } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function getDisplayName(component) {
    return component.displayName || component.name || 'component';
}
var SlotContext = React.createContext({
    requestAddOnRenderer: function () { }
});
var withSlot = function (WrappedComponent) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                // 用于缓存每个slot的内容
                _this.addOnRenderers = {};
                _this.requestAddOnRenderer = function (name) {
                    if (!_this.addOnRenderers[name]) {
                        return undefined;
                    }
                    return function () { return _this.addOnRenderers[name]; };
                };
                return _this;
            }
            class_1.prototype.render = function () {
                var _this = this;
                var _a = this.props, children = _a.children, restProps = __rest(_a, ["children"]);
                if (children) {
                    // 以k-v的方式缓存slot的内容
                    var childrenList = React.Children.toArray(children);
                    var nameChecked_1 = [];
                    childrenList.forEach(function (item) {
                        var slotName = item.props.slot || '$$default';
                        // 确保内容唯一性
                        if (nameChecked_1.findIndex(function (item) { return item === slotName; }) !== -1) {
                            console.warn("Slot(" + slotName + "), only expected to receive a single $$default slot child");
                        }
                        else {
                            _this.addOnRenderers[slotName] = item;
                            nameChecked_1.push(slotName);
                        }
                    });
                }
                return (React.createElement(SlotContext.Provider, { value: { requestAddOnRenderer: this.requestAddOnRenderer } },
                    React.createElement(WrappedComponent, __assign({}, restProps))));
            };
            return class_1;
        }(Component)),
        _a.displayName = "SlotProvider(" + getDisplayName(WrappedComponent) + ")",
        _a;
};

var Slot = function (_a) {
    var _b = _a.name, name = _b === void 0 ? '$$default' : _b, children = _a.children;
    return (React.createElement(SlotContext.Consumer, null, function (value) {
        var addOnRenderer = value.requestAddOnRenderer(name);
        return (addOnRenderer && addOnRenderer()) || children || null;
    }));
};

export { Slot, withSlot };
