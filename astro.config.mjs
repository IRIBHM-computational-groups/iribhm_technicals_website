// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repo = 'https://github.com/IRIBHM-computational-groups/iribhm_technicals_website';

export default defineConfig({
	site: 'https://iribhm-computational-groups.github.io',
	base: '/iribhm_technicals_website',
	integrations: [
		starlight({
			title: 'IRIBHM Docs',
			description: 'Internal technical documentation of the IRIBHM computational groups.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/theme.css'],
			social: [{ icon: 'github', label: 'GitHub', href: repo }],
			editLink: { baseUrl: `${repo}/edit/master/` },
			lastUpdated: true,
			components: {
				Head: './src/components/Head.astro',
			},
			sidebar: [
				{
					label: 'New in the lab?',
					items: [
						{ label: 'Welcome', slug: 'start/newcomers' },
						{ label: 'Lab activities', slug: 'start/lab_activities' },
						{ label: 'Working with Hyperion', slug: 'start/working_with_hyperion' },
						{ label: 'Singularity', slug: 'start/singularity' },
						{ label: 'Resources', slug: 'start/resources' },
						{ label: 'Databases', slug: 'start/databases' },
						{ label: 'Server rules', slug: 'start/server_rules' },
						{ label: 'Large language models', slug: 'start/large_language_models' },
					],
				},
				{
					label: 'miscellaneous',
					items: [
						{ label: 'Good computational practices', slug: 'miscellaneous/gcp' },
						{ label: 'Tips and tricks', slug: 'miscellaneous/tips_and_tricks' },
						{ label: 'Publishing scientific code', slug: 'miscellaneous/publishing_code' },
						{ label: 'Leaving checklist', slug: 'miscellaneous/leaving_the_lab' }
					],
				},
				{
					label: 'Websites',
					items: [
						{ label: 'Overview', slug: 'websites/overview' },
						{ label: 'Public website maintenance', slug: 'websites/public_site_maintenance' },
						{ label: 'Internal docs maintenance', slug: 'websites/internal_docs_maintenance' },
						{ label: 'Monitoring maintenance', slug: 'websites/monitoring' },
					],
				},
				{
					label: 'Links',
					items: [{ label: 'Public website', link: 'https://iribhm-computational-groups.github.io', attrs: { target: '_blank' } }],
				},
			],
		}),
	],
});
