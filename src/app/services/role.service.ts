import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { UserRoleResDto } from "../dto/users/user-role.res.dto";

@Injectable({
    providedIn : 'root'
})
export class RoleService {
    
    constructor(private base: BaseService) { }

    getAllRoles(): Observable<UserRoleResDto[]> {
        return this.base.get<UserRoleResDto[]>('http://localhost:8080/users/roles', true)
    }
}