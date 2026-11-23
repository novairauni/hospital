import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Doctor } from '../doctors/doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ default: 'scheduled' })
  status: string;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  @JoinColumn()
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  @JoinColumn()
  doctor: Doctor;
}
