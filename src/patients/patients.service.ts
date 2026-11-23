import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private repo: Repository<Patient>) {}
  create(dto: CreatePatientDto) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find({ relations: ['appointments'] }); }
  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id }, relations: ['appointments'] });
    if (!item) throw new NotFoundException('Patient not found');
    return item;
  }
  async update(id: number, dto: Partial<CreatePatientDto>) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }
  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: 'Patient deleted' };
  }
}
