import { IsEmail, IsInt, IsString, Min, MinLength } from 'class-validator';
export class CreatePatientDto {
  @IsString() @MinLength(2) name: string;
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsInt() @Min(0) age: number;
  @IsString() gender: string;
}
