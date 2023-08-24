import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AttachmentMaterialInsertReqDto } from "@dto/learning-material/attachment-material-insert.req.dto";
import { LearningMaterialService } from "@services/learning-material.service";
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
    selector: 'learning-material-create',
    templateUrl: './learning-material-create.component.html'
})
export class LearningMaterialCreateComponent implements OnInit {

    learning!: number
    class! : number
    files: AttachmentMaterialInsertReqDto[] = []

    learningMaterialInsertReqDto = this.fb.group({
        materialName: ['', [Validators.required]],
        materialText: [''],
        learningId: [0, [Validators.required]],
        attachments: this.fb.array(this.files)
    })

    constructor(
        private learningMaterialService: LearningMaterialService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private title: Title
    ) {
        this.title.setTitle('Create Material | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => { 
            this.class = Number(res['classId'])
        })

        getParams(this.route, 0).subscribe((res) => {
            this.learning = Number(res['id'])
        })

        this.learningMaterialInsertReqDto.patchValue({
            learningId: this.learning
        })
    }

    onCreate(): void {
        if (this.learningMaterialInsertReqDto.valid) {
            const data = this.learningMaterialInsertReqDto.getRawValue()
            this.learningMaterialService.insertMaterial(data).subscribe((result) => {
                this.router.navigateByUrl(`/myclass/${this.class}/learning/detail/${this.learning}`)
            })
        }
    }

    get attachments() {
        return this.learningMaterialInsertReqDto.get('attachments') as FormArray
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        this.attachments.clear()
        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.attachments.push(this.fb.group({
                    file: resultBase64,
                    fileExtension: resultExtension
                }))

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }
}