import { Button, Card, Col, Form, Icon, Row, Steps, PageHeader, Statistic, Layout } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Page from "../models/page";
import FormStore from "../store/FormStore";
import { PageView } from "./PageView";

interface FormComponentProps {
    store: FormStore;
}

@observer
export class FormView extends React.Component<FormComponentProps, any> {
    props: FormComponentProps
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        const {store: formStore} = this.props;

        let {form} = formStore;
        let {content, formLayoutOptions} = form;
        let { wrapperSpan, wrapperOffset } = formLayoutOptions;
        return (
            <Layout>
            <Row>
                <Col span={wrapperSpan} offset={wrapperOffset}>
            <div className="fl-form-wrap">
            {content.title && <Row>
                <Col span={wrapperSpan}>
                    <PageHeader title={content.title} subTitle={content.subtitle} extra={(form.formLayoutOptions.showSteps && <div>
                        <Statistic title="Page" value={formStore.currentPage + 1} suffix={"/ " + content.pages.length} />
                    </div>)} />
                        <div className="fl-ph-wrap">
                        <div className="fl-ph-content fl-ph-padding">{form.desc}</div>
                        </div>
                    </Col>
                </Row>
            }
            <Row>
                <Col span={wrapperSpan}>
                    <Form onSubmit={(e) => form.handleSubmit(e)} layout={form.layout}>
                        <PageView page={content.pages[formStore.currentPage] as Page} store={formStore}></PageView>
                        <div className="fl-form-actions">
                            <Card bordered={false}>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        { formStore.currentPage == content.pages.length -1 && <Button disabled={Object.keys(formStore.touched).length == 0 || !form.isValid || formStore.isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                        { formStore.currentPage < content.pages.length -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => formStore.nextPage()}><Icon type="right" />Next</Button> }
                                        { formStore.currentPage > 0 && content.pages.length > 1 && <Button type="primary" className="action-button" onClick={() => formStore.prevPage()}><Icon type="left" />Prev</Button> }
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
            </Col>
            </Row>
        </Layout>
        )
    }
}


