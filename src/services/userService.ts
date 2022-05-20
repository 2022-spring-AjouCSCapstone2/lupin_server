import { JoinRequest } from '~/dto';
import { ConflictError } from '~/utils';
import { userRepository } from '~/repositories';

export const join = async (dto: JoinRequest) => {
    const user = dto.toEntity();
    const isExist = await userRepository.countBy({ email: user.email });
    if (isExist) {
        throw new ConflictError('Info already exists');
    }
    return userRepository.save(user);
};
