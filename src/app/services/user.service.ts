import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UserListResDto } from "@dto/users/user-list.res.dto";
import { UserInsertReqDto } from "@dto/users/user-insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private base : BaseService) { }

    getAllUsers(): Observable<UserListResDto[]> {
        return this.base.get<UserListResDto[]>('http://localhost:8080/users', true)
    }

    getByRoleCode(code : string): Observable<UserListResDto[]> {
        return this.base.get<UserListResDto[]>(`http://localhost:8080/users/search?code=${code}`, true)
    }

    insertUser(data : UserInsertReqDto): Observable<UserInsertReqDto> {
        return this.base.post<UserInsertReqDto>('http://localhost:8080/users', data, true)
    }

    getById(code : number): Observable<UserListResDto> {
        return this.base.get<UserListResDto>(`http://localhost:8080/users/find?id=${code}`, true)
    }
}