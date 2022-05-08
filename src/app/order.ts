import { Item } from "./item";
import { User } from "./user";

export class Order{

    private id: number = -1;

    public setId(id: number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    constructor(
    public username: string,
    public orderDate: string,
    public orderedItemId: string,
    public orderedItemName: string,
    public orderedItemCost: number){
    }
}