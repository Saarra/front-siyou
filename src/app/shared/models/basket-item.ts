export class BasketItem {
    constructor() {}
    quantity: number;
    item_price: number;
    product: any

    get getQuantity() {
        return this.quantity;
    }
    set setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    get getItemPrice() {
        return this.item_price;
    }

    set setItemPrice(item_price: number) {
        this.item_price = item_price;
    }

    get getProduct() {
        return this.product;
    }
    
    set setProduct(product: any) {
        this.product = product;
    }
}