import { InternalApiService } from '@/models/application/internalApiServices/InternalApiService';

export class AuthenticationApiService extends InternalApiService {
  async login(signature: string, nonce: number, address: string): Promise<any> {
    return this.executePostQuery<any>('/auth/login', {
      signature,
      nonce,
      address: address.toLowerCase(),
    });
  }
}
