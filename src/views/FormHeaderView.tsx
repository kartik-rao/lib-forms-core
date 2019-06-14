import { Col, PageHeader, Row, Statistic } from "antd";
import * as React from "react";
import FormStore from '../store/FormStore';

export interface IFormHeaderViewProps {
    store: FormStore;
}

export class FormHeaderView extends React.Component<IFormHeaderViewProps, any> {
    render() {
        let {form, currentPage, numPages} = this.props.store;
        let {formLayoutOptions, desc} = form;
        let {title, subtitle, pages} = form.content;

        return <div className="fl-shadow-bottom" style={{ marginBottom: '2px'}}>
        <PageHeader className="fl-ph" style={{'minHeight': '68px', border: 'none'}} title={title} subTitle={subtitle}
            extra={(formLayoutOptions.showSteps && <div>
            <Statistic title="Page" value={currentPage + 1} suffix={"/ " + numPages} />
            </div>)} />
        {title && <Row>
            <Col span={24}>
                <div className="fl-ph-wrap">
                    <div className="fl-ph-content fl-ph-padding">{form.desc}</div>
                </div>
            </Col>
        </Row>
        }
    </div>
    }

}