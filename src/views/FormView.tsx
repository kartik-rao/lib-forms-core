import { Button, Card, Col, Form, Row, Steps, Icon } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Page from "../models/page";
import FormStore from "../state/FormStore";
import { PageView } from "./PageView";
import { InputViewProperties } from "./controls/properties/InputProperties";

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
        const {store} = this.props;
        let {form} = store;
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
                        <Steps size="small" current={store.currentPage}>
                            {content.pages.map((page: Page, pn: number) => {
                                return <Steps.Step title={page.title} key={pn}/>
                            })}
                        </Steps>
                    </Card>
                </Col>
            </Row>}
            <Row>
                <Col span={16}>
                    <Form onSubmit={(e) => form.handleSubmit(e)} layout={form.layout}>
                        <div className="page-wrapper">
                            <PageView page={content.pages[store.currentPage]} store={store}></PageView>
                        </div>
                        <div className="page-actions">
                            <Card>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        { store.currentPage == content.pages.length -1 && <Button disabled={Object.keys(store.touched).length == 0 || !form.isValid || store.isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                        { store.currentPage < content.pages.length -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => store.nextPage()}><Icon type="right" />Next</Button> }
                                        { store.currentPage > 0 && content.pages.length > 1 && <Button type="primary" className="action-button" onClick={() => store.prevPage()}><Icon type="left" />Prev</Button> }
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                        <div>Errors<br/>{JSON.stringify(store.errors)}</div>
                        <div>Touched<br/>{JSON.stringify(store.touched)}</div>
                        <div>Values<br/>{JSON.stringify(store.values)}</div>
                    </Form>
                </Col>
                <Col span={4}>
                    <InputViewProperties store={store} field={form.content.pages[0].sections[0].columns[1].fields[2]}/>
                </Col>
            </Row>
        </div>
        )
    }
}