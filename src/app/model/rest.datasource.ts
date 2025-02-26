import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from './product.model';
import { Observable, map } from 'rxjs';
import { Order } from './order.model';
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = "http";
const PORT = 3500;

@Injectable() 

export class RestDataSource {
    
    baseUrl: string;
    auth_token?: string;

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

    authenticate(user: string, pass: string): Observable<boolean>{
        return this.http.post<any>(
            this.baseUrl + "login",
            {
                name: user,
                password: pass
            }
        ).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }))
    }

    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products", product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}products/${product.id}`, product, this.getOptions());
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.baseUrl}products/${id}`, this.getOptions());
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + 'orders', this.getOptions());
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}Order/${id}`, this.getOptions());
    }

    updateOrder(order: Order): Observable<Order>{
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`, order, this.getOptions());
    }

    private getOptions(){
        return {headers: new HttpHeaders(
            {'Authorisation': `Bearer${this.auth_token}`}
        )}
    }

}