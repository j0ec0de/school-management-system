const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    
    this.on('createDepartment', async (req) => {
        const { ID, departmentName } = req.data;

        if (!ID || !departmentName) {
            throw new Error('Both ID and Name are required!');
        }

        const tx = this.transaction(req);
        await tx.run(INSERT.into('Department').entries({ ID, departmentName }));

        return `Department ${departmentName} (ID: ${ID}) created successfully!`;
    });
});
