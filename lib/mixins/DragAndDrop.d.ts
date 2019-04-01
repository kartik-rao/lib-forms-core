import * as React from "react";
import FormStore from "../store/FormStore";
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
declare type Constructor<T = {}> = new (...args: any[]) => T;
export declare function getMixinType<T>(C: Constructor<T>): T;
export declare function mixinDragDropContext<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        onDragEnd(result: DropResult, provided: ResponderProvided): void;
    };
} & TBase;
export interface DroppableWrapperProps {
    droppableId: string;
    className: string;
    children: any[];
    store: FormStore;
}
export declare class DroppableWrapper extends React.Component<DroppableWrapperProps, any> {
    constructor(props: any);
    render(): JSX.Element;
}
export interface DraggableWrapperProps {
    store: FormStore;
    className: string;
    draggableId: string;
    index: number;
}
export declare class DraggableWrapper extends React.Component<DraggableWrapperProps, any> {
    constructor(props: DraggableWrapperProps);
    render(): JSX.Element;
}
export {};
