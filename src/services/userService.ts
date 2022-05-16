import { JoinRequest } from '~/dto';
import { ConflictError } from '~/utils';
import { dataSource } from '~/config';
import { User } from '~/models';

export const join = async (dto: JoinRequest) => {
    const user = dto.toEntity();
    const isExist = await dataSource.manager.findOneBy(User, {
        email: user.email,
    });
    if (isExist) {
        throw new ConflictError('Info already exists');
    }
    return dataSource.manager.save(user);
};
