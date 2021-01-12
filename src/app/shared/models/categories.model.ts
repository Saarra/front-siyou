export class Categories {
    id: number;
    created_at: Date;
    updated_at:Date;
    category_name: string;
    category_it: string;
    category_cn: string;
    category_fr: string;
    parent_category_id : number;
    sub_categories: [];
}
