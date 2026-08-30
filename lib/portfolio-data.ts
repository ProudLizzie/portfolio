export const profile = {
  name: 'Elizabeth Janicek',
  role: 'Mechanical Engineering Student',
  location: 'Madison, WI',
  intro:
    'I am interested in a professional experience where I can use my problem-solving skills and dedication to develop my knowledge in the Mechanical Engineering and Design industry.',
  email: 'eajanicek@gmail.com',
  linkedin: 'https://linkedin.com/in/eajanicek',
  github: 'https://github.com/example',
  resumeUrl: '/resume.pdf',
  portrait: '/images/portrait.png',
}

export const stats = [
  { value: '13', label: 'Projects Completed' },
  { value: '3', label: 'Years of Experience' },
  { value: '15', label: 'Software Tools' },
]

export type ProjectCategory = 'Key' | 'Personal' | 'School' | 'Work'

export type Project = {
  slug: string
  title: string
  description: string
  category: ProjectCategory
  tags: string[]
  image: string
  year: string
}

export const projects: Project[] = [
  {
    slug: 'blast-off',
    title: 'Bucky Blast Off',
    description:
      'A table-top sized pneumatic launching coaster',
    category: 'School',
    tags: ['SolidWorks', 'Pneumatic Controls', '3D Printing'],
    image: '/images/project-robotic-arm.png',
    year: '2025',
  },
  {
    slug: 'dark-ride',
    title: 'Dark Ride Scenery',
    description:
      'An interactive dark ride with painted scenery, modeled props, and small immersive animatronics.',
    category: 'School',
    tags: ['Design', 'Modeling', 'Creative'],
    image: '/images/project-drone.png',
    year: '2025',
  },
  {
    slug: 'jelly',
    title: 'Animatronic Jellyfish',
    description:
      'Small scale animatronic Jellyfish to create an immersive ocean feel in a dark ride attraction.',
    category: 'Key',
    tags: ['Solidworks', 'Arduino Programming', 'Laser Cutting', '3D Printing'],
    image: '/images/project-turbine.png',
    year: '2026',
  },
  {
    slug: 'octo',
    title: '5 DOF Animatronic Octopus',
    description:
      'An animatronic octopus with flexible arms designed with thorough plastic manufacturing iteration',
    category: 'Key',
    tags: ['Mechanical Design', 'Life Cycle Study', 'Plastics Manufacturing', 'Iterative Development'],
    image: '/images/project-3dprinter.png',
    year: '2026',
  },
  {
    slug: 'logos',
    title: 'Logos and Designs',
    description: 'Branding a start up club with iconic logos and designs.',
    category: 'School',
    tags: ['Adobe Illustrator', 'Creative', 'Marketing'],
    image: '/images/build-cad-bracket.png',
    year: '2024',
  },
  {
    slug: 'crane',
    title: 'Crane Project',
    description: 'A table top crane capable of lifting 3.5 kilograms using a block and tackle and counterweight system',
    category: 'School',
    tags: ['Gear Design', 'CAD'],
    image: '/images/build-gearbox.png',
    year: '2023',
  },
  {
    slug: 'flying-car',
    title: 'Flying Car Project',
    description: 'Drawign Designs to 3D model a flying car',
    category: 'School',
    tags: ['Solidworks', 'Hand sketching', 'Engineering Drawings'],
    image: '/images/build-suspension.png',
    year: '2024',
  },
  {
    slug: 'eoat',
    title: 'End of Arm Tool',
    description: 'Deburring EOAT to be used at Mastermold LLC to increase productivity of finishing products',
    category: 'Work',
    tags: ['Solidworks', 'FEA', 'Testing', 'Manufacturing', 'Bill of Materials', 'Engineering Drawing', 'Assembly Guide'],
    image: '/images/build-heatsink.png',
    year: '2025',
  },
  {
    slug: 'dire-wolf',
    title: 'Dire Wolf Racing Parts',
    description: 'Engineering mockups for production Models of railings on a competition sail boat.',
    category: 'Professional',
    tags: ['Engineering Drawings'],
    image: '/images/build-conveyor.png',
    year: '2023',
  },
  {
    slug: 'ornament',
    title: 'Camp Randall Ornament',
    description: '3D, lasercut ornament of my favorite college football stadium',
    category: 'Personal',
    tags: ['Laser Cutting', 'Adobe Illustrator'],
    image: '/images/build-conveyor.png',
    year: '2023',
  },
  {
    slug: 'gingerbread',
    title: 'Gingerbread Houses',
    description: 'Laser cut, collapsible gingerbread houses, perfect for Holiday decorations!',
    category: 'Personal',
    tags: ['Onshape', 'Laser Cutting', 'Creative'],
    image: '/images/build-conveyor.png',
    year: '2024',
  },
  {
    slug: 'litho-lamp',
    title: 'Resin-Printed Lithograph Lamp',
    description: 'Lamp shade and stand designed with memorable photo moments when the light turns on',
    category: 'Personal',
    tags: ['3D Printing', 'Resin Printing', 'Creative'],
    image: '/images/build-conveyor.png',
    year: '2025',
  },
  {
    slug: 'crochet',
    title: 'Crochet Projects',
    description: 'A selection of my favorite crochet projects, some of which are on my Etsy shop, with sales in over 14 countries.',
    category: 'Personal',
    tags: ['Creative', 'Marketing'],
    image: '/images/build-conveyor.png',
    year: '2020 - Present',
  }
]

