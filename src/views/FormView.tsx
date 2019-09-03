import { Button, Card, Col, Form, Icon, Layout, Row } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
import { Page } from "../models/page";
import { formStoreContext } from '../store/FormStoreProvider';
import { FormHeaderView } from './FormHeaderView';
import { PageView } from "./PageView";

export const FormView : React.FC<any> = () => {
    const store = React.useContext(formStoreContext);
    if(!store) throw new Error("Store is  null");

    return useObserver(() => {
        return store.form ? <Layout style={{height: '100%', overflow: 'hidden'}} className="fl-form-container">
                <FormHeaderView title={store.form.content.title} subtitle={store.form.content.subtitle} desc={store.form.description}
                    currentPage={store.currentPage} numPages={store.numPages} showSteps={store.form.formLayoutOptions.showSteps} />
                <Layout style={{overflow: 'hidden', border: '1px solid #ededed'}}>
                    <Form onSubmit={(e) => store.form.handleSubmit(e)} layout={store.form.layout} style={{height: '100%'}} wrapperCol={store.form.formLayoutOptions.wrapperCol} labelCol={store.form.formLayoutOptions.labelCol} labelAlign={store.form.formLayoutOptions.labelAlign}>
                        <Layout.Content style={{overflowY: 'scroll', height: 'calc(100% - 68px)', backgroundColor: 'white' }}>
                            {store.numPages > 0 && <PageView page={store.form.content.pages[store.currentPage] as Page}></PageView>}
                        </Layout.Content>
                        <Layout.Footer style={{padding: '0px', width: '100%', marginTop:'1px'}}>
                            <div className="fl-form-actions fl-shadow-top">
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'right' }}>
                                            { store.currentPage == store.numPages -1 && <Button disabled={Object.keys(store.touched).length == 0 || !store.isValid|| store.isSubmitting } type="primary" style={{ marginLeft: 8 }} htmlType="submit" className="action-button">Submit</Button>}
                                            { store.currentPage < store.numPages -1 && <Button type="primary" style={{ marginLeft: 8 }} className="action-button" onClick={() => store.nextPage()}><Icon type="right" />Next</Button> }
                                            { store.currentPage > 0 && store.numPages > 1 && <Button type="primary" className="action-button" onClick={() => store.prevPage()}><Icon type="left" />Prev</Button> }
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
