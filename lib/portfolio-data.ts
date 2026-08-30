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

export type ProjectCategory = 'Key' | 'Personal' | 'School' | 'Professional' | 'WIP'

export type ProjectBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'imagePair'; images: { src: string; caption?: string }[] }

export type Project = {
  slug: string
  title: string
  description: string
  category: ProjectCategory
  tags: string[]
  image: string
  year: string
  blocks: ProjectBlock[]
  // WIP-only fields. `startDate` (YYYY-MM) orders the Works in Progress
  // timeline oldest-first; `status` is the mid-length progress description.
  // When a project's category changes away from 'WIP', these are ignored and
  // the project flows into the archive / gallery / Key Projects like any other.
  startDate?: string
  status?: string
}

export const projects: Project[] = [
  {
    slug: 'blast-off',
    title: 'Bucky Blast Off',
    description: 'A table-top sized pneumatic launching coaster',
    category: 'School',
    tags: ['SolidWorks', 'Pneumatic Controls', '3D Printing'],
    image: '/images/project-robotic-arm.png',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'Bucky Blast Off is a table-top scale pneumatic launch coaster built to demonstrate how compressed-air actuation can accelerate a cart along a track.',
      },
      {
        type: 'image',
        src: '/images/build-gearbox.png',
        caption: 'The launch mechanism assembled in SolidWorks.',
      },
      {
        type: 'text',
        text: 'The project spanned a full CAD assembly, a pneumatic control circuit, and a mix of 3D-printed and laser-cut structural components.',
      },
      {
        type: 'text',
        text: 'I tuned the launch pressure and release timing through repeated test runs until the cart reliably completed the layout.',
      },
      {
        type: 'image',
        src: '/images/build-cad-bracket.png',
        caption: 'Detail of the release-trigger bracket.',
      },
    ],
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
    blocks: [
      {
        type: 'text',
        text: 'This dark ride project brought together storytelling and engineering to create an immersive guest experience.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/project-turbine.png', caption: 'Scenic prop modeling.' },
          { src: '/images/build-suspension.png', caption: 'Ride-vehicle linkage study.' },
        ],
      },
      {
        type: 'text',
        text: 'I designed and modeled scenic props, hand-painted set pieces, and integrated small animatronic elements that react as the ride vehicle passes.',
      },
      {
        type: 'text',
        text: 'The goal was to balance theatrical atmosphere with mechanisms that are reliable enough to run repeatedly.',
      },
    ],
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
    blocks: [
      {
        type: 'text',
        text: 'The animatronic jellyfish was designed to add gentle, lifelike motion to an underwater dark-ride scene.',
      },
      {
        type: 'image',
        src: '/images/project-3dprinter.png',
        caption: 'Printing the translucent bell.',
      },
      {
        type: 'text',
        text: 'Using SolidWorks for the mechanism, Arduino for motion control, and a combination of laser cutting and 3D printing for the body, I created a pulsing bell and trailing tentacles driven by a servo linkage.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/build-heatsink.png', caption: 'Servo linkage detail.' },
          { src: '/images/project-drone.png', caption: 'Assembled prototype under test lighting.' },
        ],
      },
      {
        type: 'text',
        text: 'Careful attention to translucent materials and lighting sells the illusion of drifting through the ocean.',
      },
    ],
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
    blocks: [
      {
        type: 'text',
        text: 'This five-degree-of-freedom animatronic octopus was an exercise in iterative plastics manufacturing.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/project-robotic-arm.png', caption: 'Early arm articulation prototype.' },
          { src: '/images/build-gearbox.png', caption: 'Drive mechanism for the arms.' },
        ],
      },
      {
        type: 'text',
        text: 'Each flexible arm went through multiple design cycles to balance range of motion, durability, and manufacturability.',
      },
      {
        type: 'text',
        text: 'I paired mechanical design with a life-cycle study of the plastic components, refining wall thicknesses and joints across successive prototypes until the motion felt natural and the parts held up to repeated actuation.',
      },
      {
        type: 'image',
        src: '/images/build-pump.png',
        caption: 'Final actuation testing rig.',
      },
    ],
  },
  {
    slug: 'logos',
    title: 'Logos and Designs',
    description: 'Branding a start up club with iconic logos and designs.',
    category: 'School',
    tags: ['Adobe Illustrator', 'Creative', 'Marketing'],
    image: '/images/build-cad-bracket.png',
    year: '2024',
    blocks: [
      {
        type: 'text',
        text: 'I developed the visual identity for Badgers in Themed Entertainment, a student organization I founded.',
      },
      {
        type: 'image',
        src: '/images/build-conveyor.png',
        caption: 'Logo family and design assets.',
      },
      {
        type: 'text',
        text: 'Working in Adobe Illustrator, I created a family of logos, marks, and design assets that communicate the club\u2019s creative, engineering-driven mission. The branding is used across merchandise, presentations, and recruiting materials.',
      },
    ],
  },
  {
    slug: 'crane',
    title: 'Crane Project',
    description:
      'A table top crane capable of lifting 3.5 kilograms using a block and tackle and counterweight system',
    category: 'School',
    tags: ['Gear Design', 'CAD'],
    image: '/images/build-gearbox.png',
    year: '2023',
    blocks: [
      {
        type: 'text',
        text: 'This table-top crane was designed to lift 3.5 kilograms using a block-and-tackle system paired with a counterweight for stability.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/build-heatsink.png', caption: 'Gear-train layout.' },
          { src: '/images/build-suspension.png', caption: 'Counterweight arm.' },
        ],
      },
      {
        type: 'text',
        text: 'The project focused on gear design and mechanical advantage, with full CAD modeling to validate the geometry before building. Testing confirmed the crane could lift its target load smoothly without tipping.',
      },
    ],
  },
  {
    slug: 'flying-car',
    title: 'Flying Car Project',
    description: 'Drawing designs to 3D model a flying car',
    category: 'School',
    tags: ['Solidworks', 'Hand sketching', 'Engineering Drawings'],
    image: '/images/build-suspension.png',
    year: '2024',
    blocks: [
      {
        type: 'text',
        text: 'A conceptual design exercise that started from hand sketches and progressed into a full SolidWorks 3D model of a flying car.',
      },
      {
        type: 'image',
        src: '/images/build-cad-bracket.png',
        caption: 'Sketch translated into CAD geometry.',
      },
      {
        type: 'text',
        text: 'The project emphasized translating freehand ideation into precise engineering drawings, developing my ability to move fluidly between creative concept and dimensioned CAD geometry.',
      },
      {
        type: 'image',
        src: '/images/project-drone.png',
        caption: 'Rendered concept model.',
      },
    ],
  },
  {
    slug: 'eoat',
    title: 'End of Arm Tool',
    description: 'Deburring EOAT to be used at Mastermold LLC to increase productivity of finishing products',
    category: 'Professional',
    tags: ['Solidworks', 'FEA', 'Testing', 'Manufacturing', 'Bill of Materials', 'Engineering Drawing', 'Assembly Guide'],
    image: '/images/build-heatsink.png',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'During my internship at Mastermold LLC, I designed and tested a deburring end-of-arm tool (EOAT) to increase the productivity of finishing operations.',
      },
      {
        type: 'image',
        src: '/images/build-pump.png',
        caption: 'EOAT mounted for testing.',
      },
      {
        type: 'text',
        text: 'The work covered the full engineering package: SolidWorks modeling, FEA to validate loading, and physical testing on the floor.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/build-gearbox.png', caption: 'FEA loading study.' },
          { src: '/images/build-cad-bracket.png', caption: 'Mounting bracket detail.' },
        ],
      },
      {
        type: 'text',
        text: 'I delivered a bill of materials, engineering drawings, and an assembly guide so the tool could be reproduced and maintained.',
      },
    ],
  },
  {
    slug: 'dire-wolf',
    title: 'Dire Wolf Racing Parts',
    description: 'Engineering mockups for production models of railings on a competition sail boat.',
    category: 'Professional',
    tags: ['Engineering Drawings'],
    image: '/images/build-conveyor.png',
    year: '2023',
    blocks: [
      {
        type: 'text',
        text: 'I produced engineering mockups and production-ready models for railing components on a competition sailboat.',
      },
      {
        type: 'image',
        src: '/images/build-suspension.png',
        caption: 'Railing component drawing.',
      },
      {
        type: 'text',
        text: 'The focus was on clear, manufacturable engineering drawings that could be handed off for fabrication, ensuring the parts fit the existing hull geometry and met the structural demands of racing.',
      },
    ],
  },
  {
    slug: 'ornament',
    title: 'Camp Randall Ornament',
    description: '3D, lasercut ornament of my favorite college football stadium',
    category: 'Personal',
    tags: ['Laser Cutting', 'Adobe Illustrator'],
    image: '/images/build-conveyor.png',
    year: '2023',
    blocks: [
      {
        type: 'text',
        text: 'A layered, laser-cut ornament celebrating Camp Randall Stadium.',
      },
      {
        type: 'image',
        src: '/images/build-cad-bracket.png',
        caption: 'Stacked laser-cut layers.',
      },
      {
        type: 'text',
        text: 'I designed the artwork in Adobe Illustrator and translated it into stacked laser-cut layers that give the ornament depth and dimension. It is a small keepsake project that blends my love of my school with precise digital fabrication.',
      },
    ],
  },
  {
    slug: 'gingerbread',
    title: 'Gingerbread Houses',
    description: 'Laser cut, collapsible gingerbread houses, perfect for Holiday decorations!',
    category: 'Personal',
    tags: ['Onshape', 'Laser Cutting', 'Creative'],
    image: '/images/build-conveyor.png',
    year: '2024',
    blocks: [
      {
        type: 'text',
        text: 'These collapsible gingerbread houses are laser-cut decorations designed to assemble and break down flat for easy storage.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/build-gearbox.png', caption: 'Interlocking panel layout.' },
          { src: '/images/build-heatsink.png', caption: 'Assembled house.' },
        ],
      },
      {
        type: 'text',
        text: 'Modeled in Onshape, the interlocking panels snap together without glue. The project was a fun way to combine parametric CAD with festive, giftable design.',
      },
    ],
  },
  {
    slug: 'litho-lamp',
    title: 'Resin-Printed Lithograph Lamp',
    description: 'Lamp shade and stand designed with memorable photo moments when the light turns on',
    category: 'Personal',
    tags: ['3D Printing', 'Resin Printing', 'Creative'],
    image: '/images/build-conveyor.png',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'A resin-printed lithophane lamp that reveals hidden photographs when illuminated.',
      },
      {
        type: 'image',
        src: '/images/project-3dprinter.png',
        caption: 'Resin printing the lithophane shade.',
      },
      {
        type: 'text',
        text: 'I designed both the lampshade and stand, tuning the lithophane thickness so cherished photo moments appear only when the light turns on.',
      },
      {
        type: 'image',
        src: '/images/build-pump.png',
        caption: 'Assembled lamp base.',
      },
      {
        type: 'text',
        text: 'The project explored the optical properties of resin prints alongside a functional, sculptural form.',
      },
    ],
  },
  {
    slug: 'crochet',
    title: 'Crochet Projects',
    description:
      'A selection of my favorite crochet projects, some of which are on my Etsy shop, with sales in over 14 countries.',
    category: 'Personal',
    tags: ['Creative', 'Marketing'],
    image: '/images/build-conveyor.png',
    year: '2020 - Present',
    blocks: [
      {
        type: 'text',
        text: 'An ongoing collection of my favorite crochet projects, many of which I sell through my Etsy shop with sales in over 14 countries.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/images/build-cad-bracket.png', caption: 'A few finished pieces.' },
          { src: '/images/build-suspension.png', caption: 'Work in progress.' },
        ],
      },
      {
        type: 'text',
        text: 'Beyond the craft itself, running the shop has taught me about product design, marketing, and fulfillment. It is a creative outlet that keeps my hands busy and my design instincts sharp.',
      },
    ],
  },
  {
    slug: 'parrot',
    title: 'Animatronic Parrot',
    description: 'A 5-DOF animatronic bird designed to iterate',
    category: 'WIP',
    tags: ['SolidWorks', 'Arduino Programming', 'Kinematics', '3D Printing'],
    image: '/images/project-robotic-arm.png',
    year: '2026',
    startDate: '2026-06',
    status:
      'I am prototyping a four-legged walker to study stable gait generation across uneven surfaces. So far I have modeled the leg linkages in SolidWorks and printed a first set of joints, and I am now writing the inverse-kinematics routine that coordinates the twelve servos. Next up is tuning the walking cycle so the robot can transition smoothly between standing, trotting, and turning.',
    blocks: [],
  },
  {
    slug: 'kuka',
    title: 'Kuka Arm',
    description: 'Table-top sized model attraction',
    category: 'WIP',
    tags: ['Embedded C++', 'PCB Design', 'CAD', 'Data Logging'],
    image: '/images/project-turbine.png',
    year: '2026',
    startDate: '2026-08',
    status:
      'This build pairs a small solar panel and battery with a microcontroller to log temperature, humidity, and wind data from my backyard. I have the sensor breadboard working and a weatherproof enclosure modeled for printing. The current focus is designing a compact PCB to replace the breadboard and getting the readings to publish to a simple dashboard.',
    blocks: [],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

// Projects that have their own detail page. WIP entries are status updates,
// not full case studies, so they are excluded from routing and detail views.
export function getDetailProjects() {
  return projects.filter((p) => p.category !== 'WIP')
}

// Works in Progress, ordered oldest start date first.
export function getWorksInProgress() {
  return projects
    .filter((p) => p.category === 'WIP')
    .sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''))
}

export const smallerBuildTabs: {
  key: 'Personal' | 'School' | 'Professional'
  label: string
  blurb: string
}[] = [
  { key: 'Personal', label: 'Personal Projects', blurb: 'Work driven by a curiosity to learn.' },
  { key: 'School', label: 'School Projects', blurb: 'Coursework and club deliverables.' },
  { key: 'Professional', label: 'Professional Projects', blurb: 'Production work from internships.' },
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
  {
    company: 'Busch Gardens Williamsburg',
    role: 'Leadership Intern, Supply Chain',
    period: 'Summer 2026',
    detail:
      'Founded and lead a student organization focused on themed entertainment, coordinating a multidisciplinary team through design reviews and hands-on builds.',
  }
]

export const certificates = [
  {
    name: 'Engineering in Training (EIT)',
    organization: 'California Board for Professional Engineers',
    date: '2025',
    detail:
      'License number #188722',
  }
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
]
