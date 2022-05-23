export enum userType {
    STUDENT = 'STUDENT',
    PROFESSOR = 'PROFESSOR',
}

export enum courseLogType {
    QUESTION = 'question',
    RECORDING = 'recording',
    SCRIPT = 'script',
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
