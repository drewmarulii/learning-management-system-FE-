import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ClassSubjectResDto } from "@dto/class-subject/class-subject.res.dto";
import { ClassSubjectInsertResDto } from "@dto/class-subject/class-subject-insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    
    constructor(private base : BaseService) { }

    getAllClasses() : Observable<ClassSubjectResDto[]> {
        return this.base.get<ClassSubjectResDto[]>('http://localhost:8080/classes', true)
    }

    insertClass(data : ClassSubjectInsertResDto) {
        return this.base.post<ClassSubjectInsertResDto>('http://localhost:8080/classes', data, true)
    }

    getUnenrolledClass(id : number) : Observable<ClassSubjectResDto[]> {
        return this.base.get<ClassSubjectResDto[]>(`http://localhost:8080/classes/student?id=${id}`, true)
    }

    getMyClass(id : number) : Observable<ClassSubjectResDto[]> {
        return this.base.get<ClassSubjectResDto[]>(`http://localhost:8080/classes/myclass?id=${id}`, true)
    }

    getByTeacher(id : number) : Observable<ClassSubjectResDto[]> {
        return this.base.get<ClassSubjectResDto[]>(`http://localhost:8080/classes/teacher?id=${id}`, true)
    }

    getById(id : number) : Observable<ClassSubjectResDto> {
        return this.base.get<ClassSubjectResDto>(`http://localhost:8080/classes/id?code=${id}`, true)
    }
}