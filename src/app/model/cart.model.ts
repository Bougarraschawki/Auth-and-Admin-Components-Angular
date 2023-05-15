import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()

export class Cart {
    public lines: CartLine[] = [];
    public itemCount: number = 0
    public cartPrice: number = 0;

    addLine(product: Product, quantity: number = 1) {
        let line = this.lines.find(line => line.product.id == product.id);
        if(line != undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculator();
    }

    updateQuantity(product: Product, quantity: number){
        let line = this.lines.find(line => line.product.id == product.id);
        if (line != undefined) {
            line.quantity = Number(quantity);
        }
        this.recalculator();
    }

    removeLine(id: number) {
        let index = this.lines.findIndex(line => line.product.id == id);
        this.lines.splice(index, 1);
        this.recalculator();
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculator() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(lin => {
            this.itemCount += lin.quantity;
            this.cartPrice += lin.lineTotal;
        })
    }


}

export class CartLine {
    constructor(
        public product: Product,
        public quantity: number
    ) {}

    get lineTotal() {
        return this.quantity * (this.product.price ?? 0);
    }
}