const enum EStatus {
  active = "ACTIVE",
  inactive = "INACTIVE",
  deleted = "DELETED",
}

const enum EUserType {
  advisor = "advisor",
  student = "student",
  admin = "admin",
  root = "root",
  default = "",
}

const enum ELanguage {
  english,
  spanish,
}

const enum ETheme {
  white,
  dark,
}

enum ETypeDropdown {
  normal,
  three,
}

enum EStatusAlert {
  error = "error",
  success = "success",
  warning = "warning",
  info = "info",
}

enum EModalCalendarType {
  update,
  create,
  delete,
}

enum EMyCalendarView {
  week = "week",
  month = "month",
}

enum EStatusAppointment {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

const enum ENotificationStatus {
  seen = "seen",
  notSeen = "not seen",
}

export {
  EStatus,
  EUserType,
  ELanguage,
  ETheme,
  ETypeDropdown,
  EStatusAlert,
  EModalCalendarType,
  EMyCalendarView,
  EStatusAppointment,
  ENotificationStatus,
};
