
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { Card } from 'src/modules/card/card.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({type: 'varchar', name: 'name', nullable: true})
  public name: string;

  @Column({ type: 'varchar', name: 'email', length: 100, nullable: true })
  public email!: string;

  @Exclude()
  @IsOptional()
  @Column({ type: 'varchar', name: 'password', nullable: true })
  public password: string;
 
  
  @OneToMany(() => Card, (card) => card.userId)
  cardId: number;
  
  @Column({ type: 'varchar', name: 'status', nullable: true, default: 'offline' })
  public status: string;
  
  @Column({ type: 'varchar', name: 'uid', nullable: true, })
  public uId: string;

  @Column({type: 'varchar', name: 'auth_provider', nullable: true})
  public auth_provider: string;

  @Column({type: 'varchar', name: 'profile', nullable:true})
  public profile: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  public role: Role;

  @Column({ type: 'integer', name: 'phoneNumber', nullable: true })
  public phoneNumber: number;

  @Column({ type: 'boolean', name: 'isActive', nullable: true, default: false })
  public isVerified!: boolean | null;

    
  @Column({ type: 'varchar', name: 'company', nullable: true, })
  public company: string;

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
