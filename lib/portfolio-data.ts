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
  portrait: '/images/portrait.jpg',
}

export const stats = [
  { value: '13', label: 'Projects Completed' },
  { value: '3', label: 'Years of Experience' },
  { value: '15', label: 'Software Tools' },
]

export type ProjectCategory = 'Key' | 'Personal' | 'Academic' | 'Professional' | 'WIP'

export type ProjectBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'imagePair'; images: { src: string; caption?: string }[] }
  // Side-by-side image + paragraph. `imageSide` places the image left
  // (default) or right of the text, useful for explaining a single decision
  // or build step alongside a supporting photo.
  | {
      type: 'imageText'
      src: string
      text: string
      caption?: string
      imageSide?: 'left' | 'right'
    }
  // An inline, embedded PDF viewer (calculations, drawings, reports) shown
  // directly on the page. `src` points at a PDF in /public.
  | { type: 'pdf'; src: string; title?: string; caption?: string }

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
    category: 'Academic',
    tags: ['SolidWorks', 'Pneumatic Controls', '3D Printing'],
    image: '/blastoff.png',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'Our very first club project was a dedication to the city of Madison. Powered by a bike pump, our pneumatic-launch demonstration was a great way to get kids excited about engineering, while I was learning more about engineering, and how to lead a student org.',
      },
      {
        type: 'text',
        text: 'As this was our very first year as a club, most of my time was dedicated to helping our members. Organizing meeting times, scheduling production deadlines, and training our youngest members in different engineering principles was no easy task. In the end, I am so incredibly proud of the project we were able to put forward.',
      },
      {
        type: 'text',
        text: 'In my free time, I helped out with a lot of the scenery and decorations, as well as designing the ride vehicle. For our presentation at Engineering Expo, I designed and created our club shirts for our team members.',
      },
      {
        type: 'image',
        src: '/images/buckyexpo.jpg',
        caption: 'Engineering Expo with Bucky!',
      },
      {
        type: 'text',
        text: 'Since our first showing, we have made a few design changes, as well. Since our event demonstrations focused on energy conversion, I designed a tall spike for our car to go up. This way kids had a better time understanding that the more energy they put in, the more that will come out and the higher the car will go. I also iterated on the car a bit more, printing the bogeys with resin, and cleaning up the outser shell for a sleek appearance.',
      },
    ],
  },
  {
    slug: 'dark-ride',
    title: 'Dark Ride Scenery',
    description:
      'An interactive dark ride with painted scenery, modeled props, and small immersive animatronics.',
    category: 'Academic',
    tags: ['Design', 'Modeling', 'Creative'],
    image: '/ridebox.png',
    year: '2026',
    blocks: [
      {
        type: 'text',
        text: 'I designed the box early fall semester, split into 6 sections each 2 ft x 3 ft, there are a total of 5 different rooms for the ride vehicle to traverse throguh. The colored blocks are where we expect show elements to be spaced, and this design overall has helped us visualize the project at a low fidelity scale. ',
      },
      {
        type: 'text',
        text: 'As our team split up to work on different components, I was able to add some decorative elements to the boxes. painting the walls and ground to feel more immersive, as well as sculpting some elements from clay, this scenery will really help pull everything together. I also designed a coral structure and assembled it using a foam board, covered in paper mache and clay to give a coral texture. Moving corals were created using a spherical gear system and twisted spirals, meticulously arranged to give a flowing illusion. In the darker areas of the undersea adventure, I designed an array of fish to be laser cut out, and with the help of LEDs, give a beautiful show of sea creatures. ',
      },
      {
        type: 'image',
          src: '/images/boxouter.JPG',
          caption: 'Overall Box',
      },
    ],
  },
  
  {
    slug: 'octo',
    title: '5 DOF Animatronic Octopus',
    description:
      'An animatronic octopus with flexible arms designed with thorough plastic manufacturing iteration.',
    category: 'Key',
    tags: ['Mechanical Design', 'Life Cycle Study', 'Plastics Manufacturing', 'Iterative Development'],
    image: '/octojelly.png',
    year: '2026',
    blocks: [
      {
        type: 'text',
        text: 'I had the opportunity to work on our showstopper animatronic for a model dark ride: the octopus. Positioned in our final scene, this centerpiece is designed to serve as a striking focal point amid a sea of celebrating fish. My mission was to create a figure with fluid, lifelike movement using limited resources and parts, presenting quite a few engineering challenges.',
      },
      {
        type: 'text',
        text: 'My base idea was to design thin, flexible joints between 3D-printed segments, allowing the model to bend at specific intersections and greatly simplifying the overall figure. From a test model, I ran extensive calculations and re-prints to achieve the desired range of motion while maintaining structural rigidity. The thin joints proved difficult to print, and even successful prints were incredibly brittle. After many iterations, I finally arrived at a working solution: double walled joints printed at a slightly reduced layer height. Two factors proved critical to preserving a reliable living hinge: ensuring each layer started and ended within the body of the part rather than at the hinge location, and activating the hinge while the plastic was still warm.',
      },
      {
        type: 'text',
        text: 'With the hinge mechanism solved, I turned to aesthetics and making the assembly actually look like a tentacle. Designed in Onshape, the shape came together relatively quickly. A bracket and pulley were added at the end to guide the string running through the length of the tentacle. By wrapping the string in opposite directions, the tentacle achieves a beautifully organic, sweeping motion, all driven by a single motor. This paired pretty well with one of my team members octopus body, and overall gave a great effect for our final scene, which will be refined even more next year!',
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
    image: '/images/jelly.png',
    year: '2026',
    blocks: [
      {
        type: 'text',
        text: 'Hopeing to be relatively small, I designed an umbrella-like mechanism with a few parts to 3D prints and some to laser cut. With keeping a simple base and adding movement through a motor, I hope to make the jellyfish come to life with a pink sheer fabric and some ribbon to simulate the tentacles. The motion of them was all coded in C++ and transferred to servo motors via an arduino',
      },
      {
        type: 'image',
        src: '/images/jelbefaft.jpg',
        caption: 'Jellyfish before and after decorative elements',
      },
    ],
  },
  {
    slug: 'injection',
    title: 'Injection Molding Studies',
    description:
      'A snippet of my work from Intro to Injection Molding',
    category: 'Key',
    tags: ['Moldex3D', 'Plastics Properties', 'Manufacturing'],
    image: '/molding.png',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'This class has had a really big impact on my studies at UW-Madison. As one of the first technical elective courses I took, it was refreshing to have a more niche class taught by a professor with a true passion for the content, which in turn, gave me more of an interest. I learned a lot in this course about plastics manufacturing, specifically injection molding, and I am proud to share it!',
      },
      {
        type: 'text',
        text: 'Our first project was to simulate the injeciton molding process on a piece of our choice. Pairing my love of math with baking, I chose to model a pi-shaped cookie cutter made from food-safe High Density Polyethylene (HDPE). I ran simulations to control the cooling channels, entrance gate, and in-mold conditions, all in Moldex3D. In class, I presented my findings and submitted my report which is attached below.',
      },
      { type: 'pdf',
       src: '/midterm.pdf',
       title: 'Moldex3D Report',
      }
      {
        type: 'text',
        text: 'I also completed a final research project for this course. We were able to choose any specialty of injection molding, and combine our knowledge from the course entirety, as well as new research in a 5 page academic paper. For this, I chose Foam Injection Molding. ',
      },
      {
        type: 'text',
        text: 'Abstract: Foam injection molding is a specialized process of injection molding that can be a great way to save materials and production costs in the manufacturing industry. This paper examines recent developments in foam injection molding, and research was compiled to discuss its history, process, and applications. Although foam injection molding seems simple on the outside and requires minimal setup, the inability to simulate outcomes can make the process difficult to perfect. Using either physical processes, with additives in the form of supercritical fluid, or chemical processes, with powder additives that give off gas in the mold, foam injection molding can be used across a variety of industries. Current research is working towards refining surface quality and further decreasing part density, but with these issues solved, foam injection molding is sure to expand and become more prevalent in the injection molding and manufacturing world.',
      },
      { type: 'pdf',
       src: '/term.pdf',
       title: 'Term Project Paper on Foam Injection Molding',
      }
      
    ],
  },
  // {
  //   slug: 'logos',
  //   title: 'Logos and Designs',
  //   description: 'Branding a start up club with iconic logos and designs.',
  //   category: 'Academic',
  //   tags: ['Adobe Illustrator', 'Creative', 'Marketing'],
  //   image: '/images/build-cad-bracket.png',
  //   year: '2024',
  //   blocks: [
  //     {
  //       type: 'text',
  //       text: 'Starting a club means coming up with a Brand Identity. The main idea was to keep our logos and designs fun and playful, while representing themed entertainment. Here are a few of the fun designs I made over the past couple of years!',
  //     },
  //   ],
  // },
  {
    slug: 'crane',
    title: 'Crane Project',
    description:
      'A table top crane capable of lifting 3.5 kilograms using a block and tackle and counterweight system',
    category: 'Academic',
    tags: ['Gear Design', 'CAD'],
    image: '/cranedraw.jpg',
    year: '2023',
    blocks: [
      {
        type: 'text',
        text: 'Goal:​ Build a table-top crane from a given base that can lift 3.5 kg at the fastest speed while conserving the weight of the crane.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/cranedraw.jpg', caption: 'Original Design.' },
          { src: '/cranefin.jpg', caption: 'Final Build' },
        ],
      },
      {
        type: 'text',
        text: 'The project focused on gear design and mechanical advantage, with full CAD modeling to validate the geometry before building. Testing confirmed the crane could lift its target load smoothly without tipping.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/cranegear.jpg', caption: 'gear ratio plot' },
          { src: '/cranegraph.jpg', caption: 'gear box' },
        ],
      },
    ],
  },
  {
    slug: 'flying-car',
    title: 'Flying Car Project',
    description: 'Drawing designs to 3D model a flying car.',
    category: 'Academic',
    tags: ['Solidworks', 'Hand sketching', 'Engineering Drawings'],
    image: '/231render.jpg',
    year: '2024',
    blocks: [
      {
        type: 'text',
        text: 'The goal of this project was to learn Solidworks. I worked in a team of 4 to design and model a flying car. The main challenge of this project was to fit different components seamlessly together, even though they were made by different people. Step one was to first hand sketch everything we wanted. My sketches are shown below.',
      },
      {
        type: 'image',
        src: '/231sketch.jpg',
        caption: 'Full car model sketch',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/231sketch2.png', caption: 'Steering Wheel Sketch' },
          { src: '/231sketch3.png', caption: 'Car Body Sketch' },
        ],
      },
      {
        type: 'text',
        text: 'After this, we had to fully model all of our parts, assemble them, and create a Bill of Materials with an exploded view.'
      },
      {
        type: 'imagePair',
        images: [
          { src: '/231models.png', caption: 'My 3D models' },
          { src: '/231render.jpg', caption: 'Full Assembly' },
        ],
      },
      {
        type: 'image',
        src: '/231exploded.png',
        caption: 'Assembly',
      },
    ],
  },
  {
    slug: 'eoat',
    title: 'End of Arm Tool',
    description: 'Deburring EOAT to be used at Mastermold LLC to increase productivity of finishing products.',
    category: 'Professional',
    tags: ['Solidworks', 'FEA', 'Testing', 'Manufacturing', 'Bill of Materials', 'Engineering Drawing', 'Assembly Guide'],
    image: '/eoatmodel.png',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'During my internship at Mastermold LLC, I designed and tested a deburring end-of-arm tool (EOAT) to increase the productivity of finishing operations.',
      },
      {
        type: 'image',
        src: '/eoatdraw.png',
        caption: 'EOAT mounted for testing.',
      },
      {
        type: 'text',
        text: 'The work covered the full engineering package: SolidWorks modeling, FEA to validate loading, and physical testing on the floor.',
      },
      {
        type: 'imageText',
        src: '/eoatchuck.png',
        text: 'A chuck was also designed for the EOAT to be manufactured.',
        caption: 'EOAT Chuck',
        imageSide: 'left',
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
    image: '/dwrsket.png',
    year: '2023',
    blocks: [
      {
        type: 'text',
        text: 'I produced engineering mockups and production-ready models for railing components on a competition sailboat.',
      },
      {
        type: 'image',
        src: '/dwrsket1.png',
        caption: 'Railing component drawing.',
      },
    ],
  },
  {
    slug: 'ornament',
    title: 'Camp Randall Ornament',
    description: '3D, lasercut ornament of my favorite college football stadium.',
    category: 'Personal',
    tags: ['Laser Cutting', 'Adobe Illustrator'],
    image: '/images/ornament.jpg',
    year: '2023',
    blocks: [
      {
        type: 'text',
        text: 'A layered, laser-cut ornament celebrating Camp Randall Stadium.',
      },
      {
        type: 'image',
        src: '/ornamentill.png',
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
    image: '/gingymodel.jpg',
    year: '2024',
    blocks: [
      {
        type: 'text',
        text: 'These collapsible gingerbread houses are laser-cut decorations designed to assemble and break down flat for easy storage.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/gingycut.jpg', caption: 'Interlocking panel layout.' },
          { src: '/gingydeco.jpg', caption: 'Assembled house.' },
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
    description: 'Lamp shade and stand designed with memorable photo moments when the light turns on.',
    category: 'Personal',
    tags: ['3D Printing', 'Resin Printing', 'Creative'],
    image: '/lithomodel.jpg',
    year: '2025',
    blocks: [
      {
        type: 'text',
        text: 'A resin-printed lithophane lamp that reveals hidden photographs when illuminated.',
      },
      {
        type: 'imagePair',
        images: [
          { src: '/lampon.jpg', caption: 'Early arm articulation prototype.' },
          { src: '/lampoff.jpg', caption: 'Drive mechanism for the arms.' },
        ],
      },
      {
        type: 'text',
        text: 'I designed both the lampshade and stand, tuning the lithophane thickness so cherished photo moments appear only when the light turns on.',
      },
    ],
  },
  // {
    // slug: 'crochet',
    // title: 'Crochet Projects',
    // description:
    //   'A selection of my favorite crochet projects, some of which are on my Etsy shop, with sales in over 14 countries.',
    // category: 'Personal',
    // tags: ['Creative', 'Marketing'],
    // image: '/images/build-conveyor.png',
    // year: '2020 - Present',
    // blocks: [
    //   {
    //     type: 'text',
    //     text: 'An ongoing collection of my favorite crochet projects, many of which I sell through my Etsy shop with sales in over 14 countries.',
    //   },
    //   {
    //     type: 'imagePair',
    //     images: [
    //       { src: '/images/build-cad-bracket.png', caption: 'A few finished pieces.' },
    //       { src: '/images/build-suspension.png', caption: 'Work in progress.' },
    //     ],
    //   },
    //   {
    //     type: 'text',
    //     text: 'Beyond the craft itself, running the shop has taught me about product design, marketing, and fulfillment. It is a creative outlet that keeps my hands busy and my design instincts sharp.',
    //   },
    // ],
  // },
  
  {
    slug: 'parrot',
    title: 'Animatronic Parrot',
    description: 'A 5-DOF animatronic bird designed to iterate.',
    category: 'WIP',
    tags: ['SolidWorks', 'Arduino Programming', 'Kinematics', '3D Printing'],
    image: '/images/project-robotic-arm.png',
    year: '2026',
    startDate: '2026-06',
    status:
      'I am working on my first full scale audio-animatronic. I have fully modeled out my bird, and am in the works of manufacturing. This design is heavily focused on designing for iteration, meaning it can be easily modified, making it easy for me to improve or troubleshoot.',
    blocks: [],
  },
  {
    slug: 'kuka',
    title: '5 DOF Robotic Arm',
    description: 'Table-top sized model attraction.',
    category: 'WIP',
    tags: ['Embedded C++', 'PCB Design', 'CAD', 'Data Logging'],
    image: '/images/project-turbine.png',
    year: '2026',
    startDate: '2026-08',
    status:
      'This project has a very large focus on ride design. Trying to adhere to ASTM standards, I am desining a ride seat and restraint for the end of the arm, as well as designing a cycloidal drive motor, all from scratch.',
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
  key: 'Personal' | 'Academic' | 'Professional'
  label: string
  blurb: string
}[] = [
  { key: 'Personal', label: 'Personal Projects', blurb: 'Work driven by a curiosity to learn.' },
  { key: 'Academic', label: 'Academic Projects', blurb: 'Coursework and club deliverables.' },
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
  'Developed an end of Summer development project, working alongside the engineering team, culinary executives, and operations management.',
  },
  {
  company: 'Mastermold LLC',
  role: 'Mechanical Engineering Intern',
  period: 'Summer 2025',
  detail:
  'Designed and tested a deburring end-of-arm tool that increased finishing productivity, delivering FEA, a bill of materials, engineering drawings, and an assembly guide.',
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
