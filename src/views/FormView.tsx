import { Button, Card, Col, Form, Row, Steps, Icon } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Page from "../models/page";
import FormStore from "../state/FormStore";
import { PageView } from "./PageView";
import { EditorView } from "./controls/properties/EditorView";
import EditorStore from "./controls/properties/EditorStore";
import { Factory } from "../models/factory";

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
            formStore: formStore, field: formStore.form.content.pages[0].sections[0].columns[0].fields[0],
            factory : new Factory(formStore)
        });

        let {form} = formStore;
        let {content, formLayoutOptions} = form;

        return (<div className="form-wrapper">
            {content.title && <Row>
                   <Col span={20}>
                        <Card><h2>{content.title}</h2><br/><h3>{content.subtitle}</h3></Card>
                    </Col>
                </Row>
            }
            {formLayoutOptions.showSteps && <Row>
                <Col span={20}>
                    <Card>
                        <Steps size="small" current={formStore.currentPage}>
                            {content.pages.map((page: Page, pn: number) => {
                                return <Steps.Step title={page.title} key={pn}/>
                            })}
                        </Steps>
                    </Card>
                </Col>
            </Row>}
            <Row>
                <Col span={20}>
                    <Form onSubmit={(e) => form.handleSubmit(e)} layout={form.layout}>
                        <div className="page-wrapper">
                            <PageView page={content.pages[formStore.currentPage]} store={formStore}></PageView>
                        </div>
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        { formStore.currentPage == content.pages.length -1 && <Button disabled={Object.keys(formStore.touched).length == 0 || !form.isValid || formStore.isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                        { formStore.currentPage < content.pages.length -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => formStore.nextPage()}><Icon type="right" />Next</Button> }
                                        { formStore.currentPage > 0 && content.pages.length > 1 && <Button type="primary" className="action-button" onClick={() => formStore.prevPage()}><Icon type="left" />Prev</Button> }
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div>Errors<br/>{JSON.stringify(formStore.errors)}</div>
                        <div>Touched<br/>{JSON.stringify(formStore.touched)}</div>
                        <div>Values<br/>{JSON.stringify(formStore.values)}</div>
                    </Form>
                </Col>
                <Col span={4}>
                    <EditorView editorStore={editorStore}/>
                </Col>
            </Row>
        </div>
        )
    }
}