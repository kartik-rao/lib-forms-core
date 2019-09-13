declare const _default: {
    id: string;
    name: string;
    description: string;
    layout: string;
    submitTarget: string;
    content: {
        title: string;
        subtitle: string;
        pages: ({
            title: string;
            sections: {
                gutter: number;
                name: string;
                columns: ({
                    id: number;
                    name: string;
                    title: string;
                    fields: ({
                        id: string;
                        name: string;
                        type: string;
                        inputType: string;
                        label: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                            length: {
                                message: string;
                                minimum: number;
                            };
                            numericality?: undefined;
                        };
                        componentProps: {
                            size: string;
                            placeholder: string;
                            defaultValue?: undefined;
                            options?: undefined;
                        };
                    } | {
                        id: string;
                        name: string;
                        type: string;
                        label: string;
                        inputType: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                            numericality: boolean;
                            length?: undefined;
                        };
                        componentProps: {
                            defaultValue: number;
                            size?: undefined;
                            placeholder?: undefined;
                            options?: undefined;
                        };
                    } | {
                        id: string;
                        name: string;
                        type: string;
                        label: string;
                        inputType: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                            length?: undefined;
                            numericality?: undefined;
                        };
                        componentProps: {
                            options: {
                                label: string;
                                value: string;
                            }[];
                            size?: undefined;
                            placeholder?: undefined;
                            defaultValue?: undefined;
                        };
                    })[];
                } | {
                    id: number;
                    name: string;
                    title: string;
                    fields: ({
                        id: string;
                        name: string;
                        inputType: string;
                        label: string;
                        componentProps: {
                            placeholder: string;
                            options: {
                                label: string;
                                value: string;
                            }[];
                            dateFormat?: undefined;
                            defaultStartValue?: undefined;
                            defaultEndValue?: undefined;
                            minStartDate?: undefined;
                            maxEndDate?: undefined;
                        };
                        validation?: undefined;
                        type?: undefined;
                        condition?: undefined;
                    } | {
                        id: string;
                        name: string;
                        inputType: string;
                        label: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                        };
                        componentProps: {
                            dateFormat: string;
                            placeholder?: undefined;
                            options?: undefined;
                            defaultStartValue?: undefined;
                            defaultEndValue?: undefined;
                            minStartDate?: undefined;
                            maxEndDate?: undefined;
                        };
                        type?: undefined;
                        condition?: undefined;
                    } | {
                        id: string;
                        name: string;
                        inputType: string;
                        label: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                        };
                        componentProps: {
                            dateFormat: string;
                            defaultStartValue: string;
                            defaultEndValue: string;
                            minStartDate: {
                                from: string;
                                relative: {
                                    days: number;
                                };
                            };
                            maxEndDate: {
                                from: string;
                                relative: {
                                    days: number;
                                };
                            };
                            placeholder?: undefined;
                            options?: undefined;
                        };
                        type?: undefined;
                        condition?: undefined;
                    } | {
                        id: string;
                        name: string;
                        type: string;
                        inputType: string;
                        label: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                        };
                        condition: {
                            predicates: {
                                field: string;
                                condition: string;
                                value: string;
                            }[];
                        };
                        componentProps: {
                            placeholder: string;
                            options?: undefined;
                            dateFormat?: undefined;
                            defaultStartValue?: undefined;
                            defaultEndValue?: undefined;
                            minStartDate?: undefined;
                            maxEndDate?: undefined;
                        };
                    })[];
                })[];
            }[];
        } | {
            title: string;
            sections: {
                name: string;
                columns: {
                    id: number;
                    name: string;
                    title: string;
                    fields: ({
                        id: string;
                        name: string;
                        inputType: string;
                        label: string;
                        value: string;
                        type?: undefined;
                        validation?: undefined;
                        componentProps?: undefined;
                    } | {
                        id: string;
                        name: string;
                        type: string;
                        inputType: string;
                        label: string;
                        validation: {
                            presence: {
                                message: string;
                            };
                            length: {
                                minimum: number;
                                message: string;
                            };
                        };
                        componentProps: {
                            placeholder: string;
                        };
                        value?: undefined;
                    })[];
                }[];
            }[];
        })[];
    };
    formLayoutOptions: {
        showSteps: boolean;
        showPageTitles: boolean;
        showSectionTitles: boolean;
        showSectionBorders: boolean;
        showPageBorders: boolean;
        validationDisablesPaging: boolean;
        wrapperOffset: number;
    };
};
export default _default;
