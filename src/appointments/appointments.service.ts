import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Patient } from '../patients/patient.entity';
import { Doctor } from '../doctors/doctor.entity';
import { CreateAppointmentDto } from './dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private repo: Repository<Appointment>,
    @InjectRepository(Patient) private patients: Repository<Patient>,
    @InjectRepository(Doctor) private doctors: Repository<Doctor>
  ) {}
  async create(dto: CreateAppointmentDto) {
    const patient = await this.patients.findOneBy({ id: dto.patientId });
    const doctor = await this.doctors.findOneBy({ id: dto.doctorId });
    if (!patient) throw new NotFoundException('Patient ID does not exist');
    if (!doctor) throw new NotFoundException('Doctor ID does not exist');
    const item = this.repo.create({ appointmentDate: new Date(dto.appointmentDate), status: dto.status || 'scheduled', patient, doctor });
    return this.repo.save(item);
  }
  findAll() { return this.repo.find({ relations: ['patient', 'doctor'], order: { appointmentDate: 'ASC' } }); }
  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id }, relations: ['patient', 'doctor'] });
    if (!item) throw new NotFoundException('Appointment not found');
    return item;
  }
  async update(id: number, dto: Partial<CreateAppointmentDto>) {
    const item = await this.findOne(id);
    if (dto.patientId) {
      const patient = await this.patients.findOneBy({ id: dto.patientId });
      if (!patient) throw new NotFoundException('Patient ID does not exist');
      item.patient = patient;
    }
    if (dto.doctorId) {
      const doctor = await this.doctors.findOneBy({ id: dto.doctorId });
      if (!doctor) throw new NotFoundException('Doctor ID does not exist');
      item.doctor = doctor;
    }
    if (dto.appointmentDate) item.appointmentDate = new Date(dto.appointmentDate);
    if (dto.status) item.status = dto.status;
    return this.repo.save(item);
  }
  async remove(id: number) {
    const item = await this.findOne(id); await this.repo.remove(item);
    return { message: 'Appointment deleted' };
  }
}
