import * as React from "react";
import { Page } from "../models/page";
import { FormStore } from "../store/FormStore";
export interface PageProps {
    store: FormStore;
    page: Page;
}
export declare class PageView extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;
    constructor(props: PageProps);
    render(): JSX.Element;
}
