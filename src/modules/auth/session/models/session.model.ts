import { Field, ObjectType } from '@nestjs/graphql'

import type {
	DeviceInfo,
	LocationInfo,
	SessionMetadata
} from '@/src/shared/types/session-metadata.types'

@ObjectType()
export class LocationModel implements LocationInfo {
	@Field(() => String)
	country!: string

	@Field(() => String)
	city!: string

	@Field(() => Number)
	longitude!: number

	@Field(() => Number)
	latitude!: number
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
	@Field(() => String)
	browser!: string

	@Field(() => String)
	os!: string

	@Field(() => String)
	type!: string
}

@ObjectType()
export class SessionMetaDataModel implements SessionMetadata {
	@Field(() => LocationModel)
	location!: LocationModel

	@Field(() => DeviceModel)
	device!: DeviceModel

	@Field(() => String)
	ip!: string
}

@ObjectType()
export class SessionModel {
	@Field()
	id!: string

	@Field(() => String)
	userId!: string

	@Field(() => String)
	createdAt!: string

	@Field(() => SessionMetaDataModel)
	metadata!: SessionMetaDataModel
}
