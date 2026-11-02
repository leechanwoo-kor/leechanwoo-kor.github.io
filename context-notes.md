# Repair context

## Scope and initial decisions

- The user authorized implementing the previous review findings in priority order.
- The starting worktree is clean. No commit, push, or deployment is requested.
- Preserve full-content search, existing appearance, and the locally maintained theme. Do not publish undated material without knowing its intended status.
- Use narrow patches. Independent content, SEO, and CI work may proceed alongside the primary search/About repair.
- Exclude these work notes and verification scripts from the generated website.
- Baseline: 364 posts; production build passes; search loading/ID bugs, About script omission, missing banner.js, and generated content/SEO defects are confirmed.

## Implementation decisions

- Search dependencies load sequentially with onload callbacks after DOMContentLoaded. Failed loads can be retried on the next toggle. Search uses site-search/site-search-results IDs so article headings and taxonomy IDs remain intact.
- Initializing search also processes text entered while its scripts were loading. Regression tests first reproduced the loading/ID defects and the early-input defect, then passed after correction.
- About retains its existing content/style class and adds the shared initial-content class, footer target, and script include.
- Restored the missing banner.js step using the existing MIT attribution. JavaScript is rebuilt in CI; browser DOM regression checks use jsdom and Node's test runner.
- Normalize the few inconsistent category/tag values instead of rewriting taxonomy templates. Jekyll lowercases category URL segments; actual before/after Site.read comparison confirms all 364 post URLs are unchanged. Taxonomy now has 31 categories and 276 tags without slug collisions.
- Corrected four broken content links/Markdown conversions, the duplicated NLP heading ID, and timeline boundaries (2025 through 2021).
- Social metadata is emitted once by seo.html. JSON-LD uses jsonify and an image fallback for publisher logos. Sitemap prioritizes last_modified_at and contains only HTML page URLs.
- PRs run build and verification without deployment permissions. Push/manual deployments follow successful validation. The current user site uses the baseurl from _config.yml.
- npm ci passes. npm audit reports two moderate development-tool findings in the existing npm-run-all/minimatch chain; no forced downgrade or unrelated dependency removal was applied.
- Ruby lock generation needs separate platform/checksum operations: Bundler 4.0.7 caches the Windows resolution when --add-checksums is combined with --add-platform. Linux-compatible lock verification is in progress.

## Verification so far

- npm run build:js and bundle check pass.
- Strict production build passes (7.745 seconds); existing Sass @import deprecation warnings remain.
- Generated-site verification passes for 408 HTML files, 770 JSON-LD blocks, sitemap/feed XML, local link targets, duplicate IDs/social metadata, and About search open/Escape restoration.
- Local-link checks verify target files, not every URL fragment or external site's availability. Remote GitHub Actions has not been triggered.

## Final verification

- npm ci: passed using the tracked package-lock.json. npm run build:js: passed; rebuilt main.min.js retains its existing MIT attribution.
- npm test: 2 regression tests passed, covering slow dependency loading/early query input and article heading/label isolation. The loading test waits for completion instead of a fixed delay.
- Final JEKYLL_ENV=production build with --disable-disk-cache --strict_front_matter --trace: passed in 9.816 seconds, destination in the system temporary directory (codex-project-repair).
- npm run verify:site -- <temporary output>: passed for 408 HTML pages, 770 JSON-LD blocks, XML, local target files, duplicate IDs/social metadata, and About search using the actual generated 364-document index, plus Escape restoration.
- Windows bundle check: passed. The corrected lock adds Linux ffi/google-protobuf/sass-embedded variants and their checksums without changing existing gem versions.
- Temporary ruby:3.4-slim Linux container with read-only manifests: BUNDLE_FROZEN=true bundle install installed 52 gems; bundle check, Jekyll 4.3.4 loading, and native Sass compilation passed. Build tooling including libffi-dev was installed only in the disposable container, which exited with --rm.
- Git diff whitespace checks and JavaScript syntax checks passed. All 364 existing post URLs are preserved.
- Browser visual inspection was attempted but the browser access host was unavailable. DOM behavior was tested; mobile layout and remote deployment were not verified. The temporary local HTTP server was stopped.
- Remaining warnings: existing Sass @import deprecation and npm-run-all/minimatch development-only audit findings. No commit, push, or deployment was performed.

## Release authorization and preparation

- The user subsequently authorized finishing all remaining work and verifying, committing, pushing, and deploying each task. This supersedes the earlier no-commit/no-deploy scope.
- git fetch confirms local main and origin/main both start at 712773045c0635bda6c57e91da3ea27f1fc61351. git push --dry-run origin main succeeds. The latest existing Pages workflow at this SHA succeeded.
- GitHub connector calls returned Unknown tool; use authenticated Git for pushes and the public GitHub REST API for workflow observations.
- Repository search found no npm-run-all usage outside its dependency declaration. Removing it eliminates its minimatch chain; npm audit now reports zero vulnerabilities.
- Keep the workflow change until all generated-site verification prerequisites are committed. Bundle the search tests with their npm/build prerequisites; subsequent tasks remain separate commits/deployments.
- Sass migration is being validated independently in a temporary copy because the local theme's vendor mixins share global state. Preserve generated CSS before accepting it.
