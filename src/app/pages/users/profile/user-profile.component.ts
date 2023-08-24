import { Component, OnInit } from "@angular/core";
import { UserListResDto } from "../../../dto/users/user-list.res.dto";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
    imgUrl! : number
    myProfile! : UserListResDto

    constructor(
        private authService : AuthService,
        private userService : UserService
    ) { }

    ngOnInit() : void {
        const profile = this.authService.getProfile()
        if(profile) {
            this.imgUrl = profile.photoId
            this.userService.getById(profile.id)
                .subscribe((res) => {
                    this.myProfile = res
                })
        }

    }
}