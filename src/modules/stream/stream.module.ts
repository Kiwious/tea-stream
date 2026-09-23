import { Module } from '@nestjs/common'

import { StreamResolver } from './stream.resolver'
import { StreamService } from './stream.service'

@Module({
	providers: [StreamResolver, StreamService]
})
export class StreamModule {}
