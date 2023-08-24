import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { StudentRegistrationReqDto } from "@dto/registration/student-registration.req.dto";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private base : BaseService) { }

    insertStudent(data : StudentRegistrationReqDto): Observable<StudentRegistrationReqDto> {
        return this.base.post<StudentRegistrationReqDto>('http://localhost:8080/registration', data, true)
    }
}