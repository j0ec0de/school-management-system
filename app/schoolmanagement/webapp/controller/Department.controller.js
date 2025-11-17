sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "schoolmanagement/custom/CustomActions"
], function (Controller, CustomActions) {
    "use strict";

    return Controller.extend("schoolmanagement.controller.Department", {

        onInit() {},

        create: function () {
            CustomActions.create(this);  // pass controller context
        }

    });
});
