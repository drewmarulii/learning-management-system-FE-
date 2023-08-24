import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { UserListResDto } from "@dto/users/user-list.res.dto";
import { UserService } from "@services/user.service";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

    users!: UserListResDto[]
    imgUrl!: string

    constructor(
        private userService: UserService,
        private title: Title
    ) {
        this.title.setTitle('User List | Learning Management System')
    }

    ngOnInit(): void {
        this.userService.getAllUsers()
            .subscribe((res) => {
                this.users = res
            })
    }
}