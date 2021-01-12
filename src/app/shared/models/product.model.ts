export class Product {
    id : number;
    product_name: string;
    product_description: string;
    taxe_rate: number;
    category_id: number;
    supplier_id: number;
    created_at: any;
    updated_at: any;
    brand_id: number;
    brand: [{
        id: number;
        brand_name: string;
        brand_logo: string;
        created_at: any;
        updated_at: any;
    }];
    items:[{
        id: number;
        item_online_price: number;
        item_offline_price: number;
        item_package: any;
        item_box: any;
        item_barcode: number;
        item_warn_quantity: number;
        item_quantity: number;
        item_discount_type: any;
        item_discount_price: number;
        product_base_id: number;
        created_at: any;
        updated_at: any;

        images:[

        ];
        criteria_base:[{
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            pivot: [{
                product_item_id : number;
                criteria_id: number;
                criteria_value: string;
                criteria_unit_id: number;
                created_at: any;
                updated_at: any;
            }];
           

        }]
    }];
}
