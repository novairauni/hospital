import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Appointment } from './appointment.entity';
import { Patient } from '../patients/patient.entity';
import { Doctor } from '../doctors/doctor.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Doctor]), JwtModule.register({
    secret: process.env.JWT_SECRET || 'development_secret_change_me'
  })],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, JwtAuthGuard, RolesGuard]
})
export class AppointmentsModule {}
