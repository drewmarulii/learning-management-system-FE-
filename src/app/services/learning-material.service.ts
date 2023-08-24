import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { LearningMaterialInsertReqDto } from "@dto/learning-material/learning-material-insert.req.dto";
import { LearningMaterialResDto } from "@dto/learning-material/learning-material.res.dto";

@Injectable({
    providedIn: 'root'
})
export class LearningMaterialService {
    
    constructor(private base : BaseService) { }

    insertMaterial(data : LearningMaterialInsertReqDto) : Observable<LearningMaterialInsertReqDto> {
        return this.base.post<LearningMaterialInsertReqDto>('http://localhost:8080/materials', data, true)
    }

    getByLearning(id : number) : Observable<LearningMaterialResDto[]> {
        return this.base.get<LearningMaterialResDto[]>(`http://localhost:8080/materials/learning?id=${id}`, true)
    }

    getById(id : Number) : Observable<LearningMaterialResDto> {
        return this.base.get<LearningMaterialResDto>(`http://localhost:8080/materials/detail?id=${id}`, true)
    }
}