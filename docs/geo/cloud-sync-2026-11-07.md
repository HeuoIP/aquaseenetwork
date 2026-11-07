# Cloud GEO sync

**Date:** 2026-11-07  
**Source:** latest cloud conversations “制定GEO实施方案” and “制定GEO方案”

## Current decision

The first GEO implementation round is approved in principle. The working
position is:

> AQUASEE provides early-stage design consulting and creative design services
> for design-led destination, landscape and children's-space projects.

The first content package is:

1. Clarify the homepage positioning and inquiry path.
2. Strengthen the design consulting and creative design pages, including scope,
   collaboration process and deliverables.
3. Prepare the first English insight article: **How can children's spaces
   balance design quality and play value?**

## Operational order

1. Recheck homepage Worker stability, especially the previously observed CPU
   time-limit errors.
2. Verify inquiry delivery end to end. A successful form response alone is not
   proof that the email arrived; confirm receipt in the destination mailbox and
   spam folder.
3. Only after those checks, implement the first GEO content package and run the
   local structure and runtime gates.
4. Review the resulting diff before any production deployment.

## Cloudflare facts carried forward

These were reported in the earlier cloud audit conversation and are retained as
historical context, not as a fresh live check:

- `aquasee-website` was deployed and serving 100% of traffic.
- `aquasee.art` and `www.aquasee.art` were bound to the deployment.
- The apex domain redirected with 308 to `www`; the `www` endpoint returned 200.
- DNS records were proxied and SSL mode was Full.

## Open verification items

- Is the homepage still producing `Worker exceeded CPU time limit` errors?
- Is one inquiry delivery channel configured and does a real test email arrive?
- Are the latest deployment records clean?
- Are edge certificate status, HTTP-to-HTTPS enforcement and crawler access
  confirmed?

No Cloudflare credentials, tokens or secret values belong in this repository.
