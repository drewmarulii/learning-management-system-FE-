import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CommentResDto } from "@dto/comment/comment.res.dto";
import { ForumResDto } from "@dto/forum/forum.res.dto";
import { UserListResDto } from "@dto/users/user-list.res.dto";
import { AuthService } from "@services/auth.service";
import { CommentService } from "@services/comment.service";
import { ForumService } from "@services/forum.service";
import { UserService } from "@services/user.service";
import { Observable } from "rxjs";

function getParams(activatedRoute : ActivatedRoute, parentLevel? : number) : Observable<Params> {
    let route = activatedRoute
    if(parentLevel) {
        for(let i=0; i<parentLevel; i++) {
            if(route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}
@Component({
    selector: 'forum',
    templateUrl: './forum.component.html'
})
export class ForumComponent implements OnInit {

    user? : UserListResDto
    userId! : number
    forumId! : number
    classId! : number
    learningId! : number 
    forum? : ForumResDto
    comments! : CommentResDto[]

    commentInsertReqDto = this.fb.group({
        commentDesc : ['', [Validators.required]],
        forumId : [0, [Validators.required]],
        userId : [0, [Validators.required]]
    })

    constructor(
        private forumService: ForumService,
        private commentService : CommentService,
        private userService : UserService,
        private authService: AuthService,
        private fb : NonNullableFormBuilder,
        private route: ActivatedRoute,
        private router : Router,
        private title : Title
    ) {
        this.title.setTitle('Forum | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.classId = Number(res['classId'])
            this.learningId = Number(res['learningId'])
        })

        this.getLearningForum(this.learningId)
    }

    private getLearningForum(id : number) {
        this.forumService.getForum(id).subscribe((res) => {
            this.forum = res
            const profile = this.authService.getProfile()
            if(profile) {
                this.commentInsertReqDto.patchValue({
                    forumId : res.id,
                    userId : profile.id
                })
            }

            this.getForumComments(res.id)
        })
    }

    private getForumComments(id : number) {
        this.commentService.getComments(id).subscribe((res) => {
            this.comments = res
        })
    }

    private getUser(id : number) {
        this.userService.getById(id).subscribe((res) => {
            this.user = res
        })
    }

    onCreate() {
        const data = this.commentInsertReqDto.getRawValue()
        this.commentService.insertComment(data).subscribe((res) => {
            this.getLearningForum(this.learningId)
            this.router.navigateByUrl(`/myclass/${this.classId}/learning/detail/${this.learningId}/forum`)
        })
    }
}