export default {
    id: "foo",
    name: "A sample form",
    description: "A description",
    layout: 'vertical',
    submitTarget: "https://dev-api.forms.li/form/entry/",
    content: {
        title: 'Form title',
        subtitle: 'Form subtitle',
        pages: [
            {
                title: 'Page 1',
                sections: [
                    {
                        gutter: 16,
                        name: "Section 1",
                        columns: [{
                            id: 1,
                            name: 's1c1',
                            title: 'Section 1 - Column 1',
                            fields: [
                                {
                                    id: "f1", name: "f1", type: "text", inputType: "input", label: "f1 - Text Label",
                                    validation: {
                                        presence: { message: 'f1 is a required field' },
                                        length: { message: 'f1 should be length 2', minimum: 2},
                                    },
                                    componentProps: {
                                        size: "small",
                                        placeholder: 'Placeholder Text',
                                    }
                                },
                                {
                                    id: 'f10', name: "f10", type: 'number', label: "f10 -Number Field ", inputType : "number",
                                    validation: {
                                        presence: { message: 'f10 is a required field' },
                                        numericality : true
                                    },
                                    componentProps: {
                                        defaultValue: 10,
                                    }
                                },
                                {
                                    id: 'f11', name: "f11", type: 'radiogroup', label: "f11 -Radiogroup ", inputType : "radiogroup",
                                    validation: {
                                        presence: { message: 'f11 is a required field' }
                                    },
                                    componentProps: {
                                        options: [{label: 'L1', value: 'V1'},{label: 'L2', value: 'V2'},{label: 'L3', value: 'V3'}]
                                    }
                                },
                                {
                                    id: 'f12', name: "f12", type: 'checkboxgroup', label: "f12 - Checkboxgroup ", inputType : "checkboxgroup",
                                    validation: {
                                        presence: { message: 'f12 is a required field' }
                                    },
                                    componentProps: {
                                        options : [{label: 'L1', value: 'V1'},{label: 'L2', value: 'V2'},{label: 'L3', value: 'V3'}]
                                    }
                                }
                            ]
                        },{
                            id: 2,
                            name: 's1c2',
                            title: 'Section 1 - Column 2',
                            fields: [{
                                id: "f2", name: "f2", inputType: "select", label: "f2 - select",
                                    componentProps: {
                                        placeholder: "f2 - select placeholder",
                                        options: [
                                        { label: "option1", value: "option1" },
                                        { label: "option2", value: "option2" }
                                    ]}
                                },{
                                    id: "f8", name: "f8", inputType: "datepicker", label: "f8 - datepicker label",
                                    validation: {
                                            presence: { message: "f8 is required"}
                                    },
                                    componentProps: {
                                        dateFormat: 'YYYY-MM-DD'
                                    }
                                },
                                {
                                    id: "f9", name: "f9", inputType: "daterange", label: "f9 - daterange label",
                                    validation: {
                                        presence: { message: "f9 is required"}
                                    },
                                    componentProps: {
                                        dateFormat: 'YYYY-MM-DD',
                                        defaultStartValue: '2019-03-01',
                                        defaultEndValue  : '2019-03-31',
                                        minStartDate : {from: 'now', relative:{days: -20}},
                                        maxEndDate: {from: 'start', relative:{days: 10}}
                                    }
                                },
                            {
                                id: "f3", name: "f3", type: "text", inputType: "input", label: "f3 - conditional text label",
                                validation: {
                                    presence: { message: 'f3 is required' }
                                },
                                condition: {predicates:[ { field: "f1", condition: "eq", value: "showme" } ]},
                                componentProps: {
                                    placeholder: 'Placeholder Text'
                                }
                            }]
                        }]
                    }
                ]
            },
            {
                title: 'Page 2',
                sections: [
                    {
                        name: "A Section",
                        columns: [
                            {
                                id: 3,
                                name: 'p2s1c1',
                                title: 'Section 2 - Column 1',
                                fields: [{
                                    id: "f5", name: "f5", inputType: "textblock", label: "f5 - Text Label",
                                    value: "Lorem ipsum text"
                                },{
                                    id: "f4", name: "f4", type: "text", inputType: "input", label: "f4 - text label F4",
                                    validation: {
                                        presence: { message: 'f4 s required' },
                                        length: { minimum: 2,  message: "f4 must be of minlength=2" },
                                    },
                                    componentProps: {
                                        placeholder: 'Placeholder Text F4'
                                    }
                                }
                            ]}
                        ]
                    }
                ]
            },
            {
                title: 'Page 3',
                sections: [
                    {
                        name: "A Section",
                        columns: [
                            {
                                id: 4,
                                name: 's1c1',
                                title: 'Section 1 - Column 1',
                                fields: [{
                                    id: "f6", name: "f6", type: "text", inputType: "input", label: "f6 - text label",
                                    validation: {
                                        presence: { message: 'Reqired validation message' },
                                        length: { minimum: 2,  message: "MinLength=2 validation message" },
                                    },
                                    componentProps: {
                                        placeholder: 'Placeholder Text F6',
                                    }
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    formLayoutOptions: {
        showSteps: true,
        showPageTitles : false,
        showSectionTitles: false,
        showSectionBorders : false,
        showPageBorders: false,
        validationDisablesPaging: false,
        wrapperOffset: 2
    }
};