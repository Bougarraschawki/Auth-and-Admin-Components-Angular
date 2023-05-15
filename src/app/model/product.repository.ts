import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';

@Injectable()

export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];

    // data source --> products , categories
    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(
            data => {
                this.products = data;
                this.categories = data.map(p => p.category ?? "(None)")
                .filter((c, index, array) => array.indexOf(c) == index).sort();
            }
        );
    }

    // method to get products that under specific category
    getProducts(category?: string): Product[] {
        return this.products.filter(p => category == undefined || category == p.category);
    }

    getProduct(id?: number): Product | undefined {
        return this.products.find(p => p.id == id);
    }

    getCategories(): string[] {
        return this.categories;
    }
}