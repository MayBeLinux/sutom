import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'day_stats' })
export class DayStats {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'players_count', type: 'int', nullable: false })
    playersCount: number

    @Column({ name: 'successful_players_count', type: 'int', default: 0, nullable: false })
    successfulPlayersCount: number
}
