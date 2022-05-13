import { JoinRequest } from '~/dto';
import { userRepository } from '~/repositories';
import { ConflictError } from '~/utils';

export const join = async (dto: JoinRequest) => {
    const user = dto.toEntity();
    console.log('user', user);
    console.log(userRepository);
    console.log(userRepository.manager);
    const test = await userRepository.findOne({ where: { email: user.email } });
    console.log('test', test);
    const isExist = await userRepository.findOneBy({ email: user.email });
    if (isExist) {
        throw new ConflictError('Info already exists');
    }
    return userRepository.save(user);
};
