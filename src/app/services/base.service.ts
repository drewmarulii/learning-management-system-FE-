import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private toast: ToastrService,
        private router : Router) { }


    private get token(): string | null {
        const profile = this.authService.getProfile()
        if (profile && profile.token) {
            return profile.token
        }

        return null
    }

    private get header() {
        return {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
    }

    post<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.post<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.toast, this.router))
    }

    get<T>(url: string, withToken: true): Observable<T> {
        return this.http.get<T>(url, (withToken ? this.header : undefined))
            .pipe(response(this.toast, this.router))
    }

    patch<T>(url: string, body: any, withToken: true): Observable<T> {
        if (withToken) {
            return this.http.patch<T>(url, body, this.header)
        } else {
            return this.http.patch<T>(url, body)
        }
    }
}

function response<T>(
    toast: ToastrService,
    router : Router
    ) {
    return tap<T>({
        next: (data) => {
            if (data && (data as any).message) {
                toast.success((data as any).message)
            }
        },
        error: (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err && err.error && err.error.message) {
                    toast.error(err.error.message)

                    if (err.status == 401 && err.error.message === 'Token Expired') {
                        localStorage.clear()
                        router.navigateByUrl('/login')
                    }
                }

            }
        }
    })
}