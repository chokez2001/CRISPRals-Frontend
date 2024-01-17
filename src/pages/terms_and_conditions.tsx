import Head from 'next/head';import NextLink from 'next/link';
import { Typography, Link } from '@mui/material';
import CompactLayout from '../layouts/compact';


const CustomParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography paragraph>{children}</Typography>
);

PageTermsAndConditions.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function PageTermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Crisprals</title>
      </Head>

      <section>
        <Typography variant="h2" gutterBottom>
          Terms and Conditions
        </Typography>

        <CustomParagraph>
          Welcome to Crisprals. By accessing and using this website, you
          agree to comply with and be bound by the following terms and
          conditions. Please read them carefully.
        </CustomParagraph>

        <CustomParagraph>
          Crisprals is dedicated to providing information about the CRISPR
          defense system. The content on this site is for informational purposes
          only and should not be considered as professional advice.
        </CustomParagraph>

        <CustomParagraph>
          You agree to use this site only for lawful purposes and in a manner
          that does not infringe on the rights of, or restrict or inhibit the
          use and enjoyment of, this site by any third party. Prohibited behavior
          includes harassing or causing distress or inconvenience to any person,
          transmitting obscene or offensive content, or disrupting the normal
          flow of dialogue within this site.
        </CustomParagraph>

        <CustomParagraph>
          Crisprals reserves the right to change or modify these terms
          and conditions at any time, and your continued use of this site
          constitutes your acceptance of such changes.
        </CustomParagraph>

        <CustomParagraph>
         Crisprals does not guarantee the accuracy, completeness, or
          timeliness of the information presented on this site. The use of any
          information is at your own risk.
        </CustomParagraph>

        <CustomParagraph>
          Crisprals is not responsible for the content of external sites
          linked to from this site. Links are provided for your convenience, and
          inclusion of any link does not imply endorsement or approval by Crisprals.
        </CustomParagraph>

        <CustomParagraph>
         Crisprals reserves the right to terminate or restrict access
          to this site for any reason without notice.
        </CustomParagraph>

        <CustomParagraph>
          These terms and conditions are governed by and construed in accordance
          with the laws of Equator. Any dispute you have that arises
          from or is related to the use of this site will be subject to the
          exclusive jurisdiction of the courts located in Equator.
        </CustomParagraph>

        <CustomParagraph>
          If you have any questions or concerns about these terms and conditions,
          please contact us at{' '}
          <Link href="mailto:crisprals.yachay@gmail.com" target="_blank" rel="noopener noreferrer">
            crisprals.yachay@gmail.com
          </Link>
          .
        </CustomParagraph>
      </section>
    </>
  );
}







