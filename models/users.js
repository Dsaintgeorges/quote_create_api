/*create class users with id firstname lastname email
adress_road adress_number postal_code city vat_number
phone_number*/
export class Users{
    id;
    firstname;
    lastname;
    email;
    adress_road;
    adress_number;
    postal_code;
    city;
    vat_number;
    phone_number;

    constructor(id, firstname, lastname, email, adress_road, adress_number, postal_code, city, vat_number, phone_number){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.adress_road = adress_road;
        this.adress_number = adress_number;
        this.postal_code = postal_code;
        this.city = city;
        this.vat_number = vat_number;
        this.phone_number = phone_number;
    }
}


