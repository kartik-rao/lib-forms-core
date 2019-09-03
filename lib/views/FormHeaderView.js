import { Col, PageHeader, Row, Statistic } from "antd";
import * as React from "react";
import { useObserver } from 'mobx-react';
import { formStoreContext } from '../store/FormStoreProvider';
export const FormHeaderView = (props) => {
    const store = React.useContext(formStoreContext);
    if (!store)
        throw new Error("Store is  null");
    return useObserver(() => {
        return React.createElement("div", { className: "fl-shadow-bottom", style: { marginBottom: '2px' } },
            React.createElement(PageHeader, { className: "fl-ph", title: props.title, subTitle: props.subtitle, extra: (props.showSteps && store.numPages > 0 && React.createElement("div", null,
                    React.createElement(Statistic, { title: "Page", value: store.currentPage + 1, suffix: "/ " + store.numPages }))) }),
            props.title && React.createElement(Row, null,
                React.createElement(Col, { span: 20 },
                    React.createElement("div", { className: "fl-ph-wrap" },
                        React.createElement("div", { className: "fl-ph-content fl-ph-padding" }, props.desc)))));
    });
};
