import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { Patient } from './patients/patient.entity';
import { Doctor } from './doctors/doctor.entity';
import { Appointment } from './appointments/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'nov1415',
      database: process.env.DB_NAME || 'hospital_db',
      entities: [Patient, Doctor, Appointment],
      synchronize: true
    }),
    AuthModule, PatientsModule, DoctorsModule, AppointmentsModule
  ]
})
export class AppModule {}
