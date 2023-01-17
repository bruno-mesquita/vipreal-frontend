import Head from 'next/head';
import { useRouter } from 'next/router';

import { ContactForm, type ContactFormInput } from '@components/announcement';
import { Layout } from '@components/common';
import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';

const AnnouncementSlug: NextPageWithLayout = () => {
  const { query } = useRouter();

  const onSubmit = (values: ContactFormInput) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>{query.slug}</title>
      </Head>
      <main className="bg-gray-100 pt-14">
        <div className="w-full flex justify-around mt-10">
          <div className="bg-white shadow-md rounded-md w-2/4 h-52 p-5">
            <h1>{query.slug}</h1>
            <h2 className="text-lg">Detalhes</h2>
          </div>
          <ContactForm onSubmit={onSubmit} />
        </div>
      </main>
    </>
  );
};

AnnouncementSlug.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default AnnouncementSlug;
