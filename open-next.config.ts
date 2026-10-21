import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // Global cache and incremental on-demand revalidation are not required for
  // this site: every page is static and rebuilt on deploy.
});
