# Project repair plan

Repair the confirmed findings from the project review without changing the site's design or publishing policy.

1. Fix search script execution order and isolate search element IDs. Verify initialization and search output against generated pages.
2. Restore shared JavaScript and search visibility behavior on About. Verify its generated markup and common navigation support.
3. Repair the JavaScript build and track dependency locks for Windows and Linux. Verify a clean dependency install and bundle build.
4. Add pull-request validation and configure Dependabot. Run the same checks locally before finishing.
5. Correct confirmed content links, timeline years, taxonomy collisions, and SEO metadata/sitemap output. Verify generated HTML, JSON-LD, and XML.

Keep full-content search, the current theme/design, and undated draft material unchanged.

Success: production Jekyll build passes, regression checks pass, generated internal links resolve, and identified metadata/ID defects are removed.

## Authorized release sequence

The user now authorizes completing the remaining fixes and committing, pushing, and deploying each task. Verify an isolated snapshot of each staged commit before release, then wait for its GitHub Pages deployment before the next push.

1. Search reliability and its reproducible build/test prerequisites, including removal of the unused vulnerable development dependency.
2. About navigation and search behavior.
3. Content links, taxonomy, and timeline corrections.
4. SEO metadata and sitemap corrections.
5. CI verification, Dependabot, and developer documentation (after all checks' prerequisites land).
6. Sass module migration, only after equivalent generated CSS is verified.

Record commit/deployment results in the context notes. Do not publish ambiguous drafts or narrow full-content search.
