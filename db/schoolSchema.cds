using {
    managed
} from '@sap/cds/common';


namespace sap.capire.school;

entity Department : managed {
    key ID : String(10);
    departmentName : String(100);

    // A department has many teachers

    teachers : Association to many Teacher
                    on teachers.department = $self;
}

entity Teacher : managed {
    key ID : String(10);
    firstName : String(50);
    lastName  : String(50);
    email : String(100);
    phone : String(100);

    // Each Teacher belongs to a department

    department : Association to Department;

    // A teacher has many students

    students : Association to many Student
                    on students.teacher = $self;
}

entity Student : managed {
    key ID : String(10);
    firstName : String(50);
    lastName : String(50);   

    // Each Student belongs to a teacher

    teacher : Association to Teacher;

    // navigation to student details , each student has i detail record


    details : Association to StudentDetails
                on details.student = $self;
}

entity StudentDetails : managed {
    key ID : String(10);
    rollNumber : String(10); 
    admissionNumber : String(20);
    dateOfBirth : Date;
    gender : String(10);
    bloodGroup : String(5);
    address : String(200);

    // Each student Details belongs to one student

    student : Association to Student;
}

