import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';
export class CreateAppointmentDto {
  @IsDateString() appointmentDate: string;
  @IsInt() @Min(1) patientId: number;
  @IsInt() @Min(1) doctorId: number;
  @IsOptional() @IsString() status?: string;
}
