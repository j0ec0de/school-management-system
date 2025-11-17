sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"schoolmanagement/test/integration/pages/DepartmentList",
	"schoolmanagement/test/integration/pages/DepartmentObjectPage",
	"schoolmanagement/test/integration/pages/TeacherObjectPage"
], function (JourneyRunner, DepartmentList, DepartmentObjectPage, TeacherObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('schoolmanagement') + '/test/flp.html#app-preview',
        pages: {
			onTheDepartmentList: DepartmentList,
			onTheDepartmentObjectPage: DepartmentObjectPage,
			onTheTeacherObjectPage: TeacherObjectPage
        },
        async: true
    });

    return runner;
});

