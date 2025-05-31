import type Profile from '~/interfaces/profile.interface';

const profile: Profile = {
	name: 'Fahri Ramadhan',
	description:
		'Organized and self-motivated software engineer graduate with 1 years combined freelance and professional experience. Fluent in SQL, Javascript, and PHP programming languages. Possess practical working knowledge of relational databases using PostgreSQL and SQL Server. Constantly updating personal and professional technical skills with complementary collegiate courses and online bootcamps. Reliable and responsible team player.',
	job: 'Software Engineer',
	dob: '12/07/2000',
	location: 'Indonesia',
	imgUrl: '/images/avatar.png',
	initials: 'MFR',
	education: [
		{
			logoUrl: '/images/education/ulbi.png',
			institution: 'Universitas Logistik dan Bisnis Internasional',
			initials: 'UL',
			degree: "Bachelor's degree",
			major: 'Informatics Engineering, (S.Tr.Kom)',
			entry: 2019,
			resign: 2023,
			site: 'https://www.ulbi.ac.id/'
		},
		{
			logoUrl: '/images/education/sma1.png',
			institution: 'SMA Negeri 1 Sumedang',
			initials: 'SN',
			degree: 'Senior High School',
			major: 'Science',
			entry: 2016,
			resign: 2019,
			site: 'https://www.smansasumedang.sch.id/'
		}
	],
	socials: [
		{
			href: 'https://github.com/fahri-r',
			icon: 'Github',
			label: 'GitHub'
		},
		{
			href: 'https://www.linkedin.com/in/fahri-r',
			icon: 'Linkedin',
			label: 'LinkedIn'
		},
		{
			href: 'mailto:00.fahri.r@gmail.com',
			icon: 'Mail',
			label: 'Email'
		}
	],
	works: [
		{
			logoUrl: '/images/company/code.png',
			company: 'CODE.ID',
			initials: 'C',
			role: 'Fullstack Developer',
			entry: {
				month: 2,
				year: 2024
			}
		},
		{
			logoUrl: '/images/company/evergreen.png',
			company: 'PT. Ever Green Hans (Project Based)',
			initials: 'EG',
			description:
				'I am responsible for developing payroll desktop app for the client of PT. Ever Green Hans.',
			role: 'Software Developer',
			entry: {
				month: 6,
				year: 2023
			},
			resign: {
				month: 12,
				year: 2023
			}
		},
		{
			logoUrl: '/images/company/matakala.png',
			company: 'PT. Bhairawa Tantra Nusantara',
			initials: 'BTN',
			description:
				'I am responsible for maintaining the website and sometimes developing DApps for PT. Bhairawa Tantra Nusantara.',
			role: 'Website Developer',
			entry: {
				month: 8,
				year: 2022
			},
			resign: {
				month: 6,
				year: 2023
			}
		},
		{
			logoUrl: '/images/company/hipmi.png',
			company: 'HIPMI Kabupaten Bekasi (Freelance)',
			initials: 'H',
			description: 'Develop a company profile for HIPMI using Next.js and Chakra UI.',
			role: 'Frontend Developer',
			entry: {
				month: 3,
				year: 2023
			},
			resign: {
				month: 3,
				year: 2023
			}
		},
		{
			logoUrl: '/images/company/injabar.png',
			company: 'Injabar UNPAD (Freelance)',
			initials: 'IU',
			description:
				'Develop a website to assess the performance of BUMD (Regional Owned Enterprises). Many aspects are considered in the performance appraisal, such as finance, operations, and administration.',
			role: 'Fullstack Developer',
			entry: {
				month: 12,
				year: 2022
			},
			resign: {
				month: 2,
				year: 2023
			}
		}
	]
};

export default profile;
