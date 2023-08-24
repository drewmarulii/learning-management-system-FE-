import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { LearningInsertReqDto } from "@dto/learning/learning-insert.req.dto";
import { LearningTaskResDto } from "@dto/learning-task/learning-task.res.dto";
import { LearningTaskInsertReqDto } from "@dto/learning-task/learning-task-insert.req.dto";
import { QuestionResDto } from "@dto/question/question.res.dto";

@Injectable({
    providedIn: 'root'
})
export class LearningTaskService {
    
    constructor(private base : BaseService) { }

    getByLearning(id : number) : Observable<LearningTaskResDto[]> {
        return this.base.get<LearningTaskResDto[]>(`http://localhost:8080/tasks/learning?id=${id}`, true)
    }

    insertTask(data : LearningTaskInsertReqDto) {
        return this.base.post<LearningInsertReqDto>(`http://localhost:8080/tasks`, data, true)
    }

    getById(id : number) : Observable<LearningTaskResDto> {
        return this.base.get<LearningTaskResDto>(`http://localhost:8080/tasks/search?id=${id}`, true)
    }

    getQuestionByTask(id : number) : Observable<QuestionResDto[]> {
        return this.base.get<QuestionResDto[]>(`http://localhost:8080/questions/task?id=${id}`, true)
    }
}