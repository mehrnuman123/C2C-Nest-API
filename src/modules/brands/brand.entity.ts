import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand{
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({type: 'varchar', name: 'title', nullable: true})
  public title!: string;

  @Column({ type: 'varchar', name: 'pictureUrl', nullable: true })
  public pictureUrl!: string;

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
