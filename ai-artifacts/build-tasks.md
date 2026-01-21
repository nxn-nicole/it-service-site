# 1) Routes/pages (Home, Services, Reviews, optional Contact)
- `/` (Home)
  - Implement sections per `ux-spec.md` “Home” wireframe (Hero, Who I am, Who I help, How I help, Proof preview, CTA block).
  - Ensure primary/secondary CTAs match Chinese microcopy in `ux-spec.md`.
  - Add optional sticky bottom CTA on mobile: `预约15分钟初聊`.

- `/services` (Services)
  - Implement “Services overview”, “Service list (3–5 cards)”, “合作流程”, “常见问题” accordion, end CTA block.
  - Use the service card structure and copy exactly from `ux-spec.md`.

- `/reviews` (Reviews)
  - Implement “Reviews intro”, “Review card grid”, mid-page CTA strip, end CTA block.
  - Optional: filter chips (keep minimal) per `ux-spec.md`.
  - Optional: mobile expand/collapse microcopy and “加载更多评价”.

- `/contact` (Contact, optional but included)
  - Replace existing Contact page structure with `ux-spec.md` “Optional Contact” wireframe:
    - Contact intro + bullets
    - Optional contact form with Chinese labels/placeholders and success/error states
    - Response time note

- Legacy routes handling
  - Current app has `/courses` and `/projects`. Decide one of:
    - Remove from nav and keep routes as-is (acceptable but not part of primary IA), or
    - Redirect them to `/services` and `/reviews`.
  - Keep the required nav as: `首页｜服务｜学员评价｜联系`.

# 2) Components (priority order)
1. `Navigation`
   - Desktop horizontal nav + mobile menu (if existing nav is desktop-only, add mobile-friendly behavior).
   - Active state styling.
   - Labels must be Chinese: `首页｜服务｜学员评价｜联系`.

2. `Hero`
   - Props: title, subtitle, primary CTA, secondary CTA, trust note.
   - Copy from `ux-spec.md` (Home → Hero).

3. `CTABlock`
   - Reusable CTA strip for pages (Home/Services/Reviews/Contact).
   - Supports headline + supporting text + primary/secondary CTAs.
   - Copy from `ux-spec.md` CTA blocks.

4. `ServiceCard`
   - Fields: title, whoFor, deliverables, steps(3), ctaLabel.
   - Defaults/labels must follow `ux-spec.md` (Chinese).

5. `TestimonialCard`
   - Fields: name, background, problem, process, benefit.
   - Labels must match: `背景｜困难｜我们做了什么｜收获`.
   - Support compact/expanded behavior on mobile (optional).

6. `FAQAccordion` (optional but recommended)
   - Items: question + answer (Chinese).
   - Copy from `ux-spec.md` Services FAQ.

7. `ContactForm` (optional but included)
   - Chinese labels + placeholders + submit/success/error microcopy per `ux-spec.md`.
   - Client-side validation states (no English error strings; use Chinese or `【待补充文案】`).

8. `StickyMobileCTA` (optional but recommended)
   - Single primary action: `预约15分钟初聊`.

# 3) Data model for testimonials/services
- `Service`:
  - `id: string`
  - `title: string`
  - `whoFor: string[]`
  - `deliverables: string[]`
  - `steps: string[]` (length 3)
  - `ctaLabel: string`
  - `ctaHref?: string` (optional; can route to `/contact`)

- `Testimonial`:
  - `id: string`
  - `name: string` (e.g., `Y同学`)
  - `background: string`
  - `problem: string`
  - `process: string`
  - `benefit: string`
  - `tags?: string[]` (optional for filter chips, e.g. `无本地经验`, `转岗`, `IT`, `商科`)

# 4) Mapping notes: where each piece of copy comes from in ux-spec.md
- Navigation labels:
  - `ux-spec.md` → `# 2) IA + Navigation` → `首页｜服务｜学员评价｜联系`

- Home page copy:
  - `ux-spec.md` → `# 3) Text Wireframes` → `Home` → all `Microcopy` bullets:
    - Hero: `在澳洲找实习/工作别硬扛：把路径和材料一次理顺` / `预约15分钟初聊` / `先看看我能提供哪些服务` / `不保证结果，但会把过程做清楚、做扎实`
    - Sections: `我是谁` / `我能帮谁` / `我怎么帮` / `学员怎么说` / CTA block copy

- Services page copy:
  - `ux-spec.md` → `Services` wireframe (overview, list title, all service cards, `合作流程`, `常见问题`, CTA block)

- Reviews page copy:
  - `ux-spec.md` → `Reviews` wireframe (intro, filter chips, testimonial field labels, all 6 cards, mid CTA, end CTA, mobile microcopy)

- Contact page copy:
  - `ux-spec.md` → `Optional Contact` wireframe (intro, bullets, form labels/placeholders, submit/success/error, response-time note, privacy line)

- Microcopy pack:
  - `ux-spec.md` → `# 5) Microcopy pack (Chinese-only)` (primary/secondary CTA options + trust snippets + form labels)

# 5) Definition of Done
- Routes exist and render: `/`, `/services`, `/reviews`, `/contact`.
- Global nav labels are Chinese and match IA: `首页｜服务｜学员评价｜联系`.
- All user-visible strings are Simplified Chinese; no English UI labels/microcopy.
  - If any text is missing, use `【待补充文案】` (Chinese) instead of English placeholders.
- Pages match the section order and CTA placement described in `ux-spec.md`.
- Components are reusable and drive pages via typed data models for services/testimonials.
- Mobile-first layout: readable spacing, large tap targets, optional sticky CTA on small screens.
- No TypeScript errors; ESLint passes.