export class User{

    public uid: string = '';

    public setUid(id: string){
        this.uid = id;
    }

    public getUid(){
        return this.uid;
    }

    constructor(
    public username: string,
    public password: string,
    public email: string,
    public isAdmin: boolean,
    public postCode: string,
    public city: string,
    public country: string,
    public address: string){}
}