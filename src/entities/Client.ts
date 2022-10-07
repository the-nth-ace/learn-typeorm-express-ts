import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Person } from "./utils/Person";
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";

export class ClientDTo {
  first_name: string;
  last_name: string;
  email: string;
  card_number: string;
}

@Entity("client")
export class Client extends Person {
  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_members: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.client, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  transactions: Transaction[];

  @ManyToMany(() => Banker, {
    onDelete: "CASCADE",
  })
  banker: Banker;
}
