import { Test, TestingModule } from '@nestjs/testing';
import { AccessRolesController } from './access-roles.controller';
import { AccessRolesService } from './access-roles.service';

describe('AccessRolesController', () => {
  let controller: AccessRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessRolesController],
      providers: [AccessRolesService],
    }).compile();

    controller = module.get<AccessRolesController>(AccessRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
