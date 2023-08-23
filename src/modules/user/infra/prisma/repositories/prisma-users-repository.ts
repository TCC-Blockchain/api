import { PrismaService } from '@infra/database/prisma/prisma.service';
import { GroupSolicitation } from '@modules/group/entities/group-solicitation';
import { PrismaGroupMapper } from '@modules/group/infra/prisma/mappers/prisma-groups-mapper';
import { PrismaGroupSolicitationsMapper } from '@modules/group/infra/prisma/mappers/prisma-groups-solicitations-mapper';
import { Address } from '@modules/user/entities/addresses';
import { User } from '@modules/user/entities/users';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { PrismaAddressMapper } from '../mappers/prisma-addresses-mapper';
import { PrismaUserMapper } from '../mappers/prisma-users-mapper';
import { PrismaGroupMembersMapper } from '@modules/group/infra/prisma/mappers/prisma-groups-members-mapper';
import { PrismaGroupOwnershipMapper } from '@modules/group/infra/prisma/mappers/prisma-groups-ownership-mapper';
import { PrismaGroupFeaturedMapper } from '@modules/group/infra/prisma/mappers/prisma-groups-featured-mapper';
import { GroupFeatured } from '@modules/group/entities/group-featured';
import { UserDevices } from '@modules/user/entities/user-devices';
import { PrismaUserDevicesMapper } from '../mappers/prisma-user-devices-mapper';
import { PrismaUserSocialMediasMapper } from '../mappers/prisma-user-social-media-mapper';
import { UserSocialMedia } from '@modules/user/entities/user-social-media';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    user,
    address,
  }: {
    user: User;
    address: Address;
  }): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    const rawAddress = PrismaAddressMapper.toPrisma(address);

    await this.prisma.user.create({
      data: raw,
    });

    await this.prisma.address.create({
      data: rawAddress,
    });
  }

  async update(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.update({
      where: {
        id: raw.id,
      },
      data: { ...raw },
    });
  }

  async list(): Promise<User[]> {
    const raws = await this.prisma.user.findMany();

    const users = raws.map((user) => PrismaUserMapper.toDomain({ raw: user }));

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        group_memberships: true,
        group_ownerships: true,
        group_solicitations: true,
        devices: true,
        social_media: true,
        featured_groups: {
          include: {
            group: true,
          },
        },
      },
    });

    if (!rawUser) {
      return null;
    }

    const social_medias = rawUser.social_media.map((socialMedia) =>
      PrismaUserSocialMediasMapper.toDomain(socialMedia),
    );

    const solicitations = rawUser.group_solicitations.map((solicitation) =>
      PrismaGroupSolicitationsMapper.toDomain({
        raw: solicitation,
      }),
    ) as GroupSolicitation[];
    const memberships = rawUser.group_memberships.map((membership) =>
      PrismaGroupMembersMapper.toDomain(membership),
    );

    const ownerships = rawUser.group_ownerships.map((ownership) =>
      PrismaGroupOwnershipMapper.toDomain(ownership),
    );
    const featuredGroups = rawUser.featured_groups.map((featured) => {
      const group = PrismaGroupMapper.toDomain({
        raw: featured.group,
      });
      const featuredMapped = PrismaGroupFeaturedMapper.toDomain(featured);
      featuredMapped.group = group;

      return featuredMapped;
    });

    const devices = rawUser.devices.map((device) =>
      PrismaUserDevicesMapper.toDomain(device),
    );

    const user = PrismaUserMapper.toDomain({
      raw: rawUser,
      memberships,
      ownerships,
      solicitations,
      featured_groups: featuredGroups,
      devices,
      social_medias,
    });

    return user;
  }

  async findUserByEmail(userEmail: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!rawUser) {
      return null;
    }

    const user = PrismaUserMapper.toDomain({ raw: rawUser });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const rawUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!rawUser) {
      return null;
    }

    const user = PrismaUserMapper.toDomain({ raw: rawUser });

    return user;
  }

  async addFeaturedGroup(featuredGroup: GroupFeatured): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: featuredGroup.user_id,
      },
      data: {
        featured_groups: {
          create: {
            id: featuredGroup.id,
            group: {
              connect: {
                id: featuredGroup.group_id,
              },
            },
          },
        },
      },
    });
  }

  async removeFeaturedGroup({
    user_id,
    group_id,
  }: {
    user_id: string;
    group_id: string;
  }): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        featured_groups: {
          disconnect: {
            id: group_id,
          },
        },
      },
    });
  }

  async findUserDevicesByUserId(user_id: string): Promise<UserDevices[]> {
    const raws = await this.prisma.userDevice.findMany({
      where: {
        user_id,
      },
    });

    const devices = raws.map((raw) => PrismaUserDevicesMapper.toDomain(raw));

    return devices;
  }
  async createUserDevice(user_device: UserDevices): Promise<void> {
    const raw = PrismaUserDevicesMapper.toPrisma(user_device);

    await this.prisma.userDevice.create({
      data: raw,
    });
  }
  async updateUserDevice(user_device: UserDevices): Promise<void> {
    const raw = PrismaUserDevicesMapper.toPrisma(user_device);

    await this.prisma.userDevice.update({
      where: {
        id: user_device.id,
      },
      data: raw,
    });
  }

  async checkUsernameAvailability(username: string): Promise<boolean> {
    const alreadyExists = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (alreadyExists) {
      return false;
    }
    return true;
  }

  async upsertUserSocialMedia(social_medias: UserSocialMedia[]): Promise<void> {
    const raws = social_medias.map((socialMedia) => {
      return PrismaUserSocialMediasMapper.toPrisma(socialMedia);
    });

    await Promise.all(
      raws.map((socialMedia) =>
        this.prisma.socialMedia.upsert({
          where: {
            id: socialMedia.id,
          },
          create: socialMedia,
          update: socialMedia,
        }),
      ),
    );
  }
}
