import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { FileResDto } from "../dto/file/file.res.dto";
import { FileInsertReqDto } from "../dto/file/file-insert.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class FileService {

    constructor(private base: BaseService) { }

    getById(id : number): Observable<FileResDto> {
        return this.base.get<FileResDto>(`http://localhost:8080/files/${id}`, true)
    }

    insertUser(data : FileInsertReqDto) : Observable<FileInsertReqDto> {
        return this.base.post<FileInsertReqDto>('http://localhost:8080/files', data, true)
    }
}