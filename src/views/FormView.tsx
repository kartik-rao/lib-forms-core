import { Form } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Factory } from "../models/factory";
import Field from "../models/field";
import Page from "../models/page";
import FormStore from "../store/FormStore";
import EditorStore from "./controls/properties/EditorStore";
import { EditorView } from "./controls/properties/EditorView";
import { PageView } from "./PageView";

interface FormComponentProps {
    store: FormStore;
}

@observer
export class FormView extends React.Component<FormComponentProps, any> {

    setFieldError: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        const {store: formStore} = this.props;
        let editorStore = new EditorStore({
            formStore: formStore, field: formStore.form.content.pages[0].sections[0].columns[1].fields[0] as Field,
            factory : new Factory(formStore)
        });

        let {form} = formStore;
        let {content, formLayoutOptions} = form;

        return (<div className="fl-form-wrapper">
            {content.title && <div className="fl-flex fl-flex-row">
                    <div className="fl-card fl-card-default fl-card-body fl-width-1-1">
                        <h3 className="fl-card-title">{content.title}</h3>
                        <p>{content.subtitle}</p>
                    </div>
                </div>
            }
            {formLayoutOptions.showSteps && <div className="fl-flex fl-flex-row">
                <div className="fl-card fl-card-default fl-card-body fl-width-1-1">
                    <ul className="fl-tab">
                        {content.pages.map((page: Page, pn: number) => {
                            return <li className={formStore.currentPage == pn ? 'fl-active': ''} key={pn}>{page.title}</li>
                        })}
                    </ul>
                    </div>
                </div>
            }
            <div className="fl-flex fl-flex-row">
                <div className="fl-card fl-card-default fl-card-body fl-width-1-1">
                    <Form onSubmit={(e) => form.handleSubmit(e)} layout={form.layout}>
                        <div className="fl-flex fl-flex-row">
                            <div className="page-wrapper fl-width-1-1">
                                <PageView page={content.pages[formStore.currentPage] as Page} store={formStore}></PageView>
                            </div>
                        </div>
                        <div className="fl-flex fl-flex-row page-actions">
                            <div className="fl-card fl-card-default fl-card-body fl-width-1-1">
                                { formStore.currentPage == content.pages.length -1 && <button className="fl-button fl-button-default action-button fl-button-primary" disabled={Object.keys(formStore.touched).length == 0 || !form.isValid || formStore.isSubmitting } style={{ marginLeft: 8 }} type="submit">Submit</button>}
                                { formStore.currentPage < content.pages.length -1 && <button className="fl-button fl-button-default action-button" style={{ marginLeft: 8 }} onClick={() => formStore.nextPage()}><span fl-icon="icon: arrow-right"/>Next</button> }
                                { formStore.currentPage > 0 && content.pages.length > 1 && <button className="fl-button fl-button-default action-button" onClick={() => formStore.prevPage()}><span fl-icon="icon: arrow-left"/>Prev</button> }
                            </div>
                        </div>
                        <div className="fl-flex fl-flex-row">
                            <div className="fl-card fl-card-default fl-card-body fl-width-1-1">
                                <div>Errors<br/>{JSON.stringify(formStore.errors)}</div>
                                <div>Touched<br/>{JSON.stringify(formStore.touched)}</div>
                                <div>Values<br/>{JSON.stringify(formStore.values)}</div>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="fl-card fl-card-default fl-card-body">
                    <EditorView editorStore={editorStore}/>
                </div>
            </div>
        </div>
        )
    }
}