export class Orderdet {
    constructor(public cityId:string="",
    public street:string="",
    public orderDate:Date=new Date(),
    public creditCard:number=null,
    public price:number=null
    ){

    }
}
