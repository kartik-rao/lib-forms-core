import {observer} from "mobx-react";
import * as React from "react";
import FormStore from "../store/FormStore";
import { Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';

type Constructor<T = {}> = new (...args: any[]) => T;

export function getMixinType<T>(C: Constructor<T>): T {
    return undefined!;
}

// A mixin that adds a property
export function mixinDragDropContext<TBase extends Constructor>(Base: TBase)  {
    return class extends Base {
        onDragEnd(result: DropResult, provided: ResponderProvided) {
            console.log("onDragEnd");
        }
    };
}

export interface DroppableWrapperProps {
    droppableId: string;
    className: string;
    children: any[];
    store: FormStore;
}

@observer
export class DroppableWrapper extends React.Component<DroppableWrapperProps, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        let {props} = this;
        return <Droppable droppableId={props.droppableId}>
        {(provided: any) => (
           <div className={props.className}
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.droppablePlaceholder}>
              {props.children}
            </div>
        )}
      </Droppable>
    }
}

export interface DraggableWrapperProps {
    store: FormStore;
    className: string;
    draggableId: string;
    index: number;
}

@observer
export class DraggableWrapper extends React.Component<DraggableWrapperProps, any> {
    constructor(props: DraggableWrapperProps) {
        super(props)
    }

    render() {
        let {props} = this;
        return <Draggable draggableId={props.draggableId} index={props.index}>
        {(provided: any) => (
            <div>
            <div className={props.className} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                {props.children}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    }
}