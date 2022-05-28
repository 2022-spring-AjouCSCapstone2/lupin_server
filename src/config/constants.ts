export enum userType {
    STUDENT = 'STUDENT',
    PROFESSOR = 'PROFESSOR',
}

export enum courseLogType {
    QUESTION = 'QUESTION',
    RECORDING = 'RECORDING',
    SCRIPT = 'SCRIPT',
}

export enum day {
    MONDAY = 'mon',
    TUESDAY = 'tue',
    WEDNESDAY = 'wed',
    THURSDAY = 'thu',
    FRIDAY = 'fri',
    SATURDAY = 'sat',
    SUNDAY = 'sun',
    NODAY = 'nod', // 파란학기 시간표같은 경우 날짜가 정해져 있지 않음
}

export enum postType {
    NOTICE = 'NOTICE',
    FREE = 'FREE',
}