export const smallerBuildTabs: {
  key: 'Personal' | 'School' | 'Work'
  label: string
  blurb: string
}[] = [
  { key: 'Personal', label: 'Personal Projects', blurb: 'Work driven by a curiosity to learn.' },
  { key: 'School', label: 'School Projects', blurb: 'Coursework and club deliverables.' },
  { key: 'Work', label: 'Work Projects', blurb: 'Production work from internships and co-ops.' },
]

export const skills = [
  { group: 'Core Mechanical Engineering', items: ['SolidWorks', 'ANSYS', 'Onshape', 'GD&T', 'Blender','FEA Analysis', 'MATLAB', 'Engineering Equation Solver (EES)', 'Design for Manufacturability (DFM)', 'ASTM Standards', 'Six Sigma'] },
  { group: 'Programming and Computer Science', items: ['Python', 'Java', 'JavaScript', 'HTML', 'SQL', 'C++', 'Simulink Scripting'] },
  { group: 'Communication and Design', items: ['Microsoft Suite', 'Google Suite', 'Adobe Illustrator', 'Presentational Speaking'] },
  { group: 'Project Management', items: ['Scheduling', 'Design Review', 'Strategy', 'Risk Management', 'Gantt Chart'] },
]

export const education = [
  {
    school: 'University of Wisconsin-Madison',
    degree: 'B.S. Mechanical Engineering',
    period: '2023 — 2027',
    detail: 'GPA 3.86 / 4.0',
  }
]

export const experience = [
  {
    company: 'Mastermold LLC',
    role: 'Mechanical Engineering Intern',
    period: 'Summer 2025',
    detail:
      'Designed and tested a deburring end-of-arm tool that increased finishing productivity, delivering FEA, a bill of materials, engineering drawings, and an assembly guide.',
  },
  {
    company: 'UW-Madison, ME 201',
    role: 'Student Assistant',
    period: '2024 — Present',
    detail:
      'Support instruction for introductory mechanical engineering coursework, guiding students through problem sets and design fundamentals.',
  },
  {
    company: 'Badgers in Themed Entertainment',
    role: 'Founder & President',
    period: '2024 — Present',
    detail:
      'Founded and lead a student organization focused on themed entertainment, coordinating a multidisciplinary team through design reviews and hands-on builds.',
  },
]

export const certificates = [
  {
    name: 'Mathematics Certificate (Optimization Focus)',
    organization: 'University of Wisconsin-Madison',
    date: '2025',
  },
  {
    name: 'Manufacturing Certificate',
    organization: 'University of Wisconsin-Madison',
    date: 'In Progress',
  },
  {
    name: 'Leadership Certificate',
    organization: 'University of Wisconsin-Madison',
    date: 'In Progress',
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
]
