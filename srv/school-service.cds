using {sap.capire.school as my} from '../db/schoolSchema';

service SchoolService {
    entity Department as projection on my.Department;
    entity Teacher as projection on my.Teacher;
    entity Student as projection on my.Student;
    entity StudentDetails as projection on my.StudentDetails;
}


