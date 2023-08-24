import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { AttendanceInsertReqDto } from "@dto/attendance/attendance-insert.req.dto";
import { AttendanceResDto } from "@dto/attendance/attendance.res.dto";
import { Observable } from "rxjs";
import { AttendanceIsApproveReqDto } from "@dto/attendance/attendance-isapprove.req.dto";

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    
    constructor(private base : BaseService) { }

    insertAttendance(data : AttendanceInsertReqDto) {
        return this.base.post<AttendanceInsertReqDto>('http://localhost:8080/attendances', data, true)
    }

    getAttendance(id : number) : Observable<AttendanceResDto[]> {
        return this.base.get<AttendanceResDto[]>(`http://localhost:8080/attendances/learning?id=${id}`, true)
    }

    setApproval(data : AttendanceIsApproveReqDto) {
        return this.base.patch<AttendanceIsApproveReqDto>(`http://localhost:8080/attendances`, data, true)
    }
}