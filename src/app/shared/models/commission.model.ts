export class Commission {
    id: number;
    commission_percent: number;
    commission_amount:number;
    commission_date: string;
    Deposit: number;
    Deposit_rest: number;
    order_id:number;
    supplier_id: number;
    // created_at: string;
    // updated_at: string;
    user: string;
    order: string;
    siyoucommissions: [{
        commission_percent : number;
    }
    ]
}
