import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { product } from '../interfaces/product';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsCollection: AngularFirestoreCollection<product>;

    constructor(private afs: AngularFirestore) { this.productsCollection = this.afs.collection<product>('Products');
}

    getProducts() {
        return this.productsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;

                    return { id, ...data };
                });

            })
        )
    }

    addProduct(product: product) {
        return this.productsCollection.add(product);
     }

    getProduct(id: string) {   
        return this.productsCollection.doc<product>(id).valueChanges();}

    updateProduct(id: string, product: product) { }

    deleteProduct(id: string) { }

}