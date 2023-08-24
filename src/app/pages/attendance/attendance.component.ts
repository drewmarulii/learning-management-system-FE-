import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AttendanceResDto } from "@dto/attendance/attendance.res.dto";
import { AttendanceService } from "@services/attendance.service";
import { AuthService } from "@services/auth.service";
import { Observable } from "rxjs";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
    let route = activatedRoute
    if (parentLevel) {
        for (let i = 0; i < parentLevel; i++) {
            if (route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}
@Component({
    selector: 'attendance',
    templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit {
    
    classId!: number
    learningId!: number
    attendances!: AttendanceResDto[]

    attendanceIsApprove = this.fb.group({        
        attendanceId : [0, [Validators.required]],
        isApprove : [true, [Validators.required]]
    })

    constructor(
        private attendanceService : AttendanceService,
        private authService : AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private title: Title
    ) {
        this.title.setTitle('Attendance | Learning Management System')
     }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.classId = Number(res['classId'])
            this.learningId = Number(res['learningId'])
            console.log(this.classId)
            console.log(this.learningId)
        })

       this.getAttendance
    }

    get getAttendance() {
        return this.attendanceService.getAttendance(this.learningId).subscribe((res) => {
            this.attendances = res
        })
    }

    getId(a : number) : void {
        this.attendanceIsApprove.patchValue({
            attendanceId: a
        })
    }

    onApprove() : void {
        if (this.attendanceIsApprove.valid) {
            const data = this.attendanceIsApprove.getRawValue()
            this.attendanceService.setApproval(data).subscribe((res) => {
                this.getAttendance
            })
        }
    }
}