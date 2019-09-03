import { Button, Card, Col, Form, Icon, Layout, Row } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Page } from "../models/page";
import { formStoreContext } from '../store/FormStoreProvider';
import { FormHeaderView } from './FormHeaderView';
import { PageView } from "./PageView";

export const FormView : React.FC<any> = () => {
    const fStore = React.useContext(formStoreContext);
    if(!fStore) throw new Error("Store is  null");

    return useObserver(() => {
        return fStore.form ? <Layout style={{overflow: 'hidden'}} className="fl-form-container fl-max-height">
                <FormHeaderView title={fStore.form.content.title} subtitle={fStore.form.content.subtitle} desc={fStore.form.description}
                    currentPage={fStore.currentPage} numPages={fStore.numPages} showSteps={fStore.form.formLayoutOptions.showSteps} />
                <Layout style={{overflow: 'hidden', border: '1px solid #ededed'}}>
                    <Form onSubmit={(e) => fStore.form.handleSubmit(e)} layout={fStore.form.layout} className="fl-max-height" wrapperCol={fStore.form.formLayoutOptions.wrapperCol} labelCol={fStore.form.formLayoutOptions.labelCol} labelAlign={fStore.form.formLayoutOptions.labelAlign}>
                        <Layout.Content className="fl-form">
                            {fStore.numPages > 0 && <PageView page={fStore.form.content.pages[fStore.currentPage] as Page}></PageView>}
                        </Layout.Content>
                        <Layout.Footer style={{padding: '0px', width: '100%', marginTop:'1px'}}>
                            <div className="fl-form-actions fl-shadow-top">
                                <Card bordered={false} bodyStyle={{padding: '18px'}}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'right' }}>
                                            <Button disabled={!fStore.isSubmittable} type="primary" className="fl-action-button" htmlType="submit" >Submit</Button>
                                            <Button disabled={!fStore.hasNextPage}   type="primary" className="fl-action-button" onClick={() => fStore.nextPage()}><Icon type="right" />Next</Button>
                                            <Button disabled={!fStore.hasPrevPage}   type="primary" className="fl-action-button" onClick={() => fStore.prevPage()}><Icon type="left" />Prev</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        </Layout.Footer>
                    </Form>
                </Layout>
        </Layout> : <></>
    });
}
