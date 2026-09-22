import { Resolver } from '@nestjs/graphql';
import { StreamService } from './stream.service';

@Resolver('Stream')
export class StreamResolver {
  constructor(private readonly streamService: StreamService) {}
}
