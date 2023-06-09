import { IsNumber } from 'class-validator';

export class CreateAccessRolesDto {
  roleType!: string;
  @IsNumber()
  level!: number;
  description!: string;
}
