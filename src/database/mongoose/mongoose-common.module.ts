import { Module } from '@nestjs/common';
import { MongooseModule } from './mongoose.module';
import { MongooseConfigService } from './mongoose-config.service';
import { User, UserSchema } from '@/user/user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class MongooseCommonModule {}
