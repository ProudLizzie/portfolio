export const profile = {
  name: 'Elena Vaughn',
  role: 'Mechanical Engineering Student',
  location: 'Ann Arbor, MI',
  intro:
    'Senior mechanical engineering student focused on robotics, precision mechanical design, and sustainable energy systems. I turn sketches into working, tested hardware.',
  shortBio:
    'I\u2019m a senior mechanical engineering student at the University of Michigan who lives between CAD, the simulation environment, and the machine shop. I care about the whole loop \u2014 from first sketch to the test bench \u2014 and about hardware that quietly earns its keep.',
  email: 'elena.vaughn@example.com',
  linkedin: 'https://linkedin.com/in/example',
  github: 'https://github.com/example',
  resumeUrl: '/resume.pdf',
  portrait: '/images/portrait.png',
}

export const stats = [
  { value: '18', label: 'Projects Completed' },
  { value: '4', label: 'Years of Experience' },
  { value: '9', label: 'Software Tools' },
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
    slug: 'six-axis-robotic-arm',
    title: 'Six-Axis Robotic Arm',
    description:
      'A precision desktop manipulator with closed-loop control and a custom inverse-kinematics solver.',
    category: 'Key',
    tags: ['SolidWorks', 'ROS', 'Control Systems', 'FEA'],
    image: '/images/project-robotic-arm.png',
    year: '2025',
  },
  {
    slug: 'carbon-fiber-quadcopter',
    title: 'Carbon-Fiber Quadcopter',
    description:
      'A lightweight autonomous drone frame optimized for payload capacity and flight stability.',
    category: 'Key',
    tags: ['CFD', 'Composites', 'Fusion 360', 'PID'],
    image: '/images/project-drone.png',
    year: '2024',
  },
  {
    slug: 'micro-wind-turbine',
    title: 'Micro Wind Turbine',
    description:
      'A small-scale turbine and gearbox designed to harvest energy in low-wind urban environments.',
    category: 'Key',
    tags: ['MATLAB', 'Aerodynamics', 'Gear Design', '3D Print'],
    image: '/images/project-turbine.png',
    year: '2024',
  },
  {
    slug: 'custom-3d-printer',
    title: 'Custom CoreXY 3D Printer',
    description:
      'A ground-up printer build with a rigid frame, linear rails, and a tuned motion system.',
    category: 'Key',
    tags: ['Mechanical Design', 'Firmware', 'Motion', 'GD&T'],
    image: '/images/project-3dprinter.png',
    year: '2023',
  },
  {
    slug: 'topology-bracket',
    title: 'Topology-Optimized Bracket',
    description: 'A weight-reduced aluminum bracket driven by generative design and validated with FEA.',
    category: 'Personal',
    tags: ['Generative Design', 'FEA', 'CNC'],
    image: '/images/build-cad-bracket.png',
    year: '2025',
  },
  {
    slug: 'planetary-gearbox',
    title: 'Compact Planetary Gearbox',
    description: 'A machined 3-stage reduction gearbox designed for a high-torque actuator.',
    category: 'Personal',
    tags: ['Gear Design', 'Machining', 'CAD'],
    image: '/images/build-gearbox.png',
    year: '2024',
  },
  {
    slug: 'fsae-suspension',
    title: 'FSAE Suspension Upright',
    description: 'A double-wishbone suspension corner developed for the university Formula SAE team.',
    category: 'School',
    tags: ['Vehicle Dynamics', 'FEA', 'SolidWorks'],
    image: '/images/build-suspension.png',
    year: '2024',
  },
  {
    slug: 'heat-sink-study',
    title: 'Heat Sink Thermal Study',
    description: 'A finned heat sink designed and tested against CFD predictions for a coursework lab.',
    category: 'School',
    tags: ['Heat Transfer', 'CFD', 'Testing'],
    image: '/images/build-heatsink.png',
    year: '2023',
  },
  {
    slug: 'conveyor-automation',
    title: 'Conveyor Automation Cell',
    description: 'A sensor-driven conveyor sortation mechanism built during a manufacturing internship.',
    category: 'Work',
    tags: ['Automation', 'PLC', 'DFM'],
    image: '/images/build-conveyor.png',
    year: '2025',
  },
  {
    slug: 'centrifugal-pump',
    title: 'Centrifugal Pump Redesign',
    description: 'An impeller redesign that improved flow efficiency for a client test rig.',
    category: 'Work',
    tags: ['Fluids', 'CFD', 'Prototyping'],
    image: '/images/build-pump.png',
    year: '2024',
  },
]

export const smallerBuildTabs: {
  key: 'Personal' | 'School' | 'Work'
  label: string
  blurb: string
}[] = [
  { key: 'Personal', label: 'Personal Projects', blurb: 'Nights-and-weekends builds driven by curiosity.' },
  { key: 'School', label: 'School Projects', blurb: 'Coursework and team competition deliverables.' },
  { key: 'Work', label: 'Work Projects', blurb: 'Production work from internships and co-ops.' },
]

export const skills = [
  { group: 'CAD & Design', items: ['SolidWorks', 'Fusion 360', 'Onshape', 'GD&T'] },
  { group: 'Simulation', items: ['ANSYS FEA', 'CFD', 'MATLAB', 'Simulink'] },
  { group: 'Prototyping', items: ['CNC Machining', '3D Printing', 'Lathe & Mill', 'Composites'] },
  { group: 'Controls & Code', items: ['Python', 'C++', 'ROS', 'PID Tuning'] },
]

export const education = [
  {
    school: 'University of Michigan',
    degree: 'B.S.E. Mechanical Engineering',
    period: '2022 — 2026',
    detail: 'GPA 3.8 / 4.0 · Formula SAE · Robotics Lab research assistant.',
  },
  {
    school: 'Riverside High School',
    degree: 'STEM Diploma, Robotics Captain',
    period: '2018 — 2022',
    detail: 'Led the FIRST Robotics team to a regional championship.',
  },
]

export const experience = [
  {
    company: 'Rivian Automotive',
    role: 'Mechanical Engineering Intern',
    period: 'Summer 2025',
    detail:
      'Designed and validated a sensor-driven conveyor sortation cell, cutting manual handling time by 30% across the pilot line.',
  },
  {
    company: 'Hydro Dynamics Lab',
    role: 'Design Contractor',
    period: '2024 — 2025',
    detail:
      'Redesigned a centrifugal pump impeller using CFD, improving flow efficiency on a client test rig by 12%.',
  },
  {
    company: 'UM Robotics Laboratory',
    role: 'Research Assistant',
    period: '2023 — Present',
    detail:
      'Support closed-loop control research on manipulators, building fixtures and running characterization tests.',
  },
]

export const certificates = [
  {
    name: 'Certified SolidWorks Associate (CSWA)',
    issuer: 'Dassault Syst\u00e8mes',
    date: '2024',
  },
  {
    name: 'GD&T Fundamentals (ASME Y14.5)',
    issuer: 'ASME',
    date: '2024',
  },
  {
    name: 'ANSYS Mechanical FEA Professional',
    issuer: 'ANSYS Learning',
    date: '2023',
  },
  {
    name: 'OSHA 10-Hour General Industry Safety',
    issuer: 'OSHA',
    date: '2022',
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
