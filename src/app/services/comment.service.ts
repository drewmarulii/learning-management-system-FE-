import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CommentInsertReqDto } from "@dto/comment/comment-insert.req.dto";
import { CommentResDto } from "@dto/comment/comment.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    
    constructor(private base : BaseService) { }

    insertComment(data : CommentInsertReqDto) {
        return this.base.post<CommentInsertReqDto>('http://localhost:8080/comment', data, true)
    }

    getComments(id : number) : Observable<CommentResDto[]> {
        return this.base.get<CommentResDto[]>(`http://localhost:8080/comment?id=${id}`, true)
    }
} 