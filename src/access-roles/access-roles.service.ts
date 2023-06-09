import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccessRoles } from './access-roles.model';
import { CreateAccessRolesDto } from './dto/create-access-roles.dto';
import { Op } from 'sequelize';

@Injectable()
export class AccessRolesService {
  constructor(
    @InjectModel(AccessRoles)
    private AccessRolesModel: typeof AccessRoles,
  ) {}

  async create(createAccessRolesDto: CreateAccessRolesDto): Promise<any> {
    const { roleType, level } = createAccessRolesDto;
    //check if security protocol "type" or "level" already exist in database;
    const accessRole: AccessRoles | null = await this.AccessRolesModel.findOne({
      where: { [Op.or]: [{ level: level }, { roleType: roleType }] },
    });

    if (accessRole)
      throw new BadRequestException('Conflicting Security details');

    await this.AccessRolesModel.create({ ...createAccessRolesDto });

    return { message: 'Security Protocol Successfully Created' };
  }

  async findAll(request: any): Promise<{ accessRoles: AccessRoles[] }> {
    const accessRoles = await this.AccessRolesModel.findAll({
      where: {
        level: {
          //Get Access role details whose 'levels' is >= to the user request level
          [Op.gte]: request.user.accessRoleLevel,
        },
      },
      //Get Only details of these attributes
      attributes: ['id', 'roleType', 'level'],
      //Arrange by level
      order: ['level'],
    });
    return { accessRoles };
  }
}
