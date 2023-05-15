import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { Order } from './order.model';

const PROTOCOL = "http";
const PORT = 3500;

@Injectable() 

export class RestDataSource {
    
    baseUrl: string;

    // http://localhost:3500

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    // http://localhost:3500/products

    getProducts() : Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products");
    }

    // post
    // http://localhost:3500/orders

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }
}