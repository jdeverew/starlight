// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			// The right-hand table of contents is generated automatically from each
			// page's headings. These are the defaults; override per page in
			// frontmatter with `tableOfContents: { minHeadingLevel, maxHeadingLevel }`.
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
						{ label: 'SSH hardening', slug: 'guides/ssh-hardening' },
					],
				},
				{
					label: 'Defender for Endpoint Series',
					collapsed: false,
					autogenerate: { directory: 'guides/defender-for-endpoint' },
				},
				{
					label: 'Intune Series',
					collapsed: true,
					autogenerate: { directory: 'guides/intune' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
