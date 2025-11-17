using SchoolService as service from '../../srv/school-service';
annotate service.Department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'departmentName',
                Value : departmentName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teachers',
            Target : 'teachers/@UI.LineItem'
        }
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'departmentName',
            Value : departmentName,
        },
    ],
);

// level 2

annotate service.Teacher with @(
    UI.HeaderInfo : {
        TypeName        : 'Teacher',
        TypeNamePlural  : 'Teachers',
        Title           : { Value : firstName },
        Description     : { Value : lastName }     
    },
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Teacher ID',
            Value : ID
        },
        {
            $Type : 'UI.DataField',
            Label : 'First Name',
            Value : firstName
        },
        {
            $Type : 'UI.DataField',
            Label : 'Last Name',
            Value : lastName
        },
        {
            $Type : 'UI.DataField',
            Label : 'Email',
            Value : email
        },
        {
            $Type : 'UI.DataField',
            Label : 'Phone Number',
            Value : phone
        },
    ],

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Students',
            Target : 'students/@UI.LineItem'
        }
    ]
);

annotate service.Student with @(
    UI.HeaderInfo : {
        TypeName: 'Student',
        TypeNamePlural: 'Students',
        Title: { Value: firstName },
        Description: { Value: lastName }
    },
    UI.Identification : [
        { $Type:'UI.DataField', Label:'Student ID', Value: ID },
        { $Type:'UI.DataField', Label:'First Name', Value: firstName },
        { $Type:'UI.DataField', Label:'Last Name',  Value: lastName }
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Student ID',
            Value : ID
        },
        {
            $Type : 'UI.DataField',
            Label : 'First Name',
            Value : firstName
        },
        {
            $Type : 'UI.DataField',
            Label : 'Last Name',
            Value : lastName
        },
    ],
    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'General Information',
            Target : '@UI.Identification'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Student Details',
            Target : 'details/@UI.FieldGroup#DetailsGroup'
        }
    ],
);

annotate service.StudentDetails with @(
    UI.FieldGroup #DetailsGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            { $Type : 'UI.DataField', Value: rollNumber,        Label: 'Roll Number' },
            { $Type : 'UI.DataField', Value: admissionNumber,  Label: 'Admission Number' },
            { $Type : 'UI.DataField', Value: dateOfBirth,      Label: 'Date of Birth' },
            { $Type : 'UI.DataField', Value: gender,           Label: 'Gender' },
            { $Type : 'UI.DataField', Value: bloodGroup,       Label: 'Blood Group' },
            { $Type : 'UI.DataField', Value: address,          Label: 'Address' }
        ]
    },

    UI.HeaderInfo : {
        TypeName: 'Student Details',
        TypeNamePlural: 'Student Details',
        Title: { Value: rollNumber },
        Description: { Value: admissionNumber }
    }
);





