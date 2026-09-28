import { Module } from '@nestjs/common'

import { StreamResolver } from './stream.resolver'
import { StreamService } from './stream.service'
import { IngressModule } from './ingress/ingress.module';

@Module({
	providers: [StreamResolver, StreamService],
	imports: [IngressModule]
})
export class StreamModule {}
