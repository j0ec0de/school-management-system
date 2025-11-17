sap.ui.define([
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/f/Card",
    "sap/m/VBox",
    "sap/m/List",
    "sap/m/StandardListItem"
], function(
BusyIndicator, MessageToast, Dialog, Button, ButtonType, MessageBox, JSONModel, Table, Column, ColumnListItem, Text, Card, VBox, List, StandardListItem 
) {
    "use strict";

    return {
        create: function(oController) {

            const oModel = oController.getView().getModel();


            // Popup model
            const oPopupModel = new JSONModel({
                ID: "",
                departmentName: ""
            });

            const oDialog = new Dialog({
                title: "Create Department",
                type: "Message",
                contentWidth: "380px",
                content: new VBox({
                    width: "100%",
                    items: [

                        new Label({ text: "Department ID", required: true }),
                        new Input({
                            value: "{popupModel>/ID}",
                            placeholder: "Enter ID (10 chars)"
                        }),

                        new Label({ text: "Department Name", required: true }),
                        new Input({
                            value: "{popupModel>/departmentName}",
                            placeholder: "Enter department name"
                        })
                    ]
                }),

                beginButton: new Button({
                    type: ButtonType.Emphasized,
                    text: "Create",
                    press: async function() {

                        const ID = oPopupModel.getProperty("/ID");
                        const name = oPopupModel.getProperty("/departmentName");

                        if (!ID || !name) {
                            MessageBox.error("Please fill all required fields.");
                            return;
                        }

                        if (ID.length > 10) {
                            MessageBox.error("ID must be max 10 characters.");
                            return;
                        }

                        BusyIndicator.show(0);

                        try {

                            const oContext = oModel.bindContext("/Department").create({
                                departmentName: name
                            });

                            await oContext.created();

                            MessageToast.show("Department created successfully!");
                            oDialog.close();

                        } catch (err) {
                            MessageBox.error("Failed to create Department: " + err.message);
                        } finally {
                            BusyIndicator.hide();
                        }
                    }
                }),

                endButton: new Button({
                    type: ButtonType.Reject,
                    text: "Cancel",
                    press: function() {
                        oDialog.close();
                    }
                }),

                afterClose: function() {
                    oDialog.destroy();
                }
            });

            oDialog.setModel(oPopupModel, "popupModel");
            oDialog.open();
        },

        // sort students

        sort: function() {
            BusyIndicator.show(0);

            jQuery.ajax({
                url: "/odata/v4/school/Student",
                type: "GET",
                contentType: "application/json",

                success: function (data) {
                    BusyIndicator.hide();
                    const aStudents = data.value;

                    console.log("Students: ",aStudents);

                    // sort

                    aStudents.sort(function(a, b) {
                        return a.firstName.localeCompare(b.firstName);
                    });

                    const oSortedModel = new JSONModel(aStudents);

                    const oTable = new Table({
                        columns: [
                            new Column({
                                header: new Text({ text: "Student ID" })
                            }),
                            new Column({
                                header: new Text({ text: "First Name" })
                            }),
                            new Column({
                                header: new Text({ text: "Last Name" })
                            }),
                        ],
                        items: {
                            path: "/",
                            template: new ColumnListItem({
                                cells: [
                                    new Text({ text: "{ID}" }),
                                    new Text({ text: "{firstName}" }),
                                    new Text({ text: "{lastName}" }),
                                ]
                            })
                        }
                    });

                    oTable.setModel(oSortedModel);

                    const oDialog = new Dialog({
                        title: "Students",
                        contentWidth: "50rem",
                        contentHeight: "30rem",
                        content: [oTable],
                        endButton: new Button({
                            text: "Cancel",
                            press: function() {
                                oDialog.close();
                            }
                        }),
                        afterClose: function() {
                            oDialog.destroy();
                        }

                    });
                    oDialog.open();
                },

                error: function(error) {
                    BusyIndicator.hide();
                    MessageBox.error(`Failed: ${error}`);
                }
            })
        }
    };
});
