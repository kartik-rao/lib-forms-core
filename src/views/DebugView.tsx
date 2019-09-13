import * as React from "react";
import {Drawer, Switch, Card, Badge, Statistic, Row, Col, Button, List, Divider, Tag, Popover} from "antd";
import { formStoreContext } from '../store/FormStoreProvider';
import { useObserver, useLocalStore } from 'mobx-react';
import Layout from 'antd/lib/layout';
import { SubmitState } from '../models/form';

export interface DebugViewProps {
    visible?: boolean;
}

type SubmitStateColor = "success"|"error"|"default"|"processing" | "default";
type ExpectedSubmitResult = "Redirect" | "Set Message" | "Default Message";

export const DebugView : React.FC<DebugViewProps> = (props: DebugViewProps) => {
    const fStore = React.useContext(formStoreContext);
    if(!fStore) throw new Error("Store is  null");

    const localStore = useLocalStore(() => ({
        get errorList() : {title: string, value: string}[] {
            let errorList = [];
            Object.keys(fStore.errors).map((f)=> {
                fStore.errors[f] && errorList.push({title: f, value: fStore.errors[f]});
            });
            return errorList;
        },
        get submitStateColor() : SubmitStateColor {
            return fStore.form.submitState == SubmitState.NOT_SUBMITTED ? "default" :
                        fStore.form.submitState == SubmitState.SUBMITTING ? "processing" :
                            fStore.form.submitState == SubmitState.SUCCESS ? "success" : "error"
        },
        get expectedSubmitResult() : {error: ExpectedSubmitResult, success: ExpectedSubmitResult} {
            return {
                error: fStore.form.successRedirect ? "Redirect" : fStore.form.submitErrorMessage ? "Set Message" : "Default Message",
                success: fStore.form.errorRedirect ? "Redirect" : fStore.form.submitSuccessMessage ? "Set Message" : "Default Message"
            }
        }
    }));

    return useObserver(() => {
        return <Card title={fStore.form.content.title || "Untitled Form"} bodyStyle={{padding: 10}} extra={<span>
                <Badge status={localStore.submitStateColor} text="Submiting" style={{marginRight: '15px'}}/>
                <Badge status={fStore.isSubmittable ? "success" : "error"} text="Can Submit" style={{marginRight: '15px'}}/>
                <Badge status={fStore.isValid ? "success" : "error"} text="Is Valid" style={{marginRight: '15px'}}/>
            </span>}>
            <Row key="stats">
                <Col span={6}><Statistic title="Pages" value={fStore.form.numPages}/></Col>
                <Col span={6}><Statistic title="Fields" value={fStore.form.numFields}/></Col>
                <Col span={6}><Statistic title="Errors" value={fStore.form.errors ? fStore.form.errors.length : 0}/></Col>
                <Col span={6}><Statistic title="Touched" value={Object.keys(fStore.touched).length} suffix={`/ ${fStore.form.numFields}`}/></Col>
            </Row>
            <Divider key="divider-submitinfo"/>
            <Row key="submit-info">
                <div><h3>Submit settings</h3></div>
                <Col span={12}><strong>Submit Target - </strong>{fStore.form.submitTarget ? <span style={{marginLeft: "5px"}}>Set</span> : <span style={{marginLeft: "5px"}}>Not Set</span>}</Col>
                <Col span={12}><strong>Status - </strong>{<span style={{marginLeft: "5px"}}>{fStore.form.submitState}</span>}</Col>
            </Row>
            <Divider key="divider-outcomes"/>
            <Row>
                <div><h3>Submit Outcome</h3></div>
                <Col span={12}><strong>On Success - </strong> <span style={{marginLeft: "5px"}}>{localStore.expectedSubmitResult.success}</span></Col>
                <Col span={12}><strong>On Error - </strong> <span style={{marginLeft: "5px"}}>{localStore.expectedSubmitResult.error}</span></Col>
            </Row>
            <Divider key="divider-messages"/>
            <Row key="messages">
                <div><h3>Messages</h3></div>
                <Col span={12}><strong>On Success - </strong>{fStore.form.submitSuccessMessage ? <Popover content={fStore.form.submitSuccessMessage}><span>Set</span></Popover> : <span>Default</span>}</Col>
                <Col span={12}><strong>On Error - </strong>{fStore.form.submitErrorMessage ? <Popover content={fStore.form.submitErrorMessage}><span>Set</span></Popover> : <span>Default</span>}</Col>
            </Row>
            <Divider key="divider-redirects"/>
            <Row key="redirects">
                <div><h3>Redirects</h3></div>
                <Col span={12}><strong>On Success - </strong>{fStore.form.successRedirect ? <a href="fStore.form.successRedirect" target="_blank">Link</a> : <span style={{marginLeft: "5px"}}>Not Set</span>}</Col>
                <Col span={12}><strong>On Error - </strong>{fStore.form.errorRedirect ? <a href="fStore.form.errorRedirect"  target="_blank">Link</a> : <span style={{marginLeft: "5px"}}>Not Set</span>}</Col>
            </Row>
            <Divider key="divider-errors"/>
            <Row key="errors">
                <Col span={24}>
                    <div><h3>Errors</h3>
                    {fStore.errors && <List>
                        {localStore.errorList.map((error) => {
                            return <List.Item key={error.title}><strong>{error.title}</strong><Tag color="red" style={{marginLeft: "10px"}}>{error.value}</Tag></List.Item>
                        })}
                    </List>}
                    </div>
                </Col>
            </Row>
        </Card>
    })
}