import Head from 'next/head';
import { Typography, Link } from '@mui/material';
import CompactLayout from '../layouts/compact';

const CustomParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography paragraph>{children}</Typography>
);

PagePrivacyPolicy.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function PagePrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Crisprals</title>
      </Head>

      <section>
        <Typography variant="h2" gutterBottom>
          Privacy Policy
        </Typography>

        <CustomParagraph>
          Welcome to Crisprals. This Privacy Policy explains our practices regarding
          the collection, use, and sharing of your personal information.
        </CustomParagraph>

        <CustomParagraph>
          <strong>Information We Collect:</strong> We use Google OAuth for user authentication.
          During this process, we do not collect or store any personal information locally on our
          servers. Google handles the authentication process, and we only receive a unique
          identifier for each authenticated user.
        </CustomParagraph>

        <CustomParagraph>
          <strong>File Uploads:</strong> While we allow users to upload files, it's important to
          note that these files are processed and almost instantly removed from our servers.
          We do not retain user-uploaded files once the processing is complete.
        </CustomParagraph>

        <CustomParagraph>
          <strong>How We Use Your Information:</strong> The information we receive from Google
          OAuth is used solely for authentication purposes. We do not use this information for
          any other purpose, and we do not store it on our servers.
        </CustomParagraph>

        <CustomParagraph>
          <strong>Third-Party Services:</strong> We use Google OAuth as a third-party service
          for user authentication. Please review Google's Privacy Policy for information on how
          they handle user data.
        </CustomParagraph>

        <CustomParagraph>
          <strong>Changes to This Privacy Policy:</strong> Any changes to our Privacy Policy
          will be posted on this page. We encourage you to review this Privacy Policy regularly
          to stay informed about how we collect, use, and protect your personal information.
        </CustomParagraph>

        <CustomParagraph>
          If you have any questions or concerns about our Privacy Policy, please contact us at{' '}
          <Link href="mailto:crisprals.yachay@gmail.com">
            crisprals.yachay@gmail.com
          </Link>
          .
        </CustomParagraph>
      </section>
    </>
  );
}
