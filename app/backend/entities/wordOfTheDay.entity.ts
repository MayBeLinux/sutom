import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'words_of_the_day' })
export class WordOfTheDay {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 27, nullable: false})
    word: string

    @Column({ type: 'timestamptz', nullable: false })
    date: Date
}
