import { Button, Card, Col, Form, Icon, Layout, PageHeader, Row, Statistic } from "antd";
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
        let {currentPage} = formStore;
        return (
            <Layout style={{height: '100%', overflow: 'hidden'}} className="fl-form-container">
                <div className="fl-shadow-bottom" style={{ marginBottom: '2px'}}>
                    <PageHeader className="fl-ph" style={{'minHeight': '68px', border: 'none'}} title={content.title} subTitle={content.subtitle}
                        extra={(form.formLayoutOptions.showSteps && <div>
                        <Statistic title="Page" value={formStore.currentPage + 1} suffix={"/ " + content.pages.length} />
                        </div>)} />
                    {content.title && <Row>
                        <Col span={wrapperSpan}>
                            <div className="fl-ph-wrap">
                                <div className="fl-ph-content fl-ph-padding">{form.desc}</div>
                            </div>
                        </Col>
                    </Row>
                    }
                </div>
                <Layout style={{overflow: 'hidden', border: '1px solid #ededed'}}>
                    <Form onSubmit={(e) => form.handleSubmit(e)} layout={form.layout} style={{height: '100%'}}>
                        <Layout.Content style={{overflowY: 'scroll', height: 'calc(100% - 68px)', backgroundColor: 'white' }}>
                            <PageView page={content.pages[formStore.currentPage] as Page} store={formStore}></PageView>
                        </Layout.Content>
                        <div>
                        <Layout.Footer style={{padding: '0px', width: '100%', marginTop:'1px'}}>
                            <div className="fl-form-actions fl-shadow-top">
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'right' }}>
                                            { currentPage == content.pages.length -1 && <Button disabled={Object.keys(formStore.touched).length == 0 || !form.isValid || formStore.isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                            { currentPage < content.pages.length -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => formStore.nextPage()}><Icon type="right" />Next</Button> }
                                            { currentPage > 0 && content.pages.length > 1 && <Button type="primary" className="action-button" onClick={() => formStore.prevPage()}><Icon type="left" />Prev</Button> }
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


