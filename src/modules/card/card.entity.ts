import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entity/users.entity';

@Entity()
export class Card{
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({type: 'integer', name: 'ownerId', nullable: true})
  public ownerId: number;

  @Column({type: 'varchar', name: 'serialNumber', nullable: true})
  public serialNumber!: string;

  @Column({ type: 'varchar', name: 'manufacturer', length: 200, nullable: true })
  public manufacturer!: string;

  @Column({ type: 'numeric', precision: 6, scale: 2 , name: 'balance', nullable: true })
  public balance: number;
  
  @Column({ type: 'numeric', precision: 6, scale: 2, nullable: true, })
  public sellingPrice: number;

  @Column({type: 'numeric', precision: 6, scale: 2, nullable:true})
  public youWillGet: number;

  @Column({type: 'numeric', precision: 6, scale: 2, nullable: true})
  public geotag: number;
  
  @Column({type: 'numeric', precision: 6, scale: 2, nullable: true})
  public master_commision: number;

  @Column({type: 'integer', name: 'pin', nullable: true})
  public pin: number;

  @Column({ type: 'varchar', name: 'category', nullable: true })
  public category: string;
  
  @Column({ type: 'varchar', name: 'expiry', nullable: true })
  public expiry: string;

  @Column({ type: 'varchar', name: 'type', nullable: true })
  public type: string;

  @Column({ type: 'boolean', name: 'isActive', nullable: true })
  public isActive: boolean | null;

  @Column({ type: 'varchar', name: 'photo', nullable: true })
  public photo: string | null;

  @Column({ type: 'boolean', name: 'isListed', nullable: true })
  public isListed: boolean | null;
  
  @Column({ type: 'boolean', name: 'isSold', nullable: true })
  public isSold: boolean | null;

  @Column({ type: 'integer', name: 'discount', nullable: true })
  public discount: number;

  @ManyToOne(() => User, (user) => user.cardId)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: number;

  @Column({ type: 'boolean', name: 'isVerified', nullable: true, default: false })
  public isVerified!: boolean | null;

  @Column({
    name: 'createdAt',
    nullable: true,
    type: 'timestamptz',
  })
  createdAt: Date | null;

  @Column({
    name: 'updatedAt',
    nullable: true,
    type: 'timestamptz',
  })
  updatedAt: Date | null;

}
