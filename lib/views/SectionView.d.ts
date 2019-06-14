import * as React from "react";
import { Section } from "../models/section";
import { FormStore } from "../store/FormStore";
export interface SectionProps {
    section: Section;
    store: FormStore;
}
export declare class SectionView extends React.Component<SectionProps, any> {
    props: SectionProps;
    constructor(props: SectionProps);
    render(): JSX.Element;
}
