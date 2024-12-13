
const tabs = [
    { id: 1, title: 'New (3)' },
    { id: 2, title: 'Shortlist (5)', },
    { id: 3, title: 'Interview (3)', },
    { id: 4, title: 'Selected (40)', },
    { id: 5, title: 'Rejected (15)', },
    { id: 6, title: 'Inducted (6)', },
    { id: 7, title: 'Negotiation (2)', },
    { id: 8, title: 'Archive (1)', },
    { id: 9, title: 'All' },

];
const newData = [
    {
        id: 1,
        ApplyDate: '2024-10-22',
        Candidate: 'Anjali',
        Mobile: '+91 1234567890',
        Profile: 'Technical Support',
        Experience: '14 (1.2 years)',
        Resume: '',
        Source: 'Web',
        InterviewDate: '2024-11-12',
        FollowupOn: '2024-12-22 12:44 PM',
        DueDate: '2024-12-22',
        InterviewType: 'Technical',
        Reference: 'Shubham Pandey',

    }
];

const logData = [
    {
        id: 1,
        'Date & Time': '21-11-2024 11:54 AM',
        Description: '-Profile:Asp.Net -Stage:New -CTC:35000 -ECTC:32000 -Experience:30 -ReferedBy:Resume share by Meihol sir on Whatsapp ',
        Notes: 'Interview will be schedule'
    }
]

const callLogData = [
    {
        id: 1,
        'Log Date & Time': '21-11-2024 11:54 AM',
        ContactName: 'Vivek',
        ExtensionNo: '214',
        Number: '91 1234567890',
        Flow: 'Incoming',
        Event: 'Call Start',
        DeviceType: 'Web',
        Disposition: 'Answered',
        AnswerTime: '21-11-2024 1:11 PM',
        EndTime: '21-11-2024 1:15 PM',
    },
    {
        id: 2,
        'Log Date & Time': '21-11-2024 1:54 AM',
        ContactName: 'Viren',
        ExtensionNo: '212',
        Number: '91 9988776655',
        Flow: 'Incoming',
        Event: 'Call Start',
        DeviceType: 'Web',
        Disposition: 'No Answer',
        AnswerTime: '21-11-2024 2:15 PM',
        EndTime: '21-11-2024 2:17 PM',
    }
]

