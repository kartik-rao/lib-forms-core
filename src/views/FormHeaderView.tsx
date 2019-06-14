import { Col, PageHeader, Row, Statistic } from "antd";
import * as React from "react";
import { observer } from 'mobx-react';

export interface IFormHeaderViewProps {
    desc: string;
    title: string;
    subtitle: string;
    showSteps: boolean;
    currentPage: number;
    numPages: number;
}

@observer
export class FormHeaderView extends React.Component<IFormHeaderViewProps, any> {
    render() {
        let {title, subtitle, desc, currentPage, numPages, showSteps} = this.props;

        return <div className="fl-shadow-bottom" style={{ marginBottom: '2px'}}>
        <PageHeader className="fl-ph" style={{'minHeight': '68px', border: 'none'}} title={title} subTitle={subtitle}
            extra={(showSteps && <div>
            <Statistic title="Page" value={currentPage + 1} suffix={"/ " + numPages} />
            </div>)} />
        {title && <Row>
            <Col span={24}>
                <div className="fl-ph-wrap">
                    <div className="fl-ph-content fl-ph-padding">{desc}</div>
                </div>
            </Col>
        </Row>
        }
    </div>
    }

}