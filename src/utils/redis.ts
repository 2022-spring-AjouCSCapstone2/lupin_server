import IORedis from 'ioredis';

const { REDIS_PORT, REDIS_HOST } = process.env;

const client = new IORedis(+REDIS_PORT, REDIS_HOST);

export const getRoom = async (roomId: string): Promise<string> => {
    return client.get(roomId);
};

export const createRoom = async (roomId: string): Promise<'OK'> => {
    return client.set(roomId, '', 'EX', 60 * 60 * 3);
};

export const deleteRoom = async (roomId: string): Promise<number> => {
    client.smembers(roomId).then((students) => client.del(...students, roomId));
    return client.del(roomId);
};

export const addStudentToRoom = async (
    roomId: string,
    studentId: number,
): Promise<number> => {
    return client.sadd(roomId, studentId);
};

export const removeStudentFromRoom = async (
    roomId: string,
    studentId: number,
): Promise<number> => {
    return client.srem(roomId, studentId);
};
