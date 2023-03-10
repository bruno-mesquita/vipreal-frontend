import { useJsApiLoader } from '@react-google-maps/api';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { MdMenu } from 'react-icons/md';

import { Layout } from '@components/common';
import type { NextPageWithLayout } from './_app';

const GoogleMap = dynamic(() =>
  import('@react-google-maps/api').then((mod) => ({ default: mod.GoogleMap }))
);

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function later(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Home: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((_map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    _map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => setMap(null), []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const startAnimate = () => {
    const newValue = !isOpen;
    if (newValue) {
      x.set(0);
      y.set(0);
    } else {
      x.set(-925);
      y.set(-375);
    }
    setIsOpen(newValue);
  };

  const onSubmit = () => {
    setIsLoading(true);
    later(800)
      .then(() => {
        startAnimate();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Head>
        <title>Vip Real</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-200 w-full h-screen relative justify-center flex items-center">
        <>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          ) : (
            <></>
          )}
        </>
        <AnimatePresence>
          <motion.div
            style={{ x, y }}
            transition={{
              type: 'spring',
              duration: 0.4,
            }}
            data-open={isOpen}
            className="flex justify-between items-center absolute w-2/5 bg-white rounded-lg p-5 shadow-lg
            data-[open=false]:p-0
            data-[open=false]:w-fit
          transition-all
          "
          >
            {isOpen ? (
              <>
                <select placeholder="Cidade" className="rounded-md w-1/3">
                  <option value="Caraguatatuba">Caraguatatuba</option>
                  <option value="S??o Sebasti??o">S??o Sebasti??o</option>
                </select>
                <input
                  type="text"
                  placeholder="Bairro"
                  className="rounded-md w-1/3"
                />
                <button
                  type="button"
                  disabled={isLoading}
                  className="bg-blue-600 px-7 flex items-center justify-center text-white font-medium py-2 rounded-md hover:bg-blue-800  transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                  onClick={onSubmit}
                >
                  {isLoading ? (
                    <ImSpinner8
                      size={18}
                      className="animate-spin self-center"
                    />
                  ) : (
                    'Pesquisar'
                  )}
                </button>
              </>
            ) : (
              <button type="button" onClick={startAnimate} className="p-3">
                <MdMenu size={20} className="fill-blue-600" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
