import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { LivekitService } from '../libs/livekit/livekit.service'

@Injectable()
export class WebhookService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly livekitService: LivekitService
	) {}

	public async receiveWebhookLivekit(body: string, authorization: string) {
		const event = this.livekitService.receiver.receive(
			body,
			authorization,
			true
		)

		switch (event.event) {
			case 'ingress_started': {
				console.log('stream started', event.ingressInfo?.url)
				await this.prismaService.stream.update({
					where: {
						ingressId: event.ingressInfo?.ingressId
					},
					data: {
						isLive: true
					}
				})
				break
			}
			case 'ingress_ended': {
				await this.prismaService.stream.update({
					where: {
						ingressId: event.ingressInfo?.ingressId
					},
					data: {
						isLive: false
					}
				})
				break
			}
		}
	}
}
