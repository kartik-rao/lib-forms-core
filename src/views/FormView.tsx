import { Button, Card, Col, Form, Icon, Layout, Row } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import Page from "../models/page";
import FormStore from "../store/FormStore";
import { FormHeaderView } from './FormHeaderView';
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

        let {form, numPages} = formStore;
        let {content, formLayoutOptions} = form;
        let {currentPage, touched, isValid, isSubmitting} = formStore;

        return (
            <Layout style={{height: '100%', overflow: 'hidden'}} className="fl-form-container">
                <FormHeaderView title={content.title} subtitle={content.subtitle} desc={form.desc}
                    currentPage={formStore.currentPage} numPages={formStore.numPages} showSteps={formLayoutOptions.showSteps} />
                <Layout style={{overflow: 'hidden', border: '1px solid #ededed'}}>
                    <Form onSubmit={(e) => form.handleSubmit(e)} layout={form.layout} style={{height: '100%'}} {...formLayoutOptions}>
                        <Layout.Content style={{overflowY: 'scroll', height: 'calc(100% - 68px)', backgroundColor: 'white' }}>
                            <PageView page={content.pages[currentPage] as Page} store={formStore}></PageView>
                        </Layout.Content>
                        <div>
                        <Layout.Footer style={{padding: '0px', width: '100%', marginTop:'1px'}}>
                            <div className="fl-form-actions fl-shadow-top">
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'right' }}>
                                            { currentPage == numPages -1 && <Button disabled={Object.keys(touched).length == 0 || !isValid || isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                            { currentPage < numPages -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => formStore.nextPage()}><Icon type="right" />Next</Button> }
                                            { currentPage > 0 && numPages > 1 && <Button type="primary" className="action-button" onClick={() => formStore.prevPage()}><Icon type="left" />Prev</Button> }
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Layout.Footer>
                        </div>
                    </Form>
                </Layout>
        </Layout>
        )
    }
}


