import { Injectable } from '@angular/core';

@Injectable()

export class Enviroment{
    public baseUrl: string = "http://localhost:8080";
    public rootUrl: string = "/api/usuario";
}