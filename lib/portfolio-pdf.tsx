import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import {
  profile,
  projects,
  smallerBuildTabs,
  type Project,
} from '@/lib/portfolio-data'

/* -------------------------------------------------------------------------- */
/*  Fonts — mirror the site (Playfair Display for display, Inter for body)    */
/* -------------------------------------------------------------------------- */

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/inter-400.ttf', fontWeight: 400 },
    { src: '/fonts/inter-500.ttf', fontWeight: 500 },
    { src: '/fonts/inter-600.ttf', fontWeight: 600 },
    { src: '/fonts/inter-700.ttf', fontWeight: 700 },
  ],
})

Font.register({
  family: 'Playfair',
  fonts: [
    { src: '/fonts/playfair-600.ttf', fontWeight: 600 },
    { src: '/fonts/playfair-700.ttf', fontWeight: 700 },
  ],
})

// Avoid awkward hyphenated word breaks in justified/wrapped paragraphs.
Font.registerHyphenationCallback((word) => [word])

/* -------------------------------------------------------------------------- */
/*  Palette — hex approximations of the site's oklch tokens.                  */
/*  Pages stay light/cream; purple is used only for accents (print-friendly). */
/* -------------------------------------------------------------------------- */

const COLORS = {
  cream: '#FAF7F0',
  white: '#FDFCF8',
  ink: '#362F3A',
  purple: '#532752',
  muted: '#7C7480',
  border: '#E6E0D7',
  tagBg: '#F2ECF1',
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.cream,
    color: COLORS.ink,
    fontFamily: 'Inter',
    fontSize: 10,
    paddingVertical: 48,
    paddingHorizontal: 46,
  },
  eyebrow: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: COLORS.purple,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 46,
    right: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: COLORS.muted,
    letterSpacing: 0.5,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },

  /* ---- Title page ---- */
  titlePage: {
    backgroundColor: COLORS.cream,
    color: COLORS.ink,
    fontFamily: 'Inter',
    paddingVertical: 64,
    paddingHorizontal: 56,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
  },
  name: {
    fontFamily: 'Playfair',
    fontWeight: 700,
    fontSize: 40,
    color: COLORS.purple,
    lineHeight: 1.05,
    marginTop: 12,
  },
  role: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 10,
  },
  headshotWrap: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.purple,
  },
  headshot: { width: '100%', height: '100%', objectFit: 'cover' },
  intro: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 12.5,
    lineHeight: 1.6,
    color: COLORS.ink,
    marginTop: 40,
    maxWidth: 440,
  },
  rule: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.purple,
    width: 64,
    marginTop: 40,
    marginBottom: 28,
  },
  contactLabel: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 8.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: COLORS.purple,
    marginBottom: 4,
  },
  contactValue: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 12,
    color: COLORS.ink,
  },

  /* ---- Key project pages ---- */
  keyImageWrap: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  keyImage: { width: '100%', height: '100%', objectFit: 'cover' },
  keyTitle: {
    fontFamily: 'Playfair',
    fontWeight: 700,
    fontSize: 26,
    color: COLORS.ink,
    marginTop: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  metaDot: { color: COLORS.border, fontSize: 10 },
  metaText: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.purple,
  },
  sectionLabel: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 8.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: COLORS.muted,
    marginTop: 20,
    marginBottom: 8,
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 8.5,
    color: COLORS.purple,
    backgroundColor: COLORS.tagBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  bodyText: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 1.65,
    color: COLORS.ink,
    marginTop: 20,
  },

  /* ---- Grouped smaller-project pages ---- */
  pageHeading: {
    fontFamily: 'Playfair',
    fontWeight: 700,
    fontSize: 28,
    color: COLORS.ink,
    marginTop: 6,
  },
  pageBlurb: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  thumbWrap: { width: '100%', height: 96 },
  thumb: { width: '100%', height: '100%', objectFit: 'cover' },
  gridBody: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  gridTitle: {
    fontFamily: 'Playfair',
    fontWeight: 600,
    fontSize: 13,
    color: COLORS.ink,
  },
  gridBlurb: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 9,
    lineHeight: 1.5,
    color: COLORS.muted,
    marginTop: 5,
    marginBottom: 9,
  },
  smallTagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  smallTag: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 7,
    color: COLORS.purple,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
})

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function absolute(src: string) {
  if (typeof window === 'undefined') return src
  return src.startsWith('http') ? src : `${window.location.origin}${src}`
}

