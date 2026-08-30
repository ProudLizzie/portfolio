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
  longDescription?: string
  category: ProjectCategory
  tags: string[]
  image: string
  gallery?: string[]
  year: string
}

export const projects: Project[] = [
  {
    slug: 'blast-off',
    title: 'Bucky Blast Off',
    description:
      'A table-top sized pneumatic launching coaster',
    longDescription:
      'Bucky Blast Off is a table-top scale pneumatic launch coaster built to demonstrate how compressed-air actuation can accelerate a cart along a track. The project spanned full CAD assembly in SolidWorks, a pneumatic control circuit, and a mix of 3D-printed and laser-cut structural components. I tuned the launch pressure and release timing through repeated test runs until the cart reliably completed the layout.',
    category: 'School',
    tags: ['SolidWorks', 'Pneumatic Controls', '3D Printing'],
    image: '/images/project-robotic-arm.png',
    gallery: ['/images/build-gearbox.png', '/images/build-cad-bracket.png'],
    year: '2025',
  },
  {
    slug: 'dark-ride',
    title: 'Dark Ride Scenery',
    description:
      'An interactive dark ride with painted scenery, modeled props, and small immersive animatronics.',
    longDescription:
      'This dark ride project brought together storytelling and engineering to create an immersive guest experience. I designed and modeled scenic props, hand-painted set pieces, and integrated small animatronic elements that react as the ride vehicle passes. The goal was to balance theatrical atmosphere with mechanisms that are reliable enough to run repeatedly.',
    category: 'School',
    tags: ['Design', 'Modeling', 'Creative'],
    image: '/images/project-drone.png',
    gallery: ['/images/project-turbine.png', '/images/build-suspension.png'],
    year: '2025',
  },
  {
    slug: 'jelly',
    title: 'Animatronic Jellyfish',
    description:
      'Small scale animatronic Jellyfish to create an immersive ocean feel in a dark ride attraction.',
    longDescription:
      'The animatronic jellyfish was designed to add gentle, lifelike motion to an underwater dark-ride scene. Using SolidWorks for the mechanism, Arduino for motion control, and a combination of laser cutting and 3D printing for the body, I created a pulsing bell and trailing tentacles driven by a servo linkage. Careful attention to translucent materials and lighting sells the illusion of drifting through the ocean.',
    category: 'Key',
    tags: ['Solidworks', 'Arduino Programming', 'Laser Cutting', '3D Printing'],
    image: '/images/project-turbine.png',
    gallery: ['/images/project-3dprinter.png', '/images/build-heatsink.png', '/images/project-drone.png'],
    year: '2026',
  },
  {
    slug: 'octo',
    title: '5 DOF Animatronic Octopus',
    description:
      'An animatronic octopus with flexible arms designed with thorough plastic manufacturing iteration',
    longDescription:
      'This five-degree-of-freedom animatronic octopus was an exercise in iterative plastics manufacturing. Each flexible arm went through multiple design cycles to balance range of motion, durability, and manufacturability. I paired mechanical design with a life-cycle study of the plastic components, refining wall thicknesses and joints across successive prototypes until the motion felt natural and the parts held up to repeated actuation.',
    category: 'Key',
    tags: ['Mechanical Design', 'Life Cycle Study', 'Plastics Manufacturing', 'Iterative Development'],
    image: '/images/project-3dprinter.png',
    gallery: ['/images/project-robotic-arm.png', '/images/build-gearbox.png', '/images/build-pump.png'],
    year: '2026',
  },
  {
    slug: 'logos',
    title: 'Logos and Designs',
    description: 'Branding a start up club with iconic logos and designs.',
    longDescription:
      'I developed the visual identity for Badgers in Themed Entertainment, a student organization I founded. Working in Adobe Illustrator, I created a family of logos, marks, and design assets that communicate the club\u2019s creative, engineering-driven mission. The branding is used across merchandise, presentations, and recruiting materials.',
    category: 'School',
    tags: ['Adobe Illustrator', 'Creative', 'Marketing'],
    image: '/images/build-cad-bracket.png',
    gallery: ['/images/build-conveyor.png'],
    year: '2024',
  },
  {
    slug: 'crane',
    title: 'Crane Project',
    description: 'A table top crane capable of lifting 3.5 kilograms using a block and tackle and counterweight system',
    longDescription:
      'This table-top crane was designed to lift 3.5 kilograms using a block-and-tackle system paired with a counterweight for stability. The project focused on gear design and mechanical advantage, with full CAD modeling to validate the geometry before building. Testing confirmed the crane could lift its target load smoothly without tipping.',
    category: 'School',
    tags: ['Gear Design', 'CAD'],
    image: '/images/build-gearbox.png',
    gallery: ['/images/build-heatsink.png', '/images/build-suspension.png'],
    year: '2023',
  },
  {
    slug: 'flying-car',
    title: 'Flying Car Project',
    description: 'Drawing designs to 3D model a flying car',
    longDescription:
      'A conceptual design exercise that started from hand sketches and progressed into a full SolidWorks 3D model of a flying car. The project emphasized translating freehand ideation into precise engineering drawings, developing my ability to move fluidly between creative concept and dimensioned CAD geometry.',
    category: 'School',
    tags: ['Solidworks', 'Hand sketching', 'Engineering Drawings'],
    image: '/images/build-suspension.png',
    gallery: ['/images/build-cad-bracket.png', '/images/project-drone.png'],
    year: '2024',
  },
  {
    slug: 'eoat',
    title: 'End of Arm Tool',
    description: 'Deburring EOAT to be used at Mastermold LLC to increase productivity of finishing products',
    longDescription:
      'During my internship at Mastermold LLC, I designed and tested a deburring end-of-arm tool (EOAT) to increase the productivity of finishing operations. The work covered the full engineering package: SolidWorks modeling, FEA to validate loading, physical testing, a bill of materials, engineering drawings, and an assembly guide so the tool could be reproduced and maintained on the floor.',
    category: 'Work',
    tags: ['Solidworks', 'FEA', 'Testing', 'Manufacturing', 'Bill of Materials', 'Engineering Drawing', 'Assembly Guide'],
    image: '/images/build-heatsink.png',
    gallery: ['/images/build-pump.png', '/images/build-gearbox.png', '/images/build-cad-bracket.png'],
    year: '2025',
  },
  {
    slug: 'dire-wolf',
    title: 'Dire Wolf Racing Parts',
    description: 'Engineering mockups for production models of railings on a competition sail boat.',
    longDescription:
      'I produced engineering mockups and production-ready models for railing components on a competition sailboat. The focus was on clear, manufacturable engineering drawings that could be handed off for fabrication, ensuring the parts fit the existing hull geometry and met the structural demands of racing.',
    category: 'Work',
    tags: ['Engineering Drawings'],
    image: '/images/build-conveyor.png',
    gallery: ['/images/build-suspension.png'],
    year: '2023',
  },
  {
    slug: 'ornament',
    title: 'Camp Randall Ornament',
    description: '3D, lasercut ornament of my favorite college football stadium',
    longDescription:
      'A layered, laser-cut ornament celebrating Camp Randall Stadium. I designed the artwork in Adobe Illustrator and translated it into stacked laser-cut layers that give the ornament depth and dimension. It is a small keepsake project that blends my love of my school with precise digital fabrication.',
    category: 'Personal',
    tags: ['Laser Cutting', 'Adobe Illustrator'],
    image: '/images/build-conveyor.png',
    gallery: ['/images/build-cad-bracket.png'],
    year: '2023',
  },
  {
    slug: 'gingerbread',
    title: 'Gingerbread Houses',
    description: 'Laser cut, collapsible gingerbread houses, perfect for Holiday decorations!',
    longDescription:
      'These collapsible gingerbread houses are laser-cut decorations designed to assemble and break down flat for easy storage. Modeled in Onshape, the interlocking panels snap together without glue. The project was a fun way to combine parametric CAD with festive, giftable design.',
    category: 'Personal',
    tags: ['Onshape', 'Laser Cutting', 'Creative'],
    image: '/images/build-conveyor.png',
    gallery: ['/images/build-gearbox.png', '/images/build-heatsink.png'],
    year: '2024',
  },
  {
    slug: 'litho-lamp',
    title: 'Resin-Printed Lithograph Lamp',
    description: 'Lamp shade and stand designed with memorable photo moments when the light turns on',
    longDescription:
      'A resin-printed lithophane lamp that reveals hidden photographs when illuminated. I designed both the lampshade and stand, tuning the lithophane thickness so cherished photo moments appear only when the light turns on. The project explored the optical properties of resin prints alongside a functional, sculptural form.',
    category: 'Personal',
    tags: ['3D Printing', 'Resin Printing', 'Creative'],
    image: '/images/build-conveyor.png',
    gallery: ['/images/project-3dprinter.png', '/images/build-pump.png'],
    year: '2025',
  },
  {
    slug: 'crochet',
    title: 'Crochet Projects',
    description: 'A selection of my favorite crochet projects, some of which are on my Etsy shop, with sales in over 14 countries.',
    longDescription:
      'An ongoing collection of my favorite crochet projects, many of which I sell through my Etsy shop with sales in over 14 countries. Beyond the craft itself, running the shop has taught me about product design, marketing, and fulfillment. It is a creative outlet that keeps my hands busy and my design instincts sharp.',
    category: 'Personal',
    tags: ['Creative', 'Marketing'],
    image: '/images/build-conveyor.png',
    gallery: ['/images/build-cad-bracket.png', '/images/build-suspension.png'],
    year: '2020 - Present',
  }
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

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
