import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { RolesService } from './services/roles.service';
import { Role, RoleSchema } from './entities/role.entity';

@Module({
    imports: [MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Role.name, schema: RoleSchema }
    ])],
    controllers: [UserController],
    providers: [UserService, RolesService],
    exports: [UserService]
})
export class UserModule {}
