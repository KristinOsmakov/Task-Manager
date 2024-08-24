import { BaseResponseType } from 'common/types/types'
import { instance } from 'common/instance/instance'
import { LoginParamsType } from 'features/auth/api/authApi.types'

export const authAPI = {
  login(data: LoginParamsType) {
    const promise = instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data);
    return promise;
  },
  logout() {
    const promise = instance.delete<BaseResponseType<{ userId?: number }>>("auth/login");
    return promise;
  },
  me() {
    const promise = instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
    return promise;
  },
};
