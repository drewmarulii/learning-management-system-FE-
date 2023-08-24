import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { EnrollmentInsertReqDto } from "@dto/enrollment/enrollment-insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {
    
    constructor(private base : BaseService) { }

    insertEnrollment(data : EnrollmentInsertReqDto) {
        return this.base.post<EnrollmentInsertReqDto>('http://localhost:8080/enrollments', data, true)
    }
}