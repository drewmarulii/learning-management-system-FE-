import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ForumInsertReqDto } from "@dto/forum/forum-insert.req.dto";
import { Observable } from "rxjs";
import { ForumResDto } from "@dto/forum/forum.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ForumService {
    
    constructor(private base : BaseService) { }

    insertForum(data : ForumInsertReqDto) {
        return this.base.post<ForumInsertReqDto>('http://localhost:8080/forum', data, true)
    }

    getForum(id : number) : Observable<ForumResDto> {
        return this.base.get<ForumResDto>(`http://localhost:8080/forum/search?id=${id}`, true)
    }
} 