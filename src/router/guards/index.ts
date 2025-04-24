import type { Router } from 'vue-router';

import { setupAuthGuard } from './auth';

export function setupGuards(router: Router) {
  setupAuthGuard(router);
}
