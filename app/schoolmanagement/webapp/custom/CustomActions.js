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
    "sap/m/Label",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Input"
], function(
BusyIndicator, MessageToast, Dialog, Button, ButtonType, MessageBox, JSONModel, Table, Column, ColumnListItem, Text, Card, VBox, List, StandardListItem, Label, Input
) {
    "use strict";

    return {
        
        create: function() {
            const that = this; // to keep the context of the controller

            // Check if the dialog already exists, if not, create it
            if (!this.oDeptDialog) {

                this.oDeptDialog = new Dialog({
                    title: "Create Department",
                    contentWidth: "380px",
                    draggable: true,
                    resizable: true,

                    content: [
                        new Label({ text: "Department ID" }),  // Label for Department ID
                        new Input("departmentID", { placeholder: "Enter Department ID" }),  // Input for ID

                        new Label({ text: "Department Name" }),  // Label for Department Name
                        new Input("departmentName", { placeholder: "Enter Department Name" })  // Input for Name
                    ],

                    // Define the Create button
                    beginButton: new Button({
                        text: "Create",
                        type: "Emphasized",
                        press: function() {
                            // Get the values of the input fields
                            const oID = sap.ui.getCore().byId("departmentID").getValue();
                            const oName = sap.ui.getCore().byId("departmentName").getValue();

                            // Basic validation
                            if (!oID || !oName) {
                                MessageToast.show("Please fill all the required fields");
                                return;
                            }

                            // Validate ID length
                            if (oID.length > 10) {
                                MessageToast.show("Department ID cannot be more than 10 characters");
                                return;
                            }

                            // Show busy indicator while processing
                            BusyIndicator.show(100);

                            // Make the AJAX call to create the department
                            $.ajax({
                                url: "/odata/v4/school/createDepartment",  // URL of the service to create department
                                type: "POST",  // HTTP method
                                contentType: "application/json",  // The content type of the data being sent
                                data: JSON.stringify({
                                    ID: oID,
                                    departmentName: oName
                                }),  // Data to send in the POST request

                                success: function(response) {
                                    // Hide the busy indicator when done
                                    BusyIndicator.hide();

                                    // Show a success message
                                    MessageToast.show("Department created successfully!");

                                    // Clear the input fields
                                    sap.ui.getCore().byId("departmentID").setValue("");
                                    sap.ui.getCore().byId("departmentName").setValue("");

                                    // Close the dialog
                                    that.oDeptDialog.close();

                                    // Refresh the model (if needed)
                                    sap.ui.getCore().getModel().refresh(true);
                                },

                                error: function(error) {
                                    // Hide the busy indicator in case of an error
                                    BusyIndicator.hide();

                                    // Show an error message
                                    MessageToast.show("Error creating department.");
                                }
                            });
                        }
                    }),

                    // Define the Cancel button
                    endButton: new Button({
                        text: "Cancel",
                        press: function() {
                            that.oDeptDialog.close();  // Close the dialog when the Cancel button is clicked
                        }
                    })
                });
            }

            // Open the dialog
            this.oDeptDialog.open();
        },

        // sort students

        sort: function(oContext) {
            BusyIndicator.show(0); 
            
            if(!oContext) {
                BusyIndicator.hide();
                console.log("context not recieved");
                return;
            }

            const teacherID = oContext.getProperty("ID");
            
            
            jQuery.ajax({
                url: `/odata/v4/school/Teacher('${teacherID}')/students`,
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
        }, 

        sortDepartment: function() {
            BusyIndicator.show(0);

            jQuery.ajax({
                url: "/odata/v4/school/Department",
                type: "GET",
                contentType: "application/json",

                success: function(data) {
                    BusyIndicator.hide();

                    const aDepartments = data.value;
                    console.log("Departments: ",aDepartments);

                    // sort

                    aDepartments.sort(function(a, b){
                        return a.departmentName.localeCompare(b.departmentName)
                    });

                    const oSortedModel = new JSONModel(aDepartments);

                    const oTable = new Table({
                        columns: [
                            new Column({
                                header: new Text({ text: "ID" })
                            }),
                            new Column({
                                header: new Text({ text: "Department Name" })
                            }),
                        ],
                        items: {
                            path: "/",
                            template: new ColumnListItem({
                                cells: [
                                    new Text({ text: "{ID}" }),
                                    new Text({ text: "{departmentName}" })
                                ]
                            })
                        }
                    });

                    oTable.setModel(oSortedModel);

                    const oDialog = new Dialog({
                        title: 'Departments',
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
