import { Module } from '@nestjs/common';
import { MongooseModule } from './mongoose.module';
import { MongooseConfigService } from './mongoose-config.service';
import { User, UserSchema } from '@/user/user.schema';
import { UserMongooseRepository } from '@/user/repository/user.mongoose.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserMongooseRepository],
  exports: [UserMongooseRepository],
})
export class MongooseCommonModule {}
