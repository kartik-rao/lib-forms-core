var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from "mobx-react";
import * as React from "react";
import { Draggable, Droppable } from 'react-beautiful-dnd';
export function getMixinType(C) {
    return undefined;
}
export function mixinDragDropContext(Base) {
    return class extends Base {
        onDragEnd(result, provided) {
            console.log("onDragEnd");
        }
    };
}
let DroppableWrapper = class DroppableWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { props } = this;
        return React.createElement(Droppable, { droppableId: props.droppableId }, (provided) => (React.createElement("div", Object.assign({ className: props.className, ref: provided.innerRef }, provided.droppableProps, provided.droppablePlaceholder), props.children)));
    }
};
DroppableWrapper = __decorate([
    observer
], DroppableWrapper);
export { DroppableWrapper };
let DraggableWrapper = class DraggableWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { props } = this;
        return React.createElement(Draggable, { draggableId: props.draggableId, index: props.index }, (provided) => (React.createElement("div", null,
            React.createElement("div", Object.assign({ className: props.className, ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps), props.children),
            provided.placeholder)));
    }
};
DraggableWrapper = __decorate([
    observer
], DraggableWrapper);
export { DraggableWrapper };
