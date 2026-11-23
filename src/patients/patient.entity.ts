import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}
