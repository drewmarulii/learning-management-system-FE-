import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ClassSubjectResDto } from "@dto/class-subject/class-subject.res.dto";
import { ClassSubjectInsertResDto } from "@dto/class-subject/class-subject-insert.req.dto";
import { LearningResDto } from "@dto/learning/learning.res.dto";
import { LearningInsertReqDto } from "@dto/learning/learning-insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class LearningService {
    
    constructor(private base : BaseService) { }

    getById(id : number) : Observable<LearningResDto[]> {
        return this.base.get<LearningResDto[]>(`http://localhost:8080/learnings/class?code=${id}`, true)
    }

    insertLearning(data : LearningInsertReqDto) : Observable<LearningInsertReqDto> {
        return this.base.post<LearningInsertReqDto>('http://localhost:8080/learnings', data, true)
    }

    getByLearning(id : number) : Observable<LearningResDto> {
        return this.base.get<LearningResDto>(`http://localhost:8080/learnings/id?id=${id}`, true)
    }
}