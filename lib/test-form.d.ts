declare const _default: {
    "id": any;
    "name": string;
    "exid": any;
    "description": string;
    "layout": string;
    "formLayoutOptions": {
        "showSteps": boolean;
        "showPageTitles": boolean;
        "showSectionTitles": boolean;
        "showSectionBorders": boolean;
        "showPageBorders": boolean;
        "validationDisablesPaging": boolean;
        "labelAlign": string;
        "wrapperCol": {
            "span": number;
        };
        "labelCol": {
            "span": number;
        };
    };
    "itemLayoutOptions": {
        "labelAlign": string;
        "labelCol": {
            "xl": {
                "offset": number;
                "span": number;
            };
        };
        "wrapperCol": {
            "xl": {
                "offset": number;
                "span": number;
            };
        };
    };
    "submitTarget": string;
    "content": {
        "title": string;
        "subtitle": string;
        "labels": any;
        "offset": any;
        "width": any;
        "sidebar": any;
        "scripts": any;
        "styles": any;
        "datasets": any;
        "paginate": boolean;
        "pages": {
            "id": string;
            "uuid": string;
            "name": string;
            "title": string;
            "subtitle": string;
            "icon": string;
            "sections": {
                "id": string;
                "uuid": string;
                "name": string;
                "title": string;
                "gutter": number;
                "columns": {
                    "id": string;
                    "uuid": string;
                    "span": number;
                    "name": string;
                    "title": string;
                    "fields": {
                        "_type": string;
                        "id": string;
                        "name": string;
                        "label": string;
                        "value": any;
                        "touched": boolean;
                        "inputType": string;
                        "helpText": string;
                        "condition": any;
                        "location": {};
                        "conditionState": boolean;
                        "componentProps": {
                            "size": string;
                        };
                        "itemLayoutOptions": {
                            "labelAlign": string;
                            "labelCol": {};
                            "wrapperCol": {};
                        };
                        "uuid": string;
                        "fieldOptions": {
                            "id": string;
                            "valuePropName": string;
                        };
                        "children": {};
                    }[];
                }[];
            }[];
        }[];
    };
};
export default _default;
