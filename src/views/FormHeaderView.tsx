import { Col, PageHeader, Row, Statistic } from "antd";
import * as React from "react";
import { observer, useObserver } from 'mobx-react';
import { formStoreContext } from '../store/FormStoreProvider';

export const FormHeaderView : React.FC<{desc: string, title: string, subtitle: string, showSteps: boolean, currentPage: number, numPages: number}> = (props) => {
    const store = React.useContext(formStoreContext);
    if(!store) throw new Error("Store is  null");
    return useObserver(() => {
        return <div className="fl-shadow-bottom" style={{ marginBottom: '2px'}}>
            <PageHeader className="fl-ph" style={{'minHeight': '68px', border: 'none'}} title={props.title} subTitle={props.subtitle}
                extra={(props.showSteps && <div>
                <Statistic title="Page" value={store.currentPage + 1} suffix={"/ " + store.numPages} />
                </div>)} />
            {props.title && <Row>
                <Col span={24}>
                    <div className="fl-ph-wrap">
                        <div className="fl-ph-content fl-ph-padding">{props.desc}</div>
                    </div>
                </Col>
            </Row>
            }
        </div>
    });
}
// export interface IFormHeaderViewProps {
//     desc: string;
//     title: string;
//     subtitle: string;
//     showSteps: boolean;
//     currentPage: number;
//     numPages: number;
// }

// @observer
// export class FormHeaderView extends React.Component<IFormHeaderViewProps, any> {
//     render() {
//         let {title, subtitle, desc, currentPage, numPages, showSteps} = this.props;

//         return <div className="fl-shadow-bottom" style={{ marginBottom: '2px'}}>
//         <PageHeader className="fl-ph" style={{'minHeight': '68px', border: 'none'}} title={title} subTitle={subtitle}
//             extra={(showSteps && <div>
//             <Statistic title="Page" value={currentPage + 1} suffix={"/ " + numPages} />
//             </div>)} />
//         {title && <Row>
//             <Col span={24}>
//                 <div className="fl-ph-wrap">
//                     <div className="fl-ph-content fl-ph-padding">{desc}</div>
//                 </div>
//             </Col>
//         </Row>
//         }
//     </div>
//     }

// }