// Compose the long-form write-up from the project's text blocks, then trim on a
// word boundary so a Key project always fits cleanly on one page.
function longDescription(project: Project, max = 1150) {
  const full = project.blocks
    .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
    .map((b) => b.text)
    .join(' ')
    .trim()
  if (full.length <= max) return full
  const cut = full.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`
}

// Cap the short blurb on grouped pages so grid cells stay even.
function trimBlurb(text: string, max = 130) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`
}

const topicGroups = smallerBuildTabs.filter((t) =>
  projects.some((p) => p.category === t.key),
)

/* -------------------------------------------------------------------------- */
/*  Document                                                                  */
/* -------------------------------------------------------------------------- */

function PortfolioDocument() {
  const keyProjects = projects.filter((p) => p.category === 'Key')

  return (
    <Document
      title={`${profile.name} — Portfolio`}
      author={profile.name}
      subject="Mechanical Engineering Portfolio"
    >
      {/* Title page */}
      <Page size="A4" style={styles.titlePage}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>Portfolio</Text>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.role}</Text>
          </View>
          <View style={styles.headshotWrap}>
            <Image style={styles.headshot} src={absolute(profile.portrait)} />
          </View>
        </View>

        <Text style={styles.intro}>{profile.intro}</Text>

        <View style={styles.rule} />

        <View style={{ flexDirection: 'row', gap: 56 }}>
          <View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{profile.email}</Text>
          </View>
          <View>
            <Text style={styles.contactLabel}>LinkedIn</Text>
            <Text style={styles.contactValue}>
              {profile.linkedin.replace(/^https?:\/\//, '')}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 56, marginTop: 22 }}>
          <View>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.contactValue}>{profile.location}</Text>
          </View>
        </View>
      </Page>

      {/* One page per Key project */}
      {keyProjects.map((project) => (
        <Page key={project.slug} size="A4" style={styles.page}>
          <View style={styles.keyImageWrap}>
            <Image style={styles.keyImage} src={absolute(project.image)} />
          </View>

          <Text style={styles.keyTitle}>{project.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{project.category} Project</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{project.year}</Text>
          </View>

          <Text style={styles.sectionLabel}>Tools &amp; Methods</Text>
          <View style={styles.tagRow}>
            {project.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>

          <Text style={styles.bodyText}>{longDescription(project)}</Text>

          <View style={styles.footer}>
            <Text>{profile.name}</Text>
            <Text>Key Project</Text>
          </View>
        </Page>
      ))}

      {/* One page per smaller-project topic */}
      {topicGroups.map((group) => {
        const items = projects.filter((p) => p.category === group.key)
        return (
          <Page key={group.key} size="A4" style={styles.page}>
            <Text style={styles.eyebrow}>Smaller Projects</Text>
            <Text style={styles.pageHeading}>{group.label}</Text>
            <Text style={styles.pageBlurb}>{group.blurb}</Text>

            <View style={styles.grid}>
              {items.map((project) => (
                <View key={project.slug} style={styles.gridItem}>
                  <View style={styles.thumbWrap}>
                    <Image style={styles.thumb} src={absolute(project.image)} />
                  </View>
                  <View style={styles.gridBody}>
                    <Text style={styles.gridTitle}>{project.title}</Text>
                    <Text style={styles.gridBlurb}>
                      {trimBlurb(project.description)}
                    </Text>
                    <View style={styles.smallTagRow}>
                      {project.tags.map((tag) => (
                        <Text key={tag} style={styles.smallTag}>
                          {tag}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.footer}>
              <Text>{profile.name}</Text>
              <Text>{group.label}</Text>
            </View>
          </Page>
        )
      })}
    </Document>
  )
}

export async function generatePortfolioPdf(): Promise<Blob> {
  return pdf(<PortfolioDocument />).toBlob()
}