$(() => {
    const tabPanel = $('.tabs-container').dxTabPanel({
        dataSource: tabs,
        itemTemplate,
        deferRendering: true,
        showNavButtons: true,
        repaintChangesOnly: true,
    }).dxTabPanel('instance');

    function itemTemplate(itemData, itemIndex, itemElement) {
        var tempFormElement = '';
        if (itemData.id == 1) {
            tempFormElement = getNewData();
        } else if (itemData.id == 2) {
            tempFormElement = 'getShortlistData()';
        } else if (itemData.id == 3) {
            tempFormElement = 'getInterviewData()';
        } else if (itemData.id == 4) {
            tempFormElement = 'getSelectedData()';
        } else if (itemData.id == 5) {
            tempFormElement = 'getRejectedData()';
        } else if (itemData.id == 6) {
            tempFormElement = 'getInductedData()';
        } else if (itemData.id == 7) {
            tempFormElement = 'getNegotiationData()';
        } else if (itemData.id == 8) {
            tempFormElement = 'getArchiveData()';
        } else if (itemData.id == 9) {
            tempFormElement = getAllGridData();
        }

        itemElement.append(tempFormElement);

    }

    function getNewData() {
        var newgridcontainer = $('#NewGridContainer').dxDataGrid({
            dataSource: newData,
            // keyExpr: 'ID',
            showBorders: true,
            editing: {
                mode: 'row',
                allowUpdating: true,
                // allowDeleting: true,
                // allowAdding: true,
            },
            filterRow: {
                visible: true
            },
            headerFilter: {
                visible: true,
            },
            searchPanel: {
                visible: true,
            },
            groupPanel: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                mode: 'select',
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '#NewGridContainer .dx-datagrid-column-chooser-button',
                }
            },
            columns: [
                {
                    dataField: "ApplyDate",
                    caption: "Apply Date",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                },
                {
                    dataField: "Candidate",
                    caption: "Candidate",
                },
                {
                    dataField: "Mobile",
                    caption: "Mobile",
                },
                {
                    dataField: "Profile",
                    caption: "Profile",
                    allowSorting: false
                },
                {
                    dataField: "Experience",
                    caption: "Experience"
                },
                {
                    dataField: "Resume",
                    caption: "Resume",


                },
                {
                    dataField: "Source",
                    caption: "Source",

                },
                {
                    dataField: 'FollowupOn',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'datetime'
                    }
                },
                {
                    dataField: "InterviewDate",
                    caption: "Interview Date",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                }, {
                    dataField: 'DueDate',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'date'
                    }
                },
                // {
                //     dataField: "InterviewType",
                //     caption: "Interview Type",

                // },
                {
                    dataField: "Reference",
                    caption: "Reference"
                },
                {
                    dataField: 'Action',
                    type: 'buttons',
                    width: 110,
                    buttons: [{
                        name: "edit",
                        icon: 'edit'
                    },
                    {
                        name: "save",
                        icon: 'save'
                    },
                    {
                        name: "cancel",
                        icon: 'revert'
                    }
                    ]
                },
            ],
            toolbar: {
                items: [
                    'groupPanel',
                    { // Ticket Delete Confirm Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            text: 'DELETE',
                            visible: false,
                            elementAttr: {
                                id: "DeleteConfm",
                            },
                            onClick: function () {
                                var ticketDel = $('#NewGridContainer').dxDataGrid('instance').getSelectedRowKeys();
                                if (ticketDel.length > 0) {
                                    var DelPopUp = DevExpress.ui.dialog.custom({
                                        title: "Are You Sure ?",
                                        messageHtml: "Delete is permanent ?",
                                        buttons: [
                                            {
                                                text: "Yes",
                                                type: 'danger',
                                                onClick: function (e) {
                                                    $('#loader').show();
                                                    $.ajax({
                                                        type: "POST",
                                                        url: baseUrl + '/inquirytickets/delete',
                                                        data: {
                                                            Ticket: ticketDel,
                                                        },
                                                        headers: {
                                                            'X-CSRF-TOKEN': token
                                                        },
                                                        success: function (res) {
                                                            if (res.status == 200) {
                                                                delReload();
                                                                devxtremNotification(res.msg, 'success', 1500);
                                                                $("#NewGridContainer").dxDataGrid("instance").getDataSource().reload();
                                                            } else {
                                                                devxtremNotification(res.msg, 'error', 1500);
                                                            }
                                                            $('#loader').hide();
                                                        },
                                                        error: function (error) {
                                                            $('#loader').hide();
                                                            devxtremNotification("Something went wrong", 'error', 1500);
                                                        },
                                                    });
                                                }
                                            },
                                            {
                                                text: "No",
                                                onClick: function (e) {
                                                    DelPopUp.hide();
                                                    delReload();
                                                }
                                            }
                                        ],
                                        popupOptions: {
                                            onShown: function (e) {
                                                $(".dx-dialog-button")[1].focus();
                                            }
                                        }
                                    });
                                    DelPopUp.show();
                                } else {
                                    devxtremNotification(`No Data Selected`, 'error', 1500);
                                }

                            },
                        },
                    },
                    { // Ticket Delete Cancel Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            text: 'CANCEL',
                            visible: false,
                            elementAttr: {
                                id: "DeleteCancel",
                            },
                            // onClick: function () {
                            //     delReload();
                            // },
                            onClick: function (e) {
                                $('#NewGridContainer').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "none",
                                    }
                                });
                                $('#DeleteConfm').dxButton({
                                    visible: false,
                                });
                                $('#DeleteCancel').dxButton({
                                    visible: false,
                                });
                                $('#DeleteTkt').dxButton({
                                    visible: true,
                                });
                            },
                        },

                    },
                    { // Ticket Delete Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'DELETE',
                            elementAttr: {
                                id: 'DeleteTkt'
                            },
                            onClick() {
                                $('#NewGridContainer').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "multiple",
                                    }
                                });

                                $('#DeleteConfm').dxButton({
                                    visible: true,
                                });
                                $('#DeleteCancel').dxButton({
                                    visible: true,
                                });
                                $('#DeleteTkt').dxButton({
                                    visible: false,
                                });
                            },
                        },
                    },
                    { // Reset Layout Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'RESET LAYOUT',
                            visible: false,
                            elementAttr: {
                                id: 'ResetLayout'
                            },
                            onClick() {
                                sendStorageRequest('Inquiry', 3, 'text', 'POST');

                                $('#SaveLayout').dxButton({
                                    visible: false,
                                });
                                $('#ResetLayout').dxButton({
                                    visible: false,
                                });
                                $('#Layout').dxButton({
                                    visible: true,
                                });
                            },
                        },
                    },
                    { // Save Layout Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'SAVE LAYOUT',
                            visible: false,
                            elementAttr: {
                                id: 'SaveLayout'
                            },
                            onClick() {
                                var gridState = localStorage.getItem('InquiStrg');
                                sendStorageRequest('Inquiry', 2, 'text', 'POST', gridState);
                                $('#SaveLayout').dxButton({
                                    visible: false,
                                });
                                $('#ResetLayout').dxButton({
                                    visible: false,
                                });
                                $('#Layout').dxButton({
                                    visible: true,
                                });
                            },
                        },
                    },
                    { // Layout Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'LAYOUT',
                            elementAttr: {
                                id: 'Layout'
                            },
                            onClick() {
                                $('#SaveLayout').dxButton({
                                    visible: true,
                                });
                                $('#ResetLayout').dxButton({
                                    visible: true,
                                });
                                $('#Layout').dxButton({
                                    visible: false,
                                });
                            },
                        },
                    },

                    { // Transfer Ticket Save Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            stylingMode: 'contained',
                            type: 'normal',
                            text: 'SAVE',
                            visible: false,
                            elementAttr: {
                                id: 'TrfSaveBtn'
                            },
                            onClick() {
                                var dtagrid = $('#NewGridContainer').dxDataGrid('instance').getSelectedRowKeys();
                                if (dtagrid.length > 0) {
                                    TransferTicketPopUp.show()
                                    TransferTicketPopUp.option({
                                        title: `Transfer Tickets To:`,
                                        contentTemplate: function () {
                                            var TrfBtnForm = $('<form method="post">').dxForm({
                                                elementAttr: {
                                                    id: 'customSaveTrfBtnForm',
                                                },
                                                items: [
                                                    {
                                                        dataField: 'transferTo',
                                                        editorType: 'dxSelectBox',
                                                        label: {
                                                            text: 'Select Teammate',
                                                        },
                                                        editorOptions: {
                                                            items: ccUsers,
                                                            placeholder: 'Teammate',
                                                            displayExpr: 'name',
                                                            valueExpr: 'id',
                                                            searchEnabled: true,
                                                            elementAttr: {
                                                                id: 'trf_TeamMate'
                                                            },
                                                        },
                                                        validationRules: [{
                                                            type: 'required',
                                                            message: 'Select Teammate',
                                                        }],
                                                    },
                                                ],
                                            });
                                            return TrfBtnForm;
                                        },
                                        toolbarItems: [
                                            {
                                                widget: 'dxButton',
                                                toolbar: 'bottom',
                                                location: 'after',
                                                options: {
                                                    text: 'Submit',
                                                    elementAttr: {
                                                        id: 'onclick_Transfer',
                                                    },
                                                    horizontalAlignment: 'left',
                                                    onClick(e) {
                                                        var checkValidaTrf = $('#customSaveTrfBtnForm').dxForm('instance').validate();
                                                        if (checkValidaTrf.isValid) {
                                                            var result = DevExpress.ui.dialog.custom({
                                                                title: "Are You Sure ?",
                                                                messageHtml: "You want to Transfer Ticket ?",
                                                                buttons: [
                                                                    {
                                                                        text: "Yes",
                                                                        onClick: function (e) {
                                                                            $('#loader').show();
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                url: baseUrl + '/inquirytickets/transfer',
                                                                                data: {
                                                                                    TicketIdArr: dtagrid,
                                                                                    TransTo: $("#trf_TeamMate").dxSelectBox('instance').option('value'),
                                                                                },
                                                                                headers: {
                                                                                    'X-CSRF-TOKEN': token
                                                                                },
                                                                                success: function (res) {
                                                                                    if (res.status == 200) {
                                                                                        devxtremNotification("Ticket transferred successfully", 'error', 1500);
                                                                                        $("#inquiryGrid").dxDataGrid("instance").getDataSource().reload();
                                                                                        TransferTicketPopUp.hide();
                                                                                        $('#inquiryGrid').dxDataGrid('instance').option({
                                                                                            selection: {
                                                                                                mode: "none",
                                                                                            }
                                                                                        });
                                                                                        $('#cancelTrfBtn').dxButton({
                                                                                            visible: false,
                                                                                        });
                                                                                        $('#TrfSaveBtn').dxButton({
                                                                                            visible: false,
                                                                                        });
                                                                                        $('#customTrfBtn').dxButton({
                                                                                            visible: true,
                                                                                        });
                                                                                    } else {
                                                                                        devxtremNotification("Something went wrong", 'error', 1500);
                                                                                    }
                                                                                    $('#loader').hide();
                                                                                },
                                                                                error: function (error) {
                                                                                    $('#loader').hide();
                                                                                    devxtremNotification("Something went wrong", 'error', 1500);
                                                                                },
                                                                            });
                                                                        }
                                                                    },
                                                                    {
                                                                        text: "No",
                                                                        onClick: function (e) {
                                                                            result.hide();
                                                                        }
                                                                    }
                                                                ],
                                                                popupOptions: {
                                                                    onShown: function (e) {
                                                                        $(".dx-dialog-button")[1].focus();
                                                                    }
                                                                }
                                                            });
                                                            result.show();
                                                        }
                                                    },
                                                },
                                            },
                                            {
                                                widget: 'dxButton',
                                                toolbar: 'bottom',
                                                location: 'after',
                                                options: {
                                                    text: 'Cancel',
                                                    horizontalAlignment: 'right',
                                                    onClick() {
                                                        TransferTicketPopUp.hide();
                                                        $('#inquiryGrid').dxDataGrid('instance').option({
                                                            selection: {
                                                                mode: "none",
                                                            }
                                                        });
                                                        $('#cancelTrfBtn').dxButton({
                                                            visible: false,
                                                        });
                                                        $('#TrfSaveBtn').dxButton({
                                                            visible: false,
                                                        });
                                                        $('#customTrfBtn').dxButton({
                                                            visible: true,
                                                        });
                                                    },
                                                },
                                            },
                                        ],

                                    })
                                } else {
                                    devxtremNotification('No Ticket Selected', 'error', 1500);
                                }
                            }
                        },
                    },
                    { // Transfer Ticket Cancel Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            stylingMode: 'contained',
                            type: 'normal',
                            text: 'CANCEL',
                            elementAttr: {
                                id: 'cancelTrfBtn'
                            },
                            visible: false,
                            onClick: function (e) {
                                $('#NewGridContainer').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "none",
                                    }
                                });
                                $('#cancelTrfBtn').dxButton({
                                    visible: false,
                                });
                                $('#TrfSaveBtn').dxButton({
                                    visible: false,
                                });
                                $('#customTrfBtn').dxButton({
                                    visible: true,
                                });
                            },
                        },
                    },
                    { // Transfer Ticket Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            stylingMode: 'contained',
                            type: 'normal',
                            text: 'TRF',
                            elementAttr: {
                                id: 'customTrfBtn'
                            },
                            onClick: function (e) {
                                $('#NewGridContainer').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "multiple",
                                    }
                                });
                                $('#cancelTrfBtn').dxButton({
                                    visible: true,
                                });
                                $('#TrfSaveBtn').dxButton({
                                    visible: true,
                                });
                                $('#customTrfBtn').dxButton({
                                    visible: false,
                                });
                            },
                        },
                    },
                    'columnChooserButton',
                    'searchPanel',
                    'addRowButton',


                ],
            },
            masterDetail: {
                enabled: true,
                template: masterDetailTemplate,
            },

        });
        return newgridcontainer;
    }

    function getAllGridData() {
        var allgridcontainer = $('#AllGridData').dxDataGrid({
            dataSource: newData,
            // keyExpr: 'ID',
            showBorders: true,
            editing: {
                mode: 'row',
                allowUpdating: true,
                // allowDeleting: true,
                // allowAdding: true,
            },

            filterRow: {
                visible: true
            },
            headerFilter: {
                visible: true,
            },
            searchPanel: {
                visible: true,
            },
            groupPanel: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                mode: 'select',
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '#AllGridData .dx-datagrid-column-chooser-button',
                }
            },
            columns: [
                {
                    dataField: "ApplyDate",
                    caption: "Apply Date",
                    dataType: "date",
                    format: "dd-MM-yyyy"
                },
                {
                    dataField: "Candidate",
                    caption: "Candidate",
                },
                {
                    dataField: "Mobile",
                    caption: "Mobile",
                },
                {
                    dataField: "Profile",
                    caption: "Profile",
                    allowSorting: false
                },
                {
                    dataField: "Experience",
                    caption: "Experience"
                },
                {
                    dataField: "Resume",
                    caption: "Resume",


                },
                {
                    dataField: "Source",
                    caption: "Source",

                },
                {
                    dataField: 'FollowupOn',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'datetime'
                    }
                },
                {
                    dataField: "InterviewDate",
                    caption: "Interview Date",
                    dataType: "date",
                    format: "dd-MM-yyyy",
                },
                {
                    dataField: "InterviewType",
                    caption: "Interview Type",

                },
                {
                    dataField: "Reference",
                    caption: "Reference"
                },
                {
                    dataField: 'Action',
                    type: 'buttons',
                    width: 110,
                    buttons: [{
                        name: "edit",
                        icon: 'edit'
                    },
                    {
                        name: "save",
                        icon: 'save'
                    },
                    {
                        name: "cancel",
                        icon: 'revert'
                    }
                    ]
                },
            ],
            toolbar: {
                items: [
                    'groupPanel',
                    { // Ticket Delete Confirm Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            text: 'DELETE',
                            visible: false,
                            elementAttr: {
                                id: "DeleteConfm9",
                            },
                            onClick: function () {
                                var ticketDel = $('#AllGridData').dxDataGrid('instance').getSelectedRowKeys();
                                if (ticketDel.length > 0) {
                                    var DelPopUp = DevExpress.ui.dialog.custom({
                                        title: "Are You Sure ?",
                                        messageHtml: "Delete is permanent ?",
                                        buttons: [
                                            {
                                                text: "Yes",
                                                type: 'danger',
                                                onClick: function (e) {
                                                    $('#loader').show();
                                                    $.ajax({
                                                        type: "POST",
                                                        url: baseUrl + '/inquirytickets/delete',
                                                        data: {
                                                            Ticket: ticketDel,
                                                        },
                                                        headers: {
                                                            'X-CSRF-TOKEN': token
                                                        },
                                                        success: function (res) {
                                                            if (res.status == 200) {
                                                                delReload();
                                                                devxtremNotification(res.msg, 'success', 1500);
                                                                $("#AllGridData").dxDataGrid("instance").getDataSource().reload();
                                                            } else {
                                                                devxtremNotification(res.msg, 'error', 1500);
                                                            }
                                                            $('#loader').hide();
                                                        },
                                                        error: function (error) {
                                                            $('#loader').hide();
                                                            devxtremNotification("Something went wrong", 'error', 1500);
                                                        },
                                                    });
                                                }
                                            },
                                            {
                                                text: "No",
                                                onClick: function (e) {
                                                    DelPopUp.hide();
                                                    delReload();
                                                }
                                            }
                                        ],
                                        popupOptions: {
                                            onShown: function (e) {
                                                $(".dx-dialog-button")[1].focus();
                                            }
                                        }
                                    });
                                    DelPopUp.show();
                                } else {
                                    devxtremNotification(`No Data Selected`, 'error', 1500);
                                }

                            },
                        },
                    },
                    { // Ticket Delete Cancel Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            text: 'CANCEL',
                            visible: false,
                            elementAttr: {
                                id: "DeleteCancel9",
                            },
                            // onClick: function () {
                            //     delReload();
                            // },
                            onClick: function (e) {
                                $('#AllGridData').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "none",
                                    }
                                });
                                $('#DeleteConfm9').dxButton({
                                    visible: false,
                                });
                                $('#DeleteCancel9').dxButton({
                                    visible: false,
                                });
                                $('#DeleteTkt9').dxButton({
                                    visible: true,
                                });
                            },
                        },

                    },
                    { // Ticket Delete Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'DELETE',
                            elementAttr: {
                                id: 'DeleteTkt9'
                            },
                            onClick() {
                                $('#AllGridData').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "multiple",
                                    }
                                });

                                $('#DeleteConfm9').dxButton({
                                    visible: true,
                                });
                                $('#DeleteCancel9').dxButton({
                                    visible: true,
                                });
                                $('#DeleteTkt9').dxButton({
                                    visible: false,
                                });
                            },
                        },
                    },
                    { // Reset Layout Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'RESET LAYOUT',
                            visible: false,
                            elementAttr: {
                                id: 'ResetLayout9'
                            },
                            onClick() {
                                sendStorageRequest('Inquiry', 3, 'text', 'POST');

                                $('#SaveLayout9').dxButton({
                                    visible: false,
                                });
                                $('#ResetLayout9').dxButton({
                                    visible: false,
                                });
                                $('#Layout9').dxButton({
                                    visible: true,
                                });
                            },
                        },
                    },
                    { // Save Layout Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'SAVE LAYOUT',
                            visible: false,
                            elementAttr: {
                                id: 'SaveLayout9'
                            },
                            onClick() {
                                var gridState = localStorage.getItem('InquiStrg');
                                sendStorageRequest('Inquiry', 2, 'text', 'POST', gridState);
                                $('#SaveLayout9').dxButton({
                                    visible: false,
                                });
                                $('#ResetLayout9').dxButton({
                                    visible: false,
                                });
                                $('#Layout9').dxButton({
                                    visible: true,
                                });
                            },
                        },
                    },
                    { // Layout Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            type: 'normal',
                            text: 'LAYOUT',
                            elementAttr: {
                                id: 'Layout9'
                            },
                            onClick() {
                                $('#SaveLayout9').dxButton({
                                    visible: true,
                                });
                                $('#ResetLayout9').dxButton({
                                    visible: true,
                                });
                                $('#Layout9').dxButton({
                                    visible: false,
                                });
                            },
                        },
                    },

                    { // Transfer Ticket Save Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            stylingMode: 'contained',
                            type: 'normal',
                            text: 'SAVE',
                            visible: false,
                            elementAttr: {
                                id: 'TrfSaveBtn9'
                            },
                            onClick() {
                                var dtagrid = $('#AllGridData').dxDataGrid('instance').getSelectedRowKeys();
                                if (dtagrid.length > 0) {
                                    TransferTicketPopUp.show()
                                    TransferTicketPopUp.option({
                                        title: `Transfer Tickets To:`,
                                        contentTemplate: function () {
                                            var TrfBtnForm = $('<form method="post">').dxForm({
                                                elementAttr: {
                                                    id: 'customSaveTrfBtnForm',
                                                },
                                                items: [
                                                    {
                                                        dataField: 'transferTo',
                                                        editorType: 'dxSelectBox',
                                                        label: {
                                                            text: 'Select Teammate',
                                                        },
                                                        editorOptions: {
                                                            items: ccUsers,
                                                            placeholder: 'Teammate',
                                                            displayExpr: 'name',
                                                            valueExpr: 'id',
                                                            searchEnabled: true,
                                                            elementAttr: {
                                                                id: 'trf_TeamMate'
                                                            },
                                                        },
                                                        validationRules: [{
                                                            type: 'required',
                                                            message: 'Select Teammate',
                                                        }],
                                                    },
                                                ],
                                            });
                                            return TrfBtnForm;
                                        },
                                        toolbarItems: [
                                            {
                                                widget: 'dxButton',
                                                toolbar: 'bottom',
                                                location: 'after',
                                                options: {
                                                    text: 'Submit',
                                                    elementAttr: {
                                                        id: 'onclick_Transfer',
                                                    },
                                                    horizontalAlignment: 'left',
                                                    onClick(e) {
                                                        var checkValidaTrf = $('#customSaveTrfBtnForm').dxForm('instance').validate();
                                                        if (checkValidaTrf.isValid) {
                                                            var result = DevExpress.ui.dialog.custom({
                                                                title: "Are You Sure ?",
                                                                messageHtml: "You want to Transfer Ticket ?",
                                                                buttons: [
                                                                    {
                                                                        text: "Yes",
                                                                        onClick: function (e) {
                                                                            $('#loader').show();
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                url: baseUrl + '/inquirytickets/transfer',
                                                                                data: {
                                                                                    TicketIdArr: dtagrid,
                                                                                    TransTo: $("#trf_TeamMate").dxSelectBox('instance').option('value'),
                                                                                },
                                                                                headers: {
                                                                                    'X-CSRF-TOKEN': token
                                                                                },
                                                                                success: function (res) {
                                                                                    if (res.status == 200) {
                                                                                        devxtremNotification("Ticket transferred successfully", 'error', 1500);
                                                                                        $("#AllGridData").dxDataGrid("instance").getDataSource().reload();
                                                                                        TransferTicketPopUp.hide();
                                                                                        $('#AllGridData').dxDataGrid('instance').option({
                                                                                            selection: {
                                                                                                mode: "none",
                                                                                            }
                                                                                        });
                                                                                        $('#cancelTrfBtn').dxButton({
                                                                                            visible: false,
                                                                                        });
                                                                                        $('#TrfSaveBtn').dxButton({
                                                                                            visible: false,
                                                                                        });
                                                                                        $('#customTrfBtn').dxButton({
                                                                                            visible: true,
                                                                                        });
                                                                                    } else {
                                                                                        devxtremNotification("Something went wrong", 'error', 1500);
                                                                                    }
                                                                                    $('#loader').hide();
                                                                                },
                                                                                error: function (error) {
                                                                                    $('#loader').hide();
                                                                                    devxtremNotification("Something went wrong", 'error', 1500);
                                                                                },
                                                                            });
                                                                        }
                                                                    },
                                                                    {
                                                                        text: "No",
                                                                        onClick: function (e) {
                                                                            result.hide();
                                                                        }
                                                                    }
                                                                ],
                                                                popupOptions: {
                                                                    onShown: function (e) {
                                                                        $(".dx-dialog-button")[1].focus();
                                                                    }
                                                                }
                                                            });
                                                            result.show();
                                                        }
                                                    },
                                                },
                                            },
                                            {
                                                widget: 'dxButton',
                                                toolbar: 'bottom',
                                                location: 'after',
                                                options: {
                                                    text: 'Cancel',
                                                    horizontalAlignment: 'right',
                                                    onClick() {
                                                        TransferTicketPopUp.hide();
                                                        $('#AllGridData').dxDataGrid('instance').option({
                                                            selection: {
                                                                mode: "none",
                                                            }
                                                        });
                                                        $('#cancelTrfBtn').dxButton({
                                                            visible: false,
                                                        });
                                                        $('#TrfSaveBtn').dxButton({
                                                            visible: false,
                                                        });
                                                        $('#customTrfBtn').dxButton({
                                                            visible: true,
                                                        });
                                                    },
                                                },
                                            },
                                        ],

                                    })
                                } else {
                                    devxtremNotification('No Ticket Selected', 'error', 1500);
                                }
                            }
                        },
                    },
                    { // Transfer Ticket Cancel Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            stylingMode: 'contained',
                            type: 'normal',
                            text: 'CANCEL',
                            elementAttr: {
                                id: 'cancelTrfBtn9'
                            },
                            visible: false,
                            onClick: function (e) {
                                $('#AllGridData').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "none",
                                    }
                                });
                                $('#cancelTrfBtn9').dxButton({
                                    visible: false,
                                });
                                $('#TrfSaveBtn9').dxButton({
                                    visible: false,
                                });
                                $('#customTrfBtn9').dxButton({
                                    visible: true,
                                });
                            },
                        },
                    },
                    { // Transfer Ticket Button
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            stylingMode: 'contained',
                            type: 'normal',
                            text: 'TRF',
                            elementAttr: {
                                id: 'customTrfBtn9'
                            },
                            onClick: function (e) {
                                $('#AllGridData').dxDataGrid('instance').option({
                                    selection: {
                                        mode: "multiple",
                                    }
                                });
                                $('#cancelTrfBtn9').dxButton({
                                    visible: true,
                                });
                                $('#TrfSaveBtn9').dxButton({
                                    visible: true,
                                });
                                $('#customTrfBtn9').dxButton({
                                    visible: false,
                                });
                            },
                        },
                    },
                    'columnChooserButton',
                    'searchPanel',
                    'addRowButton',


                ],
            },
            masterDetail: {
                enabled: true,
                template: masterDetailTemplate,
            },

        });
        return allgridcontainer;
    }

    // $(function () {
    //     $("#boxContainer").dxBox({
    //         direction: "row",
    //         height: 100
    //     });
    // });
    $("#popup").dxPopup({
        width: 1500,
        height: 'auto',
        contentTemplate: function (contentElement) {
            var groupForm = $("<div>").appendTo(contentElement).dxForm({
                formData: {},
                colCount: 2,
                items: [
                    {
                        dataField: "ApplicationDate",
                        editorType: "dxDateBox",
                        label: { text: "Apply Date" },
                        editorOptions: {
                            displayFormat: 'dd-MM-yyyy',
                            placeholder: 'dd-mm-yyyy',
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'ApplicationDate is required',
                        }],
                    },
                    {
                        dataField: "Name",
                        label: { text: "Candidate" },
                        editorOptions: {
                            placeholder: "Person Name",

                        },
                        editorType: "dxTextBox",
                        validationRules: [{
                            type: 'required',
                            message: 'Name is required',
                        }],
                    },
                    {
                        dataField: "Mobile",
                        label: { text: "Mobile" },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            placeholder: "Mobile No",
                        },

                        validationRules: [{
                            type: 'required',
                            message: 'MobileNo is required',
                        }],
                    },
                    {
                        dataField: "Email",
                        label: { text: "Email" },
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Email",
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Email is required',
                        }, {
                            type: 'email',
                            message: 'Email is invalid',
                        }],

                    },
                    {
                        dataField: "Profession",
                        editorType: "dxSelectBox",
                        label: { text: "Profile" },
                        editorOptions: {
                            items: [
                                'Technical Support',
                                'ASP.Net',
                                'Wordpress Developer',
                                'Laravel PHP Developer',
                                'Sales Manager',
                                'Android Developer',
                                'C# Developer',
                            ],
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Profile is required',
                        }],
                    },
                    {
                        dataField: "Experience",
                        label: { text: "Experience" },
                        editorOptions: {
                            placeholder: "Experience in Months (Year)",
                            showSpinButtons: true,
                        }
                    },
                    {
                        dataField: "Source",
                        editorType: "dxSelectBox",
                        label: { text: "Source" },
                        editorOptions: {
                            items: [
                                'Linkedin',
                                'Indeed',
                                'Apna Job',
                                'E-Mail',
                                'Consultancy',
                            ],
                        },
                    },
                    {
                        dataField: "Stage",
                        editorType: "dxSelectBox",
                        label: { text: "Stage" },
                        editorOptions: {
                            items: [
                                'Selected',
                                'Rejected',
                            ]
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Stage is required',
                        }],
                    },
                    {
                        dataField: "InterviewDate",
                        label: { text: "Interview Date" },
                        editorType: "dxDateBox",
                        editorOptions: {
                            displayFormat: 'dd-MM-yyyy',
                            placeholder: 'dd-mm-yyyy',
                        }
                    },
                    {
                        dataField: "InterviewType",
                        editorType: "dxSelectBox",
                        label: { text: "Interview Type" },
                        editorOptions: {
                            items: ['Telephonic', 'Technical', 'Practical']
                        }
                    },
                    {
                        dataField: "noticePeriod",
                        editorType: "dxTextBox",
                        label: { text: "Notice Period" },
                        editorOptions: {
                            placeholder: "Notice Period",
                        }
                    },
                    {
                        dataField: "Current Salary",
                        editorType: "dxNumberBox",
                        label: { text: "Current Salary" },
                        editorOptions: {
                            placeholder: "Current Salary",
                        }
                    },
                    {
                        dataField: "Expected Salary",
                        editorType: "dxNumberBox",
                        label: { text: "Expected Salary" },
                        editorOptions: {
                            placeholder: "Expected Salary",
                        }
                    },
                    {
                        dataField: "skills",
                        label: { text: "Skills" },
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Skills",
                        }
                    },
                    // {
                    //     dataField: "JoiningDate",
                    //     label: { text: "Joining Date" },
                    //     editorType: "dxDateBox",
                    //     editorOptions: {
                    //         type: "date",
                    //         displayFormat: 'dd-MM-yyyy',
                    //         placeholder: 'dd-mm-yyyy',
                    //         elementAttr: {
                    //             id: 'JoiningDate'
                    //         }
                    //     }
                    // },
                    {
                        dataField: "ReferedBy",
                        label: { text: "Referred By" },
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Reference By",
                        }
                    },
                    {
                        dataField: "Resume",
                        label: { text: "Resume" },
                        editorType: "dxFileUploader",
                        editorOptions: {
                            multiple: false,
                            accept: ".pdf,.doc,.docx",
                            uploadUrl: '/hr/induction/upload_resume?_token=',
                            onUploaded: function (e) {
                                var getjson = JSON.parse(e.request.response);
                                localStorage.setItem('induction_img_upload', getjson['fileName']);
                            },
                        }
                    },
                    {
                        dataField: "Description",
                        label: { text: "Notes" },
                        editorType: "dxTextArea",
                        colSpan: 2,
                        editorOptions: {
                            height: 120,
                        }
                    },
                    {
                        itemType: "empty",
                        colSpan: 2,
                    },
                ]
            });

            const $toolbar = $('<div>').dxToolbar({
                items: [
                    {
                        widget: 'dxButton',
                        location: 'after',
                        options: {
                            text: 'Create',
                            type: 'normal',
                            onClick: () => {
                                groupForm.dxForm('instance').validate();
                            },
                        },
                    },
                    {
                        widget: 'dxButton',
                        location: 'after',
                        options: {
                            text: 'Cancel',
                            type: 'normal',
                            onClick: () => {
                                $("#popup").dxPopup("instance").hide();

                            },
                        },
                    },
                ],
            });

            return $('<div>')
                .append(groupForm)
                .append($toolbar)
        },
        showTitle: true,
        title: "Create",
        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: true
    });


    $('#action-add').dxSpeedDialAction({
        icon: 'add',
        onClick: function () {
            $("#popup").dxPopup("instance").show();
        }
    });

    function masterDetailTemplate(_, masterDetailOptions) {
        console.log(masterDetailOptions.data);

        return $('<div>').dxTabPanel({
            items: [
                {
                    title: 'Log',
                    template: Log(masterDetailOptions.data),
                },
                {
                    title: 'Reply',
                    template: replyForm(masterDetailOptions.data),
                },
                {
                    title: 'Call Log',
                    template: callLog(masterDetailOptions.data),
                }
            ],
        });
    }

    // function masterDetailTemplate1(_, masterDetailOptions) {
    //     return $('<div>').dxTabPanel({
    //         items: [
    //             {
    //                 title: 'Ticket Log',
    //                 template: ticketLog(masterDetailOptions.data),
    //             },

    //         ],
    //         onTitleClick: function (e) {
    //             if (e.itemData.title === 'Edit Ticket Header') {
    //                 $("#buttonContainer").trigger("dxclick");
    //             }
    //         }
    //     });
    // }


    //   ticketLog
    function Log(masterDetailData) {
        return function () {
            let Logdatagrid;
            function onDataGridInitialized(e) {
                Logdatagrid = e.component;
            }
            return $('<div>').dxForm({
                items: [{
                    template: LogdatagridData(onDataGridInitialized),
                }],
            });
        };
    }

    function LogdatagridData(onDataGridInitialized) {
        return function () {
            return $('<div>').dxDataGrid({
                onInitialized: onDataGridInitialized,
                dataSource: logData,
                headerFilter: {
                    visible: true,
                },
                filterRow: {
                    visible: true
                },
                showBorders: true,
                columns: [
                    {
                        dataField: 'Date & Time',
                        dataType: 'datetime',
                        displayFormat: 'dd-MM-yyyy H:m:s',
                        width: 130,
                    },
                    {
                        dataField: 'Description',

                    }, {
                        dataField: 'Attachments',
                        width: 100,


                    }, {
                        dataField: 'Notes',

                    }

                ],
            });
        };
    }

    // Reply
    const replyForm = (data) => () => {
        const $form = $('<div>').dxForm({
            colCount: 2,
            items: [
                {
                    dataField: "Profile",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        value: data.Profile,
                        readOnly: true,
                        items: [
                            'Technical Support',
                            'ASP.Net',
                            'Wordpress Developer',
                            'Laravel PHP Developer',
                            'Sales Manager',
                            'Android Developer',
                            'C# Developer',
                        ],
                        value: "",
                    },
                },
                {
                    dataField: "Experience",
                    // editorType: "dxNumberBox",
                    editorOptions: {
                        value: data.Experience,
                        min: 0,
                        max: 300,
                        showSpinButtons: true,
                        format: "#,##0",
                        width: "100%",
                        onValueChanged: function (e) {
                            if (e.value > 300) {
                                DevExpress.ui.notify(
                                    "Value cannot exceed 300.",
                                    "error",
                                    1000
                                );
                                e.component.option("value", 300);
                            }
                            console.log("New value:", e.value);
                        },
                        readOnly: true,
                    },
                },
                {
                    dataField: "Stages",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        items: [
                            'Selected',
                            'Rejected',
                        ],
                        value: "",
                    },
                },
                {
                    dataField: 'FollowupOn',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        value: data.FollowupOn,
                        type: 'datetime'
                    }
                },
                {
                    dataField: "InterviewDate",
                    editorType: "dxDateBox",
                    editorOptions: {
                        value: data.InterviewDate,
                        placeholder: "dd-mm-yyyy",
                    },
                },
                // {
                //     dataField: "Interview Type",
                //     editorType: "dxSelectBox",
                //     editorOptions: {
                //         items: [
                //             'Telephonic',
                //             'Technical',
                //             'Practical'
                //         ],
                //         value: "",
                //     },
                // },
                {
                    dataField: 'DueDate',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        value: data.DueDate,
                        type: 'date'
                    }
                },
                {
                    dataField: "NoticePeriod",
                    editorType: "dxTextBox",
                    editorOptions: {
                        readOnly: true,
                        placeholder: "Notice Period",
                    },
                },
                {
                    dataField: "Current Salary",
                    editorType: "dxNumberBox",
                    editorOptions: {
                        readOnly: true,
                        placeholder: "Current Salary",
                        format: "#,##0",
                        value: "",
                    },
                },
                {
                    dataField: "Expected Salary",
                    editorType: "dxNumberBox",
                    editorOptions: {
                        readOnly: true,
                        placeholder: "Expected Salary",
                        format: "#,##0",
                        value: "",
                    },
                },
                {
                    dataField: "Skills",
                    editorType: "dxTextBox",
                    editorOptions: {
                        readOnly: true,
                        placeholder: "Knowledge",
                    },
                },
                {
                    dataField: "ReferedBy",
                    editorType: "dxTextBox",
                    editorOptions: {
                        readOnly: true,
                        placeholder: "Reference Person",
                    },
                },
                // {
                //     dataField: "joiningDate",
                //     editorType: "dxDateBox",
                //     editorOptions: {
                //         placeholder: "dd-mm-yyyy",
                //     },
                // },
                {
                    dataField: "Resume",
                    label: {
                        text: 'Resume',
                    },
                    editorType: "dxFileUploader",
                    editorOptions: {
                        multiple: false,
                        accept: ".pdf,.doc,.docx",
                    }
                },
                {
                    dataField: "Responce",
                    editorType: "dxTextArea",
                    colSpan: 2,
                    editorOptions: {
                        height: 140,

                    },
                },
                {
                    itemType: "empty",
                    colSpan: 2,
                },
            ],

        });

        const $toolbar = $('<div>').dxToolbar({
            items: [
                {
                    widget: 'dxButton',
                    location: 'after',
                    options: {
                        text: 'Update',
                        type: 'normal',
                        onClick: () => {
                            console.log('Update button clicked');
                        },
                    },
                },
                {
                    widget: 'dxButton',
                    location: 'after',
                    options: {
                        text: 'Cancel',
                        type: 'normal',
                        onClick: () => {
                            console.log('Cancel button clicked');
                            $("#NewGridContainer").dxDataGrid("instance").collapseAll(-1);
                        },
                    },
                },
            ],
        });

        return $('<div>')
            .append($form)
            .append($toolbar)

    };


    //  Call Log
    function callLog(masterDetailData) {
        return function () {
            let Logdatagrid;
            function onDataGridInitialized(e) {
                Logdatagrid = e.component;
            }
            return $('<div>').dxForm({
                items: [{
                    template: callLogdatagridData(onDataGridInitialized),
                }],
            });
        };
    }


    function callLogdatagridData(onDataGridInitialized) {
        return function () {
            return $('<div>').dxDataGrid({
                onInitialized: onDataGridInitialized,
                dataSource: callLogData,
                headerFilter: {
                    visible: true,
                },
                filterRow: {
                    visible: true
                },
                showBorders: true,
                columns: [
                    {
                        dataField: 'Log Date & Time',
                        dataType: 'datetime',
                        displayFormat: 'dd-MM-yyyy H:m:s',
                    }, {
                        dataField: 'ContactName',

                    }, {
                        dataField: 'ExtensionNo',


                    }, {
                        dataField: 'Number',

                    }, {
                        dataField: 'Flow',

                    }, {
                        dataField: 'Event',


                    }, {
                        dataField: 'DeviceType',

                    }, {
                        dataField: 'Disposition',

                    }, {
                        dataField: 'AnswerTime',
                        dataType: 'datetime',
                        displayFormat: 'dd-MM-yyyy H:m:s',

                    }, {
                        dataField: 'EndTime',
                        dataType: 'datetime',
                        displayFormat: 'dd-MM-yyyy H:m:s',

                    }, {
                        dataField: 'CallRecording'
                    }

                ],
            });
        };
    }
});

