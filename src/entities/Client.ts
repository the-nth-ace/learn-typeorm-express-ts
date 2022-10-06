import {Column, Entity, ManyToMany, OneToMany} from "typeorm";
import {Person} from "./utils/Person";
import {Transaction} from "./Transaction";
import {Banker} from "./Banker";

@Entity('client')
export class Client extends Person {
    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        age: number;
        hair_color: string
    }

    @Column({
        type: "simple-array",
        default: []
    })
    family_members: string[]

    @OneToMany(
        () => Transaction,
        transaction => transaction.client
    )
    transactions: Transaction[]


    @ManyToMany(
        () => Banker
    )
    banker: Banker

}