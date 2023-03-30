export const ARGON_ERROR =
  'Произошла ошибка, проверьте корректность пароля или попробуйте позже';
export const WRONG_PASSWORD_ERROR = 'Неверный пароль';
export const WRONG_REFRESH_TOKEN_ERROR = 'Не удалось подтверить пароль';
export const WRONG_CONFIRM_PASSORD_ERROR = 'Пароли не совпадают';
export const TO_WEAK_PASSWORD_ERROR =
  'Данный пароль слишком слабый пароль. Он должен содержать минимум 1 цифру, 1 заглавную и обычную букву латинского алфавита';
export const USERNAME_NOT_STRING_ERROR = 'Имя пользователя должно быть строкой';
export const EMAIL_NOT_STRING_ERROR = 'Почта должна быть строкой';
export const PASSWORD_NOT_STRING_ERROR = 'Пароль должнен быть строкой';
export const EMAIL_WRONG_ERROR = 'Некорректный формат почты';
export const FIELD_IS_EMPTY_ERROR = 'Это обязательное поле';
export const LIMIT_20_EXCEEDED_ERROR = 'Превышен лимит в 20 символов';
export const LIMIT_4_NOT_EXCEEDED_ERROR = 'Минимум 4 символа';
export const WRONG_FORMAT_DATE_ERROR = 'Неверный формат даты';
export const EMAIL_ALREADY_EXISTS_ERROR =
  'Пользователь с данным email уже существует';
export const USERNAME_ALREADY_EXISTS_ERROR = 'Данный username занят';

export const PASSWORD_VALIDATE_REGEXP =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
