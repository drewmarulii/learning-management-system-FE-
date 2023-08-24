import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ClassSubjectResDto } from "@dto/class-subject/class-subject.res.dto";
import { ClassService } from "@services/class.service";

@Component({
    selector: 'class-subject-list',
    templateUrl: './class-subject-list.component.html'
})
export class ClassListComponent implements OnInit {

    classes!: ClassSubjectResDto[]
    imgUrl!: string

    constructor(
        private classService: ClassService,
        private title: Title
    ) {  
        this.title.setTitle('Class List | Learning Management System')
    }

    ngOnInit(): void {
        this.classService.getAllClasses()
            .subscribe((res) => {
                this.classes = res
            })
    }

}