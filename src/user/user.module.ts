import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './repository/user.prisma.repository';
import { TYPEORM_DATABASE } from '@/database/database-constants';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormRepository } from './repository/user.typeorm.repository';
import { MongooseModule } from '@/database/mongoose/mongoose.module';
import { User, UserSchema } from './user.schema';
import { UserMongooseRepository } from './repository/user.mongoose.repository';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users], TYPEORM_DATABASE),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserPrismaRepository,
    UserTypeormRepository,
    UserMongooseRepository,
    UserRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
